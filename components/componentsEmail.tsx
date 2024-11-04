import * as React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../GlobalStyles';

interface EmailInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const EmailInput: React.FC<EmailInputProps> = ({ 
  placeholder, 
  value, 
  onChangeText, 
  autoCapitalize = "none" 
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Email</Text>
      <View style={styles.container}>
        <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          editable={true}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: GlobalStyles.Color.neutral100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlobalStyles.Color.neutral60,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: GlobalStyles.Color.neutral100,
  },
});

export default EmailInput; 