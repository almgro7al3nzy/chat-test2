import io from 'socket.io-client';
import {playSound} from './index'

const server = 'http://192.168.100.5:8000'

class Socket{
	constructor(){
		this.socket = io.connect(server);
	}

	emitMessage(message){
		this.socket.emit('send:sound',message);
	}
	listenMessage(){
		this.socket.on('receive:sound', function (data) {
    	 	playSound(data.sound)	
 	})
	}
}

export default new Socket();