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
import Main from './Screen/main';
import Profile from './Screen/Profile';
import Setting from './Screen/Setting';

// Item screens
//import Recommended from './Screen/Recommended';
import DiscountNearby from './Screen/DiscountNearby';
import SearchItem from './Screen/SearchItem';
import ItemInfo from './Screen/ItemInfo';

// OCR screens
import ScanReceipt from './Screen/ScanReceipt';
import ReceiptResult from './Screen/receiptResult';

// Interface Images
import ProflieIcon from './assets/images/manIcon.png';
import LeftArrow from './assets/images/leftArrow.svg';
import Scan from './assets/images/scan.svg';
import SearchIcon from './assets/images/SearchIcon.png';

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
                            style={styles.ProflieIcon}
                            onPress={() => name === 'Main' ? navigation.replace('Login') : navigation.goBack() }>
                            <LeftArrow />
                        </TouchableOpacity>
                        {showSearch ?
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SearchItem')}>
                                <Image style={styles.SearchIcon} source={SearchIcon} />
                            </TouchableOpacity>
                            : null}
                    </>
                ),
                headerRight: () => (
                    <>
                        {showSetting ?
                            <TouchableOpacity
                                style={Platform.OS === 'ios' ? styles.ProflieIcon : ''}
                                onPress={() => navigation.navigate('Setting')}>
                                <Image style={styles.ProflieIcon} source={ProflieIcon} />
                            </TouchableOpacity>
                            : null}
                        {showScan ?
                            <TouchableOpacity on onPress={() => navigation.navigate('Scan')}>
                                <Scan />
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
            {addToStack('Profile', Profile, 'Dashboard', true, false, false, false)}
            {addToStack('Register', Register, 'Register', true, false, false, false)}
            {addToStack('Register3', Register3, 'Register', true, false, false, false)}
            {addToStack('Register4', Register4, 'Register', true, false, false, false)}
            {addToStack('ForgetPwd', ForgetPwd, 'Forgot Password?', false, false, false, false)}
            {addToStack('ForgetPwd1', ForgetPwd1, null, false, false, false, false)}
            {addToStack('ForgetPwd2', ForgetPwd2, null, false, false, false, false)}
            {addToStack('DiscountNearby', DiscountNearby, 'Nearby Offers', true, false, true, false)}
            {addToStack('Setting', Setting, 'Setting', true, false, false, false)}
            {addToStack('Scan', ScanReceipt, null, true, false, false, false)}
            {addToStack('Reset', ResetPwd, null, true, false, false, false)}
            {addToStack('ReceiptResult', ReceiptResult, 'Scan Result', true, false, false, false)}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    ProflieIcon: {
        width: 30,
        height:30,
        marginRight: 5
    },
    SearchIcon: {
        width: 30,
        height: 30,
        marginLeft: 5
    },
    headerStyle:{
        fontSize:22,
        fontWeight:'700',
        color:'#4F44D0'
    }
})
    
export default Navigation;