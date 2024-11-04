import * as React from 'react';
import { View } from 'react-native';

// Add this interface at the top of your SplashModal file
interface SplashModalProps {
  visible: boolean;
  onClose: () => void;
}

const SplashModal: React.FC<SplashModalProps> = ({ visible, onClose }) => {
  return <View />;  // Add your modal content here
};

export default SplashModal; 