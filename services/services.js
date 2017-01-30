(function(app){

	app.factory('allServices', allServices);
	app.service('productList', productList);

	function productList(){
		var product;
		var vm = this;
		vm.cart = vm.cart || [];

		vm.checkLocalStorage = function(){
			vm.cart = JSON.parse(localStorage.getItem('cart'));
			product = JSON.parse(localStorage.getItem('product'));
		}

		vm.checkLocalStorage();

		vm.set = function(data){
			product= data;
			localStorage.setItem('product', JSON.stringify(product));
		}

		vm.get = function(id){
			if(!product){
				product = JSON.parse(localStorage.getItem('product'));
			}
		   return product.productsInCart.filter(function(item){
             	 return item.p_id == id
              
		   });
		}

		vm.addtoCart = function(product){
			var flag = true;
			vm.cart = vm.cart || [];
			vm.cart.forEach(function(item){
				if(item.p_id == product.p_id ){
					flag = false;
				}				  
			});

			if(flag){
				vm.cart.push(product);
				localStorage.setItem('cart', JSON.stringify(vm.cart));
			}                    
		}

		vm.getCart = function(){
			return vm.cart;
		}

		vm.productCount = function(){
			var length = 0 ;
			if(Array.isArray(vm.cart)){
              length = vm.cart.length
			}			
          	return length;
		}

		vm.totalPrice = function(){
			var total = 0;
			if(Array.isArray(vm.cart)){
				if(!vm.cart.length){
	              return 0;
				}
	            vm.cart.forEach(function(item){
	               total += item.p_price * item.p_quantity;
	            });
			}

           return total;
		}

		vm.removCartItem = function(product){
			var i=0;
           vm.cart.forEach(function(item){
				if(item.p_id == product.p_id ){
				  vm.cart.splice(i,1);	
				}
				i++;			  
			});
           localStorage.setItem('cart', JSON.stringify(vm.cart));
		}

		vm.updatecart = function(item){
			vm.cart = vm.cart || [];
          vm.cart.forEach(function(cartItem){
				if(cartItem.p_id == item.p_id ){
					cartItem.p_selected_size.name = item.p_selected_size.name;
                	cartItem.p_selected_size.code = item.p_selected_size.code;
                	cartItem.p_quantity = item.p_quantity;
                    cartItem.p_selected_color.name = item.p_selected_color.name;
                    cartItem.p_selected_color.hexcode = item.p_selected_color.hexcode;
                }
							  
			});
          localStorage.setItem('cart', JSON.stringify(vm.cart));
          vm.checkLocalStorage();
          return vm.cart;
		}

		
	}
	

	function allServices($http, $q){

		function getproductList(){
			console.log("allservices")
			var defer = $q.defer();
			$http.get('http://uicomponent.com/xebia/productlist.json').then(function(response){
               defer.resolve(response.data); 
			}).catch(function(err){
                defer.reject("something went wrong !!");
			})

			return defer.promise;
		}
	     
	     return{
	       get:getproductList
	     };

	}

})(App)