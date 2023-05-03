import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Recommended } from './Modules/Recommended_Module.js';

const Main = () => {
    const [activeTab, setActiveTab] = useState('Recommended');

    function createTab(name) {
        return (
            <TouchableOpacity style={styles.tab} onPress={() => setActiveTab(name)}>
                <Text style={activeTab === name ? styles.activeTab : styles.inactiveTab}>
                    {name}
                </Text>
            </TouchableOpacity>
        );
    };

    function showTabContent() {
        switch (activeTab) {
            case 'Recommended':
                return <Recommended />;
            case 'Favourites':
                return <Text>Requires Favourites module</Text>;
            case 'Cart':
                return <Text>Requires Cart module</Text>;
            default:
                return <Text>Nothing to see here</Text>;
        }
    }

    return (
        <>
            <View>
                <View style={styles.navbar}>
                    {createTab('Recommended')}
                    {createTab('Favourites')}
                    {createTab('Cart')}
                </View>
                <View>
                    {showTabContent()}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 32,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    tab: {
        marginLeft: 16
    },
    activeTab: {
        color: '#4F44D0',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inactiveTab: {
        fontSize: 16,
        color: '#7d7d7d',
        fontWeight: 'bold'
    }
})

export default Main;
