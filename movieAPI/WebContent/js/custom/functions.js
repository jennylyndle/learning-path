	var app = angular.module('movieSearch',[]);
	
	app.factory('urlFactory', function(){
		var serv = {};
		serv.formQueryString = function(val){
			var formattedVals = [];

		    for(var prop in val.data){
		        formattedVals.push(prop + "=" + val.data[prop]);
		    }
		    return val.url + '/?' + formattedVals.join("&");
		}
		return serv;
	});

	app.provider('searchService',function(){
		 var values = {};
		 this.set = function(val){
			 values = val;
		 }
		 this.$get = ['$http','urlFactory',function($http,urlFactory){
			 var serv = {};
			 serv.getResults = function(searchVal, page, cb){
				 values.data.page = page;
				 values.data.s=searchVal;
				$http({
					url:urlFactory.formQueryString(values),
					method:'POST',
			}).then(function(resp){
					cb(resp.data);
				},function(resp){});
		};
		serv.getDetails = function(id,cb){
			values.data.i = id;
			values.data.plot = 'full';
			values.data.s = '';
			$http({
				url:urlFactory.formQueryString(values),
				method:'POST',
		}).then(function(resp){
				cb(resp.data);
			},function(resp){});
		}
		return serv;
		}];
	 });

	app.controller('searchController',function($scope,  searchService ){
		$scope.searchVal = '';
		$scope.results = [];
		$scope.details = {};
		$scope.phase = '';
		$scope.separator = '     |     ';
		$scope.pageInitiated = false;
		$scope.more = false;
		$scope.pageUpdate = function(resp){
			$('.paginate').bootpag({
            total: Math.ceil(resp.totalResults/10),
            page : 1
        })};
		$scope.paginate = function(resp){
	 		$('.paginate').bootpag({
	            total: Math.ceil(resp.totalResults/10),
	            maxVisible: 5,
	            page:1,
	            firstLastUse:true
	        }).on("page", function(event,num){
	        	searchService.getResults($scope.searchVal,num, function(resp){
					$scope.results = resp.Search;
	        	});
	        	});
	 		$scope.pageInitiated = true;
		};
		$scope.sendReq = function(event){
			if(event.keyCode == 13){
			if($scope.searchVal &&$scope.searchVal.trim()!='')
				{
				if($scope.searchVal.length>=2)
					{
					searchService.getResults($scope.searchVal,1,function(resp){
						if(resp.Search&&resp.Search!=null){
						$scope.results = resp.Search;
						$scope.phase = 'search';
						if($scope.pageInitiated)
							$scope.pageUpdate(resp);
						else
							$scope.paginate(resp);
						}
						else
							$scope.results = 'none';
					});
					}
				}
		}
		};
		$scope.displayDetails = function(val){
			console.log('clicked'+val);
			searchService.getDetails(val, function(resp){
				$scope.phase = 'details';
				$scope.details = resp;
			});
		};
		
		$scope.showSearch = function(){
			$scope.phase = 'search';
		}

	});

	app.directive('search', function(){
		return {
			templateUrl : 'searchTemplate.html'
		};
	});
	
	app.directive('detailinfo', function(){
		return {
			templateUrl : 'infoTemplate.html'
		};
	}
			);
	
	app.config(['$httpProvider','searchServiceProvider',function ($httpProvider, searchServiceProvider) {
		searchServiceProvider.set({url:'http://www.omdbapi.com',data:{
			r:'json',
			v:1,
			y:'',
			type:'',
			callback:'',
		}});
	}]);