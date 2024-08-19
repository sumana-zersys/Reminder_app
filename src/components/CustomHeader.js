import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppStyles} from '../AppStyles';
import {arrowBack} from '../assets';

const CustomHeader = ({title, onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.containerIcon} onPress={onPress}>
        <Image source={arrowBack} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.description,
  },
  containerIcon: {
    position: 'absolute',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: AppStyles.color.description,
    borderRadius: AppStyles.borderRadius.extraSmall,
    left: 20,
    top: 20,
  },
  icon: {
    width: 6,
    height: 12,
  },
  title: {
    fontSize: AppStyles.fontSize.descr,
    color: AppStyles.color.tint,
  },
});

export default CustomHeader;
