# import the necessary modules
import webrepl
import network
from time import sleep
from machine import Pin
import config as cfg
 # create a station interface
sta_if = network.WLAN(network.STA_IF)
# activate the interface
sta_if.active(True)
 # wait for connection
while not sta_if.isconnected():
    try:
        sta_if.connect(cfg.WIFI_SSID, cfg.WIFI_PASS)
    except Exception as e:
        # handle any exceptions that might occur
        print("Error: ", str(e))
    sleep(1)
 # set the WiFi to stay connected

print('network config:', sta_if.ifconfig())
 # initialize LED
led = Pin("LED", Pin.OUT)
 # main loop
while True:
    try:
        if sta_if.status() == network.STAT_GOT_IP:
            led.on()
            # do something
            webrepl.start()
            break
        else:
            led.off()
            # wait for connection
            sleep(1)
            continue
    except Exception as e:
        # handle any exceptions that might occur
        print("Error: ", str(e))
        continue