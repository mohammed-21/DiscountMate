import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import History from './Settings/History.js'
import Account from './Settings/Account.js'
import Other from './Settings/Other.js'

const Settings = () =>{
    const [activeTab, setActiveTab] = useState('Account');

    function createTab(name) {
        return (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={() => { setActiveTab(name) }}>
                <Text style={activeTab === name ? styles.activeTab : styles.inactiveTab}>
                    {name}
                </Text>
            </TouchableOpacity>
        );
    }

    function showTabContent() {
        switch (activeTab) {
            case 'Account':
                return <Account />;
            case 'History':
                return <History />;
            case 'Settings':
                return <Other />;
            default:
                return <Text>Nothing to see here</Text>;
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", paddingHorizontal: 32, paddingVertical: 17 }}>
                {createTab('Account')}
                {createTab('History')}
                {createTab('Other')}
            </View>
            <View>
                {showTabContent()}
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    header:{
        fontSize: 24,
        fontWeight:'bold',
        color:'black'
    },
    info:{
        fontSize: 15,
        fontWeight:'bold',
        color:'black'
    },
    btn:{
        marginTop:20,
        backgroundColor: '#C4C4C4',
        paddingVertical: 10
        
    },
    btn_text:{
        textAlign:'center',
        fontSize: 20
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
export default Settings;