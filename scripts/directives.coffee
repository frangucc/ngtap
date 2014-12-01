angular.module("tap.directives", []).directive("device", ->
  directiveDefinitionObject =
    restrict: "A"
    link: ->
      device.init()
      return

  directiveDefinitionObject
).directive "snapscroll", ->
  directiveDefinitionObject =
    restrict: "A"
    link: ->
      device.init()
      return

  directiveDefinitionObject
