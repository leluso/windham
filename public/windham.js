'use strict';

angular.module('windham', ['ngResource'])
        .factory('Archive', ['$resource', ($resource) => {
            return $resource('/api/archive', null, {
                update: { method: 'PUT' },
            });
        }])
        .controller('ArchiveInputController', ['$scope', 'Archive', function($scope, Archive) {
            $scope.master = {};

            $scope.save = (input) => {
                let archive = new Archive(input);

                archive.$save(() => {
                    $scope.archives.push(archive);
                    $scope.input = {};
                })
            };
        }]);
