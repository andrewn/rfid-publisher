# RFID Publisher

A very small set of scripts to read a tag ID from an RFID reader, transmit it to a host computer over a serial interface and publish using the MQTT protocol.

## Equipment

You need:

- an [RFID reader](http://www.coolcomponents.co.uk/catalog/rfid-readerwriter-1356mhz-p-504.html)
- an [Arduino](http://www.arduino.cc/)-[compatible](http://shrimping.it/blog/) microcontroller

## Software

- Arduino IDE
- node js and npm

## Wiring it up

Connect up the Arduino like this:

![rfid-arduino_bb.png]()

See the `rfid-arduino.fzz` for the [Fritzing](http://fritzing.org/) file.

## Arduino sketch

Upload `rfid_sketch/rfid_sketch.ino` to your Arduino.

This will read an ID from the reader and send any cards it finds down the serial port.

## Host code

Connect the Arduino up to a computer and install the app's dependencies:

    $ npm install

Then, run the app specifying what topic it should publish as and teh USB port the arduino is connected to:

    $ MQTT_TOPIC=house/rfid USB_PORT=/dev/cu.usbserial-A600agbw node rfid.js

You should see the messages connecting to MQTT server and the serial port:

    MQTT connected
    open!

Placing a card on the reader should emit its ID, which you can read on the same topic e.g.

    mosquitto_sub -h test.mosquitto.org -t "house/#" -v

