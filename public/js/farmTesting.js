const {
  Application,
  Assets,
  Container,
  Sprite,
  Texture,
  TilingSprite,
  DisplacementFilter,
  AnimatedSprite,
} = window.PIXI;

let cows = [];
let chickens = [];
let sheeps = [];
let pigs = [];
let cowsMarkedForDeletion = [];
let chickensMarkedForDeletion = [];
let sheepsMarkedForDeletion = [];
let pigsMarkedForDeletion = [];

let cowForwardTextures = [];
let cowBackwardTextures = [];
let chickenForwardTextures = [];
let chickenBackwardTextures = [];
let sheepForwardTextures = [];
let sheepBackwardTextures = [];
let pigForwardTextures = [];
let pigBackwardTextures = [];

const app = new Application();

function handleFeedCow(id) {
  console.log(id);
  const cow = cows.find((cow) => cow.id === id);
  if (cow.canFeed) {
    handleFeedAnimalFetch(cow.id);
    console.log(cow);
    cow.lastFed = new Date().getTime();
    console.log("Cow fed");
    cow.canFeed = false;
  }
}

function handleFeedChicken(id) {
  console.log(id);
  const chicken = chickens.find((chicken) => chicken.id === id);
  if (chicken.canFeed) {
    handleFeedAnimalFetch(chicken.id);
    console.log(chicken);
    chicken.lastFed = new Date().getTime();
    console.log("Chicken fed");
    chicken.canFeed = false;
  }
}

function handleFeedSheep(id) {
  const sheep = sheeps.find((sheep) => sheep.id === id);
  console.log(id);
  if (sheep.canFeed) {
    handleFeedAnimalFetch(sheep.id);
    console.log(sheep);
    sheep.lastFed = new Date().getTime();
    console.log(sheep);
    console.log("Sheep fed");
    sheep.canFeed = false;
  }
}

function handleFeedPig(id) {
  const pig = pigs.find((pig) => pig.id === id);
  console.log(id);
  if (pig.canFeed) {
    console.log(pig);
    handleFeedAnimalFetch(pig.id);
    console.log(pig);
    pig.lastFed = new Date().getTime();
    console.log("Pig fed");
    pig.canFeed = false;
  }
}

function checkCanFeedPig() {
  const currentTime = new Date().getTime();
  pigs.forEach((pig) => {
    //increase hunger level
    pig.hungerLevel++;
    //checking if pig hunger level is greated than max
    if (pig.hungerLevel > 40) {
      handleUnaliveAnimalFetch(pig.id);
      pigsMarkedForDeletion.push(pig.id);
    }
    // checking if pig can be fed
    if (currentTime - pig.lastFed > 10000) {
      pig.canFeed = true;
    } else {
      pig.canFeed = false;
    }
    console.log(pig.canFeed);
  });
  // start te removal process
  pigsToHeaven();
}

function checkCanFeedSheep() {
  const currentTime = new Date().getTime();

  sheeps.forEach((sheep) => {
    // icrease hunger level
    sheep.hungerLevel++;
    // checking if sheep hunger level is greater than max
    if (sheep.hungerLevel > 40) {
      handleUnaliveAnimalFetch(sheep.id);
      sheepsMarkedForDeletion.push(sheep.id);
    }
    // checking if sheep can be fed
    if (currentTime - sheep.lastFed > 10000) {
      sheep.canFeed = true;
    } else {
      sheep.canFeed = false;
    }
  });
  // start the removal process
  sheepsToHeaven();
}
// added for commit
function sheepsToHeaven() {
  sheepsMarkedForDeletion.forEach((id) => {
    sheeps = sheeps.filter((sheep) => {
      const sheepCanStayAlive = sheep.id !== id;
      if (!sheepCanStayAlive) {
        app.stage.removeChild(sheep);
        sheep.destroy();
      }
      return sheepCanStayAlive;
    });
  });
}

function pigsToHeaven() {
  pigsMarkedForDeletion.forEach((id) => {
    pigs = pigs.filter((pig) => {
      const pigCanStayAlive = pig.id !== id;
      if (!pigCanStayAlive) {
        app.stage.removeChild(pig);
        pig.destroy();
      }
      return pigCanStayAlive;
    });
  });
}

