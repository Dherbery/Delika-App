import * as React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Button1 from "./Button1";
import {
  Gap,
  Border,
  Color,
  FontSize,
  FontFamily,
  Padding,
} from "../GlobalStyles";
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface SplashModalProps {
  visible: boolean;
  onClose: () => void;
  onNextPress: () => void;
  onNavigate?: () => void;  // Make this optional
}

type RootStackParamList = {
  SplashModal: undefined;
  Onboarding: undefined;
  Onboarding1: undefined;
  // ... other screens
};

const SplashModal = ({ visible, onClose, onNextPress }: SplashModalProps) => {
  const handleNext = () => {
    console.log('Button pressed'); // Debug log
    onClose();
    onNextPress(); 
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.contet}>
          <View style={[styles.slideParent, styles.textFlexBox]}>
            <View style={styles.slide}>
              <View style={styles.slideChild} />
              <View style={styles.slideItem} />
              <View style={styles.slideItem} />
            </View>
            <View style={styles.textFlexBox}>
              <Text style={[styles.tittle, styles.bodyFlexBox]}>
                User-friendly{'\n'}dashboard.
              </Text>
              <Text style={[styles.body, styles.bodyFlexBox]}>
                {`Don't get lost trying to manage your\nstock and kitchen`}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => {
              console.log('Button pressed in modal');
              onNextPress?.();
              onClose?.();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFlexBox: {
    gap: Gap.gap_md,
    alignSelf: "stretch",
    alignItems: "center",
  },
  bodyFlexBox: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  slideChild: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorOrangered,
    width: 24,
    height: 6,
  },
  slideItem: {
    width: 6,
    height: 6,
  },
  slide: {
    flexDirection: "row",
    gap: Gap.gap_xs,
    alignItems: "center",
  },
  tittle: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumSemiBold,
    color: Color.neutral100,
  },
  body: {
    fontSize: FontSize.bodyMediumSemiBold_size,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.bodyMediumMedium,
    color: Color.neutral60,
  },
  slideParent: {
    justifyContent: "center",
  },
  contet: {
    width: 350,
    height: 300,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.neutral10,
    overflow: "hidden",
    padding: Padding.p_11xl,
    gap: Gap.gap_md,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: '120%',
    marginBottom: 'auto',
  },
  button: {
    backgroundColor: Color.colorOrangered,
    padding: Padding.p_base,
    borderRadius: Border.br_11xl,
    alignItems: 'center',
    marginTop: '5%',
    width: '100%',
  },
  buttonText: {
    color: Color.neutral10,
  },
});

export default SplashModal;
