'use strict';

describe('Controller: LikelihoodCtrl', function () {

  var LikelihoodCtrl;
  var scope;  

  var h1,h2;
  var cap1,cap2,cap3,cap4,cap5,cap6;
  var cons1,cons2,cons3,cons4;

beforeEach(module('likelihoodApp', function ($provide) {
 var noop = function(){
          return {
            success: function(f){
              //f(null);
              return this;              
            },
            finally: function(f){
              //f();
            }
          }
        };

  var mockDataService = {
     getDataSets: noop,
     getCapabilities: noop,
     getHypothesises: noop,        
     setCorrelations: noop,
     getCorrelations: noop,
     getConsiderations: noop,
     getDecisions: noop
    };

    $provide.value("DataService",mockDataService);  
}));




  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {  
    scope = $rootScope.$new();    
    LikelihoodCtrl = $controller('LikelihoodCtrl', {
      $scope: scope
    });

    

    scope.addCapability();
    cap1 = scope.selectedCapability;
    cap1.capability='Capability1';
  
    scope.addCapability();
    cap2 = scope.selectedCapability;
    cap2.capability='Capability2';

    scope.addCapability();
    cap3 = scope.selectedCapability;
    cap3.capability='Capability3';

    scope.addCapability();
    cap4 = scope.selectedCapability;
    cap4.capability='Capability4';

    scope.addCapability();
    cap5 = scope.selectedCapability;
    cap5.capability='Capability5';

    scope.addCapability();
    cap6 = scope.selectedCapability;
    cap6.capability='Capability6';

    /////

    scope.addHypothesis();
    h1 =  scope.selectedHypothesis;
    h1.name='H1';

    scope.addHypothesis();
    h2 =  scope.selectedHypothesis;
    h2.name='H2';

    /////    

    scope.addConsideration();
    cons1 = scope.selectedConsideration;
    cons1.name='Cons1';

    scope.addConsideration();
    cons2 = scope.selectedConsideration;
    cons2.name='Cons2';

    scope.addConsideration();
    cons3 = scope.selectedConsideration;
    cons3.name='Cons3';
    
    scope.addConsideration();
    cons4 = scope.selectedConsideration;
    cons4.name='Cons4';

    /////

    scope.setCorrelation(cap1,h1,cons1);
    scope.setCorrelation(cap1,h1,cons3);

    scope.setCorrelation(cap3,h1,cons1);
    scope.setCorrelation(cap3,h1,cons2);

    scope.setCorrelation(cap5,h1,cons1);
    scope.setCorrelation(cap5,h1,cons3);
  
    scope.setCorrelation(cap2,h2,cons2);

    scope.setCorrelation(cap4,h2,cons3);
    scope.setCorrelation(cap4,h2,cons4);

    ////

    scope.addNewDecision(cap1,h1);    
    scope.addNewDecision(cap3,h1);

    scope.addNewDecision(cap5,h1);

    scope.addNewDecision(cap2,h2);
    scope.addNewDecision(cap4,h2);
    scope.addNewDecision(cap6,h1);

  }));

  it('Testing likelihood function', function () {
      
    expect(scope.capabilities.length).toBe(6);
    expect(scope.hypothesises.length).toBe(2);
    expect(scope.considerations.length).toBe(4);
    
    if(false){
      var likelihood = scope.likelihood(h1,cons1);
      expect(likelihood).toBe(0.375);

      var likelihood = scope.likelihood(h2,cons1);
      expect(likelihood).toBe(0);
    }
    {
      var likelihood = scope.likelihood(h1,cons2);
      expect(likelihood).toBe(0.125);

      var likelihood = scope.likelihood(h2,cons2);
      expect(likelihood).toBe(0.25);
    }
        {
      var likelihood = scope.likelihood(h1,cons3);
      expect(likelihood).toBe(0.25);

      var likelihood = scope.likelihood(h2,cons3);
      expect(likelihood).toBe(0.25);
    }
    {
      var likelihood = scope.likelihood(h1,cons4);
      expect(likelihood).toBe(0);

      var likelihood = scope.likelihood(h2,cons4);
      expect(likelihood).toBe(0.25);
    }
  });
});
