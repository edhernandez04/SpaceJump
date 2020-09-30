import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import Constants from '../util/constants';
import Plane from '../components/Plane';
import Wall from '../components/Wall';
import Physics from '../util/physics';

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateHazards = () => {
  let topHazardHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
  let bottomHazardHeight =
    Constants.MAX_HEIGHT - topHazardHeight - Constants.GAP_SIZE;
  let sizes = [topHazardHeight, bottomHazardHeight];

  return sizes;
};

const setupWorld = () => {
  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  let plane = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 4,
    Constants.MAX_HEIGHT / 2,
    50,
    50,
  );
  let floor = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT,
    Constants.MAX_WIDTH,
    50,
    {isStatic: true},
  );
  let ceiling = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    25,
    Constants.MAX_WIDTH,
    20,
    {isStatic: true},
  );
  let [hazardHeight1, hazardHeight2] = generateHazards();
  let [hazardHeight3, hazardHeight4] = generateHazards();
  let hazard1 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH - Constants.HAZARD_WIDTH / 2,
    hazardHeight1 / 2,
    Constants.HAZARD_WIDTH,
    hazardHeight1,
    {isStatic: true},
  );
  let hazard2 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH - Constants.HAZARD_WIDTH / 2,
    Constants.MAX_HEIGHT - hazardHeight2 / 2,
    Constants.HAZARD_WIDTH,
    hazardHeight2,
    {isStatic: true},
  );
  let hazard3 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH * 2 - Constants.HAZARD_WIDTH / 2,
    hazardHeight3 / 2,
    Constants.HAZARD_WIDTH,
    hazardHeight3,
    {isStatic: true},
  );
  let hazard4 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH * 2 - Constants.HAZARD_WIDTH / 2,
    Constants.MAX_HEIGHT - hazardHeight4 / 2,
    Constants.HAZARD_WIDTH,
    hazardHeight4,
    {isStatic: true},
  );

  Matter.World.add(world, [
    floor,
    ceiling,
    plane,
    hazard1,
    hazard2,
    hazard3,
    hazard4,
  ]);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    let pairs = event.pairs;
    gameEngine.dispatch({type: 'game-over'});
  });

  return {
    physics: {engine: engine, world: world},
    plane: {body: plane, size: [50, 50], color: 'blue', renderer: Plane},
    ceiling: {
      body: ceiling,
      size: [Constants.MAX_WIDTH, 50],
      color: 'grey',
      renderer: Wall,
    },
    floor: {
      body: floor,
      size: [Constants.MAX_WIDTH, 50],
      color: 'grey',
      renderer: Wall,
    },
    hazard1: {
      body: hazard1,
      size: [Constants.HAZARD_WIDTH, hazardHeight1],
      color: 'red',
      renderer: Wall,
    },
    hazard2: {
      body: hazard2,
      size: [Constants.HAZARD_WIDTH, hazardHeight2],
      color: 'red',
      renderer: Wall,
    },
    hazard3: {
      body: hazard3,
      size: [Constants.HAZARD_WIDTH, hazardHeight3],
      color: 'red',
      renderer: Wall,
    },
    hazard4: {
      body: hazard4,
      size: [Constants.HAZARD_WIDTH, hazardHeight4],
      color: 'red',
      renderer: Wall,
    },
  };
};

let gameEngine = null;
let entities = setupWorld();

const Menu = () => {
  const [running, flipGameState] = useState(true);
  const onEvent = (e) => {
    if (e.type === 'game-over') {
      running === true ? flipGameState(false) : flipGameState(true);
    }
  };
  const reset = () => {
    gameEngine.swap(setupWorld());
    flipGameState(true);
  };
  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => (gameEngine = ref)}
        style={styles.gameContainer}
        running={running}
        onEvent={onEvent}
        systems={[Physics]}
        entities={entities}></GameEngine>
      {!running && (
        <TouchableOpacity
          onPress={() => reset()}
          style={styles.fullScreenButton}>
          <View>
            <Text style={styles.gameOverText}>GAME OVER</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
  },
  fullScreenButton: {
    position: 'absolute',
    height: Constants.MAX_HEIGHT,
    width: Constants.MAX_WIDTH,
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