// function handleHungerLevel() {}

function checkCanFeedChicken() {
  const currentTime = new Date().getTime();
  chickens.forEach((chicken) => {
    // increase hunger level
    chicken.hungerLevel++;
    if (chicken.hungerLevel > 20) {
      handleUnaliveAnimalFetch(chicken.id);
      chickensMarkedForDeletion.push(chicken.id);
    }
    // checking if chicken can be fed,
    if (currentTime - chicken.lastFed > 10000) {
      chicken.canFeed = true;
    } else {
      chicken.canFeed = false;
    }
    // start removal process
    chickensToHeaven();
  });
}

function chickensToHeaven() {
  chickensMarkedForDeletion.forEach((id) => {
    chickens = chickens.filter((chicken) => {
      const chickenCanStayAlive = chicken.id !== id;
      if (!chickenCanStayAlive) {
        app.stage.removeChild(chicken);
        chicken.destroy();
      }
      return chickenCanStayAlive;
    });
  });
}

function checkCanFeedCow() {
  const currentTime = new Date().getTime();
  cows.forEach((cow) => {
    //increase hunger level
    cow.hungerLevel++;
    //checking if cow hunger level is greated than max
    console.log(cow.hungerLevel);
    if (cow.hungerLevel > 1000000) {
      // is_alive = false
      handleUnaliveAnimalFetch(cow.id);
      cowsMarkedForDeletion.push(cow.id);
    }
    // checking if cow can be fed
    if (currentTime - cow.lastFed > 10000) {
      cow.canFeed = true;
    } else {
      cow.canFeed = false;
    }
    console.log(cow.canFeed);
  });
  cowsToHeaven();
}
function cowsToHeaven() {
  cowsMarkedForDeletion.forEach((id) => {
    cows = cows.filter((cow) => {
      const cowCanStayAlive = cow.id !== id;
      if (!cowCanStayAlive) {
        app.stage.removeChild(cow);
        cow.destroy();
      }
      return cowCanStayAlive;
    });
  });
}
setInterval(() => {
  // handleHungerLevel();
  checkCanFeedCow();
  checkCanFeedChicken();
  checkCanFeedSheep();
  checkCanFeedPig();
}, 1000);

async function init() {
  await setup();
  await preload();
  addCows();
  addSheep();
  addPigs();
  addChickens();
  console.log(allAnimals);

  app.ticker.add((time) => {
    animateCows(app, cows, time);
    animateChickens(app, chickens, time);
    animateSheep(app, sheeps, time);
    animatePigs(app, pigs, time);
    checkCowCollision(cows);
    checkChickenCollision(chickens);
    checkSheepCollision(sheeps);
    checkPigCollision(pigs);
    // setInterval(testIntervals, 1000);
    // console.log(time);
  });
}

