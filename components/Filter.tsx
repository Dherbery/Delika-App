import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Animated, Dimensions, Platform, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {
  FontFamily,
  Padding,
  FontSize,
  Color,
  Border,
  Gap,
} from "../GlobalStyles";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Menu from './Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');




export interface Props {
  visible: boolean;
  onClose: () => void;
  slideAnim: Animated.Value;
}


export default function HomeFilter({ visible, onClose }: Props): JSX.Element | null {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  const slideAnim = React.useRef(new Animated.Value(-width * 0.8)).current;
  const slideUpAnim = React.useRef(new Animated.Value(1000)).current;
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const hideMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const onDateChange = (event: any, selected: Date | undefined) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
    }
  };

  const hideFilter = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={[styles.homeV1, styles.overlay]}>
      <View style={styles.mostSellingHeader}>
        <Text style={styles.mostSellingText}>Most Selling Items</Text>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../assets/vector3.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.whiteBox, {
        marginTop: -20,
        position: 'absolute',
        top: '50%',
        left: 40,
        right: 10,
      }]}>
        <View style={styles.whiteBoxHeader}>
          <Text style={styles.whiteBoxTitle}>Filter</Text>
          <Pressable onPress={hideFilter}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.whiteBoxSubtitle}>Choose categories you want to show</Text>
        <View style={styles.radioButtonsContainer}>
          {['All', 'Today', 'Last week'].map((option, index) => (
            <View key={option} style={styles.radioButtonWrapper}>
              <Pressable 
                style={styles.radioButton}
                onPress={() => setSelectedFilter(option.toLowerCase())}
              >
                <View style={[
                  styles.radioOuter,
                  selectedFilter === option.toLowerCase() && styles.radioOuterSelected
                ]}>
                  {selectedFilter === option.toLowerCase() && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option}</Text>
              </Pressable>
              {index !== 2 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </View>
      <Menu 
        isVisible={menuVisible}
        slideAnim={slideAnim}
        onClose={hideMenu}
      />
      {showDatePicker && Platform.OS === 'ios' ? (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          accentColor="#FE5B18"
          themeVariant="light"
        />
      ) : showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          textColor="#FE5B18"
          themeVariant="light"
          style={{ backgroundColor: 'white' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timeTypo: {
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
  },
  wrapperPosition: {
    padding: Padding.p_3xs,
    width: 355,
    left: 10,
    position: "absolute",
  },
  nanaYawTypo: {
    textAlign: "left",
    lineHeight: 24,
    fontSize: 18,
    color: Color.neutral10,
    fontWeight: "700",
    fontFamily: FontFamily.headingH4SemiBold,
  },
  chooseDateTypo: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumMedium,
  },
  iconLayout: {
    height: 60,
    width: 60,
    overflow: "hidden",
  },
  dateFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconWrapperFlexBox: {
    backgroundColor: Color.primary500,
    alignItems: "center",
    flexDirection: "row",
  },
  homePosition: {
    left: 16,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  groupShadowBox: {
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(16, 24, 40, 0.02)",
    borderRadius: Border.br_base,
    backgroundColor: Color.neutral10,
    left: 0,
    top: 0,
    position: "absolute",
  },
  buttonIconLayout: {
    borderRadius: Border.br_5xl,
    overflow: "hidden",
  },
  textParentPosition: {
    left: 14,
    position: "absolute",
  },
  textClr: {
    color: Color.dark500,
    textAlign: "left",
  },
  textGroupPosition: {
    left: 15,
    position: "absolute",
  },
  text2Position: {
    top: 15,
    position: "absolute",
  },
  groupInnerLayout: {
    width: 324,
    height: 105,
  },
  text6Clr: {
    color: Color.neutral60,
    textAlign: "left",
  },
  filterTypo: {
    fontSize: FontSize.bodySmallMedium_size,
    textAlign: "left",
  },
  minTypo: {
    top: 39,
    color: Color.neutral60,
    fontFamily: FontFamily.bodyMediumRegular,
    lineHeight: 16,
    fontSize: FontSize.bodySmallMedium_size,
    textAlign: "left",
  },
  minLayout: {
    width: 39,
    position: "absolute",
  },
  gradientIcon: {
    top: -420,
    left: -517,
    width: 892,
    height: 874,
    position: "absolute",
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  border: {
    right: 2,
    borderRadius: Border.br_10xs_7,
    borderStyle: "solid",
    borderColor: Color.neutral10,
    borderWidth: 1,
    width: 22,
    opacity: 0.35,
    height: 11,
    top: 0,
    position: "absolute",
  },
  capIcon: {
    top: 4,
    right: 0,
    width: 1,
    height: 4,
    position: "absolute",
  },
  capacity: {
    right: 4,
    borderRadius: Border.br_11xs_3,
    width: 18,
    height: 7,
    backgroundColor: Color.neutral10,
    top: 2,
    position: "absolute",
  },
  battery: {
    right: 15,
    height: 11,
    width: 24,
    top: 17,
    position: "absolute",
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  time: {
    marginTop: -8,
    left: -1,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: "center",
    color: Color.neutral10,
    fontSize: FontSize.bodyMediumMedium_size,
    fontWeight: "500",
    position: "absolute",
    width: 54,
    top: "50%",
  },
  timeStyle: {
    left: 21,
    height: 20,
    width: 54,
    top: 12,
    position: "absolute",
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    left: "50%",
    top: "50%",
    height: 44,
    overflow: "hidden",
  },
  other: {
    height: 44,
    left: 0,
    top: 0,
  },
  nanaYaw: {
    textAlign: "left",
    lineHeight: 24,
    fontSize: 18,
    color: Color.neutral10,
    fontWeight: "700",
    fontFamily: FontFamily.headingH4SemiBold,
  },

  chooseDate: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumMedium,
  },
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  starbiteEastLegon: {
    fontSize: 16,
    lineHeight: 16,
    textAlign: "left",
    color: Color.neutral10,
    fontFamily: FontFamily.bodyMediumRegular,
    alignSelf: 'center',
  },
  icon1: {
    width: 14,
    height: 14,
    overflow: "hidden",
  },
  textIcon: {
    gap: Gap.gap_4xs,
    alignItems: "center",
    flexDirection: "row",
  },
  iconParent: {
    gap: Gap.gap_4xs,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingTop: 4,
  },
  nanaYawParent: {
    width: 157,
    gap: Gap.gap_xs,
    justifyContent: "center",
    paddingLeft: 20,
  },
  icon2: {
    zIndex: 0,
  },
  frameChild: {
    left: 13,
    height: 8,
    zIndex: 2,
    width: 8,
    top: 12,
    position: "absolute",
  },
  iconGroup: {
    gap: Gap.gap_sm,
    marginLeft: 90,
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    gap: Gap.gap_4xl,
    alignItems: "center",
    flexDirection: "row",
  },
  headerWrapper: {
    padding: Padding.p_3xs,
    width: 355,
    left: 0,
    position: "absolute",
    top: 70,
  },
 
 
  icon4: {
    width: 16,
    height: 16,
    overflow: "hidden",
    marginTop: -4,
  },
  today25May: {
    textAlign: "left",
    lineHeight: 24,
    fontSize: 12,
    color: Color.neutral10,
    fontWeight: "700",
    fontFamily: FontFamily.headingH4SemiBold,
    marginRight: 10,
    flexShrink: 1,
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  frameParent: {
    gap: Gap.gap_xs,
    width: 151,
    paddingLeft: 20,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateInner: {
    alignItems: "center",
    flexDirection: "row",
  },
  date: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  dateWrapper: {
    padding: Padding.p_3xs,
    width: 355,
    left: 10,
    position: "absolute",
    top: 160,
  },
  groupChild: {
    height: 105,
    width: 151,
  },
  buttonBaseIcon: {
    width: 25,
    height: 25,
    left: 14,
    position: "absolute",
    top: 12,
  },
  text: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.headingH4SemiBold_size,
    left: 2,
    color: Color.dark500,
    top: 17,
    position: "absolute",
  },
  text1: {
    fontFamily: FontFamily.bodyMediumRegular,
    fontSize: FontSize.bodyLargeMedium_size,
    left: 0,
    top: 0,
    position: "absolute",
  },
  textParent: {
    width: 116,
    height: 46,
    top: 40,
  },
  groupLayout: {
    height: 105,
    width: 151,
  },
  groupItem: {
    height: 105,
    width: 151,
  },
  buttonBaseIcon1: {
    top: 11,
    width: 26,
    height: 26,
    borderRadius: Border.br_5xl,
    overflow: "hidden",
  },
  text2: {
    color: Color.dark500,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.headingH4SemiBold_size,
    left: 2,
  },
  textGroup: {
    width: 94,
    top: 40,
    height: 44,
  },
  statistics: {
    gap: Gap.gap_lg,
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 60,
    paddingLeft: 40,
  },
  groupInner: {
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(16, 24, 40, 0.02)",
    borderRadius: Border.br_base,
    backgroundColor: Color.neutral10,
    left: 0,
    top: 0,
    position: "absolute",
  },
  buttonBase: {
    borderRadius: Border.br_5xl,
    overflow: "hidden",
    top: 23,
    left: 20,
    backgroundColor: Color.primaryPrimary5,
    width: 60,
    height: 60,
    padding: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  text4: {
    top: 29,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.headingH4SemiBold_size,
    left: 2,
    color: Color.dark500,
    position: "absolute",
  },
  textContainer: {
    top: 20,
    left: 92,
    width: 84,
    height: 58,
    position: "absolute",
  },
  statistics1: {
    alignSelf: "stretch",
    marginTop: 10,
    paddingLeft: 40,
  },
  statisticsParent: {
    gap: Gap.gap_lg,
    alignSelf: "stretch",
  },
  homeV1Inner: {
    top: 195,
    width: 344,
    left: 0,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  filter: {
    fontSize: 14,
    fontFamily: FontFamily.bodyMediumRegular,
    color: Color.neutral10,
  },
  vectorIcon: {
    width: 10,
    height: 8,
  },
  filterParent: {
    borderRadius: Border.br_base,
    width: 65,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
    gap: Gap.gap_4xs,
    justifyContent: "center",
    backgroundColor: Color.primary500,
    alignItems: "center",
    flexDirection: "row",
  },
  mostSellingItemsParent: {
    width: 293,
  },
  text6: {
    top: 3,
    width: 73,
    left: 240,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    height: 16,
    lineHeight: 16,
    fontSize: FontSize.bodyLargeMedium_size,
    color: Color.dark500,
    position: "absolute",
  },
  burger: {
    left: 50,
    color: '#FE5B18',
    width: 56,
    top: 15,
    position: "absolute",
    lineHeight: 16,
    fontSize: FontSize.bodySmallMedium_size,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  servesFor4: {
    left: 47,
    width: 133,
    position: "absolute",
    color: Color.dark500,
  },
  min: {
    top: 39,
    color: Color.dark500,
    fontFamily: FontFamily.bodyMediumRegular,
    lineHeight: 16,
    fontSize: FontSize.bodySmallMedium_size,
    textAlign: "left",
    left: 240,
  },
  maskGroupIcon: {
    height: 50,
    top: 2,
    left: 0,
  },
  cheezyPizza: {
    left: 49,
    width: 180,
    height: 17,
    lineHeight: 16,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumMedium_size,
    color: Color.dark500,
    position: "absolute",
    top: 0,
  },
  maskGroupParent: {
    width: 228,
    height: 52,
    left: 0,
    top: 0,
    position: "absolute",
  },
  burgerParent: {
    width: 279,
    height: 55,
    left: 0,
    top: 0,
    position: "absolute",
  },
  parent: {
    height: 55,
    width: 313,
  },
  frameGroup: {
    gap: 19,
    width: 313,
  },
  frameWrapper: {
    borderRadius: 25,
    height: 285,
    paddingHorizontal: 20,
    paddingVertical: 19,
    alignSelf: "stretch",
    backgroundColor: Color.neutral10,
  },
  homeV1Child: {
    top: 530,
    width: 410,
    left: 0,
    paddingLeft: 20,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  homeV1: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FE5B18',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -55,
  },
  gridContainer: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  gridBox: {
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2,
  },
  testParent: {
    top: 240,
    width: 344,
    left: 0,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  icon15: {
    top: 140,
    left: 350,
    width: 30,
    height: 30,
    position: "absolute",
  },
  mostSellingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    marginTop: 500,
  },
  mostSellingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FontFamily.headingH4SemiBold,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE5B18',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontFamily: FontFamily.bodyMediumMedium,
  },
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    minHeight: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whiteBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  whiteBoxTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    fontFamily: FontFamily.headingH4SemiBold,
  },
  whiteBoxSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    fontFamily: FontFamily.bodyMediumRegular,
  },
  radioButtonsContainer: {
    gap: 32,
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
    fontFamily: FontFamily.bodyMediumRegular,
  },
  radioButtonWrapper: {
    width: '100%',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
    marginTop: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FE5B18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    backgroundColor: '#FE5B18',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FE5B18',
    borderRadius: 10,
    width: '100%'
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  }
});
