import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OTPProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  phoneNumber?: string;
  email?: string;
}

const OTP: React.FC<OTPProps> = ({ visible, onClose, onVerify, phoneNumber, email }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(32);
  const [maskedValue, setMaskedValue] = useState<string>('');
  const inputs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      const lastFour = phoneNumber.slice(-4);
      const masked = `****-****-${lastFour}`;
      setMaskedValue(masked);
    } else if (email) {
      const [username, domain] = email.split('@');
      const visibleCount = Math.min(2, username.length);
      const asteriskCount = Math.max(0, username.length - visibleCount);
      const maskedUsername = `${username.slice(0, visibleCount)}${'*'.repeat(asteriskCount)}`;
      setMaskedValue(`${maskedUsername}@${domain}`);
    }
  }, [phoneNumber, email]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      try {
        const resetType = await AsyncStorage.getItem('resetType');
        
        const payload = {
          OTP: otpString,
          contact: phoneNumber || email,
          type: resetType === 'email' ? true : false
        };

        const response = await fetch('https://api-server.krontiva.africa/api:uEBBwbSs/verify/otp/code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (data.otpValidate === 'otpFound') {
          navigation.navigate('NewPassword');
        } else if (data.otpValidate === 'otpNotExist') {
          Alert.alert('Error', 'Invalid OTP code. Please try again.');
        } else {
          Alert.alert('Error', data.message || 'Something went wrong');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        Alert.alert('Error', 'Failed to verify OTP code. Please check your connection.');
      }
    } else {
      Alert.alert('Error', 'Please enter a complete OTP code');
    }
  };

  const handleButtonPress = () => {
    if (timer === 0) {
      setTimer(60);
    } else {
      handleVerify();
    }
  };

  console.log('Current phoneNumber state:', phoneNumber);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            Please enter the 4-digit code sent to{'\n'}
            <Text style={{ fontWeight: 'bold' }}>
              {maskedValue || 'your contact'}
            </Text>
          </Text>

          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={(input) => (inputs.current[index] = input)}
                style={[
                  styles.otpInput,
                  otp[index] ? styles.otpInputFilled : null
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={otp[index]}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <Text style={styles.timer}>
            Resend code in {timer}s
          </Text>

          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={handleButtonPress}
          >
            <Text style={styles.verifyButtonText}>
              {timer === 0 ? 'Send Code Again' : 'Verify Code'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#F5F5F5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  otpInputFilled: {
    borderColor: '#FF6B00',
    backgroundColor: '#FFF',
  },
  timer: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OTP; 