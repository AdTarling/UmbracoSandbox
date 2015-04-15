angular.module("umbraco.directives")
   .directive('umbLinkPicker', function (dialogService, entityResource) {
       return {
           restrict: 'E',
           replace: true,
           templateUrl: '/App_Plugins/Utilities/umb-link-picker.html',
           require: "ngModel",
           link: function (scope, element, attr, ctrl) {

               ctrl.$render = function () {
                   var val = parseInt(ctrl.$viewValue);

                   if (!isNaN(val) && angular.isNumber(val) && val > 0) {

                       entityResource.getById(val, "Content").then(function (item) {
                           scope.node = item;
                       });
                   }
               };

               scope.openLinkPicker = function () {
                   dialogService.linkPicker({ callback: populateLink });
               }

               scope.removeLink = function () {
                   scope.node = undefined;
                   updateModel(0);
               }

               function populateLink(item) {
                   scope.node = item;
                   updateModel(item.url);

               }

               function updateModel(id) {
                   ctrl.$setViewValue(id);

               }
           }
       };
   });