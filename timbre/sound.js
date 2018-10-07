
//variables
var apply = document.getElementById("apply"); // the actual project thing that does the sound
//these two are here for the whole thing to start up
var user_volume = document.getElementById("user_volume").value;
var user_wave = document.getElementById("user_waveform").value;

// make sure user input is updated
document.getElementById("user_volume").addEventListener('change', function() {
    user_volume = this.value;
    console.log(user_volume);
})

document.getElementById("user_waveform").addEventListener('change', function() {
    user_wave = this.value;
    console.log(user_wave);
})
// document.getElementById("list-volume").addEventListener('click', function() {
//     alert("Volume control is currently out of order. Please use your system volume slider.")
// })


class Sound {
    constructor(context) {
        this.context = context;
    }
    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        // this gain.value thing doesn't actually control the volume WTF?!
        this.gainNode.gain.value = 0.1;
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = user_wave;
    }
    play(value,time) {
        this.init();
        this.oscillator.frequency.value = value;
        // instead this weird ass method does ?!?!?!? 
        this.gainNode.gain.setValueAtTime(user_volume, this.context.currentTime);

        this.oscillator.start(time);
        this.stop(time);
    }
    stop(time) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.00001, time + 1);
        this.oscillator.stop(time + 1);
    }
}

document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;
    if(keyCode==13) {
        playsound();
    } else {
        return;
    }
}
function playsound() {
// get user input
let user_freq = document.getElementById("user_freq").value;
let user_wave = document.getElementById("user_waveform").value;
// make noise
let context = new (window.AudioContext || window.webkitAudioContext)();
let note = new Sound(context);
let now = context.currentTime;
note.play(user_freq,now);    
}
