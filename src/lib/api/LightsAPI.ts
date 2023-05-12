import { ws_config } from "$lib/config/default/websocket.conf";
let response = ''

export async function getLights(){
    console.log('getLights')
  

}

function _updateResponse(returnValue: any){
    console.log(returnValue)
    response += (typeof returnValue === 'string' ? returnValue : JSON.stringify(returnValue)) + '<br>'
}


export async function getLightStates(){
    
}
   