import React, { useState } from 'react';
import { View, Image, Button, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../../../constants/Colors';

const ImgPicker = ({ onImageTaken, id }) => {
  const [pickedImage, setPickedImage] = useState();

  // Pegando permissão do usuário para usar a camera
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status != 'granted') {
      // Se for recusado
      Alert.alert(
        'Permissão negada',
        'Você precisa dar acesso a câmera do dispositivo para usar essa função.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const choosingImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const img = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!img.cancelled) {
      setPickedImage(img.uri);
      onImageTaken(id, img.uri, true);
    }

  };


  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text style={styles.text}>Nenhuma foto foi escolhida ainda</Text>
        )}
      </View>
      <Button
        title="Escolher foto"
        color={Colors.primary}
        onPress={choosingImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {},
});

export default ImgPicker;
