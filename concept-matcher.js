var redis = require('redis'),
    _ = require('underscore'),
    Set = require('Set'),
    redisClient = redis.createClient();
    endToken = '{{end}}';

function ConceptMatcher(){

};   

ConceptMatcher.prototype = {
  add: function(conceptArr, callback){
    var count = conceptArr.length;
    var processed = 0;
    _.each(conceptArr, function(concept){
      var processedConcept = concept.trim() + endToken;
      var wordArr = processedConcept.split(' ');
      if(wordArr.length > 0){
        addPhrase(wordArr.shift(), wordArr, function(){
          console.log('Added: %s', concept);
          processed++;
          if(processed == count){
            // All added
            callback(processed);
          }
        });
      }
    });
  },

  // Just for test/debug - don't worry about scaling or async
  list: function(){
    redisClient.hkeys('concepthash', function(err, results){
      _.each(results, function(result){
        var i = result.indexOf(endToken);
        if(i > -1){
          console.log('Concept: %s' , removeToken(result));
        }
      });
    });
  },

  // Delete all the concepts
  clear: function(callback){
    redisClient.del('concepthash', function(){
      callback();
    })
  },

  match: function(phrase, callback){
    var matches = new Set();
    phrase = phrase.replace(/[!?]/g,""); // Simplistic punctuation removal
    var wordArr = phrase.split(' ');
    if(wordArr.length > 0){
      var word = wordArr.shift();
      matchPhrase(word, wordArr, matches, function(matches){
        callback(matches);
      });
    }
  }

};

// Recurse through the phrase, matching words and phrases from each point
function matchPhrase(wordOrPhrase, wordArr, matchSet, callback){
  var clonedArr = wordArr.slice();
  matchPhrases(wordOrPhrase, clonedArr, matchSet, function(m){ 
    if(wordArr.length > 0){
      var nextWord = wordArr.shift();
      matchPhrase(nextWord, wordArr, matchSet, callback);
    }else{
      callback(matchSet);
    }
  });
}

// Recursively match phrases from a start point
function matchPhrases(wordOrPhrase, wordArr, matchSet, callback){
  var possibleMatch = wordOrPhrase.toLowerCase();
  var thingToMatch = possibleMatch + endToken;
  redisClient.hget('concepthash', thingToMatch, function(err, result){
    if(err){
      console.error('Error in match: %s', e);
    }else{
      if(result != null){
        // Match
        matchSet.add(result);
        console.log('Matched: %s', result);
      }

      if(wordArr.length > 0){
        // If there's a possibility of a longer match, keep going
        redisClient.hget('concepthash', possibleMatch, function(err, result){
          if(err){
            console.error('Error in match: %s', err);
          }else if(result != null){
            var nextWord = wordArr.shift();
            var nextPhrase = wordOrPhrase + ' ' + nextWord;
            matchPhrases(nextPhrase, wordArr, matchSet, callback);
          }else{
            // No further matches possible
            callback(matchSet);
          }
        });
      }else{
        // At the end of the phrase
        callback(matchSet);
      }      
    }
  });
}

// Recursively add words or phrases so we keep the route to an answer
function addPhrase(wordOrPhrase, wordArr, callback){
  // Add to redis
  redisClient.hset('concepthash', wordOrPhrase.toLowerCase(), removeToken(wordOrPhrase), function(err){
    if(err){
      console.error('Error in add: %s', e);
    }else{
      if(wordArr.length > 0){
        addPhrase(wordOrPhrase + ' ' + wordArr.shift(), wordArr, callback);
      }else{
        callback();
      }
    }
  });
};

function removeToken(c){
  return c.substr(0, c.length-endToken.length)
};

module.exports = ConceptMatcher;
