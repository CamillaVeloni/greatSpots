import React, { useCallback, useReducer } from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import Colors from '../../constants/Colors';
import Input from '../components/commons/Input';

const FORM_INPUT_UPDATED = 'formInputUpdated';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATED:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.inputValue,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedIsFormValid = true;
      for (const key in updatedValidities) {
        updatedIsFormValid = updatedIsFormValid && updatedValidities[key];
      }

      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        isFormValid: updatedIsFormValid,
      };
    default:
      return state;
  }
};

const SpotCreateScreen = () => {
  const [form, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: '',
    },
    inputValidities: {
      title: false,
    },
    isFormValid: false,
  });

  const formInputHandler = useCallback(
    (identifier, value, isValid) => {
      formDispatch({
        type: FORM_INPUT_UPDATED,
        input: identifier,
        inputValue: value,
        isValid,
      });
    },
    [formDispatch]
  );

  const savingSpotHandler = () => {
    console.log('saving')
  }

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
