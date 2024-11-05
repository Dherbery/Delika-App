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
import { BlurView } from 'expo-blur';

// First, define the props interface
interface ContentProps {
  visible: boolean;
  onClose: () => void;
  userData: any; // Replace 'any' with proper user data type if available
}

const Content: React.FC<ContentProps> = ({ visible, onClose, userData }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <BlurView intensity={10} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/icon4.png")}
              />
            </TouchableOpacity>
            <Image
              style={[styles.successIcon, styles.buttonPosition]}
              contentFit="cover"
              source={require("../assets/success.png")}
            />
            <Text
              style={[styles.loggedInSuccessfully, styles.button1Typo]}
            >{`Logged In 
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
          </View>
        </View>
      </BlurView>
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
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
  successIcon: {
    marginLeft: -75,
    top: 30,
    width: 150,
    height: 150,
  },
  loggedInSuccessfully: {
    marginLeft: -143,
    top: 194,
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
    top: 294,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    //backgroundColor: 'rgba(255, 255, 255, 0.9)',
    //padding: 20,
    //borderRadius: 10,
    //width: '80%',
    //elevation: 5,
    //shadowColor: '#000',
    //shadowOffset: {
    //  width: 0,
    //  height: 2,
    //},
    //shadowOpacity: 0.25,
    //shadowRadius: 4,
  }
});

export default Content;
