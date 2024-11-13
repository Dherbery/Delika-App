import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import {
  FontFamily,
  FontSize,
  Color,
  Border,
  Padding,
  Gap,
} from "../GlobalStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

// First, define the props interface
interface LinkSentProps {
  visible: boolean;
  onClose: () => void;
  email?: string;
  onShowOTP: () => void;
}
interface LinkSentProps {
  visible: boolean;
  onClose: () => void;
  onShowOTP: () => void;
  phoneNumber: string;  // Add this line
}


const LinkSent: React.FC<LinkSentProps> = ({ visible, onClose, email, onShowOTP }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOkPress = () => {
    onClose(); // Close LinkSent modal
    setTimeout(() => {
      onShowOTP(); // Show OTP modal instead of navigation
    }, 500); // 500ms delay before showing OTP modal
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalOverlay, styles.modalContainer]}>
          <View style={styles.modalContent}>
            <View style={styles.content}>
              <TouchableOpacity 
                onPress={onClose} 
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <Image
                style={[styles.successIcon, styles.buttonPosition]}
                contentFit="cover"
                source={require("../assets/success.png")}
              />
              <Text
                style={[styles.loggedInSuccessfully, styles.button1Typo]}
              >{`Link Sent 
successfully!`}</Text>
              <View style={[styles.button, styles.buttonPosition]}>
                <Image
                  style={styles.icon1}
                  contentFit="cover"
                  source={require("../assets/icon5.png")}
                />
                <Text style={[styles.button1, styles.button1Typo]}>Sign In Now</Text>
                <Image
                  style={styles.icon1}
                  contentFit="cover"
                  source={require("../assets/icon5.png")}
                />
              </View>
              <Image
                style={[styles.contentChild, styles.contentChildLayout]}
                contentFit="cover"
                source={require("../assets/star-3.png")}
              />
              <Image
                style={[styles.contentItem, styles.contentChildLayout]}
                contentFit="cover"
                source={require("../assets/star-4.png")}
              />
              <Image
                style={[styles.contentInner, styles.contentChildLayout]}
                contentFit="cover"
                source={require("../assets/star-6.png")}
              />
              <Image
                style={[styles.starIcon, styles.contentChildLayout]}
                contentFit="cover"
                source={require("../assets/star-5.png")}
              />
              <Image
                style={[styles.contentChild1, styles.contentChildLayout]}
                contentFit="cover"
                source={require("../assets/star-8.png")}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleOkPress}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonPosition: {
    left: "50%",
    position: "absolute",
  },
  button1Typo: {
    textAlign: "center",
    fontFamily: FontFamily.bodyMediumSemiBold,
    fontWeight: "600",
  },
  contentChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  icon: {
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
    tintColor: '#000',
  },
  successIcon: {
    marginLeft: -65,
    top: 20,
    width: 150,
    height: 150,
  },
  loggedInSuccessfully: {
    marginLeft: -143,
    top: 170,
    fontSize: FontSize.headingH4SemiBold_size,
    lineHeight: 34,
    color: Color.neutral100,
    width: 288,
    left: "50%",
    position: "absolute",
  },
  icon1: {
    width: 20,
    height: 20,
    display: "none",
    overflow: "hidden",
  },
  button1: {
    fontSize: FontSize.bodyMediumSemiBold_size,
    lineHeight: 20,
    color: Color.neutral10,
  },
  button: {
    marginLeft: -141,
    top: 240,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorOrangered,
    width: 282,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_base,
    gap: Gap.gap_md,
    display: "none",
  },
  contentChild: {
    height: "5.33%",
    width: "6.42%",
    top: "23.5%",
    right: "11.96%",
    bottom: "71.18%",
    left: "81.63%",
  },
  contentItem: {
    height: "5.5%",
    width: "6.63%",
    top: "41.25%",
    right: "76.2%",
    bottom: "53.25%",
    left: "17.17%",
  },
  contentInner: {
    height: "2.9%",
    width: "3.49%",
    top: "48.25%",
    right: "20.3%",
    bottom: "48.85%",
    left: "76.2%",
  },
  starIcon: {
    height: "2.3%",
    width: "2.77%",
    top: "15.5%",
    right: "76.14%",
    bottom: "82.2%",
    left: "21.08%",
  },
  contentChild1: {
    height: "2.03%",
    width: "2.44%",
    top: "14%",
    right: "25.87%",
    bottom: "83.98%",
    left: "71.69%",
  },
  content: {
    borderRadius: Border.br_5xl,
    backgroundColor: Color.neutral10,
    width: 300,
    height: 280,
    overflow: "hidden",
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black background
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  okText: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default LinkSent;
