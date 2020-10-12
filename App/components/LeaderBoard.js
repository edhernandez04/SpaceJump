import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const LeaderBoard = () => {
  useEffect(() => {
    getLeaderData();
  }, []);

  const [Leaders, setLeaders] = useState();

  const getLeaderData = async () => {
    let topPlayers = await firestore().collection('users').get();
    topPlayers._docs && topPlayers._docs.length > 0
      ? formatLeaderData(topPlayers)
      : setTimeout(10000);
  };

  const formatLeaderData = (players) => {
    let leaderArray = [];
    players.forEach((player) => {
      leaderArray.push(player._data);
    });
    setLeaders(leaderArray);
  };

  if (Leaders && Leaders.length > 0) {
    console.log(Leaders.map((leader) => `${leader.name}: ${leader.highScore}`));
    return (
      <View style={{height: 200, width: '100%'}}>
        {Leaders.map((leader) => {
          return (
            <View key={leader.name} style={{justifyContent: 'space-between', padding: 20, flexDirection: 'row'}}>
              <Text style={{fontSize: 24, color: 'white'}}>{leader.name}:</Text>
          <Text style={{fontSize: 24, color: 'white'}}>{leader.highScore}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  if (Leaders === undefined) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
};

export default LeaderBoard;
