import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const LeaderBoard = () => {
  useEffect(() => {
      console.log(Leaders)
    createTopTen();
  }, []);

  let Leaders = [];

  const createTopTen = async () => {
    const topScores = await firestore().collection('users').get();
    topScores._docs.forEach((leader) => {
      Leaders.push(leader._data);
    });
    const sortedLeaders = Leaders.sort(function (a, b) {
      b.highScore > a.highScore ? 1 : -1;
    });
    return sortedLeaders;
  };

  return (
    <View>
      {Leaders.map((leader) => {
        <Text>
          {leader.name}: {leader.highScore}
        </Text>;
      })}
    </View>
  );
};

export default LeaderBoard;
