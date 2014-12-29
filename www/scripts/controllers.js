'use strict';
angular.module('IonicTut.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MainCtrl', function($scope, $state, $http, $q, $ionicLoading) {
  console.log('MainCtrl');
  
  $scope.init = function() {

    $scope.show();

    $scope.getImages()
    .then(function(res) {
      // success
      // console.log('Images: ', res);
      $scope.imageList = res.shots;
      $ionicLoading.hide();
    }, function(status) {
      // err
      $scope.pageError = status;
      $ionicLoading.hide();
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.doRefresh = function() {
    $scope.init();
  }

  $scope.getImages = function() {
    var defer = $q.defer();

    $http.jsonp('http://api.dribbble.com/shots/popular?callback=JSON_CALLBACK')
    .success(function(res) {
      defer.resolve(res);
    })
    .error(function(status, code) {
      defer.reject(status);
    })
    // 아래 코드를 통해서도 동일한 동작을 함.
    // .finally(function() {
    //   $scope.$broadcast('scroll.refreshComplete');
    // });

    return defer.promise;
  }

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading..'
    });
  };

  $scope.init();

});
