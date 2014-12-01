if (device.desktop()) {
  window.Tapcentive = angular.module('Tapcentive', ['ui.router', 'btford.socket-io']);
} else {
  window.Tapcentive = angular.module("Tapcentive", ["ionic", "btford.socket-io", "tap.controllers"]).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  });
}

Tapcentive.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider.state('pages', {
    url: '/',
    controller: 'HomeCtrl',
    views: {
      menuContent: {
        templateUrl: 'home.html'
      }
    }
  }).state('docs', {
    url: '/docs',
    controller: 'DocsCtrl',
    templateUrl: 'docs/index.html'
  }).state('app', {
    url: '/',
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'menu.html'
  }).state('about', {
    url: '/about',
    controller: 'AboutCtrl',
    templateUrl: 'about.html'
  }).state('how', {
    url: '/how',
    controller: 'HowCtrl',
    templateUrl: 'how.html'
  }).state('platform-touchpoints', {
    url: '/beacon-ble-nfc-connected-touchpoint',
    controller: 'PlatformTouchpointCtrl',
    templateUrl: 'platform-touchpoints.html'
  }).state('platform-mobile', {
    url: '/beacon-ble-nfc-mobile-api-sdk',
    controller: 'PlatformMobileCtrl',
    templateUrl: 'platform-mobile.html'
  }).state('platform-manager', {
    url: '/tapcentive-beacon-nfc-cloud-manager',
    controller: 'PlatformManagerCtrl',
    templateUrl: 'platform-manager.html'
  }).state('blog', {
    url: '/blog',
    controller: 'BlogCtrl',
    templateUrl: 'blog.html'
  }).state('press', {
    url: '/press',
    controller: 'PressCtrl',
    templateUrl: 'press.html'
  }).state('contact', {
    url: '/contact',
    controller: 'ContactCtrl',
    templateUrl: 'contact.html'
  }).state('doc', {
    url: '/docs/:permalink',
    controller: 'DocCtrl',
    templateUrl: 'docs/show.html'
  }).state('step', {
    url: '/docs/:permalink/:step',
    controller: 'DocCtrl',
    templateUrl: 'docs/show.html'
  });
  $urlRouterProvider.otherwise("/");
  return $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        var type;
        if (config.url.match(/\.html$/)) {
          if (device.tablet()) {
            type = 'tablet';
          } else if (device.mobile()) {
            type = 'mobile';
          } else {
            type = 'desktop';
          }
          config.url = "/" + type + "/" + config.url;
        }
        return config;
      }
    };
  });
});

Tapcentive.run(function($state) {
  return $state.go('docs');
});

Tapcentive.factory('Socket', function(socketFactory) {
  return socketFactory();
});

Tapcentive.factory('Docs', function(Socket) {
  var service;
  service = {
    list: [],
    find: function(permalink) {
      return _.find(service.list, function(doc) {
        return doc.permalink === permalink;
      });
    }
  };
  Socket.on('docs', function(docs) {
    return service.list = docs;
  });
  return service;
});

Tapcentive.controller('HomeCtrl', function($scope) {});

Tapcentive.controller('AboutCtrl', function($scope) {});

Tapcentive.controller('HowCtrl', function($scope) {});

Tapcentive.controller('AppCtrl', function($scope) {});

Tapcentive.controller('PlatformManagerCtrl', function($scope) {});

Tapcentive.controller('PlatformTouchpointCtrl', function($scope) {});

Tapcentive.controller('PlatformMobileCtrl', function($scope) {});

Tapcentive.controller('PressCtrl', function($scope) {});

Tapcentive.controller('ContactCtrl', function($scope) {});

Tapcentive.controller('GetStartedCtrl', function($scope) {});

Tapcentive.controller('DevelopersCtrl', function($scope) {});

Tapcentive.controller('DeveloperCenterCtrl', function($scope) {});

Tapcentive.controller('DocsCtrl', function($scope, Docs) {
  return $scope.$watch((function() {
    return Docs.list;
  }), function() {
    return $scope.docs = Docs.list;
  });
});

Tapcentive.controller('DocCtrl', function($scope, $sce, $stateParams, $timeout, Docs) {
  $scope.index = $stateParams.step ? $stateParams.step - 1 : 0;
  $scope.$watch((function() {
    return Docs.list;
  }), function() {
    $scope.doc = Docs.find($stateParams.permalink);
    if ($scope.doc) {
      $scope.step = $scope.doc.steps[$scope.index];
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url);
      if ($scope.step.type === 'dialog') {
        $scope.messageIndex = 0;
        $scope.messages = [];
        return $timeout($scope.nextMessage, 1000);
      }
    }
  });
  return $scope.hasMoreSteps = function() {
    if ($scope.step) {
      return $scope.step.index < $scope.doc.steps.length;
    }
  };
});

