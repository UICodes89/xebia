(function(app){

   app.directive('productList', productList);

   function productListController(allServices, $scope, productList){
   		var vm = this;
   		vm.products;
      $scope.productCount = productList.productCount()|| 0;
      $scope.totalAmount = productList.totalPrice()|| 0;
   		allServices.get().then(
     		function(data){
          vm.products = data;
          $scope.$emit('productList', JSON.stringify(vm.products));
     		},function reject(err){
             console.log(err);
     		});

      vm.addToCart = function(product){
          productList.addtoCart(product);
          $scope.productCount = productList.productCount();
          $scope.totalAmount = productList.totalPrice()
        } 
		
   	}

   function productList(allServices){

     return{
     	restrict:'E',
     	scope:true,
     	controller:productListController,
     	controllerAs: 'vm',
     	link:function(scope, el, attr){
          
     	},     	
     	templateUrl:'../templates/product-list.template.html',
     }
   }

})(App)