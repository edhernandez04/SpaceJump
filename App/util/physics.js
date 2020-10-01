import Matter from 'matter-js';
import Constants from './constants';
import Hazard from '../components/Hazard';
import Platform from '../components/Platform';

let tick = 0;
let pose = 1;
let hazards = 0;
let platforms = 0;

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateHazards = () => {
  let topHazardHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
  let bottomHazardHeight =
    Constants.MAX_HEIGHT - topHazardHeight - Constants.GAP_SIZE;
  let sizes = [topHazardHeight, bottomHazardHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export const addHazardAtLocation = (x, world, entities) => {
  let [hazard1Height, hazard2Height] = generateHazards();
  let platformWidth = Constants.HAZARD_WIDTH + 20;
  let platformHeight = (platformWidth / 100) * 50;

  hazard1Height = hazard1Height - platformHeight;

  let platform1 = Matter.Bodies.rectangle(
    x,
    hazard1Height + platformHeight / 2,
    platformWidth,
    platformHeight,
    {isStatic: true},
  );

  let hazard1 = Matter.Bodies.rectangle(
    x,
    hazard1Height / 2,
    Constants.HAZARD_WIDTH,
    hazard1Height,
    {isStatic: true},
  );

  hazard2Height = hazard2Height - platformHeight;

  let platform2 = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 25 - hazard2Height - platformHeight / 2,
    platformWidth,
    platformHeight,
    {isStatic: true},
  );

  let hazard2 = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 25 - hazard2Height / 2,
    Constants.HAZARD_WIDTH,
    hazard2Height,
    {isStatic: true},
  );

  Matter.World.add(world, [hazard1, platform1, hazard2, platform2]);
  entities['hazard' + (hazards + 1)] = {
    body: hazard1,
    renderer: Hazard,
  };
  entities['hazard' + (hazards + 2)] = {
    body: hazard2,
    renderer: Hazard,
  };
  entities['platform' + (platforms + 1)] = {
    body: platform1,
    renderer: Platform,
  };
  entities['platform' + (platforms + 2)] = {
    body: platform2,
    renderer: Platform,
  };

  hazards += 2;
};

const Physics = (entities, {touches, time}) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;
  let plane = entities.plane.body;
  let hadTouches = false;
  touches
    .filter((touch) => touch.type === 'press')
    .forEach((touch) => {
      if (world.gravity.y === 0.0) {
        world.gravity.y = 1.2;
        addHazardAtLocation(
          Constants.MAX_WIDTH * 2 + Constants.HAZARD_WIDTH / 2,
          world,
          entities,
        );
        addHazardAtLocation(
          Constants.MAX_WIDTH * 3 + Constants.HAZARD_WIDTH / 2,
          world,
          entities,
        );
      }
      if (!hadTouches) {
        hadTouches = true;
        Matter.Body.setVelocity(plane, {x: plane.velocity.x, y: -10});
      }
    });

  Matter.Engine.update(engine, time.delta);

  Object.keys(entities).forEach((key) => {
    if (key.indexOf('hazard') === 0) {
      Matter.Body.translate(entities[key].body, {x: -2, y: 0});
      if (
        key.indexOf('hazard') !== -1 &&
        parseInt(key.replace('hazard', '')) % 2 === 0
      ) {
        if (
          entities[key].body.position.x <=
          -1 * (Constants.HAZARD_WIDTH / 2)
        ) {
          let platformIndex = parseInt(key.replace('platform', ''))
          let hazardIndex = parseInt(key.replace('hazard', ''))
          delete entities['platform' + (platformIndex - 1)];
          delete entities['hazard' + (hazardIndex - 1)];
          delete entities['platform' + platformIndex];
          delete entities['hazard' + hazardIndex];
          addHazardAtLocation(
            Constants.MAX_WIDTH * 1.8 + Constants.HAZARD_WIDTH / 2,
            world,
            entities,
          );
        }
      }
    } else if (key.indexOf('floor') === 0) {
      if (entities[key].body.position.x <= (-1 * Constants.MAX_WIDTH) / 2) {
        Matter.Body.setPosition(entities[key].body, {
          x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
          y: entities[key].body.position.y,
        });
      } else {
        Matter.Body.translate(entities[key].body, {x: -2, y: 0});
      }
    }
  });

  tick += 1;
  if (tick % 5 === 0) {
    pose = pose + 1;
    if (pose > 3) {
      pose = 1;
    }
    entities.plane.pose = pose;
  }

  return entities;
};

export default Physics;
