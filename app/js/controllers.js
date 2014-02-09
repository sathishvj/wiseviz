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
  .controller('GridVizCtrl', ['$scope', function($scope) {
		$scope.gridOptions = {
			data: 'gridData',
		    columnDefs: 'gridCols'
		};

	  $scope.inputDataList = [
		  {title: "Age-Population (Pie, Donut)", file:"files/age-population.csv", cols: ["nominal", "number" ]},
		  {title: "Apple Stock Price (Line, Area)", file:"files/apple-stock-price.tsv", cols: ["ordinal", "number" ]},
		  {title: "Browser Market Share (Stacked Area)", file:"files/browser-market-share.tsv", cols: ["nominal", "number", "number", "number", "number", "number" ]},
		  {title: "Daily Average Temperatures (Multiseries Line)", file:"files/daily-avg-temperatures.tsv", cols: ["ordinal", "number", "number", "number"]},
		  {title: "Daily High-Low Temperatures", file:"files/daily-high-low-temp.tsv", cols: ["ordinal", "number", "number"]},
		  {title: "Letter Frequency (Bar)", file:"files/letter-frequency.tsv", cols: ["nominal", "number" ]},
		  {title: "Population by State by Age Group (Normalized/Stacked Bar)", file:"files/populations-by-state.csv", cols: ["nominal", "number", "number", "number", "number", "number", "number", "number"]}
		  //{title: "Temp Diff NY-SFO", file:"files/temp-diff-ny-sfo.tsv", cols: ["ordinal", "number", "number" ]}
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
			  $scope.updateGrid(newValue);
		  	  $scope.updateVizList(newValue);
		  });

	  $scope.updateGrid = function(val) {
		  var filename = val.file;
		  var d3fn = d3.csv;
		  if (filename.substr(-3) === "tsv") {
			  console.log("It is a tsv file: ", filename);
			  d3fn = d3.tsv;
		  }

		  d3fn(filename, function(inpData) {
			  $scope.$apply(function(){

				  var k=[],p;
				  for (p in inpData[0]) if (Object.prototype.hasOwnProperty.call(inpData[0],p)) k.push(p);
				  //console.log("Keys: ", k);
				  var cols = [];
				  for (var i=0; i<k.length; i++ ){
					  cols.push({field: k[i], displayName: k[i]});
				  }
				  $scope.gridCols = cols;

				  $scope.gridData = inpData;
				  //console.log("Input data is: ", $scope.gridData);
			  });
		  });

	  };

	  $scope.vizList = [
	  	{name: "area", img: "img/area-chart.png", active: false, cols: ["ordinal", "number"]},
	  	{name: "bar", img: "img/bar-chart.png", active: false, cols: ["nominal", "number"]},
	  	{name: "bivariate-area", img: "img/bivariate-area-chart.png", active: false, cols: ["ordinal", "number", "number"]},
	  	{name: "donut", img: "img/donut-chart.png", active: false, cols: ["nominal", "number"]},
	  	{name: "line", img: "img/line-chart.png", active: false, cols: ["ordinal", "number"]},
	  	{name: "multiseries-line", img: "img/multiseries-line-chart.png", active: false, cols: ["ordinal", "number", "number", "number"]},
	  	{name: "normalized-stacked-bar", img: "img/normalized-stacked-bar-chart.png", active: false, cols: ["nominal", "number", "number", "number", "number", "number", "number", "number"]},
	  	{name: "pie", img: "img/pie-chart.png", active: false, cols: ["nominal", "number"]},
	  	{name: "stacked-area", img: "img/stacked-area-chart.png", active: false, cols: ["nominal", "number", "number", "number", "number", "number"]},
	  	{name: "stacked-bar", img: "img/stacked-bar-chart.png", active: false, cols: ["nominal", "number", "number", "number", "number", "number", "number", "number"]}
	  ];

	  $scope.updateVizList = function(val) {
		var dataCols = val.cols;
		console.log("Input data cols list: ", dataCols);

		for (var i=0; i<$scope.vizList.length; i++) {
			var viz = $scope.vizList[i];
			//first compare length
			if (viz.cols.length != dataCols.length) {
				viz.active = false;
				continue;
			}

			var equal = true;
			for (var j=0; j<dataCols.length; j++) {
				//console.log("Comparing: ", dataCols[j], viz.cols[j]);
				if (dataCols[j] != viz.cols[j]) {
					equal = false;
					break;
				}
			}

			viz.active = equal?true:false;;
		}
	  }

	  $scope.showBigChart = false;
	  $scope.drawChart = function(name) {
		  console.log("To draw chart: " + name);
		  console.log("Chosen input data: ", $scope.chosenInputData);
		  $scope.showBigChart = true;
		  switch(name) {
			  case "pie":
				  drawPieChart($scope.chosenInputData.file);
				  break;
			  case "donut":
				  drawDonutChart($scope.chosenInputData.file);
				  break;
			  case "line":
				  drawLineChart($scope.chosenInputData.file);
				  break;
			  case "stacked-area":
				  drawStackedAreaChart($scope.chosenInputData.file);
				  break;
			  case "area":
				  drawAreaChart($scope.chosenInputData.file);
				  break;
			  case "multiseries-line":
				  drawMultiseriesLineChart($scope.chosenInputData.file);
				  break;
			  case "bar":
				  drawBarChart($scope.chosenInputData.file);
				  break;
			  case "bivariate-area":
				  drawBivariateAreaChart($scope.chosenInputData.file);
				  break;
			  case "stacked-bar":
				  drawStackedBarChart($scope.chosenInputData.file);
				  break;
			  case "normalized-stacked-bar":
				  drawNormalizedStackedBarChart($scope.chosenInputData.file);
				  break;
		  }
	  }
  }])
  .controller('VizCtrl', ["$scope", function($scope) {
	  /*
	  $scope.vizList = [
	  	{img: "img/area-chart.png", active: false},
	  	{img: "img/bar-chart.png", active: false},
	  	{img: "img/bivariate-area-chart.png", active: false},
	  	{img: "img/donut-chart.png", active: false},
	  	{img: "img/line-chart.png", active: false},
	  	{img: "img/multiseries-line-chart.png", active: false},
	  	{img: "img/normalized-stacked-bar-chart.png", active: false},
	  	{img: "img/pie-chart.png", active: false},
	  	{img: "img/stacked-area-chart.png", active: false},
	  	{img: "img/stacked-bar-chart.png", active: false}
	  ];
	  */
  }])
  .controller('AboutCtrl', ["$scope", function($scope) {
		$scope.current = "";
  }]);
