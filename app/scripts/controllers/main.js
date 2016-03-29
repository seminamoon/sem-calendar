'use strict';

/**
 * @ngdoc function
 * @name semCalendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the semCalendarApp
 */
angular.module('semCalendarApp')
    .controller('MainCtrl', function ($scope) {




    })
    .directive('calendarSemina', function () {
        return {
            restrict: 'E',
            template:'<div class="smn-calendar">' +
                '<div class="year">Semina Calendar</div>' +
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


