(function(app){

	app.factory('allServices', allServices);
	app.service('productList', productList);

	function productList(){
		var product, cart =[] ;

		function checkLocalStorage(){
			cart = JSON.parse(localStorage.getItem('cart'));
			product = JSON.parse(localStorage.getItem('product'));
		}
		checkLocalStorage();

		this.set = function(data){
			product= data;
			localStorage.setItem('product', JSON.stringify(product));
		}

		this.get = function(id){
			if(!product){
				product = JSON.parse(localStorage.getItem('product'));
			}
		   return product.productsInCart.filter(function(item){
             	 return item.p_id == id
              
		   });
		}

		this.addtoCart = function(product){
			var flag = true;
			cart.forEach(function(item){
				if(item.p_id == product.p_id ){
					flag = false;
				}				  
			});

			if(flag){
				cart.push(product);
				localStorage.setItem('cart', JSON.stringify(cart));
			}                    
		}

		this.getCart = function(){
			return cart;
		}

		this.productCount = function(){
          return cart.length;
		}

		this.totalPrice = function(){
			var total = 0;
			if(!cart.length){
              return 0;
			}
            cart.forEach(function(item){
               total += item.p_price * item.p_quantity;
            });

           return total;
		}

		this.removCartItem = function(product){
			var i=0;
           cart.forEach(function(item){
				if(item.p_id == product.p_id ){
				  cart.splice(i,1);	
				}
				i++;			  
			});
           localStorage.setItem('cart', JSON.stringify(cart));
		}

		this.updatecart = function(item){
			var i=0;
          cart.forEach(function(cartItem){
				if(cartItem.p_id == item.p_id ){
					cart[i].p_selected_size.name = item.p_selected_size.name;
                	cart[i].p_selected_size.code = item.p_selected_size.code;
                	cart[i].p_quantity = item.p_quantity;
                    cart[i].p_selected_color.name = item.p_selected_color.name;
                    cart[i].p_selected_color.hexcode = item.p_selected_color.hexcode;
                }
				i++;			  
			});
          localStorage.setItem('cart', JSON.stringify(cart));
          checkLocalStorage();
          return cart;
		}
	}
	

	function allServices($http, $q){

		function getproductList(){
			console.log("allservices")
			var defer = $q.defer();
			$http.get('../productlist.json').then(function(response){
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