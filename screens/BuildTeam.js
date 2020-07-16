import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';

import SmiteGods from '../json/smite.json';

const BuildTeam = props => {
    const baseSmiteGods = SmiteGods
    const [smiteGods, handleSmiteGods] = useState(baseSmiteGods);
    const [sortPressed, handleSortPressed] = useState();


    function Item({ title, id, image }) {
        return (
            <View style={styles.item}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                <View style={styles.button}>
                    <Button title="+" id={id} onPress={() => props.addTeamProp(id)} />
                </View>
            </View>
        );
    };

    const sortGods = (role) => {
        let newFilter = baseSmiteGods.filter((god) => {
            return god.Roles === role;
        })
        handleSmiteGods(newFilter);
        handleSortPressed(role);
    };

    const resetSortGods = () => {
        let newFilter = baseSmiteGods;
        handleSmiteGods(newFilter);
        handleSortPressed(' Reset');
    }

    const setActive = (role) => {
        if (role === sortPressed) {
            return '#203b8c'
        } else {
            return '#3c8bce'
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.sortContainer}>
                <View >
                    <Text style={styles.text}>Sort By</Text>
                </View>
                <View style={styles.sort}>
                    <View style={styles.sortButton}>
                        <Button color={setActive(' Hunter')} title="Hunters" onPress={() => sortGods(' Hunter')} />
                    </View>
                    <View style={styles.sortButton}>
                        <Button color={setActive(' Guardian')} title="Guardians" onPress={() => sortGods(' Guardian')} />
                    </View>
                    <View style={styles.sortButton}>
                        <Button color={setActive(' Mage')} title="Mages" onPress={() => sortGods(' Mage')} />
                    </View>
                </View>
                <View style={styles.sort}>
                    <View style={styles.sortButton}>
                        <Button color={setActive(' Assassin')} title="Assassins" onPress={() => sortGods(' Assassin')} />
                    </View>
                    <View style={styles.sortButton}>
                        <Button color={setActive(' Warrior')} title="Warriors" onPress={() => sortGods(' Warrior')} />
                    </View>
                    <View style={styles.sortButton}>
                        <Button title="Reset" onPress={resetSortGods} />
                    </View>

                </View>
                <Button title="X" onPress={props.addingGodProp} />
            </View>
            <FlatList
                data={smiteGods}
                renderItem={({ item }) => <Item title={item.Name} id={item.id} image={item.godIcon_URL}
                />}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: "#242424"
    },
    item: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white',
        fontSize: 20
    },
    button: {
        width: '10%'
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: '#333232',
        borderBottomWidth: 2
    },
    sort: {

    },
    sortButton: {
        marginVertical: 5
    },
    text: {
        color: 'white',
        transform: [{ rotate: '270deg' }]
    },
    image: {
        height: 40,
        width: 40
    }
})

export default BuildTeam;