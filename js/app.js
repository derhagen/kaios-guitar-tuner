// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  // var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  // navigator.mozL10n.once(start);

  start();

  // ---

  function start() {
    var audio_processor = new AudioProcessor();
    audio_processor.requestUserMedia();

    window.addEventListener('audio-data', function (e) {
      // console.log(e.detail);
      updateNote(e.detail.note, e.detail.octave);
      updateDelta(e.detail.frequency, e.detail.semitonesFromA4);
    }, false);

  }

  function updateNote(note, octave){
  	const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

  	document.querySelector(".note-circle").innerHTML = notes[note];
  }

  function updateDelta(frequency, semitonesFromA4){
  	let closestFrequency = Math.pow(2, (semitonesFromA4 / 12))*440;
  	let delta = frequency - closestFrequency;
  	let linearDelta = Math.log2(frequency) - Math.log2(closestFrequency);

  	document.querySelector(".arrow").style.transform = "rotate(" + 1000*linearDelta + "deg)"

  	if(Math.abs(linearDelta) < 0.01){
  		document.querySelector(".tuner").classList.add("good");
  	}
  	else{
  		let goodClass = document.querySelector(".good");
  		if(goodClass != null){
  			goodClass.classList.remove("good");
  		}
  	}

  	document.querySelector(".frequency").innerHTML = frequency.toFixed(2) + "Hz / " + closestFrequency.toFixed(2) + "Hz"

  }

});
