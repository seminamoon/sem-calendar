'use strict';

/**
 * @ngdoc function
 * @name semCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the semCalendarApp
 */
angular.module('semCalendarApp')
    .controller('MainCtrl', function ($scope, $q) {

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
                    }else {
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
                        $scope.dates.push({id: d.format('YYYYMMDD'), num: i + 1})
                    }
                    if ($scope.dates.length % 7 != 0) {
                        for (var i = 0; i < ($scope.dates.length % 7); i++) {
                            $scope.dates.push({id: '', num: ''});
                        }
                    }
                }
            );
        };

        $scope.prevMonth = function(){
            if($scope.month === 0){
                $scope.month = 11;
                $scope.year --;
            }else{
                $scope.month --;
            }
            getDates($scope.year, $scope.month);
        };

        $scope.nextMonth = function(){
            if($scope.month === 11){
                $scope.month = 0;
                $scope.year ++;
            }else{
                $scope.month ++;
            }
            getDates($scope.year, $scope.month);
        };

        $scope.getToday = function(){
            $scope.year = moment().year();
            $scope.month = moment().month();
            getDates($scope.year, $scope.month);
        };
        $scope.getToday();

    })




    .directive('calendarSemina', function () {
        return {
            restrict: 'E',
            template: '<div class="smn-calendar">' +
            '<div class="year">Semina Calendar</div>' +
            '' +
            '<div class="week">' +
            '<ul>' +
            '<li>Sun</li>' +
            '<li>Mon</li>' +
            '<li>Tue</li>' +
            '<li>Wed</li>' +
            '<li>Thu</li>' +
            '<li>Fri</li>' +
            '<li>Sat</li>' +
            '</ul>' +
            '</div>' +

            '<div class="days">' +
            '<ul>' +
            '<li>1</li>' +
            '<li>2</li>' +
            '<li>3</li>' +
            '<li>4</li>' +
            '<li>5</li>' +
            '<li>6</li>' +
            '<li>7</li>' +
            '</ul>' +
            '</div>' +
            '</div>'
        };
    });


