'use strict';

/** Controllers **/

angular.module('myApp.controllers', [])
    .controller('NavCtrl', ["$scope", "$http", "$location", '$route', function ($scope, $http, $location, optionsService, $route ) {
		switch($location.path()) {
			case "":
			case "/home":
				$scope.activeLink = "Home";
				break;
			case "/about":
				$scope.activeLink = "About";
				break;
			case "/admin":
				$scope.activeLink = "Admin";
				break;
			case "/options":
				$scope.activeLink = "Options";
				break;
			case "/feedback":
				$scope.activeLink = "Feedback";
				break;
		}

        $scope.setActive = function (selLink) {
			//this call doesn't seem to stop the page from reloading when clicking an already selected link
			if ($scope.activeLink === selLink) {
				return;
			}
            $scope.activeLink = selLink;
        };

  }])
  .controller('MainCtrl', [function() {

  }])
  .controller('GridCtrl', [function() {

  }])
  .controller('AboutCtrl', [function() {

  }]);
