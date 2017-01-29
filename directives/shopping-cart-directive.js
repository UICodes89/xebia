(function(app){

	app.directive("shopCart", shopCart)
		
		function shopCart(){

      function shopcartController(productList, $scope){
         var vm = this;
         vm.products = productList.getCart();
         vm.grandTotal = productList.totalPrice();

         vm.editItem = function(product){
             $scope.$broadcast("editItem", product);
             console.log("edit clicked!", product);
         }
         vm.saveItem = function(product){
             console.log("edit clicked!", product);
         }

         $scope.$on('oneditcart', function(e, item){
            vm.products = productList.updatecart(item);
            vm.grandTotal = productList.totalPrice();
          });

         vm.removeProduct = function(product){
          productList.removCartItem(product);
          vm.products = productList.getCart();
          vm.grandTotal = productList.totalPrice();
          //after remove update total price and item list
         }
      }

      return{
        restrict:'E',
        templateUrl:'./templates/shopping-cart.template.html',
        replace:true,
        controller:shopcartController,
        controllerAs: "vm",
        link:function(){

        }
      } 
    } 
			

}(App));