var synth = null;
var gridTds = {};
var grid = {};
var yMax = 16;
var xMax = 32;
var xRange = range(0, xMax);
var yRange = range(0, yMax);
var step = -1;

function range(min, max) {
	var out = [];
	for(var i = min; i < max; i++) out.push(i);
	return out;
}

function $el(tag, attrib) {
	var parent = null;
	var el = document.createElement(tag);
	attrib = attrib || {};
	for(var key in attrib) {
		switch(key) {
			case 'html': el.innerHTML = attrib[key]; break;
			case 'text': el.innerText = attrib[key]; break;
			case 'parent': parent = attrib[key]; break;
			default: el[key] = attrib[key]; break;
		}
	}
	for(var i = 2; i < arguments.length; i++) {
		var arg = arguments[i];
		if(!!arg) {
			if(typeof arg == "string") arg = document.createTextNode(arg);
			el.appendChild(arg);
		}
	}
	if(parent) parent.appendChild(el);
	return el;
}

function makeScaleUi() {
	var scaleSelect = document.querySelector("#scale_scale");
	for (var name in Scales) {
		$el("option", {text: name.replace("_", " ").toLowerCase(), value: name, parent: scaleSelect});
		scaleSelect.size ++;
	}
	var scaleRoot = document.querySelector("#scale_root");
	for (var name in Notes) {
		var note = Notes[name];
		$el("option", {text: note.name, value: note.base, parent: scaleRoot});
		scaleRoot.size ++;
	}
	var scaleOctave = document.querySelector("#scale_octave");
	range(-4, +5).forEach(function (val) {
		$el("option", {text: (val > 0 ? "+" : "") + val, value: val, parent: scaleOctave});
		scaleOctave.size ++;
	});
	scaleSelect.value = "PENTATONIC";
	scaleRoot.value = "0";
	scaleOctave.value = "0";
	var setScaleFromUI = function () {
		var scale = Scales[scaleSelect.value];
		var trans = 0 | scaleRoot.value;
		var octave = parseInt(scaleOctave.value);
		var root = 60 + octave * 12 + trans;
		setPitchesByScale(root, scale);
	};
	scaleSelect.addEventListener("input", setScaleFromUI);
	scaleRoot.addEventListener("input", setScaleFromUI);
	scaleOctave.addEventListener("input", setScaleFromUI);

	instrumentSelect = document.querySelector("#instrument");
	for(var id in Instruments) {
		$el("option", {text: Instruments[id], value: id, parent: instrumentSelect});
	}
	instrumentSelect.value = 24;
}

function makeGridUi() {
	var gridBody = document.querySelector("#grid tbody");
	var gridHead = document.querySelector("#grid thead");
	var headTr = $el("tr", {parent: gridHead});

	var xTh = $el("th", {parent: headTr});
	var tempoInput = $el("input", {parent: xTh, type: "number", min: 20, max: 900, value: 100, id: "tempo"});
	xRange.forEach(function (x) {
		$el("th", {parent: headTr, className: 'x' + x, id: 'x' + x});
	});
	yRange.forEach(function (y) {
		var tr = $el("tr", {parent: gridBody, className: 'y' + y, id: 'y' + y});
		var row = gridTds[y] = {};
		var pitchTd = $el("td", {parent: tr, id: 'y' + y + 'pitch', className: 'pitch'});
		var pitchInput = $el("input", {parent: pitchTd, type: "number", min: 0, max: 127, value: 60});
		row.pitchInput = pitchInput;
		xRange.forEach(function (x) {
			var td = $el("td", {parent: tr, className: 'cell x' + x, id: 'y' + y + 'x' + x});
			row[x] = td;
			td.xy = {x: x, y: y};
			td.addEventListener("click", function(event) {
				var yGrid = grid[y] || (grid[y] = {});
				if(event.shiftKey) {
					yGrid[x] = 0;
				} else {
					yGrid[x] = (((0 | yGrid[x]) + 1) % 5);
				}
				updateUi();
			});
		});
	});

}

function updateUi() {
	var currX = step % xMax;
	yRange.forEach(function (y) {
		var yGrid = (grid[y] || {});
		xRange.forEach(function (x) {
			var cell = gridTds[y][x];
			cell.className = "";
			if(yGrid[x]) cell.classList.add("active" + (0 | yGrid[x]));
			if(currX == x) cell.classList.add("current");
		});
	});
}

function makeSimple(seq, options) {
	options = options || {};
	options.value = options.value || 1;
	options.transpose = options.transpose || 0;
	xRange.forEach(function (x) {
		var y = seq[x % seq.length];
		if(y === undefined || y < 0) return;
		y += options.transpose;
		while(y < 0) y += yMax;
		y %= yMax;
		(grid[y] || (grid[y] = {}))[x] = options.value;
	});
}

function setPitches(seq) {
	yRange.forEach(function(y) {
		gridTds[y].pitchInput.value = seq[y % seq.length];
	});
}

function setPitchesByScale(root, scale) {
	setPitches(yRange.map(function(y) {
		var oct = 0 | (y / scale.length);
		return root + oct * 12 + scale[y % scale.length];
	}));
}

function playStep(stepLength) {
	var x = step % xMax;
	yRange.forEach(function (y) {
		var yGrid = (grid[y] || {});
		var yTdGrid = (gridTds[y] || {});
		if(yGrid[x]) {
			synth.simpleNote(0, yTdGrid.pitchInput.valueAsNumber, 0x60 + y, 0, stepLength * yGrid[x]);
		}
	});
	/*
	if(acRuleIndex > -1) {
		stylesheet.deleteRule(acRuleIndex);
		acRuleIndex = -1;
	}
	acRuleIndex = stylesheet.insertRule(".x" + x + "{ background: lime !important; }", 0);*/
}

function tick() {
	var stepLength = 60000 / document.getElementById("tempo").valueAsNumber / 2;
	synth.setSound(0, 0 | document.getElementById("instrument").value);
	playStep(stepLength);
	updateUi();
	step++;

	//if(step % 2 == 1) stepLength *= 0.75;
	setTimeout(tick, stepLength);
}

function start() {
	makeScaleUi();
	makeGridUi();
	//setPitchesByScale(60, Scales.LYDIAN);
	makeSimple([0, 1, 2, 3], {transpose: 4});//, 0, 1, 4, 1]);
	//makeSimple([9, -1, -1, -1]);
	updateUi();
	tick();
	/*
	synth.setSound(1, 32);
	[0, 1, 9, 5].forEach(function(f, i) {
		synth.simpleNote(0, 60 + f, 0x60, i * 400, 1500);
		synth.simpleNote(1, 60 - 12 + f, 0x60, i * 400 + 50, 1500);
	});*/
}

navigator.requestMIDIAccess().then(
		function(midi){window.synth = new MidiSynth(midi);setTimeout(start,0)},
		function(){alert("No midi :(")}
)

