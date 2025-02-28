import { EffectComposer, RenderPass, BloomEffect, EffectPass } from 'postprocessing';

export default class PostProcessing {
    constructor(renderer, scene, camera) {
        this.composer = new EffectComposer(renderer);
        this.composer.addPass(new RenderPass(scene, camera));

        const bloomEffect = new BloomEffect({
            intensity: 0.8,
            luminanceThreshold: 0.2,
            luminanceSmoothing: 0.8
        });

        this.composer.addPass(new EffectPass(camera, bloomEffect));
    }

    render() {
        this.composer.render();
    }
} 