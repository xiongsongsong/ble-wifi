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
// 能访问网站1，否则为0
var internetConnect = new Buffer('0') 

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: primaryService,
        characteristics: [
          new Characteristic({
               // 000f接收wifi配置信息 
               uuid:'000f',
               properties: ['read','write'],
               value: null,
               onReadRequest :(offset, callback)=>{
                  callback(Characteristic.RESULT_SUCCESS, val) 
               },
               onWriteRequest: (data, offset , withoutResponse, callback)=>{
                 val = data 
                 console.log('write', val.toString())
                 callback(Characteristic.RESULT_CALLBACK)
               }
         }),
         new Characteristic({
               // 000e 当前是否联网，已经联网(Wifi已启用并且可以访问互联网)返回1，否则返回0
               uuid:'000e',
               properties: ['read'],
               value: null,
               onReadRequest :(offset, callback)=>{
                  callback(Characteristic.RESULT_SUCCESS, internetConnect) 
               }
         })
        ]
      })
    ]);
  }
});
