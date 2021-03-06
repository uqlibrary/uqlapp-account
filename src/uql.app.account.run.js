/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof at library.uq.edu.au>
 * Date: 15/02/16
 */

(function() {
  angular.module('uql.app.account').run(RunBlock);

  /** @ngInject **/
  function RunBlock($rootScope, $window, $location) {
    $rootScope.$on('uql.account.login', function () {
      $window.location.href = 'https://auth.library.uq.edu.au/login?return=' + $window.btoa($location.absUrl());
    });
  }
})();
