angular.module("umbraco").controller("Keyphrase.KeyphraseEditController",
	function ($scope, $routeParams, keyphraseResource, notificationsService, navigationService) {

	    $scope.loaded = false;

	    if ($routeParams.id == -1) {
	        $scope.keyphrase = {};
	        $scope.loaded = true;
	    }
	    else {
	        //get a keyphrase id -> service
	        keyphraseResource.getById($routeParams.id).then(function (response) {
	            $scope.keyphrase = response.data;
	            $scope.loaded = true;
	        });
	    }

	    $scope.save = function (keyphrase) {
	        keyphraseResource.save(keyphrase).then(function (response) {
	            $scope.keyphrase = response.data;
	            $scope.keyphraseForm.$dirty = false;
	            navigationService.syncTree({ tree: 'KeyphraseTree', path: [-1, -1], forceReload: true });
	            notificationsService.success("Success", keyphrase.Name + " has been saved");
	        });
	    };

	});