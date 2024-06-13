const {
  Application,
  Assets,
  Container,
  Sprite,
  Texture,
  TilingSprite,
  DisplacementFilter,
} = window.PIXI;

const cows = [];
const chickens = [];
const sheeps = [];
const pigs = [];

const app = new Application();

async function init() {
  await setup();
  addCows();
  addSheep();
  addPigs();
  addChickens();

  app.ticker.add((time) => {
    animateCows(app, cows, time);
    animateChickens(app, chickens, time);
    animateSheep(app, sheeps, time);
    animatePigs(app, pigs, time);
    checkCowCollision(cows);
    checkChickenCollision(chickens);
    checkSheepCollision(sheeps);
    checkPigCollision(pigs);
  });
}
async function setup() {
  await app.init({ backgroundAlpha: 0, width: 800, height: 600 });
  document.querySelector(".farm").appendChild(app.canvas);
}

async function addCows() {
  const cowTexture = await Assets.load("./assets/cow.png");
  const cowContainer = new Container();

  const allCows = allAnimals.filter((animal) => animal.animal.name === "Cow");

  for (let i = 0; i < allCows.length; i++) {
    const cow = new Sprite(cowTexture);
    cow.id = allCows[i].id;
    cow.on("pointerdown", function () {
      handleFeedAnimal(cow.id);
      //adding something for commit
    });

    app.stage.addChild(cowContainer);

    cow.anchor.set(0.5);

    cow.direction = Math.random() * Math.PI * 2;
    cow.speed = Math.random();
    cow.turningSpeed = Math.random() - 0.8;

    cow.x = 150;
    cow.y = 200;

    cow.scale.set(0.8 + Math.random() * 0.3);
    cowContainer.addChild(cow);
    cows.push(cow);

    cow.interactive = true;
    cow.eventMode = "static";
  }
}

async function addSheep() {
  const sheepTexture = await Assets.load("./assets/sheep.png");
  const sheepContainer = new Container();

  const allSheep = allAnimals.filter(
    (animal) => animal.animal.name === "Sheep"
  );

  for (let i = 0; i < allSheep.length; i++) {
    const sheep = new Sprite(sheepTexture);
    sheep.id = allSheep[i].id;
    sheep.on("pointerdown", function () {
      console.log(sheep.id);
    });

    app.stage.addChild(sheepContainer);
    sheep.anchor.set(0.5);

    sheep.direction = Math.random() * Math.PI * 2;
    sheep.speed = Math.random();
    sheep.turningSpeed = Math.random() - 0.8;

    sheep.x = 600;
    sheep.y = 400;

    sheep.interactive = true;
    sheep.eventMode = "static";

    sheepContainer.addChild(sheep);

    sheeps.push(sheep);
  }
}

async function addPigs() {
  const pigTexture = await Assets.load("./assets/pig.png");
  const pigContainer = new Container();

  const allPigs = allAnimals.filter((animal) => animal.animal.name === "Pig");

  console.log(allPigs);

  for (let i = 0; i < allPigs.length; i++) {
    const pig = new Sprite(pigTexture);
    pig.id = allPigs[i].id;
    pig.on("pointerdown", function () {
      console.log(pig.id);
    });

    app.stage.addChild(pigContainer);

    pig.anchor.set(0.5);

    pig.direction = Math.random() * Math.PI * 2;
    pig.speed = Math.random();
    pig.turningSpeed = Math.random() - 0.8;

    pig.x = 600;
    pig.y = 200;

    pig.interactive = true;
    pig.eventMode = "static";

    pigContainer.addChild(pig);

    pigs.push(pig);
  }
}
async function addChickens() {
  const chickenTexture = await Assets.load("./assets/chicken.png");
  const chickenContainer = new Container();

  const allChickens = allAnimals.filter(
    (animal) => animal.animal.name === "Chicken"
  );
  console.log(allChickens);
  for (let i = 0; i < allChickens.length; i++) {
    const chicken = new Sprite(chickenTexture);
    chicken.id = allChickens[i].id;
    chicken.on("pointerdown", function () {
      console.log(chicken.id);
    });
    app.stage.addChild(chickenContainer);

    chicken.anchor.set(0.5);

    chicken.direction = Math.random() * Math.PI * 2;
    console.log(chicken.direction);
    chicken.speed = Math.random();
    chicken.turningSpeed = Math.random() - 0.8;

    chicken.x = 150;
    chicken.y = 400;

    chicken.previousX = chicken.x;
    chicken.previousY = chicken.y;

    chicken.isFacingTowards = true;

    chicken.scale.set(0.8 + Math.random() * 0.3);
    chickenContainer.addChild(chicken);

    chicken.interactive = true;
    chicken.eventMode = "static";

    chickens.push(chicken);
  }
}

