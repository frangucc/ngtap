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
    templateUrl: 'home.html'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtBQUNFLEVBQUEsTUFBTSxDQUFDLFVBQVAsR0FBb0IsT0FBTyxDQUFDLE1BQVIsQ0FBZSxZQUFmLEVBQTZCLENBQUMsV0FBRCxFQUFjLGtCQUFkLENBQTdCLENBQXBCLENBREY7Q0FBQSxNQUFBO0FBSUUsRUFBQSxNQUFNLENBQUMsVUFBUCxHQUFvQixPQUFPLENBQUMsTUFBUixDQUFlLFlBQWYsRUFBNkIsQ0FBRSxPQUFGLEVBQVcsa0JBQVgsRUFBK0IsaUJBQS9CLENBQTdCLENBQ2xCLENBQUMsR0FEaUIsQ0FDYixTQUFDLGNBQUQsR0FBQTtXQUNILGNBQWMsQ0FBQyxLQUFmLENBQXFCLFNBQUEsR0FBQTtBQUNuQixNQUFBLElBQTRCLE1BQU0sQ0FBQyxTQUFuQztlQUFBLFNBQVMsQ0FBQyxZQUFWLENBQUEsRUFBQTtPQURtQjtJQUFBLENBQXJCLEVBREc7RUFBQSxDQURhLENBQXBCLENBSkY7Q0FBQTs7QUFBQSxVQVNVLENBQUMsTUFBWCxDQUFrQixTQUFDLGNBQUQsRUFBaUIsa0JBQWpCLEVBQXFDLGlCQUFyQyxFQUF3RCxhQUF4RCxHQUFBO0FBQ2hCLEVBQUEsY0FDRSxDQUFDLEtBREgsQ0FDUyxPQURULEVBRUk7QUFBQSxJQUFBLEdBQUEsRUFBSyxHQUFMO0FBQUEsSUFDQSxVQUFBLEVBQVksVUFEWjtBQUFBLElBRUEsV0FBQSxFQUFhLFdBRmI7R0FGSixDQU1FLENBQUMsS0FOSCxDQU1TLE1BTlQsRUFPSTtBQUFBLElBQUEsR0FBQSxFQUFLLE9BQUw7QUFBQSxJQUNBLFVBQUEsRUFBWSxVQURaO0FBQUEsSUFFQSxXQUFBLEVBQWEsaUJBRmI7R0FQSixDQVdFLENBQUMsS0FYSCxDQVdTLEtBWFQsRUFZSTtBQUFBLElBQUEsR0FBQSxFQUFLLEdBQUw7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LENBQWpDLENBM0lBLENBQUE7O0FDRUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxpQkFBZixFQUFrQyxFQUFsQyxDQUFBLENBQUE7O0FDRkEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxnQkFBZixFQUFpQyxFQUFqQyxDQUFvQyxDQUFDLFNBQXJDLENBQStDLFFBQS9DLEVBQXlELFNBQUEsR0FBQTtBQUN2RCxNQUFBLHlCQUFBO0FBQUEsRUFBQSx5QkFBQSxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsR0FBVjtBQUFBLElBQ0EsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsTUFBTSxDQUFDLElBQVAsQ0FBQSxDQUFBLENBREk7SUFBQSxDQUROO0dBREYsQ0FBQTtTQU1BLDBCQVB1RDtBQUFBLENBQXpELENBUUMsQ0FBQyxTQVJGLENBUVksWUFSWixFQVEwQixTQUFBLEdBQUE7QUFDeEIsTUFBQSx5QkFBQTtBQUFBLEVBQUEseUJBQUEsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLEdBQVY7QUFBQSxJQUNBLElBQUEsRUFBTSxTQUFBLEdBQUE7QUFDSixNQUFBLE1BQU0sQ0FBQyxJQUFQLENBQUEsQ0FBQSxDQURJO0lBQUEsQ0FETjtHQURGLENBQUE7U0FNQSwwQkFQd0I7QUFBQSxDQVIxQixDQUFBLENBQUEiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiBkZXZpY2UuZGVza3RvcCgpXG4gIHdpbmRvdy5UYXBjZW50aXZlID0gYW5ndWxhci5tb2R1bGUoJ1RhcGNlbnRpdmUnLCBbJ3VpLnJvdXRlcicsICdidGZvcmQuc29ja2V0LWlvJ10pXG5cbmVsc2VcbiAgd2luZG93LlRhcGNlbnRpdmUgPSBhbmd1bGFyLm1vZHVsZShcIlRhcGNlbnRpdmVcIiwgWyBcImlvbmljXCIsIFwiYnRmb3JkLnNvY2tldC1pb1wiLCBcInRhcC5jb250cm9sbGVyc1wiXSlcbiAgICAucnVuICgkaW9uaWNQbGF0Zm9ybSkgLT5cbiAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5IC0+XG4gICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKSBpZiB3aW5kb3cuU3RhdHVzQmFyXG5cblRhcGNlbnRpdmUuY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUgJ3BhZ2VzJyxcbiAgICAgIHVybDogJy8nXG4gICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCdcblxuICAgIC5zdGF0ZSAnZG9jcycsXG4gICAgICB1cmw6ICcvZG9jcydcbiAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAnLFxuICAgICAgdXJsOiAnLydcbiAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS5odG1sJ1xuXG4gICAgLnN0YXRlICdhYm91dCcsXG4gICAgICB1cmw6ICcvYWJvdXQnXG4gICAgICBjb250cm9sbGVyOiAnQWJvdXRDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJ1xuXG4gICAgLnN0YXRlICdob3cnLFxuICAgICAgdXJsOiAnL2hvdydcbiAgICAgIGNvbnRyb2xsZXI6ICdIb3dDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdob3cuaHRtbCdcbiAgICBcbiAgICAuc3RhdGUgJ3BsYXRmb3JtLXRvdWNocG9pbnRzJyxcbiAgICAgIHVybDogJy9iZWFjb24tYmxlLW5mYy1jb25uZWN0ZWQtdG91Y2hwb2ludCdcbiAgICAgIGNvbnRyb2xsZXI6ICdQbGF0Zm9ybVRvdWNocG9pbnRDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdwbGF0Zm9ybS10b3VjaHBvaW50cy5odG1sJ1xuXG4gICAgLnN0YXRlICdwbGF0Zm9ybS1tb2JpbGUnLFxuICAgICAgdXJsOiAnL2JlYWNvbi1ibGUtbmZjLW1vYmlsZS1hcGktc2RrJ1xuICAgICAgY29udHJvbGxlcjogJ1BsYXRmb3JtTW9iaWxlQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAncGxhdGZvcm0tbW9iaWxlLmh0bWwnXG5cbiAgICAuc3RhdGUgJ3BsYXRmb3JtLW1hbmFnZXInLFxuICAgICAgdXJsOiAnL3RhcGNlbnRpdmUtYmVhY29uLW5mYy1jbG91ZC1tYW5hZ2VyJ1xuICAgICAgY29udHJvbGxlcjogJ1BsYXRmb3JtTWFuYWdlckN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ3BsYXRmb3JtLW1hbmFnZXIuaHRtbCdcblxuICAgIC5zdGF0ZSAnYmxvZycsXG4gICAgICB1cmw6ICcvYmxvZydcbiAgICAgIGNvbnRyb2xsZXI6ICdCbG9nQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnYmxvZy5odG1sJ1xuXG4gICAgLnN0YXRlICdwcmVzcycsXG4gICAgICB1cmw6ICcvcHJlc3MnXG4gICAgICBjb250cm9sbGVyOiAnUHJlc3NDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdwcmVzcy5odG1sJ1xuXG4gICAgLnN0YXRlICdjb250YWN0JyxcbiAgICAgIHVybDogJy9jb250YWN0J1xuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2RvYycsXG4gICAgICB1cmw6ICcvZG9jcy86cGVybWFsaW5rJ1xuICAgICAgY29udHJvbGxlcjogJ0RvY0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdzdGVwJyxcbiAgICAgIHVybDogJy9kb2NzLzpwZXJtYWxpbmsvOnN0ZXAnXG4gICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9zaG93Lmh0bWwnXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlIFwiL1wiXG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoIC0+XG4gICAgICAgcmVxdWVzdDogKGNvbmZpZykgLT5cbiAgICAgICAgIGlmIGNvbmZpZy51cmwubWF0Y2goL1xcLmh0bWwkLylcbiAgICAgICAgICAgaWYgZGV2aWNlLnRhYmxldCgpXG4gICAgICAgICAgICAgdHlwZSA9ICd0YWJsZXQnXG4gICAgICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgICAgdHlwZSA9ICdtb2JpbGUnXG4gICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICB0eXBlID0gJ2Rlc2t0b3AnXG5cbiAgICAgICAgICAgY29uZmlnLnVybCA9IFwiLyN7dHlwZX0vI3tjb25maWcudXJsfVwiXG5cbiAgICAgICAgIGNvbmZpZ1xuXG5UYXBjZW50aXZlLnJ1biAoJHN0YXRlKSAtPlxuICAkc3RhdGUuZ28oJ2RvY3MnKVxuXG5UYXBjZW50aXZlLmZhY3RvcnkgJ1NvY2tldCcsIChzb2NrZXRGYWN0b3J5KSAtPlxuICBzb2NrZXRGYWN0b3J5KClcblxuVGFwY2VudGl2ZS5mYWN0b3J5ICdEb2NzJywgKFNvY2tldCkgLT5cbiAgc2VydmljZSA9XG4gICAgbGlzdDogW11cbiAgICBmaW5kOiAocGVybWFsaW5rKSAtPlxuICAgICAgXy5maW5kIHNlcnZpY2UubGlzdCwgKGRvYykgLT5cbiAgICAgICAgZG9jLnBlcm1hbGluayA9PSBwZXJtYWxpbmtcblxuICBTb2NrZXQub24gJ2RvY3MnLCAoZG9jcykgLT5cbiAgICBzZXJ2aWNlLmxpc3QgPSBkb2NzXG5cbiAgc2VydmljZVxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0hvbWVDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdBYm91dEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0hvd0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0FwcEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1BsYXRmb3JtTWFuYWdlckN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1BsYXRmb3JtVG91Y2hwb2ludEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ1BsYXRmb3JtTW9iaWxlQ3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnUHJlc3NDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdDb250YWN0Q3RybCcsICgkc2NvcGUpIC0+XG5cblRhcGNlbnRpdmUuY29udHJvbGxlciAnR2V0U3RhcnRlZEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5UYXBjZW50aXZlLmNvbnRyb2xsZXIgJ0RldmVsb3BlcnNDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdEZXZlbG9wZXJDZW50ZXJDdHJsJywgKCRzY29wZSkgLT5cblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcblxuVGFwY2VudGl2ZS5jb250cm9sbGVyICdEb2NDdHJsJywgKCRzY29wZSwgJHNjZSwgJHN0YXRlUGFyYW1zLCAkdGltZW91dCwgRG9jcykgLT5cbiAgJHNjb3BlLmluZGV4ID0gaWYgJHN0YXRlUGFyYW1zLnN0ZXAgdGhlbiAkc3RhdGVQYXJhbXMuc3RlcC0xIGVsc2UgMFxuXG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvYyA9IERvY3MuZmluZCgkc3RhdGVQYXJhbXMucGVybWFsaW5rKVxuICAgIGlmICRzY29wZS5kb2NcbiAgICAgICRzY29wZS5zdGVwID0gJHNjb3BlLmRvYy5zdGVwc1skc2NvcGUuaW5kZXhdXG4gICAgICAkc2NvcGUuc3RlcC51cmwgPSAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCgkc2NvcGUuc3RlcC51cmwpXG5cbiAgICAgIGlmICRzY29wZS5zdGVwLnR5cGUgPT0gJ2RpYWxvZydcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VJbmRleCA9IDBcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW11cbiAgICAgICAgJHRpbWVvdXQoJHNjb3BlLm5leHRNZXNzYWdlLCAxMDAwKVxuXG4gICRzY29wZS5oYXNNb3JlU3RlcHMgPSAtPlxuICAgIGlmICRzY29wZS5zdGVwXG4gICAgICAkc2NvcGUuc3RlcC5pbmRleCA8ICRzY29wZS5kb2Muc3RlcHMubGVuZ3RoXG5cblxuXG5cbiIsIlxuIyBub3Qgc3VyZSBpZiB0aGVzZSBhcmUgYWN0dWFsbHkgaW5qZWN0aW5nIGludG8gdGhlIGFwcCBtb2R1bGUgcHJvcGVybHlcbmFuZ3VsYXIubW9kdWxlKFwidGFwLmNvbnRyb2xsZXJzXCIsIFtdKVxuXG4jIG1vdmUgY29udHJvbGxlcnMgaGVyZVxuXG5cblxuXG4iLCJhbmd1bGFyLm1vZHVsZShcInRhcC5kaXJlY3RpdmVzXCIsIFtdKS5kaXJlY3RpdmUoXCJkZXZpY2VcIiwgLT5cbiAgZGlyZWN0aXZlRGVmaW5pdGlvbk9iamVjdCA9XG4gICAgcmVzdHJpY3Q6IFwiQVwiXG4gICAgbGluazogLT5cbiAgICAgIGRldmljZS5pbml0KClcbiAgICAgIHJldHVyblxuXG4gIGRpcmVjdGl2ZURlZmluaXRpb25PYmplY3RcbikuZGlyZWN0aXZlIFwic25hcHNjcm9sbFwiLCAtPlxuICBkaXJlY3RpdmVEZWZpbml0aW9uT2JqZWN0ID1cbiAgICByZXN0cmljdDogXCJBXCJcbiAgICBsaW5rOiAtPlxuICAgICAgZGV2aWNlLmluaXQoKVxuICAgICAgcmV0dXJuXG5cbiAgZGlyZWN0aXZlRGVmaW5pdGlvbk9iamVjdFxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9