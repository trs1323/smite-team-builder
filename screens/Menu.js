import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';

import About from './About'

const Menu = props => {
    const [about, handleAbout] = useState(false)

    const loadingTeamAndStarting = () => {
        props.loadTeams();
        props.loadingTeam();
    }

    const clearingAndStarting = () => {
        props.clearTeam();
        props.startNewTeam();
    }

    const openAbout = () => {
        if (about === false) {
            handleAbout(true)
        } else if (about === true) {
            handleAbout(false)
        }
    }

    return (
        <View style={styles.menu}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={about}
                onRequestClose={() => {
                    handleAbout(false)
                }}
            >
                <About close={openAbout} />
            </Modal>
            <View styke={styles.title}>
                <Text style={styles.smite}>Smite</Text>
                <Text style={styles.team}>Team</Text>
                <Text style={styles.builder}>Builder</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View >
                    <TouchableOpacity
                        style={styles.button}

                        onPress={clearingAndStarting}
                    >
                        <Text style={styles.text}>Build New Team</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={loadingTeamAndStarting}
                    >
                        <Text style={styles.text}>Load Team</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.about}>
                <TouchableOpacity onPress={openAbout} style={styles.aboutButton}>
                    <Text style={styles.aboutText}>About</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '70%'
    },
    button: {
        width: 150,
        height: 150,
        backgroundColor: "#e8be43",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,

        elevation: 5,
    },
    button1: {
        width: 150,
        height: 150,
        backgroundColor: "#1a273b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,

        elevation: 5,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    smite: {
        fontSize: 50,
        color: '#e8be43',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    team: {
        fontSize: 50,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    builder: {
        fontSize: 50,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    about: {
        width: '100%',
        height: '30%',
        borderTopColor: '#2e2e2e',
        borderTopWidth: 2,
        flex: 1
    },
    aboutButton: {
        backgroundColor: "#1a273b",
        width: '100%',
        paddingBottom: 20
    },
    aboutText: {
        color: 'white',
        textAlign: 'center'
    }
})

export default Menu;