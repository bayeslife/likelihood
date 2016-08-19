'use strict';

likelihoodApp
  .controller('LikelihoodCtrl' ,function ($scope,$http,$routeParams,DataService,GuidService) {

	$scope.dataset = $routeParams.dataset;

	//---------------------

	$scope.updateModel = function() {
		$scope.computePosteriors();
		$scope.computeAllPosteriors();
	}

	// ------------------ Capability

	$scope.loadCapabilities = function() {
		$scope.capabilities =[];

			DataService.getCapabilities($scope.dataset).success(function(result){
				var doc = result.rows[0].value;
				$scope.capabilitiesDocument = doc;	
				
			}).finally(function(){

				if(!$scope.capabilitiesDocument){
					var guid = GuidService.createGuid();
					$scope.capabilitiesDocument = {
						_id: guid,
						type: "Capabilities",
						dataset : $scope.dataset,
						data: []
					}
				}

				$scope.selectedCapability = null;
				$scope.capabilities = $scope.capabilitiesDocument.data;					
			});
	}

  	$scope.selectCapability = function(c){
  		if($scope.selectedCapability===c) {
  			$scope.selectedCapability=null;
  			$scope.selectedDecision=null;

  			
  		}
  		else
			$scope.selectedCapability=c;

	
		$scope.selectDecision();
		$scope.updateModel();
	};

	$scope.addCapability = function(){
		var guid = GuidService.createGuid();

		$scope.selectedCapability = {
           "id": guid,
           "capability": "ChangeMe",
           "description": "ChangeMe",
           "examples": "Change Me"       
		};
		$scope.capabilities[$scope.capabilities.length] = $scope.selectedCapability
	}

	$scope.updateCapability = function(c){
		DataService.setCapabilities($scope.capabilitiesDocument).success(function(r){
			$scope.loadCapabilities();
		});
		$scope.updateDecisions();
	}

	$scope.removeCapability = function(c){
		$scope.capabilities = _.reject($scope.capabilities,function(c2){
			return c2.id === c.id;
		});
		$scope.capabilitiesDocument.data = $scope.capabilities;
		$scope.selectedCapability = null;
		DataService.setCapabilities($scope.capabilitiesDocument);
	}

	//-------------------Hypothesis
	$scope.loadHypothesises = function() {
		$scope.hypothesises = [];

		var f = DataService.getHypothesises($scope.dataset);

		f.success(function(result){
				var doc = result.rows[0].value;
				$scope.hypothesisesDocument = doc;	
				
		}).finally(function(){

			if(!$scope.hypothesisesDocument) {

				var guid = GuidService.createGuid();
				$scope.hypothesisesDocument = {		
					_id: guid, 		
					dataset: $scope.dataset,
					type: "Hypothesises",
					data: []			
				}
			};

			$scope.hypothesises = $scope.hypothesisesDocument.data;	
			var m = _.indexBy($scope.hypothesises,function(h){
					return h.id;
			});
			$scope.hypothesisMap = m;
			$scope.selectedHypothesis=null;
			$scope.selectDecision();
		})		
	}

	$scope.selectHypothesis = function(h){
		if($scope.selectedHypothesis===h) {
			$scope.selectedHypothesis=null;
			$scope.selectedDecision=null;
		}
		else
			$scope.selectedHypothesis=h;

		$scope.selectDecision();
	};

	$scope.addHypothesis = function(){
		var guid = GuidService.createGuid();

		$scope.selectedHypothesis = {
           "id": guid,
           "name": "ChangeMe",
           "description": "ChangeMe"       
		};
		$scope.hypothesises[$scope.hypothesises.length] = $scope.selectedHypothesis
	}

	$scope.updateHypothesis = function(c){
		DataService.setHypothesises($scope.hypothesisesDocument).success(function(r){
			$scope.loadHypothesises();
		})
		$scope.updateDecisions();
	}

	$scope.removeHypothesis = function(c){
		$scope.hypothesises = _.reject($scope.hypothesises,function(c2){
			return c2.id === c.id;
		});
		$scope.hypothesisesDocument.data = $scope.hypothesises;
		$scope.selectedHypothesis = null;
		DataService.setHypothesises($scope.hypothesisesDocument);
	}

	//-----------------Consideration

	$scope.loadConsiderations = function() {
		$scope.considerations=[];

		DataService.getConsiderations($scope.dataset).success(function(result){
				var doc = result.rows[0].value;
				$scope.considerationsDocument = doc;	
				
			}).finally(function(){

				if(!$scope.considerationsDocument){
					var guid = GuidService.createGuid();
					$scope.considerationsDocument = {					
						_id: guid,
						type:"Considerations",
						dataset: $scope.dataset,
						data: []
					}				
				}
				$scope.considerations = $scope.considerationsDocument.data;	
				$scope.selectedConsideration = null;

				$scope.updateModel();
			})
	}

	$scope.selectConsideration = function(c){
		if($scope.selectedConsideration===c)
			$scope.selectedConsideration=null;	
		else
			$scope.selectedConsideration=c;

		$scope.selectDecision();
	};

	$scope.addConsideration = function(){
		var guid = GuidService.createGuid();

		$scope.selectedConsideration = {
           "id": guid,
           "name": "ChangeMe",
           "description": "ChangeMe",
           "measured" : " Change Me"       
		};
		$scope.considerations[$scope.considerations.length] = $scope.selectedConsideration
	}

	$scope.updateConsideration = function(c){
		DataService.setConsiderations($scope.considerationsDocument).success(function(r){
			$scope.loadConsiderations();
		});
	}

	$scope.removeConsideration = function(c){
		$scope.considerations = _.reject($scope.considerations,function(c2){
			return c2.id === c.id;
		});
		$scope.considerationsDocument.data = $scope.considerations;
		$scope.selectedConsideration = null;
		DataService.setConsiderations($scope.considerationsDocument);
	}

	//-----------------Decision

	$scope.loadDecisions = function() {
		$scope.decisions=[];

		DataService.getDecisions($scope.dataset).success(function(result){
			var doc = result.rows[0].value;
			$scope.decisionsDocument = doc;	
			

			$scope.updateModel();
		}).finally(function(r){
				if(!$scope.decisionsDocument){
					var guid = DataService.createGuid();
					$scope.decisionsDocument = {					
						_id: guid,
						type:"Decisions",
						dataset: $scope.dataset,
						data: []
					}				
				}
				$scope.decisions = $scope.decisionsDocument.data;	
		})
	}
	
	$scope.selectDecision = function(){
		if(!$scope.selectedCapability || !$scope.selectedHypothesis)
			return;

		$scope.selectedDecision = _.find($scope.decisions,function(d){
				return $scope.selectedHypothesis.id === d.hypothesis && $scope.selectedCapability.id === d.capability;
			});

		var sd = $scope.selectedDecision;
		if($scope.selectedDecision==null)
			$scope.addDecision();

		if($scope.selectedCapability.decision === $scope.selectedHypothesis.id)
			$scope.selectedDecisionIsActive=true;
		else
			$scope.selectedDecisionIsActive=false;
	};

	$scope.addDecision = function(){
		$scope.addNewDecision($scope.selectedCapability,$scope.selectedHypothesis);		
	}

	$scope.addNewDecision = function(capability,hypothesis){		
		$scope.selectedDecision = {
           "capability": capability.id,
           "hypothesis": hypothesis.id,
           "prior": "0.5",
           "examples" : "Change Me"       
		};
		$scope.decisions[$scope.decisions.length] = $scope.selectedDecision;
		capability.decision = hypothesis.id;
	}

	$scope.updateDecisions = function(){
		if(!$scope.selectedCapability || !$scope.selectedHypothesis)
			return;
		DataService.setDecisions($scope.decisionsDocument).success(function(r){
			$scope.loadDecisions();
		});
	}

	$scope.removeDecision = function(d){
		$scope.decisions = _.reject($scope.decisions,function(d2){
			return d2.hypothesis === d.hypothesis && d2.capability === d.capability;
		});
		$scope.decisionsDocument.data = $scope.decisions;
		$scope.selectedDecision = null;
		DataService.setDecisions($scope.decisionsDocument);
	}

	//---------------------Correlation

	$scope.loadCorrelations = function() {

		$scope.correlations=[];
		
		DataService.getCorrelations($scope.dataset).success(function(result){
			var doc = result.rows[0].value;
			$scope.correlationsDocument = doc;	
			
		}).finally(function(){

			if(!$scope.correlationsDocument){
				var guid = DataService.createGuid();
				$scope.correlationsDocument = {					
						_id: guid,
						type:"Correlations",
						dataset: $scope.dataset,
						data: []
				}				
			};

			$scope.correlations = $scope.correlationsDocument.data;

		})
	}

	$scope.checkCorrelation = function(capability,hypothesis,consideration){
		var cor = _.find($scope.correlations, function (c){	
			return c.capability === capability.id &&
			c.hypothesis === hypothesis.id &&
			c.consideration === consideration.id;
		});
		if (cor && cor.correlation)
			return true;
		return false;
	};

	$scope.setCorrelation = function(capability,hypothesis,consideration){
		var cor = _.find($scope.correlations, function (c){

			$scope.c = c;

			return c.capability === capability.id &&
			c.hypothesis === hypothesis.id &&
			c.consideration === consideration.id;					
		});		
		if (cor && cor.correlation){
			 $scope.correlations = _.reject($scope.correlations,function(c){
				return c.capability === capability.id &&
				c.hypothesis === hypothesis.id &&
				c.consideration === consideration.id;				
			});			
			 $scope.correlationsDocument.data = $scope.correlations;
		}else {
			$scope.correlations[$scope.correlations.length] = {
				"capability": capability.id,
				"hypothesis": hypothesis.id,
				"consideration": consideration.id,
				"correlation": "true",
			}
		}

		$scope.persistCorrelation();	
	}

	$scope.persistCorrelation = function(){

		var tidied = _.partition($scope.correlations,function(c){
			var hypothesisId = c.hypothesis;
			var capabilityId = c.capability;
			var considerationId = c.consideration;

			var consideration = _.find($scope.considerations,function(cons2){
				return cons2.id===considerationId;
			});
			if(!consideration)
				return false;

			var hy = _.find($scope.hypothesises,function(h2){
				return h2.id===hypothesisId;
			});
			if(!hy)
				return false;

			var cap = _.find($scope.capabilities,function(c2){
				return c2.id===capabilityId;
			});
			if(!cap)
				return false;
			return true;
		});


		var cD = $scope.correlationsDocument;

		DataService.setCorrelations($scope.correlationsDocument).success(function(r){
			$scope.loadCorrelations();
			$scope.updateModel();
		});
	}

	$scope.correlatedCapabilities = function(hypothesis,consideration){
		var crs = _.map($scope.correlations, function(v,k,l){
			if(v.hypothesis === hypothesis.id && v.consideration === consideration.id)
				return v.capability;	
		})

		crs = _.compact(crs);

		var res = _.filter($scope.capabilities,function(c){			
			var b2 = c.decision===hypothesis.id;
			return b2;
		})

		var res2 = _.partition(res,function(c){
			var b1 =  _.contains(crs,c.id);			
			return b1;
		})

		return res2;
	}

	//------------Likelihoods

	$scope.likelihood2 = function(hypothesis,considerations){
		var l = $scope.likelihood(hypothesis,considerations);
		return 0.25+ (0.5*l);
	}

	$scope.likelihood = function(hypothesis,consideration){

		var likelihood=0;
		
		var crs = _.map($scope.correlations, function(v,k,l){
			if(v.hypothesis === hypothesis.id && v.consideration === consideration.id)
				return v.capability;	
		})

		crs = _.compact(crs);

		if(crs.length!=0){
			
			console.log('Correlations For Hypothesis['+hypothesis.name+'] and Consideration['+consideration.name+'] - '+crs.length);

			var cntSamplesOfHypothesisGivenConsideration = _.filter($scope.capabilities,function(c){
				var cid = c.id;
				var cd = c.decision;
				var hid = hypothesis.id;
				
				var contains =  _.contains(crs,c.id);
				var hypothesisChosenForCapability =   c.decision===hypothesis.id;
				 return contains && hypothesisChosenForCapability;
			});

			cntSamplesOfHypothesisGivenConsideration = cntSamplesOfHypothesisGivenConsideration.length;

			console.log('Hypothesises Given Consideration '+cntSamplesOfHypothesisGivenConsideration);

			if(cntSamplesOfHypothesisGivenConsideration==0)
				return 0;

			var cntSamplesOfHypothesis = _.filter($scope.capabilities,function(c){
				 return c.decision===hypothesis.id;			 
			});

			cntSamplesOfHypothesis = cntSamplesOfHypothesis.length;

			console.log('Samples of Hypothesises '+cntSamplesOfHypothesis);
			
			//var denominator = domain.length;
			var cntAllCapabilitiesWithDecisions = _.filter($scope.capabilities,function(d){
				return d.decision!=null;			
			});

			var cntAllSamples = cntAllCapabilitiesWithDecisions.length;

			console.log('Count of all Samples '+cntAllSamples);

			var cntAllOtherHypothesis = cntAllSamples - cntSamplesOfHypothesis;

			console.log('Count of all Other Samples '+cntAllOtherHypothesis);


			var normalizationFactor = cntAllOtherHypothesis/cntSamplesOfHypothesis;
			if(normalizationFactor>1) {
				cntSamplesOfHypothesisGivenConsideration = cntSamplesOfHypothesisGivenConsideration*normalizationFactor;
				cntSamplesOfHypothesis = cntSamplesOfHypothesis*normalizationFactor;
			}else {
				cntAllOtherHypothesis = cntAllOtherHypothesis/normalizationFactor;
			}

				
			var likelihood =  cntSamplesOfHypothesisGivenConsideration/(cntSamplesOfHypothesis+cntAllOtherHypothesis);

			console.log('Likelihood '+likelihood);
		}



		
		return likelihood;		
	}

	//-------------- Posteriors

	$scope.computePosteriorsForCapabilityAndConsideration = function(capability, considerations) {
		 var datum = [];

		var post = {};
		 {
			var total = 0;
			$scope.hypothesises.forEach(function(hyp){
				var dec = _.find($scope.decisions,function(d){
					return d.hypothesis === hyp.id && d.capability === capability.id;
				})
				post[hyp.id] = Number(dec.prior);
				total = total + post[hyp.id];
			});
			$scope.hypothesises.forEach(function(hyp){
					var f =  post[hyp.id] / total;
					post[hyp.id] = Math.floor(f*100);
			});
			var p = {};
			$scope.hypothesises.forEach(function(hyp){
				p[hyp.id] = post[hyp.id];
			});
			datum['Prior'] = p;
		}		

		considerations.forEach(function(cons){
			var total = 0;			
			$scope.hypothesises.forEach(function(hyp){
				var likelihood = $scope.likelihood2(hyp,cons);							
				post[hyp.id] = post[hyp.id] * Number(likelihood); 
				total = total + post[hyp.id]; 
			});
			$scope.hypothesises.forEach(function(hyp){
				var f = post[hyp.id] / total;
				post[hyp.id] = Math.floor(f*100);
			}); 
			var p = {};
			$scope.hypothesises.forEach(function(hyp){
				p[hyp.id] = post[hyp.id];
			});
			datum[cons.name] = p;
		});
		return datum;            
     }

     $scope.computePosteriorsForCapability = function(capability){
     	var data = [];

     	 var datum = [{shortName: 'Prior',name: 'Prior'}]; 

     	    var considerations = _.filter($scope.considerations,function(c){
			var correlation = _.detect($scope.correlations,function(cor){				
				var b1 = cor.capability === capability.id;
				var b2 = cor.hypothesis === capability.decision;
				var b3 = cor.consideration === c.id ;
				var b4 = cor.correlation === "true"  
				return  b1 &&  b2 && b3 && b4;
			});
			return correlation!=null;
         });

         var considerations = _.sortBy(considerations,"name");

		 var posterior = $scope.computePosteriorsForCapabilityAndConsideration(capability,considerations);

         considerations.forEach(function(c) {
              datum[datum.length] = {shortName: c.name,name: c.name};
          });       

          $scope.hypothesises.forEach(function(h){
          		
                var i=0;

                cat=[];
                cat[cat.length]={x: i,y: posterior['Prior'][h.id]};
				
                considerations.forEach(function(c){                	                   
                    cat[cat.length]={x: ++i ,y: posterior[c.name][h.id]};
                });

                var cat = { name: h.name ,datum: datum, values: cat};

                data.push(cat);
            });
          return data;
     }

	$scope.computePosteriors = function() {
		 $scope.data = [];

		 if($scope.selectedCapability==null)
		 	return;	

		 $scope.data = $scope.computePosteriorsForCapability($scope.selectedCapability);
		 				          
     }

     $scope.computeAllPosteriors = function() {
     	$scope.capabilities.forEach(function(c){
		 	var posteriors =  $scope.computePosteriorsForCapability(c);

		 	var h = DataService.getDecisionHypothesis($scope,c);

		 	var pdata = _.find(posteriors,function(p){
		 		return p.name===h.name;
		 	})

		 	c['posterior'] = pdata.values[pdata.values.length-1].y;
		 });
     }

     //---------------DataSets

     $scope.loadDataSets = function(){

	  	var promise = DataService.getDataSets();	  	
	  	promise.success(function(result){
	  		var ds = _.map(result.rows,function(r){
	  			return r.value;
	  		});

	  		$scope.datasets = ds;

	  		var sds = _.find($scope.datasets,function(d){
	  			return d._id === $scope.dataset;
	  		});

	  		$scope.selectedDataSet = sds;
	  	});
	  };


  	$scope.loadDataSets();

	$scope.loadCorrelations();

	$scope.loadCapabilities();
	
	$scope.loadHypothesises();

	$scope.loadConsiderations();

	$scope.loadDecisions();

  });