async function preload() {
  cowForwardTextures.push(
    await Assets.load("./assets/cowSprites/fowardCowOne.png")
  );
  cowForwardTextures.push(
    await Assets.load("./assets/cowSprites/fowardCowTwo.png")
  );
  cowForwardTextures.push(
    await Assets.load("./assets/cowSprites/fowardCowThree.png")
  );
  cowForwardTextures.push(
    await Assets.load("./assets/cowSprites/fowardCowFour.png")
  );
  cowBackwardTextures.push(
    await Assets.load("./assets/cowSprites/backwardCowOne.png")
  );
  cowBackwardTextures.push(
    await Assets.load("./assets/cowSprites/backwardCowTwo.png")
  );
  cowBackwardTextures.push(
    await Assets.load("./assets/cowSprites/backwardCowThree.png")
  );
  cowBackwardTextures.push(
    await Assets.load("./assets/cowSprites/backwardCowFour.png")
  );
  console.log("pushed cow textures");
  chickenForwardTextures.push(
    await Assets.load("./assets/chickenSprites/forwardChickenOne.png")
  );
  chickenBackwardTextures.push(
    await Assets.load("./assets/chickenSprites/backwardChickenOne.png")
  );
  chickenForwardTextures.push(
    await Assets.load("./assets/chickenSprites/forwardChickenTwo.png")
  );
  chickenBackwardTextures.push(
    await Assets.load("./assets/chickenSprites/backwardChickenTwo.png")
  );
  chickenForwardTextures.push(
    await Assets.load("./assets/chickenSprites/forwardChickenThree.png")
  );
  chickenBackwardTextures.push(
    await Assets.load("./assets/chickenSprites/backwardChickenThree.png")
  );
  chickenForwardTextures.push(
    await Assets.load("./assets/chickenSprites/forwardChickenFour.png")
  );
  chickenBackwardTextures.push(
    await Assets.load("./assets/chickenSprites/backwardChickenFour.png")
  );
  console.log("pushed chicken textures");
  sheepForwardTextures.push(
    await Assets.load("./assets/sheepSprites/forwardSheepOne.png")
  );
  sheepBackwardTextures.push(
    await Assets.load("./assets/sheepSprites/backwardSheepOne.png")
  );
  sheepForwardTextures.push(
    await Assets.load("./assets/sheepSprites/forwardSheepTwo.png")
  );
  sheepBackwardTextures.push(
    await Assets.load("./assets/sheepSprites/backwardSheepTwo.png")
  );
  sheepForwardTextures.push(
    await Assets.load("./assets/sheepSprites/forwardSheepThree.png")
  );
  sheepBackwardTextures.push(
    await Assets.load("./assets/sheepSprites/backwardSheepThree.png")
  );
  sheepForwardTextures.push(
    await Assets.load("./assets/sheepSprites/forwardSheepFour.png")
  );
  sheepBackwardTextures.push(
    await Assets.load("./assets/sheepSprites/backwardSheepFour.png")
  );
  console.log("pushed sheep textures");
  pigForwardTextures.push(
    await Assets.load("./assets/pigSprites/forwardPigOne.png")
  );
  pigBackwardTextures.push(
    await Assets.load("./assets/pigSprites/backwardPigOne.png")
  );
  pigForwardTextures.push(
    await Assets.load("./assets/pigSprites/forwardPigTwo.png")
  );
  pigBackwardTextures.push(
    await Assets.load("./assets/pigSprites/backwardPigTwo.png")
  );
  pigForwardTextures.push(
    await Assets.load("./assets/pigSprites/forwardPigThree.png")
  );
  pigBackwardTextures.push(
    await Assets.load("./assets/pigSprites/backwardPigThree.png")
  );
  pigForwardTextures.push(
    await Assets.load("./assets/pigSprites/forwardPigFour.png")
  );
  pigBackwardTextures.push(
    await Assets.load("./assets/pigSprites/backwardPigFour.png")
  );
  console.log("pushed pig textures");
}
async function setup() {
  await app.init({ backgroundAlpha: 0, width: 800, height: 550 });
  document.querySelector(".farm").appendChild(app.canvas);
}

async function addCows() {
  // const cowForwardTexture = await Assets.load(cowForwardSprites);
  // const cowBackwardTexture = await Assets.load(cowBackwardSprites);
  // for (let i = 0; i < cowForwardTexture.length; i++) {
  //   let texure = PIXI.Texture.from(cowForwardTexture[i]);
  //   let textureBackward = PIXI.Texture.from(cowBackwardTexture[i]);
  //   cowForwardTextures.push(texure);
  //   cowBackwardTextures.push(textureBackward);
  // }
  // let AnimatedSprite = new PIXI.AnimatedSprite(cowForwardTextures);

  const cowContainer = new Container();

  const allCows = allAnimals.filter((animal) => animal.animal.name === "Cow");

  for (let i = 0; i < allCows.length; i++) {
    const cow = new AnimatedSprite(cowForwardTextures);
    cow.play();
    cow.animationSpeed = 0.1;
    cow.rotation = 0.5;
    cow.id = allCows[i].id;
    cow.on("pointerdown", function () {
      handleFeedCow(cow.id);
      cow.hungerLevel = 0;
    });

    app.stage.addChild(cowContainer);

    cow.anchor.set(0.5);

    cow.direction = Math.random() * Math.PI * 2;
    cow.speed = Math.random();
    cow.turningSpeed = Math.random() - 0.8;

    cow.x = 150;
    cow.y = 200;

    cow.lastFed = new Date().getTime();
    cow.canFeed = false;

    cow.hungerLevel = 0;
    cow.previousX = cow.x;
    cow.previousY = cow.y;

    cow.isFacingTowards = true;

    cow.scale.set(2 + Math.random() * 1.25);
    cowContainer.addChild(cow);
    cows.push(cow);

    cow.interactive = true;
    cow.eventMode = "static";
  }
}

