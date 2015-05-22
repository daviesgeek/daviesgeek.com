---
  title: Angular Service Providers with config
  layout: post
  date: "2015-05-22 12:25 PST"
---

Simple example of an Angular service provider with configuration option (s)

{% highlight js %}
  var app = angular.module("app", []);
  app.service('service', function() {
    var service = function (enabled) {
      this.enabled = enabled
    }
    service.prototype.isEnabled = function() {
      return this.enabled
    }
    return service
  })
  app.provider('MyCoolService', function () {
    var enabled;
    return {
      setEnabled: function (isEnabled) {
        enabled = isEnabled;
      },
      $get: function (service) {
        return new service(enabled)
      }
    };
  });

  app.config(function (MyCoolServiceProvider) {
    MyCoolServiceProvider.setEnabled(true)
  });

  app.controller("Controller", function ($scope, MyCoolService) {
    $scope.enabled = MyCoolService.isEnabled()
  });
{% endhighlight %}

<a href="http://plnkr.co/edit/A8g7DbE34KHXwJuH7ppC?p=preview" rel="nofollow" target="_blank">Working Plunkr</a>