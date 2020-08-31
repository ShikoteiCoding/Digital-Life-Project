class Network {

    constructor(architecture) {
        this.layers = []

        // Init the layers provided in the architecture;
        this.initLayers(architecture);
    }

    initLayers(architecture) {
        for (let i = 0; i < architecture.length; i++) {
            this.layers[i] = new Layer(architecture[i].nodeCount, architecture[i].type, architecture[i].activation);
        }
    }

    feedForward() {
        for (let i = 0; i < this.layers.length - 1; i++) {
            this.layers[i].feedForward(this.layers[i + 1]);
        }
    }
}
