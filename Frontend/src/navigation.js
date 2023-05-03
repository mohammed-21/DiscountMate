import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Navigation stack
const Stack = createNativeStackNavigator();

// Login screens
import Login from './Screen/Login';
import ForgetPwd from './Screen/ForgetPwd/ForgetPwd';
import ForgetPwd1 from './Screen/ForgetPwd/ForgetPwd1';
import ForgetPwd2 from './Screen/ForgetPwd/ForgetPwd2';
import ResetPwd from './Screen/ResetPwd';

// Registration screens
import Register from './Screen/Register/register_1'
import Register3 from './Screen/Register/register_3'
import Register4 from './Screen/Register/register_4'

// Menu screens
import Main from './Screen/Main';
import Settings from './Screen/Settings';

// Item screens
//import Recommended from './Screen/Recommended';
import DiscountNearby from './Screen/DiscountNearby';
import SearchItem from './Screen/SearchItem';
import ItemInfo from './Screen/ItemInfo';

// OCR screens
import ScanReceipt from './Screen/ScanReceipt';
import ReceiptResult from './Screen/receiptResult';

// Interface Images
import LeftArrow from './assets/images/leftArrow.svg';
import SettingsIcon from './assets/images/SettingsIcon.png';
import ScanIcon from './assets/images/ScanIcon.png';
import SearchIcon from './assets/images/SearchIcon.png';
//import filter from './assets/images/filter.png';
//import Icon from 'react-native-vector-icons/Ionicons';

function addToStack(name, component, title, showHeader, showSearch, showSetting, showScan) {
    const navigation = useNavigation();
    return (<Stack.Screen
        name={name}
        component={component}
        options={
            {
                title: title,
                headerShown: showHeader,
                headerTitleAlign: 'center',
                headerTitleStyle: styles.headerStyle,
                headerLeft: () => (
                    <>
                        <TouchableOpacity
                            style={styles.SettingsIcon}
                            onPress={() => name === 'Main' ? navigation.replace('Login') : navigation.goBack() }>
                            <LeftArrow />
                        </TouchableOpacity>
                        {showSearch ?
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SearchItem')}>
                                <Image style={styles.menuIcon} source={SearchIcon} />
                            </TouchableOpacity>
                            : null}
                    </>
                ),
                headerRight: () => (
                    <>
                        {showSetting ?
                            <TouchableOpacity
                                style={Platform.OS === 'ios' ? styles.SettingsIcon : ''}
                                onPress={() => navigation.navigate('Settings')}>
                                <Image style={styles.menuIcon} source={SettingsIcon} />
                            </TouchableOpacity>
                            : null}
                        {showScan ?
                            <TouchableOpacity on onPress={() => navigation.navigate('Scan')}>
                                <Image style={styles.menuIcon} source={ScanIcon} />
                            </TouchableOpacity>
                            : null}
                    </>
                )
            }
        }
    />
    );
}

const Navigation = () => {
    return (
        <Stack.Navigator>
            {/*addToStack(name, component, title, showHeader, showSearch, showSetting, showScan)*/}
            {addToStack('Login', Login, null, false, false, false, false)}
            {addToStack('Main', Main, 'DiscountMate', true, true, true, true)}
            {addToStack('SearchItem', SearchItem, 'Search Items', true, false, true, true)}
            {addToStack('ItemInfo', ItemInfo, 'Item Info', true, false, true, true)}
            {addToStack('Register', Register, 'Register', true, false, false, false)}
            {addToStack('Register3', Register3, 'Register', true, false, false, false)}
            {addToStack('Register4', Register4, 'Register', true, false, false, false)}
            {addToStack('ForgetPwd', ForgetPwd, 'Forgot Password?', false, false, false, false)}
            {addToStack('ForgetPwd1', ForgetPwd1, null, false, false, false, false)}
            {addToStack('ForgetPwd2', ForgetPwd2, null, false, false, false, false)}
            {addToStack('DiscountNearby', DiscountNearby, 'Nearby Offers', true, false, true, false)}
            {addToStack('Settings', Settings, 'Settings', true, false, false, false)}
            {addToStack('Scan', ScanReceipt, null, true, false, false, false)}
            {addToStack('Reset', ResetPwd, null, true, false, false, false)}
            {addToStack('ReceiptResult', ReceiptResult, 'Scan Result', true, false, false, false)}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    menuIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 5
    },
    headerStyle:{
        fontSize:22,
        fontWeight:'700',
        color:'#4F44D0'
    }
})
    
export default Navigation;