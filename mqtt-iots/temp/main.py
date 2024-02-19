from umqtt.robust2 import MQTTClient
from machine import Pin, I2C
from time import sleep, time
import config as cfg
import ahtx0
import ujson

# mqtt client setup
mqttc = MQTTClient(cfg.MQTT_CLIENT_NAME + str(time()), cfg.MQTT_BROKER_ADDR, cfg.MQTT_PORT, cfg.MQTT_USER, cfg.MQTT_PASS, cfg.MQTT_KEEPALIVE)
mqttc.connect()
# onboard LED setup
onboard_led = Pin("LED", Pin.OUT)
# temperature topic setup
topic = cfg.TEMP_HUMIDITY_TOPIC

#Setup sensor pins
sda = Pin(26)
scl = Pin(27)
i2c = I2C(1, scl=scl, sda=sda)
sensor = ahtx0.AHT10(i2c)

sleep(3)



# main loop
while True:
    try:
        # read the temperature and humidity from the sensor
        temperature = sensor.temperature
        humidity = sensor.relative_humidity
        # create a JSON object with the temperature and humidity data
        data = {"temperature": temperature, "humidity": humidity}
        # publish the JSON object to the MQTT broker
        mqttc.publish(topic, ujson.dumps(data).encode())
        print(temperature, humidity)
        # wait for some time before checking for incoming messages
        sleep(0.5)
        # check for incoming messages from the MQTT broker
        mqttc.check_msg()
        # wait for some time before publishing a new temperature reading
        sleep(1)
    except Exception as e:
        # print the error message
        print(e)
        # try to reconnect to the MQTT broker
        while  mqttc.ping() == False:
            try:
                mqttc.connect()
                print("Reconnected to the MQTT broker")
            except Exception as e1:
                # print the error message
                print(e1)
            # wait for some time before retrying the connection
            sleep(5)
         # try to reconnect to the Wi-Fi network
        sta_if = network.WLAN(network.STA_IF)
        while not sta_if.isconnected():
            try:
                sta_if.connect(cfg.WIFI_SSID, cfg.WIFI_PASSWORD)
                print('Reconnected to the Wi-Fi network')
                if not sta_if.isconnected():
                    print('Could not connect to the Wi-Fi network')
                    machine.reset()
            except Exception as e2:
                # print the error message
                print(e2)

