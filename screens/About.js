import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const About = props => {
    return (
        <View style={styles.about}>
            <Button title="Back" onPress={props.close} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Smite Team Build by Tanner Shilson</Text>
                <Text style={styles.text}>All rights reserved. Data provided by Hi-Rez Studios. © Hi-Rez Studios, Inc. All rights reserved.</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    about: {
        backgroundColor: '#363636',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {

    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
})

export default About;