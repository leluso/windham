(function(window)
{   'use strict';
    angular.module('windham', ['ngResource'])
        .factory('Archive', ['$resource', ($resource) => {
            return $resource('/api/archive', null, {
                update: { method: 'PUT' },
            });
        }])
        .controller('ArchiveInputController', ['$scope', 'Archive', function($scope, Archive) {
            $scope.master = {};
            $scope.archives = [];

            $scope.save = (input) => {
                let archive = new Archive(input);

                archive.$save(() => {
                    $scope.archives.push(archive);
                    $scope.input = {};
                    document.getElementById('audio-input-label').value = '';
                })
            }
        }])
        .controller('TabsController', ['$scope', function($scope) {
            $scope.tabs = $('.tab');

            $scope.displayTab = ($event) => {
                let tabToShow = $($event.target.parentElement);
                let contentToShow = $('#' + tabToShow.data('content'));

                for(let t = 0; t < $scope.tabs.length; t++)
                {
                    let tab = $($scope.tabs[t]);
                    let tabContent = $('#' + $(tab).data('content'));

                    if(tab.hasClass('active'))
                    {
                        tab.removeClass('active');
                        tabContent.removeClass('tab-content-active');
                        tabContent.addClass('tab-content-inactive');

                        tabToShow.addClass('active');
                        contentToShow.addClass('tab-content-active');
                        contentToShow.removeClass('tab-content-inactive');

                        return;
                    }
                }
            }
        }])
        .directive('fileread', [function() {
            return {
                scope: {
                    fileread: '=',
                },

                link: function(scope, element, attributes) {
                    element.bind('change', function(changeEvent) {
                        let reader = new FileReader();
                        reader.onload = function(loadEvent) {
                            scope.$apply(function() {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);

                        document.getElementById('audio-input-label').value = changeEvent.target.files[0].name;
                    });
                }
            }
        }]);
})(window);

function deleteArchive(event)
{   'use strict';
    let paths = location.pathname.split('/');
    let id = paths[paths.length-1];

    $.ajax({
        method: 'DELETE',
        url: '/api/archive/'+id,
    }).done(() => {
        window.location.href = '/';
    })
}
