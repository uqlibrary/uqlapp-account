/**
 * Author: Jan-Willem Wisgerhof <j.wisgerhof at library.uq.edu.au>
 * Date: 15/02/16
 */
(function() {
  'use strict';

  angular.module('uql.app.account.mock', [])
    .value('AccountMockVal', {
      'getAccount': {
        'hasSession': true,
        'name': 'Developer',
        'id': 'uqldev',
        'groups': [
          'CN=lib_libapi_SpotlightAdmins,OU=lib-libapi-groups,OU=LIB-groups,OU=University of Queensland Library,OU=Deputy Vice-Chancellor (Academic),OU=Vice-Chancellor,DC=uq,DC=edu,DC=au',
          'CN=lib_libapi_LiaisonAdmins,OU=lib-libapi-groups,OU=LIB-groups,OU=University of Queensland Library,OU=Deputy Vice-Chancellor (Academic),OU=Vice-Chancellor,DC=uq,DC=edu,DC=au',
          'CN=lib_staff,OU=LIB-groups,OU=University of Queensland Library,OU=Deputy Vice-Chancellor (Academic),OU=Vice-Chancellor,DC=uq,DC=edu,DC=au'
        ]
      }
    });

// Define our fake backend
  angular.module('uql.app.account.mock')
    .run(['$httpBackend', 'UQL_APP_CONFIG', 'AccountMockVal',
      function ($httpBackend, UQL_APP_CONFIG, AccountMockVal) {

        console.log(AccountMockVal);

        var api = UQL_APP_CONFIG.apiUrl + 'account';

        $httpBackend.whenGET(new RegExp(api + '?([0-9]*)')).respond(200, AccountMockVal.getAccount);
      }]);

})();