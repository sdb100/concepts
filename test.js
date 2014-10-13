var assert = require('assert'),
    _ = require('underscore'),
    ConceptMatcher = require('./concept-matcher');

var testConcepts = [ 
  'Indian',
  'Thai',
  'Sushi',
  'Caribbean',
  'Italian',
  'West Indian',
  'Pub',
  'East Asian',
  'BBQ',
  'Chinese',
  'Portuguese',
  'Spanish',
  'French',
  'East European'
];

var testPhrases = [
  {p:'I’d like some thai food', m:['Thai']},
  {p:'Where can I find good sushi?', m:['Sushi']},
  {p:'Find me a place that does tapas', m:[]},
  {p:'Which restaurants do East Asian food?', m:['East Asian']},
  {p:'Which restaurants do West Indian food?', m:['West Indian', 'Indian']},
  {p:'What is the weather like today', m:[]}
];

describe('ConceptMatcher', function(){
  describe('#add()', function(){
    it('should return 7', function(done){
      c = new ConceptMatcher();
      c.clear(function(){
        c.add(['a concept', 
               'some other concept', 
               'a conceptual approach', 
               'west indian',
               'indian',
               'west indian food',
               'matchme'], function(added){
          assert(added == 7);
          done();
        });
      });
    });
  });
  describe('#list()', function(){
    it('just testing', function(done){
      c = new ConceptMatcher();
      c.add(['a concept', 'some other concept', 'a conceptual approach'], function(added){
        assert(added == 3);
        c.list();        
        done();
      });
    });
  });
  describe('#match() - simple', function(){
    it('should match on matchme', function(done){
      c = new ConceptMatcher();
      c.match('phrase including matchme should work', function(matchSet){
        assert(matchSet.size() == 1);
        assert(matchSet.has('matchme'));
        done();
      });
    });
  });
  describe('#match() - 20 word phrase', function(){
    it('west indian food', function(done){
      c = new ConceptMatcher();
      c.match('I like to eat west indian food in west london or some other concept there a conceptual approach is necessary', function(matchSet){
        assert(matchSet.size() == 5);
        assert(matchSet.has('west indian'));
        assert(matchSet.has('indian'));
        assert(matchSet.has('west indian food'));
        assert(matchSet.has('some other concept'));
        assert(matchSet.has('a conceptual approach'));
        done();
      });
    });
  });
  describe('#match() - multiple', function(){
    it('add', function(done){
      c = new ConceptMatcher();
      console.log('Testing');
      c.clear(function(){
        c.add(testConcepts, function(added){
          //assert(added == 13);
          done();
        });
      });
    });
  });
  describe('#match() - multiple', function(){
    var pair = testPhrases[0];
    it(pair.p, function(done){
      c = new ConceptMatcher();
      var phrase = pair.p;
      var matchArr = pair.m;
      c.match(phrase, function(s){
        assert(matchArr.length == s.size());
        if(matchArr.length > 0){
          _.each(matchArr, function(match){
            assert(s.has(match));
          });
        }
        done();
      });
    });
  });
  describe('#match() - multiple', function(){
    var pair = testPhrases[1];
    it(pair.p, function(done){
      c = new ConceptMatcher();
      var phrase = pair.p;
      var matchArr = pair.m;
      c.match(phrase, function(s){
        assert(matchArr.length == s.size());
        if(matchArr.length > 0){
          _.each(matchArr, function(match){
            assert(s.has(match));
          });
        }
        done();
      });
    });
  });
  describe('#match() - multiple', function(){
    var pair = testPhrases[2];
    it(pair.p, function(done){
      c = new ConceptMatcher();
      var phrase = pair.p;
      var matchArr = pair.m;
      c.match(phrase, function(s){
        assert(matchArr.length == s.size());
        if(matchArr.length > 0){
          _.each(matchArr, function(match){
            assert(s.has(match));
          });
        }
        done();
      });
    });
  });
  describe('#match() - multiple', function(){
    var pair = testPhrases[3];
    it(pair.p, function(done){
      c = new ConceptMatcher();
      var phrase = pair.p;
      var matchArr = pair.m;
      c.match(phrase, function(s){
        assert(matchArr.length == s.size());
        if(matchArr.length > 0){
          _.each(matchArr, function(match){
            assert(s.has(match));
          });
        }
        done();
      });
    });
  });
  describe('#match() - multiple', function(){
    var pair = testPhrases[4];
    it(pair.p, function(done){
      c = new ConceptMatcher();
      var phrase = pair.p;
      var matchArr = pair.m;
      c.match(phrase, function(s){
        assert(matchArr.length == s.size());
        if(matchArr.length > 0){
          _.each(matchArr, function(match){
            assert(s.has(match));
          });
        }
        done();
      });
    });
  });
  describe('#match() - multiple', function(){
    var pair = testPhrases[5];
    it(pair.p, function(done){
      c = new ConceptMatcher();
      var phrase = pair.p;
      var matchArr = pair.m;
      c.match(phrase, function(s){
        assert(matchArr.length == s.size());
        if(matchArr.length > 0){
          _.each(matchArr, function(match){
            assert(s.has(match));
          });
        }
        done();
      });
    });
  });

});

 