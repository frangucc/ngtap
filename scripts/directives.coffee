angular.module("tap.directives", [])
  .directive "device", ->
    restrict: "A"
    link: ->
      device.init()

  .directive "snapscroll", ->
    restrict: "A"
    link: ->
      device.init()

  .factory 'copy', ($sce) ->
    copy =
      about:
        heading: "We're <strong>tapping</strong> into the future"

    trustValues = (values) ->
      _.each values, (val, key) ->
        switch typeof(val)
          when 'string'
            $sce.trustAsHtml(val)
          when 'object'
            trustValues(val)

    trustValues(copy)

    copy
