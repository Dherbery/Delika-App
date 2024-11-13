import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const PasswordInput = ({
  placeholder,
  value,
  onChangeText,
  autoCapitalize,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Password</Text>
      <View style={styles.container}>
        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.lockIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize={autoCapitalize}
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    marginTop: -30,
  },
  label: {
    marginBottom: 5,
    color: GlobalStyles.Color.neutral100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
  },
  visibilityIcon: {
    padding: 10,
  },
  lockIcon: {
    marginRight: 10,
  },
});

export default PasswordInput;
