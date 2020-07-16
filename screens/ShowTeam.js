import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


import SmiteGods from '../json/smite.json';

const ShowTeam = props => {

    const showTeam = (name, role) => {
        if (name > 0) {
            const smiteGodsFiltered = SmiteGods.filter((god) => {
                return god.id === name
            });
            return (
                <View style={styles.teamGod}>
                    <View style={styles.textContainer}>
                        <Text style={styles.godText}> {smiteGodsFiltered[0].Name}</Text>
                        <Text style={styles.godText}>{role}</Text>
                    </View>

                    <View style={styles.godContainer}>
                        <View >
                            <Image style={styles.godImage} source={{ uri: smiteGodsFiltered[0].godIcon_URL }} />
                        </View>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tag}>Hard CC: {smiteGodsFiltered[0].STB.cc}</Text>
                            <Text style={styles.tag}>{smiteGodsFiltered[0].STB.tag1}</Text>
                        </View>
                        <View style={styles.tagContainer}>
                            <Text style={styles.tag}>{smiteGodsFiltered[0].STB.tag2}</Text>
                            <Text style={styles.tag}>{smiteGodsFiltered[0].STB.tag3}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    };

    const editTeam = () => {
        //props.editTeam();
        //props.editingTeam();
        props.editTeamFunction(props.teamLoaded.teamName);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.teamName}>{props.teamLoaded.teamName}</Text>
            <View>
                {showTeam(props.teamLoaded.teamCarry, 'Carry')}
            </View>
            <View>
                {showTeam(props.teamLoaded.teamSupport, 'Support')}
            </View>
            <View>
                {showTeam(props.teamLoaded.teamMid, 'Mid')}
            </View>
            <View>
                {showTeam(props.teamLoaded.teamJungle, 'Jungle')}
            </View>
            <View>
                {showTeam(props.teamLoaded.teamSolo, 'Solo')}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Back" onPress={props.backButton} />
                <Button title="Edit Team" onPress={editTeam} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        flex: 1
    },
    teamName: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        marginVertical: 5
    },
    textContainer: {
        backgroundColor: '#028fbe',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    godText: {
        color: 'white',
        backgroundColor: '#028fbe',
        padding: 4,
        borderRadius: 3,
        textAlign: 'center'
    },
    tagContainer: {

        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 5
    },
    tag: {
        color: 'white',
        backgroundColor: '#4d4d4d',
        padding: 3,
        borderRadius: 3,
        marginVertical: 2
    },
    godImage: {
        height: 60,
        width: 60
    },
    godContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    teamGod: {
        marginVertical: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 25
    }
})

export default ShowTeam;