import React, { useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, View, StyleSheet, Button, Alert } from 'react-native';

import * as spotsActions from '../store/actions/spots';
import Colors from '../../constants/Colors';
import Input from '../components/commons/Input';
import ImagePicker from '../components/commons/ImagePicker';
import LocationPicker from '../components/spots/LocationPicker';

const FORM_INPUT_UPDATED = 'formInputUpdated';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATED:
      const updatedValues = {
        ...state.formValues,
        [action.identifier]: action.value,
      };
      const updatedValidities = {
        ...state.formValidities,
        [action.identifier]: action.isValid,
      };
      let updatedIsFormValid = true;
      for (const key in updatedValidities) {
        updatedIsFormValid = updatedIsFormValid && updatedValidities[key];
      }

      return {
        formValues: updatedValues,
        formValidities: updatedValidities,
        isFormValid: updatedIsFormValid,
      };
    default:
      return state;
  }
};

const SpotCreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, formDispatch] = useReducer(formReducer, {
    formValues: {
      title: '',
      photo: null,
    },
    formValidities: {
      title: false,
      photo: false,
    },
    isFormValid: false,
  });

  const formInputHandler = useCallback(
    (identifier, value, isValid) => {
      formDispatch({
        type: FORM_INPUT_UPDATED,
        identifier,
        value,
        isValid,
      });
    },
    [formDispatch]
  );

  const savingSpotHandler = () => {
    if (!form.isFormValid) {
      Alert.alert(
        'O formulário está incompleto',
        'Por favor, reveja o formulário',
        [{ text: 'Okay' }]
      );
      return;
    }

    dispatch(
      spotsActions.savingSpot(form.formValues.title, form.formValues.photo)
    );
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Digite o nome do lugar:"
          errorText="Por favor, digite um nome válido!"
          onInputChange={formInputHandler}
          required
        />
        <ImagePicker id="photo" onImageTaken={formInputHandler} />
        <LocationPicker />
        <Button
          title="Salvar Spot"
          onPress={savingSpotHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 30,
  },
});

export default SpotCreateScreen;
