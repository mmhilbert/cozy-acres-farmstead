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
    checkCowCollision(cows);
    checkChickenCollision(chickens);
  });
}
async function setup() {
  await app.init({ backgroundAlpha: 0, width: 800, height: 600 });
  document.querySelector(".farm").appendChild(app.canvas);
}

async function addCows() {
  const cowTexture = await Assets.load("./assets/cow.png");
  const cowContainer = new Container();
  // cowContainer.width = 100;
  // cowContainer.height = 100;
  // console.log(cowContainer.getSize());

  const allCows = allAnimals.filter((animal) => animal.animal.name === "Cow");

  for (let i = 0; i < allCows.length; i++) {
    const cow = new Sprite(cowTexture);
    cow.id = allCows[i].id;
    cow.on("pointerdown", function () {
      handleFeedAnimal(cow.id);
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

  const sheepCount = 5;

  for (let i = 0; i < sheepCount; i++) {
    const sheep = new Sprite(sheepTexture);

    sheep.anchor.set(0.5);

    sheep.x = 600;
    sheep.y = 400;

    app.stage.addChild(sheep);

    sheeps.push(sheep);
  }
}

async function addPigs() {
  const pigTexture = await Assets.load("./assets/pig.png");

  const pigCount = 5;

  for (let i = 0; i < pigCount; i++) {
    const pig = new Sprite(pigTexture);

    pig.anchor.set(0.5);

    pig.x = 600;
    pig.y = 200;

    app.stage.addChild(pig);

    pigs.push(pig);
  }
}
async function addChickens() {
  const chickenTexture = await Assets.load("./assets/chicken.png");
  const chickenContainer = new Container();

  const chickenCount = 5;

  for (let i = 0; i < chickenCount; i++) {
    const chicken = new Sprite(chickenTexture);
    app.stage.addChild(chickenContainer);

    chicken.anchor.set(0.5);

    chicken.direction = Math.random() * Math.PI * 2;
    chicken.speed = Math.random() + 1;
    chicken.turningSpeed = Math.random() - 0.8;

    chicken.x = 150;
    chicken.y = 400;

    chicken.scale.set(0.8 + Math.random() * 0.3);
    chickenContainer.addChild(chicken);
    app.stage.addChild(chicken);
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
    chicken.x += Math.sin(chicken.direction) * chicken.speed;
    chicken.y += Math.cos(chicken.direction) * chicken.speed;
    chicken.rotation = -chicken.direction - Math.PI / 2;

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

init();
