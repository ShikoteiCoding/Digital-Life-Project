class Node {

    constructor() {
        this.weights = []; // All connections of the node
        this.value = 0;   // The actual value of the node (once activation computed)
    }

    initWeights(count) {
        for (let i = 0; i < count; i++) {
            this.weights.push(Math.random() * 2 - 1); // random number between -1 and 1
        }
    }
}