import * as React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { GlobalStyles } from '../GlobalStyles';

interface EmailInputProps {
  placeholder: string;
  label?: string;
  icon?: string;
  state?: string;
  type?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'email-address' | 'default';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const EmailInput: React.FC<EmailInputProps> = ({ 
  placeholder, 
  label = "Email",
  value,
  onChangeText,
  keyboardType = 'email-address',
  autoCapitalize = 'none'
}) => {
  return (
    <View style={styles.inputField}>
      <Text style={[styles.email, styles.emailTypo]}>{label}</Text>
      <View style={styles.input}>
        <View style={styles.input1}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/email.png")}
          />
          <TextInput
             style={styles.input}
             placeholder={placeholder}
             value={value}
             onChangeText={onChangeText}
             autoCapitalize={autoCapitalize}
             editable={true}
             keyboardType="email-address"
             placeholderTextColor="#666"  // Changed from #9CA4AB to #666 to match password
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emailTypo: {
    textAlign: "left",
    fontFamily: GlobalStyles.FontFamily.bodyMediumMedium,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: GlobalStyles.FontSize.bodyMediumSemiBold_size,
  },
 email: {
    color: GlobalStyles.Color.neutral100,
    width: 327,
  },
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  enterEmail: {
    flex: 1,
    color: GlobalStyles.Color.neutral60,
  },
  input1: {
    alignSelf: "stretch",
    borderRadius: GlobalStyles.Border.br_11xl,
    backgroundColor: GlobalStyles.Color.neutral10,
    borderStyle: "solid",
    borderColor: GlobalStyles.Color.neutral60,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: GlobalStyles.Padding.p_base,
    gap: GlobalStyles.Gap.gap_md,
  },
  input: {
    borderRadius: GlobalStyles.Border.br_11xl,
    justifyContent: "center",
    overflow: "hidden",
    width: 327,
    fontSize: 16,
  },
  inputField: {
    gap: GlobalStyles.Gap.gap_md,
  },
});

export default EmailInput;
