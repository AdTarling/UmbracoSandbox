angular.module("umbraco.resources")
   .factory("keyphraseResource", function ($http) {
   	return {
   		getById: function (id) {
   			return $http.get("BackOffice/Api/KeyphraseApi/GetById?id=" + id);
   		},
   		save: function (keyphrase) {
   			return $http.post("BackOffice/Api/KeyphraseApi/PostSave", angular.toJson(keyphrase));
   		},
   		deleteById: function (id) {
   			return $http.delete("BackOffice/Api/KeyphraseApi/DeleteById?id=" + id);
   		}
   	};
   });