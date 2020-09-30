import Matter from 'matter-js';
import Constants from './constants';

const Physics = (entities, {touches, time}) => {
  let engine = entities.physics.engine;
  let plane = entities.plane.body;
  touches
    .filter((touch) => touch.type === 'press')
    .forEach((touch) => {
      Matter.Body.applyForce(plane, plane.position, {x: 0.0, y: -0.09});
    });

  for (let i = 1; i <= 4; i++) {
    if (
      entities['hazard' + i].body.position.x <= -1 * (Constants.HAZARD_WIDTH / 2)
    ) {
      Matter.Body.setPosition(entities['hazard' + i].body, {
        x: Constants.MAX_WIDTH * 2 - Constants.HAZARD_WIDTH / 2,
        y: entities['hazard' + i].body.position.y,
      });
    } else {
      Matter.Body.translate(entities['hazard' + i].body, {x: -1, y: 0});
    }
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default Physics;
