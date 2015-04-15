angular.module("umbraco")
.controller("Keyphrase.KeyphraseDeleteController",
	function ($scope, keyphraseResource, navigationService, treeService) {
	    $scope.delete = function (id) {
	        keyphraseResource.deleteById(id).then(function () {
	            treeService.removeNode($scope.currentNode);
	            navigationService.hideNavigation();

	        });

	    };
	    $scope.cancelDelete = function () {
	        navigationService.hideNavigation();
	    };
	});