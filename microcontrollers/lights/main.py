from umqtt.robust2 import MQTTClient
from time import sleep, time
import config as cfg
from picozero import LED, pico_led
import ujson
payload = {
         "id": light_id,
         "name": light_name,
         "status": status
     }
# MQTT client setup
mqttc = MQTTClient(cfg.MQTT_CLIENT_NAME + str(time()), cfg.MQTT_BROKER_ADDR, cfg.MQTT_PORT, cfg.MQTT_USER, cfg.MQTT_PASS, cfg.MQTT_KEEPALIVE)
mqttc.set_last_will()
mqttc.connect()

# Light configuration
light_topic = b'/lights/meetingrooma'
light = pico_led
light_id = 2
light_name = "Meeting Room A"
light_state = False

def msg_received(topic, msg, retained, duplicate):
    #parse json
    command = ujson.loads(msg).get("command")
    print ("command: ", command)
    print("Received:", msg, "Topic:", topic)
    if topic == light_topic:
        if msg == b'ON':
            light.pico_led.on()
            light_state = True
        elif msg == b'OFF':
            light.pico_led.off()
            light_state = False

def publish_light_state():
    status = "on" if light_state else "off"
    payload = {
         "id": light_id,
         "name": light_name,
         "status": status
     }
    mqttc.publish(light_topic, ujson.dumps(payload))

# Subscribe to the light topic
mqttc.set_callback(msg_received)

mqttc.subscribe(light_topic)

# Main loop
while True:
    try:
        # Check for incoming messages from the MQTT broker
        mqttc.check_msg()

        # Publish the current light state
        publish_light_state()

        # Wait for some time before checking for incoming messages and publishing light state again
        sleep(3)
    except Exception as e:
        # Print the error message
        print(e)
        # Try to reconnect to the MQTT broker
        while not mqttc.ping():
            try:
                mqttc.connect()
                print("Reconnected to the MQTT broker")
            except Exception as e1:
                # Print the error message
                print(e1)
            # Wait for some time before retrying the connection
            sleep(5)
        # Try to reconnect to the Wi-Fi network
        sta_if = network.WLAN(network.STA_IF)
        while not sta_if.isconnected():
            try:
                sta_if.connect(cfg.WIFI_SSID, cfg.WIFI_PASSWORD)
            except Exception as e2:
                # Print the error message
                print(e2)
            # Wait for some time before retrying the connection
            sleep(5)

