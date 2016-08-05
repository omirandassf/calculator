/* global functionsOfMyCalculator partsOfMyCalculator angular */
angular.module('starter.controllers', [])
    .controller('calculatorController', ['$scope', function($scope) {

                $scope.calculator = partsOfMyCalculator;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //Changing Parts of Calculator
                
                partsOfMyCalculator = {
                    // Result in memory
                    memory: 0,
                    // Operand
                    operation: "",
                    //Number on the screen
                    currentNumber: "0",
                    //Start Screen
                    startOfScreen: "", 
                };
                
                
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                // Functions
                functionsOfMyCalculator = {
                    resetall: function() {
                        partsOfMyCalculator.memory = 0;
                        partsOfMyCalculator.currentNumber = "0";
                        partsOfMyCalculator.startOfScreen = "0";
                        functionsOfMyCalculator.operation = "0";

                    },

                    checkOperand: function() {

                        if (this.operation == "+") {
                            this.memory = parseFloat(this.memory + this.currentNumber);
                        }
                        else if (this.operation === "-") {
                            this.memory =parseFloat(this.memory - this.currentNumber);
                        }
                        else if (this.operation === "*") {
                            this.memory = parseFloat(this.memory * this.currentNumber);
                        }
                        else if (this.operation === "/") {
                            this.memory = parseFloat(this.memory / this.currentNumber);
                        }
                        else {
                            alert('Unable to use this operand!');
        
                        }
                        
                    },
                        
                    calculating: function(operationToSet) {
                    //1) Set operand to being part of the Calculator
                    partsOfMyCalculator.operation = operationToSet;
                    //2) Put it and check what to do
                    this.checkOperand();

                    partsOfMyCalculator.startOfScreen += " " + functionsOfMyCalculator.operation + " " + partsOfMyCalculator.currentNumber;


                        
                    }};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    
                //Button Functions
                    
                    $scope.resetClicked = function() {
                        partsOfMyCalculator.resetall();
                    };
                    
                    //Get Result
                    $scope.equalSign = function() {
                        //Check and set operand: add,subtract,divide or multiply
                        functionsOfMyCalculator.checkOperand();
                        //Make sure whatever is on the memory gets put on the screen
                        partsOfMyCalculator.startOfScreen = partsOfMyCalculator.memory;
                    };
                    
                    //If Buttons are clicked they will be added
                    $scope.numberClicked = function(clickedNumber) {

                            partsOfMyCalculator.currentNumber += clickedNumber;
                            partsOfMyCalculator.startOfScreen += clickedNumber;
                        };

                    $scope.operandClicked = function(clickedOperation) {
                        partsOfMyCalculator.calculating(clickedOperation);
                    };

                    

                    
                    
                    
                }]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


