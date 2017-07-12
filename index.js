var bleno = require('bleno');
const primaryService = 'ec00'
process.env.BLENO_ADVERTISING_INTERVAL=50
process.env.BLENO_DEVICE_NAME='rstv_01'

var BlenoPrimaryService = bleno.PrimaryService;
var WifiCharacteristic  = require('./WiFiCharacteristics.js')

console.log('ble-wifi');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(process.env.BLENO_DEVICE_NAME, [primaryService]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));


// 能访问网站1，否则为0
var internetConnect = new Buffer('ok') 

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: primaryService,
        characteristics: [
         new WifiCharacteristic ()
        ]
      })
    ]);
  }
});
