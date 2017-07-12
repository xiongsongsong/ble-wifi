var bleno = require('bleno');
var ab = require('./ArrayBufferHelper')
const primaryService = 'ec00'
process.env.BLENO_ADVERTISING_INTERVAL=50
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

var val = ab.str2ab('ok') 
// 能访问网站1，否则为0
var internetConnect = new Buffer('ok') 

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: primaryService,
        characteristics: [
         new Characteristic({
               // 当前是否联网，已经联网(Wifi已启用并且可以访问互联网)返回1，否则返回0
               uuid:'ec0e',
               properties: ['read','write','notify'],
               value: null,
               onReadRequest :(offset, callback)=>{
                  callback(Characteristic.RESULT_SUCCESS, new Buffer('123')) 
               }
         })
        ]
      })
    ]);
  }
});
