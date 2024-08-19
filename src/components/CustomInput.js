import {StyleSheet, View} from 'react-native';
import {AppStyles} from '../AppStyles';
import {TextInput} from 'react-native-gesture-handler';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  secureTextEntry,
  keyboardType,
}) => (
  <View
    style={[
      styles.inputContainer,
      isFocused && {borderColor: AppStyles.color.tint},
    ]}>
    <TextInput
      style={styles.body}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={AppStyles.color.description}
      underlineColorAndroid="transparent"
      onFocus={onFocus}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType ? keyboardType : 'default'}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.description,
    borderRadius: AppStyles.borderRadius.small,
  },
  body: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
});

export default CustomInput;
