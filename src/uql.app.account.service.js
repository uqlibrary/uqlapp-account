/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof at library.uq.edu.au>
 * Date: 15/02/16
 */

(function() {
  'use strict';

  angular.module('uql.app.account')
    .factory('UQLAccountService', uqlAccountService);

  /** @ngInject */
  function uqlAccountService($http, $q, $cookies, UQL_APP_CONFIG, $window) {
    var api = UQL_APP_CONFIG.apiUrl + 'account';
    var token = false;
    var isDeferred = false;
    var deferred = null;

    /**
     * @description Returns the current token value
     * @returns {*} The token value, else false if it doesn't exist
     */
    var getToken = function () {
      if (angular.isDefined($cookies.get(UQL_APP_CONFIG.uqlCookieName))) {
        token = $cookies.get(UQL_APP_CONFIG.uqlCookieName);
        return token;
      } else {
        return false;
      }
    };

    /**
     * @description Returns the token name
     * @returns {string} The token name
     */
    var getTokenName = function () {
      return UQL_APP_CONFIG.uqlTokenHeader;
    };

    /**
     * @description Gets account data
     * @return {Deferred} A deferred promise
     */
    var getAccount = function () {
      if (getIsDeferred() !== false) {
        return getDeferred().promise;
      }
      toggleIsDeferred();
      setDeferred($q.defer());
      var timestamp = new Date().getTime();
      var url = api + '?' + timestamp;
      $http.get(url)
        .success(function (data) {
          toggleIsDeferred();
          getDeferred().resolve(data);
        })
        .error(function (error) {
          toggleIsDeferred();
          getDeferred().reject(error);
        });
      return getDeferred().promise;
    };

    /**
     * @description Updates an account
     * @param {Object} account
     * @return {Deferred} A deferred promise
     */
    var updateAccount = function (account) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        data: account,
        url: api
      })
        .success(function (success) {
          deferred.resolve(success);
        })
        .error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    var login = function (returnUrl) {
      if (!returnUrl) {
        returnUrl = $window.location.href;
      }
      $window.location.href = "https://www.library.uq.edu.au/uqlais/login?return=" + $window.btoa(returnUrl);
    };

    var toggleIsDeferred = function () {
      isDeferred = !isDeferred;
    };

    var getIsDeferred = function () {
      return isDeferred;
    };

    var setDeferred = function (d) {
      deferred = d;
    };

    var getDeferred = function () {
      return deferred;
    };

    // Public API
    return {
      getAccount: getAccount,
      getToken: getToken,
      getTokenName: getTokenName,
      updateAccount: updateAccount,
      login: login
    };
  }

})();