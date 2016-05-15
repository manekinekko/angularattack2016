

export class EasterAudio {
    private context;
    private soundSource;
    private soundBuffer;
    private url = '/images/ng-show.mp3';

    init() {
        if (typeof AudioContext !== "undefined") {
            this.context = new AudioContext();
        } else if (typeof (<any>window).webkitAudioContext !== "undefined") {
            this.context = new (<any>window).webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
    }

    // Step 2: Load our Sound using XHR
    startSound() {
        // Note: this loads asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", this.url, true);
        request.responseType = "arraybuffer";

        // Our asynchronous callback
        request.onload = function() {
            var audioData = request.response;
            this.audioGraph(audioData);
        };

        request.send();
    }

    // Finally: tell the source when to start
    playSound() {
        // play the source now
        console.log('playing');
        this.soundSource.start(this.context.currentTime);
    }

    stopSound() {
        // stop the source now
        this.soundSource.stop(this.context.currentTime);
    }

    // This is the code we are interested in
    audioGraph(audioData) {
        // create a sound source
        this.soundSource = this.context.createBufferSource();

        // The Audio Context handles creating source buffers from raw binary
        this.context.decodeAudioData(audioData, function(soundBuffer) {
            // Add the buffered data to our object
            this.soundSource.buffer = soundBuffer;

            this.volumeNode = this.context.createGain();

            //Set the volume
            this.volumeNode.gain.value = 0.1;

            // Wiring
            this.soundSource.connect(this.volumeNode);
            this.volumeNode.connect(this.context.destination);

            this.filterNode = this.context.createBiquadFilter();

            // Specify this is a lowpass filter
            this.filterNode.type = 0;

            // Quieten sounds over 220Hz
            this.filterNode.frequency.value = 220;

            this.soundSource.connect(this.volumeNode);
            this.volumeNode.connect(this.filterNode);
            this.filterNode.connect(this.context.destination);

            // Finally
            this.playSound(this.soundSource);
        });

    }
}