angular.module("tap.controllers", []);

angular.module("tap.directives", []).directive("device", function() {
  var directiveDefinitionObject;
  directiveDefinitionObject = {
    restrict: "A",
    link: function() {
      device.init();
    }
  };
  return directiveDefinitionObject;
}).directive("snapscroll", function() {
  var directiveDefinitionObject;
  directiveDefinitionObject = {
    restrict: "A",
    link: function() {
      device.init();
    }
  };
  return directiveDefinitionObject;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtBQUNFLEVBQUEsTUFBTSxDQUFDLFVBQVAsR0FBb0IsT0FBTyxDQUFDLE1BQVIsQ0FBZSxZQUFmLEVBQTZCLENBQUMsV0FBRCxFQUFjLGtCQUFkLENBQTdCLENBQXBCLENBREY7Q0FBQSxNQUFBO0FBSUUsRUFBQSxNQUFNLENBQUMsVUFBUCxHQUFvQixPQUFPLENBQUMsTUFBUixDQUFlLFlBQWYsRUFBNkIsQ0FBRSxPQUFGLEVBQVcsa0JBQVgsRUFBK0IsaUJBQS9CLENBQTdCLENBQ2xCLENBQUMsR0FEaUIsQ0FDYixTQUFDLGNBQUQsR0FBQTtXQUNILGNBQWMsQ0FBQyxLQUFmLENBQXFCLFNBQUEsR0FBQTtBQUNuQixNQUFBLElBQTRCLE1BQU0sQ0FBQyxTQUFuQztlQUFBLFNBQVMsQ0FBQyxZQUFWLENBQUEsRUFBQTtPQURtQjtJQUFBLENBQXJCLEVBREc7RUFBQSxDQURhLENBQXBCLENBSkY7Q0FBQTs7QUFBQSxVQVNVLENBQUMsTUFBWCxDQUFrQixTQUFDLGNBQUQsRUFBaUIsa0JBQWpCLEVBQXFDLGlCQUFyQyxFQUF3RCxhQUF4RCxHQUFBO0FBQ2hCLEVBQUEsY0FDRSxDQUFDLEtBREgsQ0FDUyxPQURULEVBRUk7QUFBQSxJQUFBLEdBQUEsRUFBSyxHQUFMO0FBQUEsSUFDQSxVQUFBLEVBQVksVUFEWjtBQUFBLElBRUEsS0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFdBQUEsRUFBYSxXQUFiO09BREY7S0FIRjtHQUZKLENBUUUsQ0FBQyxLQVJILENBUVMsTUFSVCxFQVNJO0FBQUEsSUFBQSxHQUFBLEVBQUssT0FBTDtBQUFBLElBQ0EsVUFBQSxFQUFZLFVBRFo7QUFBQSxJQUVBLFdBQUEsRUFBYSxpQkFGYjtHQVRKLENBYUUs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QUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FEdkM7S0FEb0I7RUFBQSxFQWRTO0FBQUEsQ0FBakMsQ0E3SUEsQ0FBQTs7QUNFQSxPQUFPLENBQUMsTUFBUixDQUFlLGlCQUFmLEVBQWtDLEVBQWxDLENBQUEsQ0FBQTs7QUNGQSxPQUFPLENBQUMsTUFBUixDQUFlLGdCQUFmLEVBQWlDLEVBQWpDLENBQW9DLENBQUMsU0FBckMsQ0FBK0MsUUFBL0MsRUFBeUQsU0FBQSxHQUFBO0FBQ3ZELE1BQUEseUJBQUE7QUFBQSxFQUFBLHlCQUFBLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxHQUFWO0FBQUEsSUFDQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osTUFBQSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQUEsQ0FESTtJQUFBLENBRE47R0FERixDQUFBO1NBTUEsMEJBUHVEO0FBQUEsQ0FBekQsQ0FRQyxDQUFDLFNBUkYsQ0FRWSxZQVJaLEVBUTBCLFNBQUEsR0FBQTtBQUN4QixNQUFBLHlCQUFBO0FBQUEsRUFBQSx5QkFBQSxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsR0FBVjtBQUFBLElBQ0EsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFBLENBREk7SUFBQSxDQUROO0dBREYsQ0FBQTtTQU1BLDBCQVB3QjtBQUFBLENBUjFCLENBQUEsQ0FBQSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIGRldmljZS5kZXNrdG9wKClcbiAgd2luZG93LlRhcGNlbnRpdmUgPSBhbmd1bGFyLm1vZHVsZSgnVGFwY2VudGl2ZScsIFsndWkucm91dGVyJywgJ2J0Zm9yZC5zb2NrZXQtaW8nXSlcblxuZWxzZVxuICB3aW5kb3cuVGFwY2VudGl2ZSA9IGFuZ3VsYXIubW9kdWxlKFwiVGFwY2VudGl2ZVwiLCBbIFwiaW9uaWNcIiwgXCJidGZvcmQuc29ja2V0LWlvXCIsIFwidGFwLmNvbnRyb2xsZXJzXCJdKVxuICAgIC5ydW4gKCRpb25pY1BsYXRmb3JtKSAtPlxuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkgLT5cbiAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpIGlmIHdpbmRvdy5TdGF0dXNCYXJcblxuVGFwY2VudGl2ZS5jb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSAtPlxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSAncGFnZXMnLFxuICAgICAgdXJsOiAnLydcbiAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCdcblxuICAgIC5zdGF0ZSAnZG9jcycsXG4gICAgICB1cmw6ICcvZG9jcydcbiAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAnLFxuICAgICAgdXJsOiAnLydcbiAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS5odG1sJ1xuXG4gICAgLnN0YXRlICdhYm91dCcsXG4gICAgICB1cmw6ICcvYWJvdXQnXG4gICAgICBjb250cm9sbGVyOiAnQWJvdXRDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJ1xuXG4gICAgLnN0YXRlICdob3cnLFxuICAgICAgdXJsOiAnL2hvdydcbiAgICAgIGNvbnRyb2xsZXI6ICdIb3dDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdob3cuaHRtbCdcbiAgICBcbiAgICAuc3RhdGUgJ3BsYXRmb3JtLXRvdWNocG9pbnRzJyxcbiAgICAgIHVybDogJy9iZWFjb24tYmxlLW5mYy1jb25uZWN0ZWQtdG91Y2hwb2ludCdcbiAgICAgIGNvbnRyb2xsZXI6ICdQbGF0Zm9ybVRvdWNocG9pbnRDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdwbGF0Zm9ybS10b3VjaHBvaW50cy5odG1sJ1xuXG4gICAgLnN0YXRlICdwbGF0Zm9ybS1tb2JpbGUnLFxuICAgICAgdXJsOiAnL2JlYWNvbi1ibGUtbmZjLW1vYmlsZS1hcGktc2RrJ1xuICAgICAgY29udHJvbGxlcjogJ1BsYXRmb3JtTW9iaWxlQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAncGxhdGZvcm0tbW9iaWxlLmh0bWwnXG5cbiAgICAuc3RhdGUgJ3BsYXRmb3JtLW1hbmFnZXInLFxuICAgICAgdXJsOiAnL3RhcGNlbnRpdmUtYmVhY29uLW5mYy1jbG91ZC1tYW5hZ2VyJ1xuICAgICAgY29udHJvbGxlcjogJ1BsYXRmb3JtTWFuYWdlckN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ3BsYXRmb3JtLW1hbmFnZXIuaHRtbCdcblxuICAgIC5zdGF0ZSAnYmxvZycsXG4gICAgICB1cmw6ICcvYmxvZydcbiAgICAgIGNvbnRyb2xsZXI6ICdCbG9nQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnYmxvZy5odG1sJ1xuXG4gICAgLnN0YXRlICdwcmVzcycsXG4gICAgICB1cmw6ICcvcHJlc3MnXG4gICAgICBjb250cm9sbGVyOiAnUHJlc3NDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdwcmVzcy5odG1sJ1xuXG4gICAgLnN0YXRlICdjb250YWN0JyxcbiAgICAgIHVybDogJy9jb250YWN0J1xuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2RvYycsXG4gICAgICB1cmw6ICcvZG9jcy86cGVybWFsaW5rJ1xuICAgICAgY29udHJvbGxlcjogJ0RvY0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdzdGVwJyxcbiAgICAgIHVybDogJy9kb2NzLzpwZXJtYWxpbmsvOnN0ZXAnXG4gICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9zaG93Lmh0bWwnXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlIFwiL1wiXG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoIC0+XG4gICAgICAgcmVxdWVzdDogKGNvbmZpZykgLT5cbiAgICAgICAgIGlmIGNvbmZpZy51cmwubWF0Y2goL1xcLmh0bWwkLylcbiAgICAgICAgICAgaWYgZGV2aWNlLnRhYmxldCgpXG4gICAgICAgICAgICAgdHlwZSA9ICd0YWJsZXQnXG4gICAgICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgICAgdHlwZSA9ICdtb2JpbGUnXG4gICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICB0eXBlID0gJ2Rlc2t0b3AnXG5cbiAgICAgICAgICAgY29uZmlnLnVybCA9IFwiLyN7dHlwZX0vI3tjb25maWcudXJsfVwiXG5cbiAgICAgICAgIGNvbmZpZ1xuXG5UYXBjZW50aXZlLnJ1biAoJHN0YXRlKSAtPlxuICAkc3RhdGUuZ28oJ2RvY3MnKVxuXG5UYXBjZW50aXZlLmZhY3RvcnkgJ1NvY2tldCcsIChzb2NrZXRGYWN0b3J5KSAtPlxuICBzb2NrZXRGYWN0b3J5KClcblxuVGFwY2VudGl2ZS5mYWN0b3J5ICdEb2NzJywgKFNvY2tldCkgLT5cbiAgc2VydmljZSA9XG4gICAgbGlzdDogW11cbiAgICBmaW5kOiAocGVybWFsaW5rKSAtPlxuICAgICAgXy5maW5kIHNlcnZpY2UubGlzdCwgKGRvYykgLT5cbiAgICAgICAgZG9jLnBlcm1hbGluayA9PSBwZXJtYWxpbmtcblxuICBTb2NrZXQub24gJ2RvY3MnLCAoZG9jcykgLT5cbiAgICBzZXJ2aWNlLmxpc3QgPSBkb2NzXG5cbiAgc2VydmljZVxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0hvbWVDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdBYm91dEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0hvd0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0FwcEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1BsYXRmb3JtTWFuYWdlckN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1BsYXRmb3JtVG91Y2hwb2ludEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1BsYXRmb3JtTW9iaWxlQ3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnUHJlc3NDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdDb250YWN0Q3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnR2V0U3RhcnRlZEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0RldmVsb3BlcnNDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdEZXZlbG9wZXJDZW50ZXJDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdEb2NDdHJsJywgKCRzY29wZSwgJHNjZSwgJHN0YXRlUGFyYW1zLCAkdGltZW91dCwgRG9jcykgLT5cbiAgJHNjb3BlLmluZGV4ID0gaWYgJHN0YXRlUGFyYW1zLnN0ZXAgdGhlbiAkc3RhdGVQYXJhbXMuc3RlcC0xIGVsc2UgMFxuXG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvYyA9IERvY3MuZmluZCgkc3RhdGVQYXJhbXMucGVybWFsaW5rKVxuICAgIGlmICRzY29wZS5kb2NcbiAgICAgICRzY29wZS5zdGVwID0gJHNjb3BlLmRvYy5zdGVwc1skc2NvcGUuaW5kZXhdXG4gICAgICAkc2NvcGUuc3RlcC51cmwgPSAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCgkc2NvcGUuc3RlcC51cmwpXG5cbiAgICAgIGlmICRzY29wZS5zdGVwLnR5cGUgPT0gJ2RpYWxvZydcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VJbmRleCA9IDBcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW11cbiAgICAgICAgJHRpbWVvdXQoJHNjb3BlLm5leHRNZXNzYWdlLCAxMDAwKVxuXG4gICRzY29wZS5oYXNNb3JlU3RlcHMgPSAtPlxuICAgIGlmICRzY29wZS5zdGVwXG4gICAgICAkc2NvcGUuc3RlcC5pbmRleCA8ICRzY29wZS5kb2Muc3RlcHMubGVuZ3RoXG5cblxuXG5cbiIsIlxuIyBub3Qgc3VyZSBpZiB0aGVzZSBhcmUgYWN0dWFsbHkgaW5qZWN0aW5nIGludG8gdGhlIGFwcCBtb2R1bGUgcHJvcGVybHlcbmFuZ3VsYXIubW9kdWxlKFwidGFwLmNvbnRyb2xsZXJzXCIsIFtdKVxuXG4jIG1vdmUgY29udHJvbGxlcnMgaGVyZVxuXG5cblxuXG4iLCJhbmd1bGFyLm1vZHVsZShcInRhcC5kaXJlY3RpdmVzXCIsIFtdKS5kaXJlY3RpdmUoXCJkZXZpY2VcIiwgLT5cbiAgZGlyZWN0aXZlRGVmaW5pdGlvbk9iamVjdCA9XG4gICAgcmVzdHJpY3Q6IFwiQVwiXG4gICAgbGluazogLT5cbiAgICAgIGRldmljZS5pbml0KClcbiAgICAgIHJldHVyblxuXG4gIGRpcmVjdGl2ZURlZmluaXRpb25PYmplY3RcbikuZGlyZWN0aXZlIFwic25hcHNjcm9sbFwiLCAtPlxuICBkaXJlY3RpdmVEZWZpbml0aW9uT2JqZWN0ID1cbiAgICByZXN0cmljdDogXCJBXCJcbiAgICBsaW5rOiAtPlxuICAgICAgZGV2aWNlLmluaXQoKVxuICAgICAgcmV0dXJuXG5cbiAgZGlyZWN0aXZlRGVmaW5pdGlvbk9iamVjdFxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9