#------------------MQTT CONFIGURATION------------------
#MQTT_BROKER_ADDR = '192.168.1.111'
MQTT_BROKER_ADDR = '192.168.0.116'
MQTT_PORT = 1883
MQTT_CLIENT_NAME = 'Lighto Pico W'
MQTT_KEEPALIVE = 60
# MQTT_USER = 'test'
# MQTT_PASS = '2238203'
MQTT_USER = 'ayanli'
MQTT_PASS = '1234'
LIGHT_TOPICS = [b'/lights/meetingrooma', b'/lights/conferenceroomb', b'/lights/execsuite', b'/lights/breakroom']

#------------------ WIFI ------------------
#WIFI_SSID = 'Ayanlı Yazılım 2.4'
#WIFI_PASS = 'Ayanli2015'
WIFI_SSID = 'SOMALI TELEKOM'
WIFI_PASS = 'popmoney187'
DHCP_RENEW_TIME = 1000*60*60*24
DHCP_TIMEOUT = 4000
DHCP_SERVER = None



