/**
 * Created by mike on 2/4/2015.
 */
angular.module('sampleProtractor.services.bio', [
  'sampleProtractor.models.bio'
])
  .service('bioService', function($http, $q, Bio) {
    'use strict';

    /**
     * @class bioService
     *
     **/

    var url = 'api/search/';

    var search = function(term) {
      var defer = $q.defer();
      var searchUrl = url + term;
      $http(
        {
          method: 'GET',
          url: searchUrl,
          isArray: true,
          cache: false
        }
      )
        .success(function(responses) {
          var bios = [];
          _.each(responses.search.results, function(dto) {
            var bio = new Bio();
            bio.fromDTO(dto);
            bios.push(bio);
          });
          defer.resolve(bios);
        })
        .error(function(data, status, headers, config) {

          defer.reject(data);
        });

      return defer.promise;
    };

    return {
      search: search
    };
  });
