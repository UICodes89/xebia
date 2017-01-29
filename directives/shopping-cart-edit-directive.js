(function(app){
  app.directive('editBlock', function(){
      return{
        restrict:"E",
        templateUrl:'./templates/edit-item.template.html',
        replace:true,
        controller:function($scope){
          $scope.product;
          $scope.close=function(){
              angular.element(document.querySelector('#myModal')).removeClass("show");
              angular.element(document.querySelector('.modal-backdrop')).removeClass('in').addClass('out');
          }
          $scope.open=function(){
              angular.element(document.querySelector('#myModal')).addClass('show');
              angular.element(document.querySelector('.modal-backdrop')).removeClass('out').addClass('in');
          }

          $scope.editcartItem =function(item){
            $scope.product = item;
            $scope.$emit('oneditcart', $scope.product);
            $scope.close();
          }

          $scope.changecolor = function(product, color, hexcode){
            product.p_selected_color.name=color;
            product.p_selected_color.hexcode=hexcode;
          }
          
          $scope.items=[
            {name: 'QTY 1', value: 1},
            {name: 'QTY 2', value: 2},
            {name: 'QTY 3', value: 3},
            {name: 'QTY 4', value: 4},
            {name: 'QTY 5', value: 5},
          ];
        },
        link:function(scope, element, attributes, shopCart){

                scope.$on('editItem', function(e, product){
                     scope.product = angular.copy(product);
                     scope.open();
                     angular.element(document.querySelector('.close')).on("click", function(){
                     scope.close();
                });
                
              });

        }


      }
    });
})(App)