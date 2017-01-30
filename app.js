var App = App || {};

    if(angular != "undefined"){
    	App = angular.module('xebia', ['ui.router']);
    }

    

(function(app){
    app.controller('mainController', ['$scope', 'productList', function($scope, productList){
    	var vm = this;
    	vm.storeName = "Angular store";
    	vm.products;
    	vm.cart = [];
    	$scope.$on('productList', function(e, val){ 
    	    vm.products = JSON.parse(val);
    	    productList.set(vm.products);
    	    console.log(productList.get());
    	});

    }])

    app.config(function($stateProvider, $urlRouterProvider)
	{
		$stateProvider
			.state('list', {
				name: 'list',
				url: '/list',
				template: '<product-list></product-list>'
			})
			.state('details', {
                url: '/details/:id',
                template: '<product:detail></product:detail>'
            })
            .state('cart', {
				name: 'cart',
				url: '/cart',
				template: '<shop-cart></shop-cart>'
			})
			$urlRouterProvider.otherwise('/list');
	})
})(App);