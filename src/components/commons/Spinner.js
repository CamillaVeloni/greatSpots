import React, {useState} from 'react'; 
import { View, StyleSheet, ActivityIndicator} from 'react-native'; 
import Colors from '../../../constants/Colors';

const Spinner = () => { 
    return ( 
     <View> 
         <ActivityIndicator
            size='large'
            color={Colors.primary}
         />
     </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default Spinner;
