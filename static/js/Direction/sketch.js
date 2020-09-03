class SimpleMover {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.vel = createVector(random(-10, 10), random(-10, 10));
    }

    move(n, s, e, w) {
        let movement = createVector(n-s, e-w);
        let movement_angle = createVector(1, 0).angleBetween(this.vel);
        movement.rotate(movement_angle);
        this.acc = movement;
        this.acc.setMag(0.5);
        this.vel = this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos = this.pos.add(this.vel);
        this.acc.x = 0;
        this.acc.y = 0;
    }

    show() {
        fill(100);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 20, 20);
        stroke(1);
        this.direction = this.vel.copy()
        this.direction.setMag(20);
        line(this.pos.x, this.pos.y, this.direction.x + this.pos.x, this.direction.y + this.pos.y);
    }


}

let mover;

function setup() {
    createCanvas(400, 400);
    background(180);
    mover = new SimpleMover();
}

function draw() {
    background(180);
    mover.show();
}

function moveObject() {
    let forms = document.getElementsByClassName("button-in-card");
    let values = [];
    for (let i = 0; i < forms.length; i++) {
        if (!forms[i].value) break;
        else values[i] = forms[i].value;
    }
    if (values.length === 4) {
        let v = values.map(el => parseInt(el));
        mover.move(v[0], v[1], v[2], v[3]);
    } else {
        alert('Need 4 digit direction to move');
    }
}