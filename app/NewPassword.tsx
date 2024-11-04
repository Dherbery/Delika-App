import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  SignInEmpty: undefined;
  // ... other screens
};

const NewPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.match(/[A-Z]/)) strength += 25;
    if (pass.match(/[0-9]/)) strength += 25;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 25) return '#FF0000';
    if (strength <= 50) return '#FFA500';
    if (strength <= 75) return '#90EE90';
    return '#008000';
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  const checkPasswordMatch = (confirmPass: string) => {
    setConfirmPassword(confirmPass);
    if (confirmPass && password !== confirmPass) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignInEmpty')} 
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>New Password</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>
            Create a new password that is safe and easy to remember
          </Text>

          {/* Password Input */}
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter new password"
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.visibilityIcon}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Password Strength Bar */}
          <View style={styles.strengthSection}>
            <View style={styles.strengthContainer}>
              <View
                style={[
                  styles.strengthBar,
                  {
                    width: `${getPasswordStrength(password)}%`,
                    backgroundColor: getStrengthColor(getPasswordStrength(password)),
                  },
                ]}
              />
            </View>
            <Text style={[
              styles.strengthText,
              { color: getStrengthColor(getPasswordStrength(password)) }
            ]}>
              {getStrengthText(getPasswordStrength(password))}
            </Text>
          </View>

          {/* Confirm Password Input */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={checkPasswordMatch}
              placeholder="Confirm new password"
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.visibilityIcon}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          {/* Confirm Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirm New Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topSection: {
    height: '40%',
    backgroundColor: '#000',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
  },
  backButton: {
    zIndex: 1,
    marginTop: 20,
  },
  contentSection: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '95%',
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 16,
    height: 50,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
  },
  strengthSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  strengthContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: '500',
    width: 50,
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    position: 'relative',
  },
  headerTextContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 12,
  },
  visibilityIcon: {
    padding: 10,
  },
});

export default NewPassword; 