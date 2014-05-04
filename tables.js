var Scales = {
	AEOLIAN: [0, 2, 3, 5, 7, 8, 10],
	BLUES: [0, 2, 3, 4, 5, 7, 9, 10, 11],
	CHROMATIC: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	DIATONIC_MINOR: [0, 2, 3, 5, 7, 8, 10],
	DORIAN: [0, 2, 3, 5, 7, 9, 10],
	HARMONIC_MINOR: [0, 2, 3, 5, 7, 8, 11],
	INDIAN: [0, 1, 1, 4, 5, 8, 10],
	LOCRIAN: [0, 1, 3, 5, 6, 8, 10],
	LYDIAN: [0, 2, 4, 6, 7, 9, 10],
	MAJOR: [0, 2, 4, 5, 7, 9, 11],
	MELODIC_MINOR: [0, 2, 3, 5, 7, 8, 9, 10, 11],
	MINOR: [0, 2, 3, 5, 7, 8, 10],
	MIXOLYDIAN: [0, 2, 4, 5, 7, 9, 10],
	NATURAL_MINOR: [0, 2, 3, 5, 7, 8, 10],
	PENTATONIC: [0, 2, 4, 7, 9],
	PHRYGIAN: [0, 1, 3, 5, 7, 8, 10],
	TURKISH: [0, 1, 3, 5, 7, 10, 11],
};

var Notes = {
	"A": {base: 9, name: "A"},
	"Aflat": {base: 8, name: "Ab"},
	"Asharp": {base: 10, name: "A#"},
	"B": {base: 11, name: "B"},
	"Bflat": {base: 10, name: "Bb"},
	"C": {base: 0, name: "C"},
	"Csharp": {base: 1, name: "C#"},
	"D": {base: 2, name: "D"},
	"Dflat": {base: 1, name: "Db"},
	"Dsharp": {base: 3, name: "D#"},
	"E": {base: 4, name: "E"},
	"Eflat": {base: 3, name: "Eb"},
	"F": {base: 5, name: "F"},
	"Fsharp": {base: 6, name: "F#"},
	"G": {base: 7, name: "G"},
	"Gflat": {base: 6, name: "Gb"},
	"Gsharp": {base: 8, name: "G#"}
};

var Instruments = {
	"0": "Acoustic Grand Piano",
	"1": "Bright Acoustic Piano",
	"2": "Electric Grand Piano",
	"3": "Honky-tonk Piano",
	"4": "Electric Piano 1",
	"5": "Electric Piano 2",
	"6": "Harpsichord",
	"7": "Clavinet",
	"8": "Celesta",
	"9": "Glockenspiel",
	"10": "Music Box",
	"11": "Vibraphone",
	"12": "Marimba",
	"13": "Xylophone",
	"14": "Tubular Bells",
	"15": "Dulcimer",
	"16": "Drawbar Organ",
	"17": "Percussive Organ",
	"18": "Rock Organ",
	"19": "Church Organ",
	"20": "Reed Organ",
	"21": "Accordion",
	"22": "Harmonica",
	"23": "Tango Accordion",
	"24": "Acoustic Guitar (nylon)",
	"25": "Acoustic Guitar (steel)",
	"26": "Electric Guitar (jazz)",
	"27": "Electric Guitar (clean)",
	"28": "Electric Guitar (muted)",
	"29": "Overdriven Guitar",
	"30": "Distortion Guitar",
	"31": "Guitar Harmonics",
	"32": "Acoustic Bass",
	"33": "Electric Bass (finger)",
	"34": "Electric Bass (pick)",
	"35": "Fretless Bass",
	"36": "Slap Bass 1",
	"37": "Slap Bass 2",
	"38": "Synth Bass 1",
	"39": "Synth Bass 2",
	"40": "Violin",
	"41": "Viola",
	"42": "Cello",
	"43": "Contrabass",
	"44": "Tremolo Strings",
	"45": "Pizzicato Strings",
	"46": "Orchestral Harp",
	"47": "Timpani",
	"48": "String Ensemble 1",
	"49": "String Ensemble 2",
	"50": "Synth Strings 1",
	"51": "Synth Strings 2",
	"52": "Choir Aahs",
	"53": "Voice Oohs",
	"54": "Synth Choir",
	"55": "Orchestra Hit",
	"56": "Trumpet",
	"57": "Trombone",
	"58": "Tuba",
	"59": "Muted Trumpet",
	"60": "French Horn",
	"61": "Brass Section",
	"62": "Synth Brass 1",
	"63": "Synth Brass 2",
	"64": "Soprano Sax",
	"65": "Alto Sax",
	"66": "Tenor Sax",
	"67": "Baritone Sax",
	"68": "Oboe",
	"69": "English Horn",
	"70": "Bassoon",
	"71": "Clarinet",
	"72": "Piccolo",
	"73": "Flute",
	"74": "Recorder",
	"75": "Pan Flute",
	"76": "Blown bottle",
	"77": "Shakuhachi",
	"78": "Whistle",
	"79": "Ocarina",
	"80": "Lead 1 (square)",
	"81": "Lead 2 (sawtooth)",
	"82": "Lead 3 (calliope)",
	"83": "Lead 4 (chiff)",
	"84": "Lead 5 (charang)",
	"85": "Lead 6 (voice)",
	"86": "Lead 7 (fifths)",
	"87": "Lead 8 (bass + lead)",
	"88": "Pad 1 (new age)",
	"89": "Pad 2 (warm)",
	"90": "Pad 3 (polysynth)",
	"91": "Pad 4 (choir)",
	"92": "Pad 5 (bowed)",
	"93": "Pad 6 (metallic)",
	"94": "Pad 7 (halo)",
	"95": "Pad 8 (sweep)",
	"96": "FX 1 (rain)",
	"97": "FX 2 (soundtrack)",
	"98": "FX 3 (crystal)",
	"99": "FX 4 (atmosphere)",
	"100": "FX 5 (brightness)",
	"101": "FX 6 (goblins)",
	"102": "FX 7 (echoes)",
	"103": "FX 8 (sci-fi)",
	"104": "Sitar",
	"105": "Banjo",
	"106": "Shamisen",
	"107": "Koto",
	"108": "Kalimba",
	"109": "Bagpipe",
	"110": "Fiddle",
	"111": "Shanai",
	"112": "Tinkle Bell",
	"113": "Agogo",
	"114": "Steel Drums",
	"115": "Woodblock",
	"116": "Taiko Drum",
	"117": "Melodic Tom",
	"118": "Synth Drum",
	"119": "Reverse Cymbal",
	"120": "Guitar Fret Noise",
	"121": "Breath Noise",
	"122": "Seashore",
	"123": "Bird Tweet",
	"124": "Telephone Ring",
	"125": "Helicopter",
	"126": "Applause",
	"127": "Gunshot"
};

