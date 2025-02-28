export default class Audio {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    playCollectSound() {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(600, this.context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, this.context.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 0.2);
    }

    playDamageSound() {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, this.context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 0.3);
    }

    playAmbientWind() {
        const bufferSize = 2 * this.context.sampleRate;
        const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.context.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const gainNode = this.context.createGain();
        gainNode.gain.setValueAtTime(0.05, this.context.currentTime);

        whiteNoise.connect(gainNode).connect(this.context.destination);
        whiteNoise.start(0);
    }
} 