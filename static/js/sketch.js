let mover;
let food;
let drag_coeff = 1;
let MAX_ENERGY = 1000;
let MAX_HEALTH = 100;
let FPS = 60;
let EGG_SIZE = 4;

let DEFAULT_DNA = {
  radius: 10,
  vision_depth: 50,
  vision_angle: 30,
  hatch_time: 20,
  color_red: 100,
  color_green: 100,
  color_blue: 100,
  mutation_size: 1,
  mutation_chance: 1
}

function setup() {
  createCanvas(400, 400);
  board = new Board(5, 1);
}

function draw() {
  background(220);
  // Entities
  board.show_entities();
  board.generate_entities_on_random();

  // Movers
  board.activate_movers();
  board.show_movers();

  // Eggs
  board.hatch_eggs();
  board.show_eggs();
}
