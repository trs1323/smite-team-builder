import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Modal, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ShowTeam from './ShowTeam';

const LoadTeam = props => {
    const [showTeam, handleShowTeam] = useState(false);
    const [currentTeam, handleCurrentTeam] = useState();


    function Item({ title }) {
        return (
            <View style={styles.teamButtons}>
                <TouchableOpacity style={styles.teamName} id={title} onPress={() => loadingTeamPressed(title)}>
                    <Text style={styles.teamText}>{title}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTeam(title)}>
                    <Text style={styles.teamText}>X</Text>
                </TouchableOpacity>
            </View>
        );
    };



    const loadingTeamPressed = async (teamName) => {
        try {
            const jsonValue = await AsyncStorage.getItem(teamName);
            handleCurrentTeam(jsonValue != null ? JSON.parse(jsonValue) : null);
            console.log(currentTeam)


        } catch (error) {
            // Error retrieving data
        }
        handleShowTeam(true)
    };

    const deleteTeam = (teamName) => {
        Alert.alert('Delete Team', 'Are you sure you want to delete team?', [{ text: 'Cancel', style: 'cancel' },
        {
            text: "Yes", onPress: async () => {
                try {
                    await AsyncStorage.removeItem(teamName)
                } catch (e) {
                    // remove error
                };
                props.refreshTeam();
                Alert.alert('Team Deleted', 'Team Deleted', [{ text: 'Ok', style: 'destructive' }])
            }
        }]);

    };



    const backTo = () => {
        if (showTeam === false) {
            handleShowTeam(true)
        } else if (showTeam === true) {
            handleShowTeam(false)
        }
    }

    return (
        <View style={styles.loadTeam}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showTeam}
                onRequestClose={() => {
                    handleShowTeam(false)
                }}
            >
                <ShowTeam teamLoaded={currentTeam} backButton={backTo} editTeam={props.backToMenu} editingTeam={props.editTeam} editTeamFunction={props.editTeamFunc} />
            </Modal>
            <View style={styles.backContainer}>
                <View>
                    <Button title="Back" onPress={props.backToMenu} />
                </View>
                <View>
                    <Text style={styles.title}>Load Team</Text>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={props.teamsArray}
                    renderItem={({ item }) => <Item title={item}
                    />}
                    keyExtractor={item => item}
                    refreshing={true}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    loadTeam: {
        marginTop: 60

    },
    backContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },
    title: {
        color: 'white'
    },
    listContainer: {

    },
    teamButtons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    teamName: {
        backgroundColor: '#e8be43',
        padding: 10
    },
    deleteButton: {
        backgroundColor: '#c22525',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    teamText: {
        color: 'white',
        fontSize: 15
    }
})


export default LoadTeam;