async function addSheep() {
  // const sheepTexture = await Assets.load("./assets/sheep.png");
  const sheepContainer = new Container();

  const allSheep = allAnimals.filter(
    (animal) => animal.animal.name === "Sheep"
  );

  for (let i = 0; i < allSheep.length; i++) {
    const sheep = new AnimatedSprite(sheepForwardTextures);
    sheep.play();
    sheep.animationSpeed = 0.1;
    sheep.id = allSheep[i].id;
    sheep.on("pointerdown", function () {
      handleFeedSheep(sheep.id);
      sheep.hungerLevel = 0;
    });

    app.stage.addChild(sheepContainer);
    sheep.anchor.set(0.5);

    sheep.direction = Math.random() * Math.PI * 2;
    sheep.speed = Math.random();
    sheep.turningSpeed = Math.random() - 0.8;

    sheep.scale.set(2 + Math.random() * 1.25);

    sheep.x = 600;
    sheep.y = 400;

    sheep.lastFed = new Date().getTime();
    sheep.canFeed = false;

    sheep.hungerLevel = 0;
    sheep.previousX = sheep.x;
    sheep.previousY = sheep.y;

    sheep.isFacingTowards = true;

    sheep.interactive = true;
    sheep.eventMode = "static";

    sheepContainer.addChild(sheep);

    sheeps.push(sheep);
  }
}

async function addPigs() {
  const pigContainer = new Container();

  const allPigs = allAnimals.filter((animal) => animal.animal.name === "Pig");

  // console.log(allPigs);

  for (let i = 0; i < allPigs.length; i++) {
    const pig = new AnimatedSprite(pigForwardTextures);
    pig.play();
    pig.animationSpeed = 0.1;
    pig.id = allPigs[i].id;
    pig.on("pointerdown", function () {
      handleFeedPig(pig.id);
      pig.hungerLevel = 0;
    });

    app.stage.addChild(pigContainer);

    pig.anchor.set(0.5);

    pig.direction = Math.random() * Math.PI * 2;
    pig.speed = Math.random();
    pig.turningSpeed = Math.random() - 0.8;

    pig.scale.set(2 + Math.random() * 1.25);

    pig.x = 600;
    pig.y = 200;

    pig.previousX = pig.x;
    pig.previousY = pig.y;

    pig.lastFed = new Date().getTime();
    pig.canFeed = false;

    pig.hungerLevel = 0;

    pig.isFacingTowards = true;

    pig.interactive = true;
    pig.eventMode = "static";

    pigContainer.addChild(pig);

    pigs.push(pig);
  }
}
async function addChickens() {
  const chickenContainer = new Container();

  const allChickens = allAnimals.filter(
    (animal) => animal.animal.name === "Chicken"
  );
  // console.log(allChickens);
  for (let i = 0; i < allChickens.length; i++) {
    const chicken = new AnimatedSprite(chickenForwardTextures);
    chicken.play();
    chicken.animationSpeed = 0.1;
    chicken.id = allChickens[i].id;
    chicken.on("pointerdown", function () {
      handleFeedChicken(chicken.id);
      chicken.hungerLevel = 0;
    });
    app.stage.addChild(chickenContainer);

    chicken.anchor.set(0.5);

    chicken.direction = Math.random() * Math.PI * 2;
    // console.log(chicken.direction);
    chicken.speed = Math.random();
    chicken.turningSpeed = Math.random() - 0.8;

    chicken.x = 150;
    chicken.y = 400;

    chicken.previousX = chicken.x;
    chicken.previousY = chicken.y;

    chicken.lastFed = new Date().getTime();
    chicken.canFeed = false;

    chicken.hungerLevel = 0;

    chicken.isFacingTowards = true;

    chicken.scale.set(2 + Math.random() * 1.25);
    chickenContainer.addChild(chicken);

    chicken.interactive = true;
    chicken.eventMode = "static";

    chickens.push(chicken);
  }
}

