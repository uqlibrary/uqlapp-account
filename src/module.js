/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof at library.uq.edu.au>
 * Date: 15/02/16
 */

var mock = mock || false;

(function(mock) {
  var modules = [
    'uql.app.config',
    'ngCookies'
  ];

  if (mock) {
    modules.push('uql.app.account.mock');
  }

  angular.module('uql.app.account', modules);

})(mock);