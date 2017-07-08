var bleno = require('bleno');
var ab = require('./ArrayBufferHelper')
const primaryService = 'CDFE'
process.env.BLENO_ADVERTISING_INTERVAL=10
process.env.BLENO_DEVICE_NAME='rstv_01'

var BlenoPrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;

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

var val = new Buffer(0)

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: primaryService,
        characteristics: [
          new Characteristic({
               uuid:'000f',
               properties: ['read','write'],
               value: null,
               onReadRequest :(offset, callback)=>{
                  callback(Characteristic.RESULT_SUCCESS, val) 
               },
               onWriteRequest: (data, offset , withoutResponse, callback)=>{
                 val = data 
                 callback(Characteristic.RESULT_CALLBACK)
               }
         })
        ]
      })
    ]);
  }
});
