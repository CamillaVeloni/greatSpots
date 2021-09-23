import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const INPUT_UPDATED = 'inputUpdated';
const INPUT_BLUR = 'inputBlur';

const reducer = (state, action) => {
  switch (action.type) {
    case INPUT_UPDATED:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR: 
      return {
          ...state,
          touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const { id, onInputChange } = props;

  const [input, dispatch] = useReducer(reducer, {
    value: '',
    isValid: false,
    touched: false,
  });

  const inputChangeHandler = (text) => {
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_UPDATED,
      value: text,
      isValid,
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  useEffect(() => {
    if (input.touched || input.value.length != 0) {
      onInputChange(id, input.value, input.isValid);
    }
  }, [id, input, onInputChange]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={input.value}
        onChangeText={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
      {!input.isValid && input.touched && (
          <View>
              <Text style={styles.error}>{props.errorText}</Text>
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    marginBottom: 12,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  error: {
      color: 'red',
      fontFamily: 'nunito-regular',
      fontSize: 13,
  }
});

export default Input;
