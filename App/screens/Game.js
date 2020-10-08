import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import Constants from '../util/constants';
import Plane from '../components/Plane';
import Floor from '../components/Floor';
import Physics, {resetHazards} from '../util/physics';

const setupWorld = () => {
  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.0;
  let plane = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 4,
    Constants.MAX_HEIGHT / 2,
    Constants.PLANE_WIDTH,
    Constants.PLANE_HEIGHT,
  );
  let floor1 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT,
    Constants.MAX_WIDTH + 4,
    50,
    {isStatic: true},
  );
  let floor2 = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT,
    Constants.MAX_WIDTH + 4,
    50,
    {isStatic: true},
  );

  Matter.World.add(world, [floor1, floor2, plane]);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    let pairs = event.pairs;
    gameEngine.dispatch({type: 'game-over'});
  });

  return {
    physics: {engine: engine, world: world},
    plane: {body: plane, pose: 1, renderer: Plane},
    floor1: {body: floor1, renderer: Floor},
    floor2: {body: floor2, renderer: Floor},
  };
};

let gameEngine = null;
let entities = setupWorld();

const Game = (props) => {
  const [running, flipGameState] = useState(true);
  const [score, addToScore] = useState(0);

  useEffect(() => {
    console.log(props.route.params)
  });

  const onEvent = (event) => {
    if (event.type === 'game-over') {
      running === true ? flipGameState(false) : flipGameState(true);
    } else if (event.type === 'score') {
      addToScore(score + 1);
    }
  };

  const reset = () => {
    resetHazards();
    gameEngine.swap(setupWorld());
    flipGameState(true);
    addToScore(0);
  };

  return (
    <View style={styles.container}>
      <Image
        style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}
        source={require('../assets/Space_1.png')}
      />
      <GameEngine
        ref={(ref) => (gameEngine = ref)}
        style={styles.gameContainer}
        running={running}
        onEvent={onEvent}
        systems={[Physics]}
        entities={entities}></GameEngine>
      <Text style={styles.gameScore}>{score}</Text>
      {!running && (
        <View style={styles.fullScreenButton}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <Text style={styles.gameOverText}>{score}</Text>
          </View>
          <View style={styles.gameOverOptions}>
            <TouchableOpacity
              onPress={() => reset()}
              style={styles.gameOverButtons}>
              <Text style={styles.gameSubOverText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Menu')}
              style={styles.gameOverButtons}>
              <Text style={styles.gameSubOverText}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
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
    alignItems: 'center',
  },
  gameSubOverText: {
    color: 'white',
    fontSize: 24,
    padding: 5,
    margin: 5,
  },
  gameOverOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gameOverButtons: {
    marginTop: 50,
    width: 150,
    backgroundColor: 'tomato',
    borderRadius: 10,
    alignItems: 'center',
  },
  gameScore: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 30,
    textShadowColor: '#444',
    textShadowOffset: {width: 2, hegj: 2},
    textShadowRadius: 2,
  },
  fullScreenButton: {
    position: 'absolute',
    height: Constants.MAX_HEIGHT,
    width: Constants.MAX_WIDTH,
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
  },
});

export default Game;
