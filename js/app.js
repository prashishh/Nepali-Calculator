'use strict';

var nepCalculatorApp = angular.module('nepCalculatorApp', []);

nepCalculatorApp.controller('mainController', 
    function mainController($scope) {

        $scope.output = "0";
        $scope.nepoutput = "०";
        $scope.newNumber = true;
        $scope.pendingOperation = null;
        $scope.operationToken = "";
        $scope.runningTotal = null;
        $scope.pendingValue = null;
        $scope.lastOperation = null;
        $scope.neplang = "";
        $scope.nDigit = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९' ];

        // Constants
        var ADD = "adding";
        var SUBTRACT = "subtracting";
        var ADD_TOKEN = "+";
        var SUBTRACT_TOKEN = "-";

        $scope.updateOutput = function (btn) {
            if ($scope.output == "0" || $scope.newNumber) {
                $scope.output = btn;
                $scope.nepoutput = $scope.nepDigit($scope.output);
                $scope.newNumber = false;
            } else {
                $scope.output += String(btn);
                $scope.nepoutput = $scope.nepDigit($scope.output);
            }
            $scope.pendingValue = $scope.toNumber($scope.output);
        };

        $scope.add = function () {
            if ($scope.pendingValue) {
                if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                    $scope.runningTotal += $scope.pendingValue;
                } else if ($scope.runningTotal && $scope.pendingOperation == SUBTRACT) {
                    $scope.runningTotal -= $scope.pendingValue;
                } else {
                    $scope.runningTotal = $scope.pendingValue;
                }
            }
            $scope.setOperationToken(ADD);
            $scope.setOutput(String($scope.runningTotal));
            $scope.pendingOperation = ADD;
            $scope.newNumber = true;
            $scope.pendingValue = null;
        };

        $scope.subtract = function () {
            if ($scope.pendingValue) {
                if ($scope.runningTotal && ($scope.pendingOperation == SUBTRACT)) {
                    $scope.runningTotal -= $scope.pendingValue;
                } else if ($scope.runningTotal && $scope.pendingOperation == ADD) {
                    $scope.runningTotal += $scope.pendingValue;
                } else {
                    $scope.runningTotal = $scope.pendingValue;
                }
            }
            $scope.setOperationToken(SUBTRACT);
            $scope.setOutput(String($scope.runningTotal));
            $scope.pendingOperation = SUBTRACT;
            $scope.newNumber = true;
            $scope.pendingValue = null;
        };

        $scope.calculate = function () {
            if (!$scope.newNumber) {
                $scope.pendingValue = $scope.toNumber($scope.output);
                $scope.lastValue = $scope.pendingValue;
            }
            if ($scope.pendingOperation == ADD) {
                $scope.runningTotal += $scope.pendingValue;
                $scope.lastOperation = ADD;
            } else if ($scope.pendingOperation == SUBTRACT) {
                $scope.runningTotal -= $scope.pendingValue;
                $scope.lastOperation = SUBTRACT;
            } else {
                if ($scope.lastOperation) {
                    if ($scope.lastOperation == ADD) {
                        if ($scope.runningTotal) {
                            $scope.runningTotal += $scope.lastValue;
                        } else {
                            $scope.runningTotal = 0;
                        }
                    } else if ($scope.lastOperation == SUBTRACT) {
                        if ($scope.runningTotal) {
                            $scope.runningTotal -= $scope.lastValue;
                        } else {
                            $scope.runningTotal = 0;
                        }
                    }
                } else {
                    $scope.runningTotal = 0;
                }
            }
            $scope.setOutput($scope.runningTotal);
            $scope.setOperationToken();
            $scope.pendingOperation = null;
            $scope.pendingValue = null;
        };

        $scope.clear = function () {
            $scope.runningTotal = null;
            $scope.pendingValue = null;
            $scope.pendingOperation = null;
            $scope.setOutput("0");
        };


        $scope.setOutput = function(outputString) {
            $scope.output = outputString;
            $scope.nepoutput = $scope.nepDigit($scope.output);
            $scope.newNumber = true;
        };


        $scope.setOperationToken = function(operation) {
            if (operation == ADD) {
                $scope.operationToken = ADD_TOKEN;
            } else if (operation == SUBTRACT) {
                $scope.operationToken = SUBTRACT_TOKEN;
            } else {
                $scope.operationToken = "";
            }
        };

         $scope.toNumber = function(numberString) {
            var result = 0;
            if (numberString) {
                result = numberString * 1;
            }
            return result;
        };

        $scope.nepDigit = function(nepNum) {
            if(nepNum < 10)
                return $scope.nDigit[nepNum];
            else {
                var output = "";
                nepNum = String(nepNum);
                for(var i = 0; i < nepNum.length; i++)
                    output += $scope.nDigit[nepNum[i]];
                return output;
            }
        }

        $scope.convert = function() {
            console.log($scope.output);
            console.log(nepDigit.convertMe($scope.output));
        }

        $scope.$watch('output', function (newValue, oldValue, scope) {
            if (newValue && newValue !== oldValue) {
                $scope.neplang = nepDigit.convertMe(String(newValue));
            }
        });
});
