'use strict'

const serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const rxUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; 
const txUUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

var bleDevice;
var bleServer;
var bleService;
var rxCharacteristics;
var txCharacteristics;

var isConnected = false;

window.onload = function(){
  document.querySelector('#connect').addEventListener('click', connect);
  document.querySelector('#disconnect').addEventListener('click', disconnect);
  document.querySelector('#refresh').addEventListener('click', disconnect);
  
  document.querySelector('#ON').addEventListener('click', disconnect);				// CHANGE!
  document.querySelector('#OFF').addEventListener('click', disconnect);				// CHANGE!
   
  document.querySelector('#refresh').addEventListener('click', disconnect);			// CHANGE!
  
};

function connect() {
  if (!navigator.bluetooth) {
      log('Web Bluetooth API is not available.\n' +
          'Please make sure the Web Bluetooth flag is enabled.');
      return;
  }
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUUID]}]})
  .then(device => {
    bleDevice = device;
	log('Gonnecting to GATT server... ');
    return device.gatt.connect();
  })
  .then(server => {
    bleServer = server;
	log('Got GATT server... ');
    log('Getting service... ');
    return server.getPrimaryService(serviceUUID);
  })
  .then(service => {
    log('Got service... ');
    bleService = service;
	log('Getting characteristic... ');
	return bleService.getCharacteristic(rxUUID);
  })
  .then( characteristic => {
    log('Got characteristic... ');
    rxCharacteristics = characteristic;
    return rxCharacteristics.startNotifications();
  })
  .then(() => {
    log('Notifications enabled... ');
    rxCharacteristics.addEventListener('characteristicvaluechanged',DATARECEIVED);
  })
  .then(() => {
    return bleService.getCharacteristic(txUUID);
  })
  .then( characteristic => {
    txCharacteristics = characteristic;
    log('Got txCharacteristics...');
	isConnected = true;
	log('Connected...');
  })
  .catch(error => {
    log('> connect ' + error);
  });
}

function disconnect() {
  if (!bleDevice) {
    log('No Bluetooth Device connected...');
    return;
  } 
  log('Disconnecting from Bluetooth Device...');
  if (bleDevice.gatt.connected) {
    bleDevice.gatt.disconnect();
    log('> Bluetooth Device connected: ' + bleDevice.gatt.connected);
  } else {
    log('> Bluetooth Device is already disconnected');
  }
  isConnected = false;
}

function DATARECEIVED(event){
	let value = event.target.value;
	value = value.buffer ? value : new DataView(value);
	let data = new Uint8Array();
	log ('Data received!');
	for (let i = 0; i <= 8; i++) {
		data = value.getUint8(i);
		log(i + ': ' + data);
	}
}

function sliderChange(value){
	log(value);
	let newData = new Uint8Array([value]);
	return txCharacteristics.writeValue(newData).then(function() {
		log('Data sent!');
	});
}



function log(text) {
    console.log(text);
    document.querySelector('#log').textContent += text + '\n';
}

