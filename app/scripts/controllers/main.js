'use strict';

likelihoodApp
  .controller('MainCtrl', function ($scope,$http,DataService) {



  	$scope.addDataSet = function(){
		var guid = DataService.createGuid();

		$scope.selectedDataSet = {
           "_id": guid,
           "name": "Name",
           "type" : "DataSets",
           "organisation": "Organization"       
		};
		$scope.datasets[$scope.datasets.length] = $scope.selectedDataSet;
	}

	$scope.selectDataSet = function(d){
		$scope.selectedDataSet = d;
	}

	$scope.updateDataSet = function(d){
		DataService.setDataSet($scope.selectedDataSet).success(function(d){
			$scope.loadDataSets();
		})		
	}

	$scope.removeDataSet = function(d){		
		DataService.removeDataSet(d).success(function(d){
			$scope.loadDataSets();
		});
	}



	$scope.loadDataSets = function(d){
	  	DataService.getDataSets().success(function(result){
	  		var ds = _.map(result.rows,function(r){
	  			return r.value;
	  		});

	  		$scope.datasets = ds;
	  	});
	  };


  	$scope.loadDataSets();

	 
  });
