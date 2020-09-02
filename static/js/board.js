class Board {

  constructor(nb_ent, nb_mov) {
    // Entities
    this.entities = [];
    this.min_entity_radius = 3;
    this.max_entity_radius = 5;
    this.max_entities = 2*nb_ent; // by default
    this.init_entities();

    // Movers
    this.movers = [];
    this.nb_movers = nb_mov;
//    this.init_movers();

    // Eggs
    this.eggs = [];
    this.init_eggs();
  }

  /*
  ********************************************************************
  ************************* Entities methods *************************
  ********************************************************************
  */
  init_entities() {
    for (let i = 0; i < this.max_entities/2; i++) {
      this.generate_one_entity();
    }
  }

  show_entities() {
    for (let entity of this.entities) {
      entity.show();
    }
  }

  entity_position_is_valid(v, r) {
    if (this.entities !== null) {
      for (let entity of this.entities) {
        let dist = p5.Vector.sub(entity.pos, v).mag();
        if (dist <= (r + entity.r)) return false;
      }
    }
    return true;
  }

  generate_one_entity() {
    let spot_founded = false;
    let new_pos;
    let new_radius;
    while (!spot_founded) {
      new_radius = floor(random(this.min_entity_radius, this.max_entity_radius));
      new_pos = createVector(random(new_radius, width-new_radius), random(new_radius, height-new_radius));
      if (this.entity_position_is_valid(new_pos, new_radius)) spot_founded = true;
    }
    this.entities.push(new Food(new_pos, new_radius, this));
  }

  generate_entities_on_random() {
    if (this.entities.length < this.max_entities) {
      if (random(100) < 1) this.generate_one_entity();
    }
  }


  /*
  ********************************************************************
  ************************** Movers methods **************************
  ********************************************************************
  */
  init_movers() {
     for (let i = 0; i < this.nb_movers; i++) {
       this.movers[i] = new Mover(createVector(random(width), random(height)), DEFAULT_DNA, true);
     }
  }

  show_movers() {
    for (let mover of this.movers) {
      mover.show();
    }
  }

  activate_movers() {
    for (let mover of this.movers) {
      mover.edges();
      mover.behave(board.entities);
      mover.update();
      // mover.show_energy();
    }
  }



  /*
  ********************************************************************
  *************************** Eggs methods ***************************
  ********************************************************************
  */
  init_eggs() {
    for (let i = 0; i < this.nb_movers; i++) {
      this.eggs[i] = new Egg(createVector(random(EGG_SIZE, width-EGG_SIZE), random(EGG_SIZE, height-EGG_SIZE)), EGG_SIZE, this, DEFAULT_DNA);
    }
  }

  hatch_eggs() { // Can be fusioned with egg show
    for (let i = 0; i < this.eggs.length; i++) {
      if (this.eggs[i].hatchable()) {
        Board.HatchEgg(this, this.eggs[i]);
        Board.DestroyEgg(this, i);
        i -=1;
      }
    }
  }

  show_eggs() { // Can be fusionned with egg hatch
    for (let egg of this.eggs) {
      egg.show();
    }
  }


  /*
  ********************************************************************
  *************************** Static methods *************************
  ********************************************************************
  */
  static DestroyEntity(board, index) {
    if (index > board.entities.length) console.log('Err: out of range');
    if (index !== -1) board.entities.splice(index, 1);
  }

  static HatchEgg(board, egg) {
    if (egg.dna !== null && egg.pos !== null) {
      board.movers.push(new Mover(egg.pos.copy(), egg.dna, board, true));
    }
  }

  static DestroyEgg(board, index) {
    if (index > board.eggs.length) console.log('Err: out of range');
    if (index !== -1) board.eggs.splice(index, 1);
  }

  static LayEgg(board, mover) {
    if (mover !== null) {
      console.log(board.eggs);
      board.eggs.push(new Egg(mover.pos.copy(), EGG_SIZE, board, mover.dna));
    }
  }

}
