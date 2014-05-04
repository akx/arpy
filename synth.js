
var outputPreference = [
	/coolsoft/i,
	/gs wavetable/i,
	/synth/i,
];

function now() { return window.performance.now(); }

function MidiSynth(midi) {
	this.midi = midi;
	var output = null;
	var outputs = midi.outputs();
	outputPreference.forEach(function(regex) {
		outputs.forEach(function(out) {
			if(!output && regex.exec(out.name)) output = out;
		});
	});
	if(!output) console.log("No supported MIDI output!");
	this.output = output;
	console.log("Using output:", output.name);
}

MidiSynth.prototype.noteOn = function(chan, note, vel, delay) {
	vel = (vel === undefined ? 0x7F : 0 | vel);
	this.output.send([0x90 + chan % 16, 0 | note, vel], (delay !== undefined ? now() + delay : undefined));
};

MidiSynth.prototype.noteOff = function(chan, note, vel, delay) {
	if(note === undefined) { // all notes off
		this.output.send([0xB0 + chan % 16, 0x7B], (delay !== undefined ? now() + delay : undefined));
	} else {
		vel = (vel === undefined ? 0x7F : 0 | vel);
		this.output.send([0x80 + chan % 16, 0 | note, vel], (delay !== undefined ? now() + delay : undefined));
	}
};

MidiSynth.prototype.simpleNote = function(chan, note, vel, start, duration) {
	vel = (vel === undefined ? 0x7F : 0 | vel);
	start = (start === undefined ? 0 : 0 | start);
	var end = start + (duration === undefined ? 300 : 0 | duration);
	this.noteOn(chan, note, vel, start);
	this.noteOff(chan, note, vel, end);
};

MidiSynth.prototype.setSound = function(chan, sound) {
	this.output.send([0xC0 + chan % 16, 0 | sound]);
};