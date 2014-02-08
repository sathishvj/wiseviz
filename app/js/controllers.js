'use strict';

/* Controllers */

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
  .controller('MainCtrl', ["$scope", function($scope) {
  	$scope.showOverlay = false;
  	$scope.showChart = function(chartType){
  		$scope.showOverlay = true;
  		d3.select(".chart").select('svg').remove();
  		console.log("showChart", chartType);
  		switch(chartType){
  			case 'linechart':
  				lineChart();
  				break;
  		}
  	}
  	$scope.hideChart = function(){
  		$scope.showOverlay = false;
  	}

  }])
  .controller('GridCtrl', [function() {

  }])
  .controller('AboutCtrl', ["$scope", function($scope) {
		$scope.current = "";
  }]);
