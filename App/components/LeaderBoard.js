import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const LeaderBoard = (props) => {
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
    leaderArray.sort((a, b) => (b.highScore > a.highScore ? 1 : -1));
    setLeaders(leaderArray.splice(0, 10));
  };

  if (Leaders && Leaders.length > 0) {
    return (
      <View
        style={{
          margin: 20,
          width: '80%',
          backgroundColor: 'gray',
          padding: 20,
          borderRadius: 10,
        }}>
        <Text style={{alignSelf: 'center', fontSize: 24, fontWeight: 'bold'}}>
          LEADERBOARD
        </Text>
        {Leaders.map((leader) => {
          return (
            <View
              key={leader.name}
              style={
                props.player.name === leader.name
                  ? {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      borderBottomColor: 'limegreen',
                      borderBottomWidth: 1,
                      backgroundColor: 'black',
                    }
                  : {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      borderBottomColor: 'limegreen',
                      borderBottomWidth: 1,
                    }
              }>
              <Text style={{fontSize: 24, color: 'white'}}>
                {Leaders.indexOf(leader) + 1}. {leader.name}
              </Text>
              <Text style={{fontSize: 24, color: 'chartreuse'}}>
                {leader.highScore}
              </Text>
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