function animateCows(app, cows, time) {
  const delta = time.deltaTime;

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  cows.forEach((cow) => {
    cow.direction += cow.turningSpeed * 0.01;
    cow.x += Math.sin(cow.direction) * cow.speed;
    cow.y += Math.cos(cow.direction) * cow.speed;
    cow.rotation = -cow.direction - Math.PI / 2;

    if (cow.x < -stagePadding) {
      cow.x += boundWidth;
    }
    if (cow.x > boundWidth) {
      cow.x -= boundWidth;
    }
    if (cow.y < -stagePadding) {
      cow.y += boundHeight;
    }
    if (cow.y > boundHeight) {
      cow.y -= boundHeight;
    }
  });
}

function animateChickens(app, chickens, time) {
  const delta = time.deltaTime;

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  chickens.forEach((chicken) => {
    chicken.direction += chicken.turningSpeed * 0.01;

    chicken.previousX = chicken.x;
    chicken.previousY = chicken.y;

    // if(chicken.y - chicken.previousY > 0) {

    // }

    chicken.x += Math.sin(chicken.direction) * chicken.speed;
    chicken.y += Math.cos(chicken.direction) * chicken.speed;

    chicken.isFacingTowards = chicken.y - chicken.previousY > 0;

    console.log(chicken.isFacingTowards, chicken.y - chicken.previousY);
    // console.log(chicken.direction);
    chicken.rotation = -chicken.direction - Math.PI / 2;
    // console.log(chicken.direction);
    if (chicken.x < -stagePadding) {
      chicken.x += boundWidth;
    }
    if (chicken.x > boundWidth) {
      chicken.x -= boundWidth;
    }
    if (chicken.y < -stagePadding) {
      chicken.y += boundHeight;
    }
    if (chicken.y > boundHeight) {
      chicken.y -= boundHeight;
    }

    // console.log(chicken.y);
  });
}

function animateSheep(app, sheeps, time) {
  const delta = time.deltaTime;

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  sheeps.forEach((sheep) => {
    sheep.direction += sheep.turningSpeed * 0.01;
    sheep.x += Math.sin(sheep.direction) * sheep.speed;
    sheep.y += Math.cos(sheep.direction) * sheep.speed;
    sheep.rotation = -sheep.direction - Math.PI / 2;

    if (sheep.x < -stagePadding) {
      sheep.x += boundWidth;
    }
    if (sheep.x > boundWidth) {
      sheep.x -= boundWidth;
    }
    if (sheep.y < -stagePadding) {
      sheep.y += boundHeight;
    }
    if (sheep.y > boundHeight) {
      sheep.y -= boundHeight;
    }
  });
}

function animatePigs(app, pigs, time) {
  const delta = time.deltaTime;

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  pigs.forEach((pig) => {
    pig.direction += pig.turningSpeed * 0.01;
    pig.x += Math.sin(pig.direction) * pig.speed;
    pig.y += Math.cos(pig.direction) * pig.speed;
    pig.rotation = -pig.direction - Math.PI / 2;

    if (pig.x < -stagePadding) {
      pig.x += boundWidth;
    }
    if (pig.x > boundWidth) {
      pig.x -= boundWidth;
    }
    if (pig.y < -stagePadding) {
      pig.y += boundHeight;
    }
    if (pig.y > boundHeight) {
      pig.y -= boundHeight;
    }
  });
}

function checkCowCollision(cows) {
  cows.forEach((cow) => {
    if (cow.x < 0) {
      cow.x = 400;
    }
    if (cow.x > 400) {
      cow.x = 0;
    }
    if (cow.y < 0) {
      cow.y = 300;
    }
    if (cow.y > 300) {
      cow.y = 0;
    }
  });
}

function checkChickenCollision(chickens) {
  chickens.forEach((chicken) => {
    if (chicken.x < 0) {
      chicken.x = 400;
    }
    if (chicken.x > 400) {
      chicken.x = 0;
    }
    if (chicken.y < 300) {
      chicken.y = 600;
    }
    if (chicken.y > 600) {
      chicken.y = 300;
    }
  });
}

function checkSheepCollision(sheeps) {
  sheeps.forEach((sheep) => {
    if (sheep.x < 400) {
      sheep.x = 800;
    }
    if (sheep.x > 800) {
      sheep.x = 400;
    }
    if (sheep.y < 300) {
      sheep.y = 600;
    }
    if (sheep.y > 600) {
      sheep.y = 300;
    }
  });
}

function checkPigCollision(pigs) {
  pigs.forEach((pig) => {
    if (pig.x < 400) {
      pig.x = 800;
    }
    if (pig.x > 800) {
      pig.x = 400;
    }
    if (pig.y < 0) {
      pig.y = 300;
    }
    if (pig.y > 300) {
      pig.y = 0;
    }
  });
}

function checkCowDirection(cows) {
  cows.forEach((cow) => {
    if (cow.direction > 270) {
    }
  });
}
init();
