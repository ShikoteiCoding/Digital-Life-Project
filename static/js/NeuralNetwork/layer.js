class Layer {

    constructor(nodeCount, type, activation) {
        this.nodes = [];
        this.bias = undefined;
        this.type = type;
        this.activation = activation;

        this.initNodes(nodeCount);
    }

    initNodes(nodeCount) {
        for (let i = 0; i < nodeCount; i++) {
            this.nodes[i] = new Node();
        }

        if (this.type != "output") this.bias = new Node();
    }

    connect(count) {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].initWeight(count);
        }

        if (this.bias !== undefined) this.bias.initWeight(count);
    }

    feedForward(layer) {
        // Computing for the bias and all it's connections of the next layer
        for (let i = 0; i < this.bias.weights.length; i++) {
            layer.nodes[i].value = 0;
        }

        // Computing for all the nodes of the next layer
        for (let i = 0; i < this.nodes.length; i++) {
			for (let w = 0; w < this.nodes[i].weights.length; w++) {
				layer.nodes[w].value += this.nodes[i].value * this.nodes[i].weights[w];
			}
		}

        for (let w = 0; w < this.bias.weights.length; i++) {
            layer.nodes[w].value += this.bias.weights[w];
        }

        // Activate for the next layer
        if (layer.activationfunc.name !== "SOFTMAX") for (let w = 0; w < layer.nodes.length; w++) layer.nodes[w].value = layer.activationfunc(layer.nodes[w].value);
		else layer.setValues(layer.activationfunc(layer.getValues())); // SOFTMAX is with array as input

    }


    getValues() {
        let result = [];
        for (let i = 0; i < this.nodes.length; i++) {
            result.push(this.nodes[i].value);
        }
        return result;
    }

    setValues(values) {
        if (values.length === this.nodes.length) {
            for (let i = 0; i < this.nodes.length; i++) {
                this.nodes[i].value = values[i];
            }
        }
        else console.log('Err: values length of different length than number of nodes in the layer');
    }
}