var Chords = {
	ADD_FOURTH: [0, 4, 5, 7],
	ADD_NINE: [0, 4, 7, 14],
	ADD_TWO: [0, 2, 4, 7],
	AUGMENTED: [0, 4, 8],
	DIMINISHED: [0, 3, 6],
	DIMISHED_SEVENTH: [0, 3, 6, 9],
	ELEVENTH: [0, 4, 7, 10, 14, 17],
	FIFTH: [0, 7],
	HALF_DIMINISHED: [0, 3, 6, 10],
	MAJOR: [0, 4, 7],
	MAJOR_ELEVENTH: [0, 4, 7, 11, 14, 17],
	MAJOR_NINTH: [0, 4, 7, 11, 14],
	MAJOR_SEVENTH: [0, 4, 7, 11],
	MAJOR_THIRTEENTH: [0, 4, 7, 11, 14, 17, 21],
	MINOR: [0, 3, 7],
	MINOR_ELEVENTH: [0, 3, 7, 10, 14, 17],
	MINOR_MAJOR_SEVENTH: [0, 3, 7, 11],
	MINOR_NINTH: [0, 3, 7, 10, 14],
	MINOR_SEVENTH: [0, 3, 7, 10],
	MINOR_SIXTH: [0, 3, 7, 9],
	MINOR_THIRTEENTH: [0, 3, 7, 10, 14, 17, 21],
	NINTH: [0, 4, 7, 10, 14],
	SEVENTH: [0, 4, 7, 10],
	SEVENTH_FLAT_FIFTH: [0, 4, 6, 10],
	SEVENTH_FLAT_NINE: [0, 4, 7, 10, 13],
	SEVENTH_SHARP_FIFTH: [0, 4, 8, 10],
	SEVENTH_SHARP_NINE: [0, 4, 7, 10, 15],
	SEVENTH_SUSPENDED_FOURTH: [0, 5, 7, 10],
	SEVENTH_SUSPENDED_SECOND: [0, 2, 7, 10],
	SIX_NINE: [0, 4, 7, 9, 14],
	SIXTH: [0, 4, 7, 9],
	SUSPENDED_FOURTH: [0, 5, 7],
	SUSPENDED_SECOND: [0, 2, 7],
	THIRTEENTH: [0, 4, 7, 10, 14, 17, 21]
};