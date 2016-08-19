'use strict';

likelihoodApp.factory('DataService',function($http){
   return {
        getDataSets: function () {
            return $http(
                {
                    method: 'GET',
                    url: '/likelihood/_design/likelihood/_view/datasets',                    
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        setDataSet: function (datasetDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/likelihood/'+datasetDocument._id,
                    data: datasetDocument,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
         removeDataSet: function (datasetDocument) {
            return $http(
                {
                    method: 'DELETE',                       
                    url: '/likelihood/'+datasetDocument._id,
                    params: {
                        "rev": datasetDocument._rev
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },    
   	   	 getCorrelations: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/likelihood/_design/likelihood/_view/correlations_by_dataset',
                    params: { key: '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        setCorrelations: function (correlationDocument) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/likelihood/'+correlationDocument._id,
                    data: correlationDocument,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
   	 	getCapabilities: function (dataset) {
            return $http(
                {
                    method: 'GET',
					url: '/likelihood/_design/likelihood/_view/capabilities_by_dataset',
                    params: { key: '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        setCapabilities: function (document) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/likelihood/'+document._id,
                    data: document,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        getHypothesises: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/likelihood/_design/likelihood/_view/hypothesises_by_dataset',
                    params: { key: '"'+dataset+'"' },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
         setHypothesises: function (document) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/likelihood/'+document._id,
                    data: document,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        getConsiderations: function (dataset) {
            return $http(
                {
                    method: 'GET',
					url: '/likelihood/_design/likelihood/_view/considerations_by_dataset',
                    params: { key: '"'+dataset+'"' },                    
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
         setConsiderations: function (document) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/likelihood/'+document._id,
                    data: document,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        getDecisions: function (dataset) {
            return $http(
                {
                    method: 'GET',
                    url: '/likelihood/_design/likelihood/_view/decisions_by_dataset',
                    params: { key: '"'+dataset+'"' },   
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
         setDecisions: function (document) {
            return $http(
                {
                    method: 'PUT',                    
                    url: '/likelihood/'+document._id,
                    data: document,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        },
        getDecisionHypothesis: function(scope,capability){
            return _.find(scope.hypothesises,function(h){
                return h.id === capability.decision;
            });
        }
    }
  });

