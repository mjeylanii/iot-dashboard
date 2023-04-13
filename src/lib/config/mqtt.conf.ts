export const OPENWEATHERMAP_API_KEY: string = '694b30cfa3ab199ef5cf64bafccf16e1';

export const MQTT_CONFIG = {
    BROKER_IP: '192.168.1.111',
    BROKER_PORT: 8080,
    BROKER_USERNAME: 'mqtt_user',
    BROKER_PASSWORD: 'mqtt_password',
    CLIENT_ID: "web" + new Date().getTime(),
  };



  export const MQTT_TOPICS = {
    temperature: 'office/temperature',
    humidity: 'office/humidity',
    pressure: 'office/pressure',
    networkTraffic: 'home/network_traffic',
    weather: 'home/weather',
    lights:[
      "office/light/1",
      "office/light/2",
      "office/light/3",
      "office/light/4",
      "office/light/5",
      "office/light/6",
    ]
  }
  
  // Define the lights as an object
