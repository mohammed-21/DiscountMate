import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Modal,
    FlatList,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import api from '../core/Service';


const colors = {
    primary: '#4F44D0',
    secondary: '#fd4081',
    disable: '#d8d8d8',
    grey: '#989898',
    black: '#000000',
    white: '#ffffff'
};
const imagelist = [];
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Setting = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [uploadDisabled, setUploadDisabled] = useState(true);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const handleOpenBottomSheet = () => { setIsBottomSheetOpen(true); };
    const handleCloseBottomSheet = () => { setIsBottomSheetOpen(false); };

    useEffect(()=>{
        if(route.params.pressedButton === "clearBtn"){
            setImage(null);
            setImageList([]);
            setUploadDisabled(true);
        }
    }, [route.params]);

    // useEffect(() => {
    //     if (image) {
    //         imagelist.push(image)
    //         console.log(imagelist)
    //     }
    // },[image])
    const takePhoto = async () => {
       await ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false
          }).then(image => {
            setImageList([]);
            setUploadDisabled(false);
            setImage({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            });
          });
          handleCloseBottomSheet();
    }
    const choosePhoto = async () => {
        await ImagePicker.openPicker({
             width: 300,
             height: 400,
             cropping: false,
             multiple: true,
             mediaType: 'photo'
           }).then(images => {
                setImage(null);
                setUploadDisabled(false);
                setImageList((prev)=>{
                    prev = images.map(e=>({
                        uri: e.path,
                        width: e.width,
                        height: e.height,
                        mime: e.mime
                    }))
                    return prev;
                });
              handleCloseBottomSheet();

           });
     }
    const cancelPhoto = (image) => {
        setImage('')
        imagelist.length = 0
        console.log(imagelist)
    
    }
    const RenderPhoto = ({image}) => {
        return(
            <View style={styles.photoContainer}>
                <Image
                    style={styles.photo}
                    source={{uri:image.uri}}
                />
            </View>
            
        )
    }
    const submitPhoto = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('image', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'image.png',
          });
        await axios({
            url:`${api}/receipt`,
            method:'POST',
            headers: { 'Content-Type': 'multipart/form-data'},
            data:bodyFormData
        })
        .then(function (response){
            console.warn('Upload successful')
            setImage('')
            imagelist.length = 0
            navigation.navigate('ReceiptResult')
        })
        .catch(function (error){
            console.warn('Upload failed, Please try again')
            setImage('')
            imagelist.length = 0
            return;
        })
    }
    const SliderItem = ({item})=>{
        return (
            <View style={styles.sliderItemContainer}>
                <Image
                    source={{uri:item.item.uri}}
                    resizeMode='contain'
                    style={styles.sliderItemImage}
                />
            </View>
        )
    }
    const Slider  = ()=>{
        return (
            <View>
                <FlatList
                    data={imageList}
                    renderItem={(item)=><SliderItem item={item}/>}
                    horizontal={true}
                    pagingEnabled={true}
                    snapToAlignment='center'
                />
            </View>
        )
    }
    const AddReceipt = () => {
        return (
            <>
                {
                    imageList.length === 0 && image === null ?
                        <TouchableOpacity 
                                style={styles.plusBtn}
                                onPress={handleOpenBottomSheet}
                        >
                            <Icon name='plus-circle' color={colors.grey} size={150}/>
                            <Text style={styles.plusBtnTxt}>Add Receipt</Text>
                        </TouchableOpacity>
                    :null
                }
                {
                    image !== null ? 
                        <RenderPhoto image={image}/>
                    :null
                }
                {
                    imageList.length > 0 ?
                        <Slider/>
                    :null
                }
            </>
        );
    }
    const BottomSheet = () => {
        return (
            <Modal 
                animationType='slide' 
                transparent={true} 
                visible={isBottomSheetOpen}
                onRequestClose={handleCloseBottomSheet}
            >
                <View style={[styles.bottomSheet, {height: windowHeight * 0.18}]}>
                    <View style={styles.modalHeaderContainer}>
                        <Text style={styles.modalHeaderTxt}>
                            Receipt
                        </Text>
                        <Icon name='times' color={colors.grey} size={20} onPress={handleCloseBottomSheet}/>
                    </View>
                    <View style={styles.modalBodyContainer}>
                        <View style={[styles.bottomSheetIconContainer]}>
                            <TouchableHighlight style={styles.circleShape}>
                                <Icon name='camera' color={colors.white} size={20} onPress={takePhoto}/>
                            </TouchableHighlight>
                            <View>
                                <Text style={{color: colors.grey}}>CAMERA</Text>
                            </View>
                        </View>
                        <View style={[styles.bottomSheetIconContainer, styles.ml10]}>
                            <TouchableHighlight style={styles.circleShape}>
                                <Icon name='images' color={colors.white} size={20} onPress={choosePhoto}/>
                            </TouchableHighlight>
                            <View>
                                <Text style={{color: colors.grey}}>GALLERY</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
    const Footer = () => {
        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity 
                    activeOpacity={uploadDisabled ? 1 : 0.9}
                    style={uploadDisabled?styles.disabledBtn:styles.btn} 
                    onPress={()=>{
                        if(!uploadDisabled) {
                            submitPhoto()
                        }
                    }}
                >
                    <Text style={styles.btnText}>Upload Receipt</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return(
        <View style={styles.container}>
            <View/>
            <AddReceipt/>
            <Footer/>
            <BottomSheet/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:0,
        flexDirection:"column",
        justifyContent: 'space-between'
    },
    footerContainer: {
        paddingTop: 15,
        borderColor: colors.disable,
        borderTopWidth:0.1,
        borderRadius: 5,
        borderRadius: 0,
        elevation: 1,
        width: '100%'
    },
    modalHeaderContainer: {
        flex: 0, 
        width: '100%', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    modalBodyContainer: {
        flex: 0, 
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 5
    },
    bottomSheetIconContainer: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
    },
    sliderItemContainer: {
        width: windowWidth,
        height: windowHeight*0.33,
        alignItems: 'center'
    },
    sliderItemImage: {
        width: 430,
        height: 430,
        resizeMode: 'contain'
    },
    circleShape: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        color: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        bottom: 0,
        borderWidth: 1,
        borderColor: colors.disable,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btn: {
        marginBottom:5,
        marginHorizontal: 5,
        backgroundColor: colors.secondary,
        borderRadius: 50,
        paddingVertical: 10,
    },
    btnText:{
        textAlign:'center',
        color:'white',
        fontSize: 22,
        fontWeight: "700"
    },
    disabledBtn: {
        marginBottom:5,
        marginHorizontal: 5,
        backgroundColor: colors.disable,
        borderRadius: 50,
        paddingVertical: 10,
    },
    plusBtn: {
        height: "33%", 
        backgroundColor: colors.disable,
        justifyContent: "center",
        alignItems: "center"
    },
    plusBtnTxt: {
        fontSize: 24, 
        color: colors.grey, 
        fontWeight: '500', 
        marginTop: 10
    },
    modalHeaderTxt: {
        fontSize: 20,
        color: colors.black,
        fontWeight: '500'
    },
    ml10:{
        marginLeft: 10
    },
    photo:{
        width: 430,
        height: 430,
        resizeMode: 'contain'
    },
    photoContainer:{
        alignItems:'center'
    },
}) 
export default Setting;