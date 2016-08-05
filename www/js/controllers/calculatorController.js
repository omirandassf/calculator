/* global functionsOfMyCalculator partsOfMyCalculator angular */
angular.module('starter.controllers', [])
    .controller('calculatorController', ['$scope','$cordovaCamera', function($scope,$cordovaCamera) {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Changing Parts of Calculator
        partsOfMyCalculator = {
            // Result in memory
            memory: 0,
            // Operand
            operation: "",
            //Result after operation
            result: "0",
            //Start Screen
            startOfScreen: "0",
        };

        $scope.calculator = partsOfMyCalculator;
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Functions
        functionsOfMyCalculator = {
            resetall: function() {
                partsOfMyCalculator.memory = 0;
                partsOfMyCalculator.currentNumber = "0";
                partsOfMyCalculator.startOfScreen = "";
                functionsOfMyCalculator.operation = "";

            },

            checkOperand: function() {

                if (partsOfMyCalculator.operation == "+") {
                    alert("Starting Memory " + partsOfMyCalculator.memory);

                    partsOfMyCalculator.memory = parseFloat(partsOfMyCalculator.memory) + parseFloat(partsOfMyCalculator.startOfScreen);
                    alert("Ending Memory " + partsOfMyCalculator.memory);


                }
                else if (partsOfMyCalculator.operation == "-") {
                    partsOfMyCalculator.memory = parseFloat(partsOfMyCalculator.memory) - parseFloat(partsOfMyCalculator.startOfScreen);
                    alert("Here is my memory in number" + partsOfMyCalculator.memory);
                    alert("Here is my screen" + partsOfMyCalculator.startOfScreen);

                }
                else if (partsOfMyCalculator.operation == "*") {
                    partsOfMyCalculator.memory = parseFloat(partsOfMyCalculator.memory) * parseFloat(partsOfMyCalculator.startOfScreen);
                    functionsOfMyCalculator.calculating();

                }
                else if (partsOfMyCalculator.operation == "/") {
                    alert("Before setting numbers and doing calculation");
                    partsOfMyCalculator.memory = parseFloat(partsOfMyCalculator.memory) / parseFloat(partsOfMyCalculator.startOfScreen);
                    alert("Memory " + partsOfMyCalculator.memory);
                    alert("Start of Screen " + partsOfMyCalculator.startOfScreen);
                    alert("Result " + partsOfMyCalculator.result);

                    // functionsOfMyCalculator.calculating();

                }
                else {
                    alert('Unable to use this operand!');

                }

            },

            calculating: function(operationToSet) {


                partsOfMyCalculator.startOfScreen = partsOfMyCalculator.memory + " " + partsOfMyCalculator.operation + " " + partsOfMyCalculator.memory;



            }
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //Functions for Buttons

        //Enter button function
        $scope.enterClicked = function() {
            partsOfMyCalculator.currentNumber = "0";
        };

        //reset all
        $scope.resetClicked = function() {
            functionsOfMyCalculator.resetall();
        };

        //number clicking function
        $scope.numberClicked = function(clickedNumber) {

            //If Buttons are clicked they will be added only if the view on the calculator
            // is not blank or 0
            if (partsOfMyCalculator.startOfScreen == 0 || partsOfMyCalculator.startOfScreen == "") {
                partsOfMyCalculator.startOfScreen = "";
                partsOfMyCalculator.currentNumber = "";
            }

            // making it a string = partsOfMyCalculator.currentNumber += clickedNumber;
            partsOfMyCalculator.startOfScreen += clickedNumber;
        };

        //operand was clicked + - / * ^
        $scope.operandClicked = function(clickedOperation) {
            if (partsOfMyCalculator.memory > 0) {
                functionsOfMyCalculator.checkOperand();
            }

            partsOfMyCalculator.operation = clickedOperation;

            if (partsOfMyCalculator.memory == 0) {
                partsOfMyCalculator.memory = partsOfMyCalculator.startOfScreen;
            }
            alert("Memory before starting another operation" + partsOfMyCalculator.memory);
            partsOfMyCalculator.startOfScreen = partsOfMyCalculator.memory;
            alert(partsOfMyCalculator.memory);
        };


        //Get Result
        $scope.equalSign = function() {
            //Check and memory and run with screen

            functionsOfMyCalculator.checkOperand();

            if (partsOfMyCalculator.startOfScreen == "" || partsOfMyCalculator.startOfScreen === 0) {
                partsOfMyCalculator.startOfScreen = partsOfMyCalculator.memory;
            }
            else {
                alert("No Number to Check! ");
            }
        };



        $scope.takePicture = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // An error occured. Show a message to the user
            });
        };


function initialize() {
            var mapOptions = {
                center: { lat: 28.613939, lng: 77.209021 },
                zoom: 13,
                disableDefaultUI: true,// DISABLE MAP TYPE
                scrollwheel: false
            };
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var input = /** @type {HTMLInputElement} */ (
                document.getElementById('pac-input'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace( /** @type {!google.maps.Place} */ ({
                    placeId: place.place_id,
                    location: place.geometry.location
                }));
                marker.setVisible(true);

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, marker);
            });
        }

        // Run the initialize function when the window has finished loading.
        google.maps.event.addDomListener(window, 'load', initialize);








    }]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
