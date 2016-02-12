(function() {
  angular.module('uql.app.account', ['uql.app.config', 'ngCookies'])
    .config(Config);

  /* @ngInject */
  function Config ($httpProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|l|data):/);

    var $http,
      interceptor = ['$q', '$log', '$timeout', '$injector',
        function ($q, $log, $timeout, $injector) {

          var onRequest = function (config) {
            var accountSvc = $injector.get('UQLAccountService');

            config.headers.Accept = 'application/json';

            // Add authorization token for each request
            var token = accountSvc.getToken();
            if (token !== false) {
              config.headers[accountSvc.getTokenName()] = token;
            }

            return config || $q.when(config);
          };

          var onRequestError = function (rejection) {
            return $q.reject(rejection);
          };

          var onResponse = function (response) {
            $http = $http || $injector.get('$http');
            return response || $q.when(response);
          };

          var onResponseError = function (rejection) {
            $http = $http || $injector.get('$http');
            return $q.reject(rejection);
          };

          return {
            request: onRequest,
            requestError: onRequestError,
            response: onResponse,
            responseError: onResponseError
          };
        }];

    $httpProvider.interceptors.push(interceptor);
  }
})();