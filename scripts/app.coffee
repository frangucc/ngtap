if device.desktop()
  window.Tapcentive = angular.module('Tapcentive', ['ui.router', 'btford.socket-io'])

else
  window.Tapcentive = angular.module("Tapcentive", [ "ionic", "btford.socket-io", "tap.controllers"])
    .run ($ionicPlatform) ->
      $ionicPlatform.ready ->
        StatusBar.styleDefault() if window.StatusBar

Tapcentive.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) ->
  $stateProvider
    .state 'app',
      url: '/app'
      abstract: true
      controller: 'AppCtrl'
      templateUrl: 'menu.html'

    .state 'app.home',
      url: '/'
      views:
        menuContent:
          controller: 'HomeCtrl'
          templateUrl: 'home.html'

    .state 'app.docs',
      url: '/docs'
      views:
        menuContent:
          controller: 'DocsCtrl'
          templateUrl: 'docs/index.html'

    .state 'app.about',
      url: '/about'
      views:
        menuContent:
          controller: 'AboutCtrl'
          templateUrl: 'about.html'

    .state 'app.how',
      url: '/how'
      views:
        menuContent:
          controller: 'HowCtrl'
          templateUrl: 'how.html'
    
    .state 'app.platform-touchpoints',
      url: '/beacon-ble-nfc-connected-touchpoint'
      views:
        menuContent:
          controller: 'PlatformTouchpointCtrl'
          templateUrl: 'platform-touchpoints.html'

    .state 'app.platform-mobile',
      url: '/beacon-ble-nfc-mobile-api-sdk'
      views:
        menuContent:
          controller: 'PlatformMobileCtrl'
          templateUrl: 'platform-mobile.html'

    .state 'app.platform-manager',
      url: '/tapcentive-beacon-nfc-cloud-manager'
      views:
        menuContent:
          controller: 'PlatformManagerCtrl'
          templateUrl: 'platform-manager.html'

    .state 'app.blog',
      url: '/blog'
      views:
        menuContent:
          controller: 'BlogCtrl'
          templateUrl: 'blog.html'

    .state 'app.press',
      url: '/press'
      views:
        menuContent:
          controller: 'PressCtrl'
          templateUrl: 'press.html'

    .state 'app.contact',
      url: '/contact'
      views:
        menuContent:
          controller: 'ContactCtrl'
          templateUrl: 'contact.html'

    .state 'app.doc',
      url: '/docs/:permalink'
      views:
        menuContent:
          controller: 'DocCtrl'
          templateUrl: 'docs/show.html'

    .state 'app.step',
      url: '/docs/:permalink/:step'
      views:
        menuContent:
          controller: 'DocCtrl'
          templateUrl: 'docs/show.html'

    $urlRouterProvider.otherwise "/"

    $httpProvider.interceptors.push ->
       request: (config) ->
         if config.url.match(/\.html$/)
           if device.tablet()
             type = 'tablet'
           else if device.mobile()
             type = 'mobile'
           else
             type = 'desktop'

           config.url = "/#{type}/#{config.url}"

         config

Tapcentive.run ($state) ->
  $state.go('app.docs')

Tapcentive.factory 'Socket', (socketFactory) ->
  socketFactory()

Tapcentive.factory 'Docs', (Socket) ->
  service =
    list: []
    find: (permalink) ->
      _.find service.list, (doc) ->
        doc.permalink == permalink

  Socket.on 'docs', (docs) ->
    service.list = docs

  service

Tapcentive.controller 'HomeCtrl', ($scope) ->

Tapcentive.controller 'AboutCtrl', ($scope) ->

Tapcentive.controller 'HowCtrl', ($scope) ->

Tapcentive.controller 'AppCtrl', ($scope) ->

Tapcentive.controller 'PlatformManagerCtrl', ($scope) ->

Tapcentive.controller 'PlatformTouchpointCtrl', ($scope) ->

Tapcentive.controller 'PlatformMobileCtrl', ($scope) ->

Tapcentive.controller 'PressCtrl', ($scope) ->

Tapcentive.controller 'ContactCtrl', ($scope) ->

Tapcentive.controller 'GetStartedCtrl', ($scope) ->

Tapcentive.controller 'DevelopersCtrl', ($scope) ->

Tapcentive.controller 'DeveloperCenterCtrl', ($scope) ->

Tapcentive.controller 'DocsCtrl', ($scope, Docs) ->
  $scope.$watch (-> Docs.list), ->
    $scope.docs = Docs.list

Tapcentive.controller 'DocCtrl', ($scope, $sce, $stateParams, $timeout, Docs) ->
  $scope.index = if $stateParams.step then $stateParams.step-1 else 0

  $scope.$watch (-> Docs.list), ->
    $scope.doc = Docs.find($stateParams.permalink)
    if $scope.doc
      $scope.step = $scope.doc.steps[$scope.index]
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url)

      if $scope.step.type == 'dialog'
        $scope.messageIndex = 0
        $scope.messages = []
        $timeout($scope.nextMessage, 1000)

  $scope.hasMoreSteps = ->
    if $scope.step
      $scope.step.index < $scope.doc.steps.length




