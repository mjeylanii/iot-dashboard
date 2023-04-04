export const OPENWEATHERMAP_API_KEY: string = '694b30cfa3ab199ef5cf64bafccf16e1';
export const MQTT_CONFIG = {
    BROKER_IP: '192.168.1.111',
    BROKER_PORT: 8080,
    BROKER_USERNAME: 'mqtt_user',
    BROKER_PASSWORD: 'mqtt_password',
    CLIENT_ID: 'MainClient',
  };


  export const MQTT_TOPICS = {
    TEMPERATURE: 'office/temperature',
    HUMIDITY: 'ffice/humidity',
    PRESSURE: 'office/pressure',
    PSI: 'home/psi',
    NETWORK_TRAFFIC: 'home/network_traffic',
    WEATHER: 'home/weather',
  }
 export const LIGHT_TOPICS = [
	'office/light/1',
	'office/light/',
	'office/light/3',
	'office/light/4',
	'office/light/5',
	'office/light/6',
];