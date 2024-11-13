import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

interface EmailInputFieldProps {
  placeholder?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const EmailInputField = ({ 
  placeholder = "Enter your username",
  iconName = "person-outline"
}: EmailInputFieldProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>UserName</Text>
      <View style={styles.container}>
        <Ionicons name={iconName} size={20} color="#666" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: -30,
  },
  label: {
    marginBottom: 8,
    color: '#000',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default EmailInputField;
