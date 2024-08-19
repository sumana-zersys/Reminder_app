import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {AppStyles, MainContainer} from '../../../AppStyles';
import {welcomeIcon} from '../../../assets';
import metrics from '../../../contents/metrics';

function WelcomeScreen({navigation}) {
  return (
    <SafeAreaView style={MainContainer.mainContainer}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image source={welcomeIcon} style={styles.logo} />
          <Text style={styles.subtitle}>INTRODUCING</Text>
          <Text style={styles.title}>Memoricle</Text>
          <Text style={styles.descr}>Make it Memorable</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.subtext, styles.terms]}>
              Terms & conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  subContainer: {
    alignItems: 'center',
    paddingTop: metrics.height / 6,
  },
  logo: {
    marginBottom: 50,
  },
  subtitle: {
    fontSize: AppStyles.fontSize.normal,
    color: AppStyles.color.tint,
  },
  descr: {
    fontSize: AppStyles.fontSize.descr,
    color: AppStyles.color.tint,
    textAlign: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginContainer: {
    alignItems: 'center',
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.small,
    padding: 18,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  signupContainer: {
    alignItems: 'center',
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.small,
    padding: 15,
    borderWidth: 1,
    borderColor: AppStyles.color.description,
    marginTop: 15,
  },
  signupText: {
    color: AppStyles.color.tint,
  },
  subtext: {
    fontSize: AppStyles.fontSize.small,
    color: AppStyles.color.description,
    textAlign: 'center',
    marginTop: 10,
  },
  terms: {
    color: AppStyles.color.subtitle,
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
