import Socket from './socket';

Socket.listenMessage();

const playButton = document.getElementsByClassName('playButton');
const sounds = ['boom','clap','hihat','kick','openhat','ride','snare','tink','tom'];
document.addEventListener('keydown',addKeyboardHandler)

export function addKeyboardHandler(e){
	const keycode = e.keyCode;
	switch(keycode){
		case 65:
			Socket.emitMessage({sound:'boom'})
			playSound('boom',playButton[0]);
			break;
		case 83:
			Socket.emitMessage({sound:'clap'})
			playSound('clap',playButton[1]);
			break;
		case 68:
			Socket.emitMessage({sound:'hihat'})
			playSound('hihat',playButton[2]);
			break;
		case 70:
			Socket.emitMessage({sound:'kick'})	
			playSound('kick',playButton[3]);
			break;
		case 71:
			Socket.emitMessage({sound:'openhat'})
			playSound('openhat',playButton[4]);
			break;
		case 72:
			Socket.emitMessage({sound:'ride'})
			playSound('ride',playButton[5]);
			break;
		case 74:
			Socket.emitMessage({sound:'snare'})
			playSound('snare',playButton[6]);
			break;
		case 75:
			Socket.emitMessage({sound:'tink'})
			playSound('tink',playButton[7]);
			break;
		case 76:
			Socket.emitMessage({sound:'tom'})
			playSound('tom',playButton[8]);
			break;
		default:
			console.log('Please input from the given selections')
	}
}

[...playButton].forEach(button=>{
	button.addEventListener('click',addSound);
})

function addSound(e){
	const sound = this.children[1]['textContent'];
	Socket.emitMessage({sound})
	playSound(sound,this);
}


export function playSound(sound,target){
	if(!target){
		target = getTarget(sound);
	}
	const audio = document.getElementById(sound);
	target.classList.add('playing')
	audio.currentTime = 0;
	audio.play();
	setTimeout(()=>target.classList.remove('playing'),300)
}

function getTarget(sound){
	return playButton[sounds.indexOf(sound)]
}