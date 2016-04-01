'use strict';

/**
 * @ngdoc function
 * @name semCalendarApp.controller:SemCalendarCtrl
 * @description
 * # SemCalendarCtrl
 * Controller of the semCalendarApp
 */
angular.module('semCalendarApp')
    .controller('SemCalendarCtrl', function ($scope, $q) {
        $scope.weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var getDates = function (year, month) {
            var startDate = moment([year, month]);
            var endDate = moment(startDate).endOf('month');
            var blank;
            switch (startDate.format('ddd')) {
                case 'Mon' :
                    blank = 1;
                    break;
                case 'Tue' :
                    blank = 2;
                    break;
                case 'Wed' :
                    blank = 3;
                    break;
                case 'Thu' :
                    blank = 4;
                    break;
                case 'Fri' :
                    blank = 5;
                    break;
                case 'Set' :
                    blank = 6;
                    break;
                default    :
                    blank = 0;
                    break;
            }
            // insert blank
            var _blankPromise = function (blank) {
                return $q(function (resolve) {
                    var dates = [];
                    if (blank > 0) {
                        for (var i = 0; i < blank; i++) {
                            dates.push({id: '', num: ''});
                        }
                        resolve(dates);
                    } else {
                        resolve(dates);
                    }
                });
            };

            // blank + dates
            _blankPromise(blank).then(
                function (dates) {
                    $scope.dates = dates;
                    for (var i = 0; i < endDate.format('D'); i++) {
                        var d = moment(startDate).add(i, 'day');
                        $scope.dates.push({id: d.format('YYYYMMDD'), num: i + 1});
                    }
                    if ($scope.dates.length % 7 !== 0) {
                        for (var a = 0; a < ($scope.dates.length % 7); a++) {
                            $scope.dates.push({id: '', num: ''});
                        }
                    }
                }
            );
        };

        $scope.prevMonth = function () {
            if ($scope.month === 0) {
                $scope.month = 11;
                $scope.year--;
            } else {
                $scope.month--;
            }
            getDates($scope.year, $scope.month);
        };

        $scope.nextMonth = function () {
            if ($scope.month === 11) {
                $scope.month = 0;
                $scope.year++;
            } else {
                $scope.month++;
            }
            getDates($scope.year, $scope.month);
        };

        $scope.getToday = function () {
            $scope.year = moment().year();
            $scope.month = moment().month();
            $scope.today = moment().format('YYYYMMDD');
            getDates($scope.year, $scope.month);
        };

        $scope.getToday();

        $scope.blankCheck = function (day) {
            if (day.id) {
                $('.' + day.id).addClass('date-hover');
            }
        };

    })

    .directive('basicCalendar', function () {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: '../views/basic-calendar.html'

        };
    });