function animateCows(app, cows, time) {
  const delta = time.deltaTime;
  // const fowardTexture = Assets.load("./assets/cowSprites/forwardCowOne.png");
  // const backwardTexture = Assets.load("./assets/cowSprites/backwardCowOne.png");

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  cows.forEach((cow) => {
    cow.direction += cow.turningSpeed * 0.01;

    cow.previousX = cow.x;
    cow.previousY = cow.y;

    cow.x += Math.sin(cow.direction) * cow.speed;
    cow.y += Math.cos(cow.direction) * cow.speed;
    cow.rotation = -cow.direction - Math.PI / 2;

    const previousFacing = cow.isFacingTowards;

    cow.isFacingTowards = cow.y - cow.previousY > 0;

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

    if (cow.isFacingTowards !== previousFacing) {
      cow.textures = cow.isFacingTowards
        ? cowForwardTextures
        : cowBackwardTextures;
      cow.gotoAndPlay(0);
    }

    // cow.play();
    // console.log(cow.currentFrame);
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

    chicken.x += Math.sin(chicken.direction) * chicken.speed;
    chicken.y += Math.cos(chicken.direction) * chicken.speed;

    const previousFacing = chicken.isFacingTowards;

    chicken.isFacingTowards = chicken.y - chicken.previousY > 0;

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
    if (chicken.isFacingTowards !== previousFacing) {
      chicken.textures = chicken.isFacingTowards
        ? chickenForwardTextures
        : chickenBackwardTextures;
      chicken.gotoAndPlay(0);
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

    sheep.previousX = sheep.x;
    sheep.previousY = sheep.y;

    sheep.x += Math.sin(sheep.direction) * sheep.speed;
    sheep.y += Math.cos(sheep.direction) * sheep.speed;
    sheep.rotation = -sheep.direction - Math.PI / 2;

    const previousFacing = sheep.isFacingTowards;

    sheep.isFacingTowards = sheep.y - sheep.previousY > 0;

    // console.log(
    //   `Sheep is facing towards: ${sheep.isFacingTowards}, ${sheep.x}, ${sheep.y}`
    // );

    //TODO - add sprite change based on direction

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

    if (sheep.isFacingTowards !== previousFacing) {
      sheep.textures = sheep.isFacingTowards
        ? sheepForwardTextures
        : sheepBackwardTextures;
      sheep.gotoAndPlay(0);
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

    pig.previousX = pig.x;
    pig.previousY = pig.y;

    pig.x += Math.sin(pig.direction) * pig.speed;
    pig.y += Math.cos(pig.direction) * pig.speed;
    pig.rotation = -pig.direction - Math.PI / 2;
    const previousFacing = pig.isFacingTowards;
    pig.isFacingTowards = pig.y - pig.previousY > 0;

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

    if (pig.isFacingTowards !== previousFacing) {
      pig.textures = pig.isFacingTowards
        ? pigForwardTextures
        : pigBackwardTextures;
      pig.gotoAndPlay(0);
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

function convertTime() {
  const date = new Date();
}

init();

// function checkCowHunger(cows) {}

// function testIntervals() {
//   console.log("test");
// }

// function checkForMilk() {
// if (Math.floor(Math.random() * 10 + 1) >= 5) {
//   console.log("Milk given, value 10");
//   console.log("10g added to user gold and sent to server");
//   //send update to server
// }
// }
/* 
  if(Math.Random() >= 5){
    reward given, 
    send an updated gold value to server based on value of item
  }

*/
