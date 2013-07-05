// Serial port to connect to specified via USB_PORT
// environment variable
var usbPort = process.env.USB_PORT;

// The RFID reader send 
var NOTHING = "aa0218380bb";

// Our MQTT publisher
var publish = require("./publish");

var serialport = require("serialport");
var port = new serialport.SerialPort(usbPort, {
  baudrate: 57600,
  parser: serialport.parsers.readline("\n") 
});

var lastData;

port.on("open", function () {
  console.log("open!");
  port.on('data', function(data) {
    var line = stripLineBreaks(data);
    if (line && (line != NOTHING)) { 
      if (lastData != line) {
        console.log(line);
        lastData = line;
        publish.publishRfid(line);
      }
    }
  });
});

function stripLineBreaks(str) {
  return str.replace(/(\r\n|\n|\r)/gm,"");
}