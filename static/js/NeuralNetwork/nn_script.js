let architecture = [
    { nodeCount: 12, type:"input", activation:"sigmoid"},
    { nodeCount: 2, type:"output", activation:"sigmoid"}
]

let nn = new Network(architecture = architecture);