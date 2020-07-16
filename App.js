import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import Team from './screens/Team'
import Menu from './screens/Menu';
import LoadTeam from './screens/LoadTeam';

export default function App() {
  const [startBuilder, handleStartBuilder] = useState(false);
  const [loadTeam, handleLoadTeam] = useState(false);
  const [teams, handleTeams] = useState();
  const [teamEditing, handleTeamEditing] = useState();

  const newTeam = () => {
    if (startBuilder === false) {
      handleStartBuilder(true)
    } else if (startBuilder === true) {
      handleStartBuilder(false)
    }
  };

  const loadTeamButton = () => {
    if (loadTeam === false) {
      handleLoadTeam(true)
    } else if (loadTeam === true) {
      handleLoadTeam(false)
    }
  };

  const retrieveTeams = async () => {
    let value = [];
    try {
      value = await AsyncStorage.getAllKeys();
      if (value !== null) {
        // Our data is fetched successfully
        console.log(value);
        handleTeams(value);

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const editTeam = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      handleTeamEditing(jsonValue != null ? JSON.parse(jsonValue) : null)
      newTeam();
      loadTeamButton();
    } catch (error) {
      // Error retrieving data
    }
  }

  const clearEditTeam = () => {
    handleTeamEditing()
  }

  let content = <Menu />

  if (startBuilder === true) {
    content = <Team backToMenu={newTeam} savedTeam={teamEditing} />
  } else if (startBuilder === false && loadTeam === false) {
    content = <Menu startNewTeam={newTeam} loadTeams={loadTeamButton} loadingTeam={retrieveTeams} clearTeam={clearEditTeam} />
  } else if (loadTeam === true) {
    content = <LoadTeam backToMenu={loadTeamButton} teamsArray={teams} refreshTeam={retrieveTeams} editTeam={newTeam} editTeamFunc={editTeam} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
      </View>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363636"
  },
  title: {

  },
  text: {
    color: '#ffffff'
  }
});
