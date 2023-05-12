export const OPENWEATHERMAP_API_KEY: string = '694b30cfa3ab199ef5cf64bafccf16e1';

export const MQTT_CONFIG = {
    BROKER_IP: '192.168.1.111',
    BROKER_PORT: 8080,
    BROKER_USERNAME: 'mqtt_user',
    BROKER_PASSWORD: 'mqtt_password',
    CLIENT_ID: "web" + new Date().getTime(),
  };



  export const MQTT_TOPICS = {
    temperature: '/temperature',
    humidity: '/humidity',
    pressure: '/pressure',
    networkTraffic: '/network_traffic',
    weather: '/weather',
    climate: '/climate',
    water: '/water',
    electricity: '/electricity',
    lights: '/lights',
    motion: '/motion',
    door: '/door',
    window: '/window',
    garage: '/garage',
    alarm: '/alarm',
    camera: '/camera',
    tv: '/tv',
    media: '/media',
    thermostat: '/thermostat',
    fan: '/fan',
    air: '/air',
    sprinkler: '/sprinkler',
    security: '/security',
    lock: '/lock',
    garageDoor: '/garage_door',
    garageLight: '/garage_light',
    garageMotion: '/garage_motion',
  }
  
  // Define the lights as an object
