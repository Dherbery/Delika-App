import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

interface OTPProps {
  route?: {
    params: {
      email: string;
    }
  };
}

interface OTPProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  email: string;
}

interface OTPProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  email: string;
}

const OTP: React.FC<OTPProps> = ({ visible, onClose, onVerify, email }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(32);
  const inputs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      navigation.navigate('NewPassword');
    }
  };

  const handleButtonPress = () => {
    if (timer === 0) {
      // Add resend code logic here
      setTimer(32); // Reset timer
    } else {
      handleVerify();
    }
  };

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

          <Text style={styles.title}>Email Verification</Text>
          <Text style={styles.subtitle}>Please enter 4-digit code sent to you.</Text>

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