//variables
var apply = document.getElementById("apply"); // the actual project thing that does the sound
//these two are here for the whole thing to start up
var user_volume = document.getElementById("user_volume").value;
var user_wave = document.getElementById("user_waveform").value;
//note arrays
var notes = {
oct0 : [16.35,17.32,18.35,19.45,20.60,21.83,23.12,24.50,25.96,27.50,29.14,30.87],
oct1 : [32.70,34.65,36.71,38.89,41.20,43.65,46.25,490,51.91,550,58.27,61.74],
oct2 : [65.41,69.30,73.42,77.78,82.41,87.31,92.50,980,103.8,110,116.5,123.5],
oct3 : [130.8,138.6,146.8,155.6,164.8,174.6,185,196,207.7,220,233.1,246.9],
oct4 : [261.6,277.2,293.7,311.1,329.6,349.2,370,392,415.3,440,466.2,493.9],
oct5 : [523.3,554.4,587.3,622.3,659.3,698.5,740,784,830.6,880,932.3,987.8],
oct6 : [1047,1109,1175,1245,1319,1397,1480,1568,1661,1760,1865,1976],
oct7 : [2093,2217,2349,2489,2637,2794,2960,3136,3322,3520,3729,3951],
oct8 : [4186,4435,4699,4978,5274,5588,5920,6272,6645,7040,7459,7902]
}
var notes_help = {
chords : ["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"]
}
var table = document.getElementById('t-notes');
for (let i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    tr.id = 'oct'+i;
    for (j = 0; j < 12; j++) {
        let td = document.createElement('td');
        tr.appendChild(td);
        td.id = "note"+j;
        td.innerHTML = Object.values(notes)[i][j];

    }
    console.log("printed tr");
}


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
