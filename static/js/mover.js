class Mover {

  constructor(pos, dna, board, visual = false) {
    this.pos = pos;
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.visual = visual;
    this.conic_vision_right = createVector();
    this.conic_vision_left = createVector();
    this.radar_color = [255, 0, 0]; // red by default
    this.is_moving = true;
    this.board = board;

    // Static characteristics (not changing with genes)
    this.energy_base_consuption_per_second = dna.radius;   // Base consuption per second is the radius of the dot
    this.max_force = 0.5;
    this.max_speed = 3;
    this.energy = MAX_ENERGY;         // input
    this.health = MAX_HEALTH;         // input
    this.fertilized = true;           // input

    // Genes
    this.dna = dna;
  }

  // Boolean
  still_energy() {
    return this.energy > 0;
  }

  // Motion constraints / physics
  edges() {
    if (this.pos.x >= width - this.dna.radius) { this.acc.x = 0; this.pos.x = width - this.dna.radius };
    if (this.pos.x <= this.dna.radius) { this.acc.x = 0; this.pos.x = this.dna.radius };
    if (this.pos.y >= height - this.dna.radius) { this.acc.y = 0; this.pos.y = height - this.dna.radius };
    if (this.pos.y <= this.dna.radius) { this.acc.y = 0; this.pos.y = this.dna.radius };
  }

  applyForce(force) {
    this.acc.add(force);
  }

  energy_consuption() {
    if (this.is_moving) this.energy -= (this.vel.mag() + this.energy_base_consuption_per_second)/FPS;
    if (!this.is_moving) this.energy -= this.energy_base_consuption_per_second/FPS;
  }


  // Behaviors
  eat(entity, index) {
    this.energy += entity.energy;
    if (this.energy > MAX_ENERGY) this.energy = MAX_ENERGY;
    entity.die(index);
  }

  hungry() {
    return this.energy < MAX_ENERGY;
  }

  touch(entity) {
    if (entity == null) return;
    let dist = p5.Vector.sub(this.pos, entity.pos).mag();
    if (dist <= (entity.r + this.dna.radius)) return true;
  }

  lay() {
    if (this.fertilized) Board.LayEgg(this.board, this);
  }

  // vision(entities) {
  //   let entity_detected = 0;
  //   for (let i = 0; i < entities.length; i++) {
  //     let vect = p5.Vector.sub(entities[i].pos, this.pos);
  //     let dist = vect.magSq();
  //     if (dist <= this.dna.vision_depth**2)  {
  //       let scalar = p5.Vector.dot(vect, this.vel);
  //       if (scalar > 0){
  //         let angle = vect.angleBetween(this.vel);
  //         if (angle < this.dna.vision_angle && angle > -this.dna.vision_angle) {
  //           entity_detected += 1;
  //           if (this.hungry() && this.touch(entities[i])) this.eat(entities[i], i);
  //         }
  //       }
  //     }
  //   }
  //   if (entity_detected)  this.radar_color = [0, 255, 0];
  //   if (!entity_detected) this.radar_color = [255, 0, 0];
  // }

  seek(target) {
    let desired = p5.Vector.sub(target.pos, this.pos);

    desired.setMag(this.max_speed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.max_force);
    this.applyForce(steer);
  }

  behave(entities) {
    let record = Infinity;
    let closest = -1;
    for (let i = 0; i < entities.length; i++) {
      let dist = p5.Vector.sub(entities[i].pos, this.pos).mag();
      if (dist < record) {
        record = dist;
        closest = i;
      }
    }
    if (this.touch(entities[closest])) {
      this.eat(entities[closest], closest)
    } else if (closest > -1) {
      this.seek(entities[closest]);
    } else {
      this.vel.mult(0);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.max_speed);
    if (this.still_energy()) this.pos.add(this.vel);

    this.conic_vision_right = this.vel.copy().rotate(radians(this.dna.vision_angle)).setMag(this.dna.vision_depth);
    this.conic_vision_left = this.vel.copy().rotate(radians(-this.dna.vision_angle)).setMag(this.dna.vision_depth);

    if (this.visual) {
      this.visualVel = this.vel.copy().mult(10);
      this.visualAcc = this.acc.copy().mult(100);
    }
    this.energy_consuption();
    this.acc.mult(0);
  }

  show() {
    stroke(220, 100);
    strokeWeight(1);
    fill(this.dna.R, this.dna.G, this.dna.B);
    ellipse(this.pos.x, this.pos.y, 2*this.dna.radius, 2*this.dna.radius);
    if (this.visual) {
      stroke(255);
      strokeWeight(1);
      fill(this.radar_color[0], this.radar_color[1], this.radar_color[2], 100);
      arc(this.pos.x, this.pos.y, 2*this.dna.vision_depth, 2*this.dna.vision_depth, createVector(1, 0).angleBetween(this.conic_vision_left), createVector(1, 0).angleBetween(this.conic_vision_right));
      //stroke('green');
      //line(this.pos.x, this.pos.y, this.pos.x + this.visualAcc.x, this.pos.y + this.visualAcc.y);
      strokeWeight(3);
      stroke(255);
      line(this.pos.x, this.pos.y, this.pos.x + this.conic_vision_right.x, this.pos.y + this.conic_vision_right.y);
      line(this.pos.x, this.pos.y, this.pos.x + this.conic_vision_left.x, this.pos.y + this.conic_vision_left.y);
      stroke('red');
      line(this.pos.x, this.pos.y, this.pos.x + this.visualVel.x, this.pos.y + this.visualVel.y);
      strokeWeight(1);
    }
  }

  show_energy() {
    textSize(10);
    fill(255, 255, 255);
    noStroke();
    text(this.energy.toFixed(2), 10, 10);
  }

}
