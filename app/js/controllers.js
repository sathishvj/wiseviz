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
  .controller('GridCtrl', ['$scope', function($scope) {
		$scope.gridOptions = {
			data: 'gridData',
		    columnDefs: 'gridCols'
		};

	  $scope.inputDataList = [
		  {title: "Age-Population", file:"files/age-population.csv", cols: ["nominal", "number" ]},
		  {title: "Apple Stock Price", file:"files/apple-stock-price.tsv", cols: ["ordinal/date/dd-MMM-yy", "number" ]},
		  {title: "Temp Diff NY-SFO", file:"files/temp-diff-ny-sfo.tsv", cols: ["ordinal/date/yyyymmdd", "number", "number" ]}
		  ];

	  $scope.chosenInputData = "";
	  $scope.$watch(
		  "chosenInputData",
		  function( newValue, oldValue ) {
			  // Ignore initial setup.
			  if ( newValue === oldValue ) {
				  return;
			  }
			  console.log( "$watch: chosenFile changed.: ", newValue );
			  $scope.updateGrid(newValue.file);
		  });

	  $scope.updateGrid = function(filename) {
		  var d3fn = d3.csv;
		  if (filename.substr(-3) === "tsv") {
			  console.log("It is a tsv file: ", filename);
			  d3fn = d3.tsv;
		  }

		  //console.log("Function is: ", d3fn);

		  d3fn(filename, function(inpData) {
			  $scope.$apply(function(){
				  //$scope.gridCols = ["a", "b", "c"];
				  //$scope.gridCols = (new Date().getTime()%2==0)?[{field: 'new_name', displayName: 'New Name'}, {field:'new_age', displayName:'New Age'},{field:'pin', displayName:'Pin'}]:[{field: 'new_name', displayName: 'Name'}, {field:'new_age', displayName:'Age'},{field:'pin', displayName:'My Pin'}];

				  var k=[],p;
				  for (p in inpData[0]) if (Object.prototype.hasOwnProperty.call(inpData[0],p)) k.push(p);
				  console.log("Keys: ", k);
				  var cols = [];
				  for (var i=0; i<k.length; i++ ){
					  cols.push({field: k[i], displayName: k[i]});
				  }
				  $scope.gridCols = cols;

				  $scope.gridData = inpData;
				  console.log("Input data is: ", $scope.gridData);
			  });
		  });
	  };

  }])
  .controller('AboutCtrl', ["$scope", function($scope) {
		$scope.current = "";
  }]);
