var map;
var path;
var marker;
var origin = new google.maps.LatLng(35, -110);
var destination = new google.maps.LatLng(35, -100);
counter = 0;

function initialize() {
  var myLatlng = new google.maps.LatLng(35,-110);
  var myOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    
    //var image = 'http://i.imgur.com/MgrxTbx.gif?1';
    var image = 'http://i.imgur.com/13yDpT2.png?1?6956';
    
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(34.9,-110),
    map: map,
      icon: image
  });
  
  interval = window.setInterval(function() { 
    
    // just pretend you were doing a real calculation of
    // new position along the complex path
    var pos = new google.maps.LatLng(34.9, -110 + counter / 1000);
    origin = new google.maps.LatLng(34.9, -110 + counter / 1000); 
    marker.setPosition(pos);
    map.setCenter(new google.maps.LatLng(35,-110 + counter / 1000))
    if ((counter%500)==0) {
      calculateDistances();
    }
    
    if (counter >= 10000) {
      window.clearInterval(interval);   
    }
    counter++;
  }, 10);
}

function calculateDistances() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var distanceleft = document.getElementById('DistanceLeft');
    var desttext = document.getElementById('DestText');

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        distanceleft.innerHTML = "Distance Left: " + results[j].distance.text + '<br>';
      }
    }

  }
}

window.onload = function displayText() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, displaycallback);
}

function displaycallback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var distanceleft = document.getElementById('DistanceLeft');
    var desttext = document.getElementById('DestText');


    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
          desttext.innerHTML += origins[i] + ' to ' + destinations[j];
      }
    }

  }
}        
    
google.maps.event.addDomListener(window, 'load', initialize);
