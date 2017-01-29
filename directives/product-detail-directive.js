(function(app){

   app.directive('productDetail', productDetail);
    
    function productDetail(){

    	function productDetailLink(scope, element, attribute){

    		
    	}

    	function detailsController($stateParams, productList){
    		var vm = this;
    		vm.id = $stateParams.id;
    		vm.product = productList.get(vm.id);
    		console.log("hello", vm.product);
    	}

    	return{
    		restrict:'E',
    		scope:false,
    		templateUrl:"./templates/product-detail.template.html",
    		controller:detailsController,
    		controllerAs:'vm',
    		link:productDetailLink
    	}
    }

})(App)