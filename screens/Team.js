import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import BuildTeam from './BuildTeam';

import SmiteGods from '../json/smite.json';

const Team = props => {
    const [AddingGod, handleAddingGod] = useState(false);
    const [lastClickedRole, handleLastClickedRole] = useState();
    const [teamCarry, handleTeamCarry] = useState();
    const [teamSupport, handleTeamSupport] = useState();
    const [teamMid, handleTeamMid] = useState();
    const [teamJungle, handleTeamJungle] = useState();
    const [teamSolo, handleTeamSolo] = useState();
    const [teamName, handleTeamName] = useState();
    const [fullTeam, handleFullTeam] = useState();

    const saveTeam = async () => {
        if (teamName === undefined || teamName === "") {
            Alert.alert('No Team Name!', 'Please add a team name.', [{ text: 'Okay', style: 'destructive' }]);
            return;
        } else if (teamCarry === undefined || teamSupport === undefined || teamMid === undefined || teamJungle === undefined || teamSolo === undefined) {
            Alert.alert('Not Full Team!', 'Please finish making your Team.', [{ text: 'Okay', style: 'destructive' }]);
            return;
        } else {
            const FullTeam = { "teamName": teamName, "teamCarry": teamCarry, "teamSupport": teamSupport, "teamMid": teamMid, "teamJungle": teamJungle, "teamSolo": teamSolo };
            handleFullTeam([{ "teamName": teamName, "teamCarry": teamCarry, "teamSupport": teamSupport, "teamMid": teamMid, "teamJungle": teamJungle, "teamSolo": teamSolo }]);
            console.log(FullTeam)
            const jsonValue = JSON.stringify(FullTeam)
            try {
                await AsyncStorage.setItem(teamName, jsonValue);
            } catch (error) {
            };
            props.backToMenu()
        }


    }

    //Brings up the model
    const addGod = (name) => {
        if (AddingGod === false) {
            handleAddingGod(true)
        } else if (AddingGod === true) {
            handleAddingGod(false)
        }
        handleLastClickedRole(name)
    };

    //Adds the god id to State
    const addTeam = (num) => {
        if (lastClickedRole === "Carry") {
            handleTeamCarry(num);
        } else if (lastClickedRole === "Support") {
            handleTeamSupport(num);
        } else if (lastClickedRole === "Mid") {
            handleTeamMid(num);
        } else if (lastClickedRole === "Jungle") {
            handleTeamJungle(num);
        } else if (lastClickedRole === "Solo") {
            handleTeamSolo(num);
        };
        handleAddingGod(false);
    }

    const showTeam = (name) => {
        if (name > 0) {
            const smiteGodsFiltered = SmiteGods.filter((god) => {
                return god.id === name
            });
            return (
                <View>
                    <Text style={styles.godText}>{smiteGodsFiltered[0].Name}</Text>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tag}>Hard CC: {smiteGodsFiltered[0].STB.cc}</Text>
                        <Text style={styles.tag}>{smiteGodsFiltered[0].STB.tag1}</Text>
                    </View>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tag}>{smiteGodsFiltered[0].STB.tag2}</Text>
                        <Text style={styles.tag}>{smiteGodsFiltered[0].STB.tag3}</Text>
                    </View>
                </View>
            )
        }
    };

    const showGodImage = (id) => {
        if (id > 0) {
            const smiteGodImage = SmiteGods.filter((god) => {
                return god.id === id
            });
            return (
                <View>
                    <Image style={styles.godImage} source={{ uri: smiteGodImage[0].godIcon_URL }} />
                </View>
            )
        }
    };

    const setTeamName = inputText => {
        handleTeamName(inputText)
    };


    //come from edit team
    const loadSavedTeam = () => {
        if (props.savedTeam) {
            handleTeamName(props.savedTeam.teamName)
            handleTeamCarry(props.savedTeam.teamCarry)
            handleTeamSupport(props.savedTeam.teamSupport)
            handleTeamMid(props.savedTeam.teamMid)
            handleTeamJungle(props.savedTeam.teamJungle)
            handleTeamSolo(props.savedTeam.teamSolo)
        }
    }
    console.log(props.savedTeam)


    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.fullContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={AddingGod}
                    onRequestClose={() => {
                        handleAddingGod(false)
                    }}
                >
                    <BuildTeam addingGodProp={addGod} addTeamProp={addTeam} />
                </Modal>

                <View style={styles.top}>
                    <View style={styles.buttonContainer}>
                        <Button title="Back" onPress={props.backToMenu} color="#028fbe" />
                    </View>
                    <View style={styles.textContainer}>
                        <TextInput style={styles.textInput} onChangeText={setTeamName} defaultValue={teamName} />
                    </View>
                </View>

                <View style={styles.godImageContainer}>
                    {showGodImage(teamCarry)}
                    {showGodImage(teamSupport)}
                    {showGodImage(teamMid)}
                    {showGodImage(teamJungle)}
                    {showGodImage(teamSolo)}
                </View>

                <View style={styles.team}>
                    <View style={styles.container}>
                        <Image
                            source={require('../images/carry.png')}
                            style={styles.image}
                        />
                        <View style={styles.god}>
                            {showTeam(teamCarry)}
                        </View>
                        <View style={styles.button}>
                            <Button color="#028fbe" title="Add God" onPress={() => addGod("Carry")} />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image
                            source={require('../images/support.png')}
                            style={styles.image}
                        />
                        <View style={styles.god}>
                            {showTeam(teamSupport)}
                        </View>
                        <View style={styles.button}>
                            <Button color="#028fbe" title="Add God" onPress={() => addGod("Support")} />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image
                            source={require('../images/mid.png')}
                            style={styles.image}
                        />
                        <View style={styles.god}>
                            {showTeam(teamMid)}
                        </View>
                        <View style={styles.button}>
                            <Button color="#028fbe" title="Add God" onPress={() => addGod("Mid")} />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image
                            source={require('../images/jungle.png')}
                            style={styles.image}
                        />
                        <View style={styles.god}>
                            {showTeam(teamJungle)}
                        </View>
                        <View style={styles.button}>
                            <Button color="#028fbe" title="Add God" onPress={() => addGod("Jungle")} />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Image
                            source={require('../images/solo.png')}
                            style={styles.image}
                        />
                        <View style={styles.god}>
                            {showTeam(teamSolo)}
                        </View>
                        <View style={styles.button}>
                            <Button color="#028fbe" title="Add God" onPress={() => addGod("Solo")} />
                        </View>
                    </View>

                </View>
                <View style={styles.saveLoad}>
                    <Button title="Save Team" onPress={saveTeam} color="#028fbe" />
                    <Button title="Load Team" onPress={loadSavedTeam} color="#028fbe" />
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    fullContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    team: {
        marginVertical: 10
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    top: {
        flexDirection: 'row',

        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonContainer: {

    },
    image: {
        height: 50,
        width: 50,

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    god: {
        width: '60%',
        marginVertical: 10
    },
    godText: {
        color: 'white',
        backgroundColor: '#028fbe',
        padding: 4,
        borderRadius: 3,
        textAlign: 'center'
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 4
    },
    tag: {
        color: 'white',
        backgroundColor: '#4d4d4d',
        padding: 3,
        borderRadius: 3
    },
    godImageContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: '80%'
    },
    godImage: {
        height: 50,
        width: 50,
        borderColor: '#4d4d4d',
        borderWidth: 2
    },
    textContainer: {
        width: '50%'
    },
    textInput: {
        height: 37,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    saveLoad: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    }
})

export default Team;