import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Animated, Dimensions, Platform, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, NavigationProp } from "@react-navigation/native";
import {
  FontFamily,
  Padding,
  FontSize,
  Color,
  Border,
  Gap,
} from "../GlobalStyles";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Menu from '../components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Filter from '../components/Filter';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  Orders: undefined;
  // Add other screens as needed
} & ParamListBase;

interface UserData {
  _restaurantTable: [{
    id: string;
    restaurantName: string;
  }];
  image?: {
    url: string;
  };
  fullName?: string;
}

interface MenuProps {
  isVisible: boolean;
  slideAnim: Animated.Value;
  onClose: () => void;
  navigation: StackNavigationProp<RootStackParamList>;
}

const Orders = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(-width * 0.8)).current;
  const slideUpAnim = React.useRef(new Animated.Value(1000)).current;
  const [imageUrl, setImageUrl] = React.useState('');
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [restaurantName, setRestaurantName] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [branchId, setBranchId] = React.useState('');
  const [restaurantId, setRestaurantId] = React.useState('');
  const [revenueData, setRevenueData] = React.useState<any>(null);
  const [total, setTotal] = React.useState(0);
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [totalMenu, setTotalMenu] = React.useState(0);
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsed = JSON.parse(storedUserData);
          setUserData(parsed);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserData();
  }, []);

  React.useEffect(() => {
    const debugStorage = async () => {
      try {
        // Check all stored data
        const userData = await AsyncStorage.getItem('userData');
        console.log('Stored userData:', userData);
        
        const profileUrl = await AsyncStorage.getItem('profileUrl');
        console.log('Stored profileUrl:', profileUrl);
        
        // Check the full user response
        const loginResponse = await AsyncStorage.getItem('loginResponse');
        console.log('Stored loginResponse:', loginResponse);
        
        // If we have userData, parse and check it
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          console.log('Parsed userData:', parsedUserData);
        }
      } catch (error) {
        console.error('Debug error:', error);
      }
    };
    
    debugStorage();
  }, []);

  React.useEffect(() => {
    const getProfileUrl = async () => {
      try {
        const url = await AsyncStorage.getItem('profileUrl');
        console.log('Retrieved profile URL:', url);
        if (url) {
          setImageUrl(url);
          console.log('Set profile URL to:', url);
        }
      } catch (error) {
        console.error('Error getting profile URL:', error);
      }
    };
    getProfileUrl();
  }, []);

  React.useEffect(() => {
    const getStoredIds = async () => {
      try {
        const storedBranchId = await AsyncStorage.getItem('branchId');
        const storedRestaurantId = await AsyncStorage.getItem('restaurantId');
        if (storedBranchId) setBranchId(storedBranchId);
        if (storedRestaurantId) setRestaurantId(storedRestaurantId);
      } catch (error) {
        console.error('Error getting stored IDs:', error);
      }
    };
    getStoredIds();
  }, []);

  React.useEffect(() => {
    const fetchTodayData = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        
        const response = await fetch('https://api-server.krontiva.africa/api:uEBBwbSs/filter/orders/revenue/by/date', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId,
            branchId,
            date: formattedDate
          })
        });

        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setTotal(data?.total || 0);
        setTotalOrders(data?.totalOrders || 0);
        setTotalMenu(data?.totalMenu || 0);
        setSelectedDate(today);
      } catch (error) {
        console.error('Error fetching today data:', error);
        Alert.alert('Error', 'Failed to fetch today\'s data');
      }
    };

    if (restaurantId && branchId) {
      fetchTodayData();
    }
  }, [restaurantId, branchId]);

  React.useEffect(() => {
    const loadSavedRevenueData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('revenueData');
        const lastFetchedDate = await AsyncStorage.getItem('lastFetchedDate');
        
        if (savedData && lastFetchedDate) {
          setRevenueData(JSON.parse(savedData));
          // Optionally set the date picker to the last fetched date
          setSelectedDate(new Date(lastFetchedDate));
        }
      } catch (error) {
        console.error('Error loading saved revenue data:', error);
      }
    };

    loadSavedRevenueData();
  }, []);

  React.useEffect(() => {
    if (revenueData) {
      // Adjust this line based on the actual structure of revenueData
      setTotal(revenueData.total|| 0);
      setTotalOrders(revenueData.totalOrders || 0);
      setTotalMenu(revenueData.totalMenu || 0);
    }
  }, [revenueData]);

  const showMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const showFilter = () => {
    setIsFilterVisible(true);
    Animated.spring(slideUpAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  };

  const hideFilter = () => {
    Animated.spring(slideUpAnim, {
      toValue: 1000,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start(() => setIsFilterVisible(false));
  };

  const onDateChange = async (event: any, selected: Date | undefined) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      
      try {
        const formattedDate = selected.toISOString().split('T')[0];
        console.log('Sending request with:', { restaurantId, branchId, formattedDate });

        const requestBody = JSON.stringify({
          restaurantId: restaurantId,
          branchId: branchId,
          date: formattedDate
        });

        const response = await fetch('https://api-server.krontiva.africa/api:uEBBwbSs/filter/orders/revenue/by/date', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Details:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
            requestBody
          });
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Success - API Response:', data);

        setTotal(data?.total || 0);
        setTotalOrders(data?.totalOrders || 0);
        setTotalMenu(data?.totalMenu || 0);

      } catch (error) {
        console.error('Full error details:', error);
        Alert.alert('Error', 'Failed to fetch revenue data. Please check your connection and try again.');
      }
    }
  };

  React.useEffect(() => {
    console.log('Current state values:', {
        total,
        totalOrders,
        totalMenu
    });
  }, [total, totalOrders, totalMenu]);

  return (
    <View style={styles.homeV1}>
      <Image
        style={styles.gradientIcon}
        contentFit="cover"
        source={require("../assets/gradient.png")}
      />
      <View style={[styles.headerWrapper, styles.wrapperPosition]}>
        <View style={styles.header}>
          <View style={styles.nanaYawParent}>
            <Text style={[styles.nanaYaw, styles.nanaYawTypo]}>
              {userData?.fullName || 'Guest User'}
            </Text>
            <View style={styles.iconParent}>
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/icon11.png")}
              />
              <View style={styles.textIcon}>
                <Text style={[styles.starbiteEastLegon, styles.chooseDateTypo]}>
                  {userData?._restaurantTable?.[0]?.restaurantName || 'Restaurant Name'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.iconGroup}>
            <Ionicons name="notifications-outline" size={26} color="white" />
            <Image
              style={styles.imageIcon}
              contentFit="cover"
              source={{ uri: userData?.image?.url || 'https://via.placeholder.com/55' }}
              onLoadStart={() => console.log('Loading image from:', userData?.image?.url)}
              onError={(error) => console.log('Image loading error:', error)}
            />
          </View>
        </View>
      </View>
      <View style={[styles.dateWrapper, styles.wrapperPosition]}>
        <View style={[styles.date, styles.dateFlexBox]}>
          <View style={styles.frameParent}>
            <View style={styles.textIcon}>
              <Text style={[styles.chooseDate, styles.chooseDateTypo]}>
                Choose Date
              </Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar" size={16} color="#FE5B18" />
              </Pressable>
            </View>
            <View style={styles.iconParent}>
              <Image
                style={styles.icon4}
                contentFit="cover"
                source={require("../assets/icon15.png")}
              />
              <Text style={[styles.today25May, styles.nanaYawTypo]}>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </Text>
            </View>
          </View>
          <View style={styles.dateInner}>
            <Pressable
              onPress={showMenu}
              style={styles.menuIconContainer}
            >
              <View style={styles.gridContainer}>
                <View style={styles.gridBox}></View>
                <View style={styles.gridBox}></View>
                <View style={styles.gridBox}></View>
                <View style={styles.gridBox}></View>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.homeV1Inner, styles.homePosition]}>
        <View style={styles.statisticsParent}>
          <View style={styles.statistics}>
            <View style={styles.groupLayout}>
              <View style={[styles.groupChild, styles.groupShadowBox]} />
              <Image
                style={[styles.buttonBaseIcon, styles.buttonIconLayout]}
                contentFit="cover"
                source={require("../assets/icon12.png")}
              />
              <View style={[styles.textParent, styles.textParentPosition]}>
                <Text style={[styles.text, styles.textClr]}>${total}</Text>
                <Text style={[styles.text1, styles.textClr]}>
                  Total Revenue
                </Text>
              </View>
            </View>
            <View style={styles.groupLayout}>
              <View style={[styles.groupItem, styles.groupShadowBox]} />
              <Image
                style={[styles.buttonBaseIcon1, styles.textGroupPosition]}
                contentFit="cover"
                source={require("../assets/-button-base1.png")}
              />
              <View style={[styles.textGroup, styles.textGroupPosition]}>
                <Text style={[styles.text, styles.textClr]}>${totalOrders}</Text>
                <Text style={[styles.text1, styles.textClr]}>Total Orders</Text>
              </View>
            </View>
          </View>
          <View style={styles.statistics1}>
            <View style={styles.groupInnerLayout}>
              <View style={[styles.groupInner, styles.groupInnerLayout]} />
              <View style={[styles.buttonBase, styles.buttonIconLayout]}>
                <Image
                  style={styles.iconLayout}
                  contentFit="cover"
                  source={require("../assets/total menu.png")}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.text4, styles.textClr]}>{totalMenu}</Text>
                <Text style={[styles.text1, styles.textClr]}>Total Menu</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.homeV1Child, styles.homePosition]}>
        <View style={styles.frameWrapper}>
          <View style={styles.frameGroup}>
            <View style={[styles.mostSellingItemsParent, styles.dateFlexBox]}>
              <Text style={[styles.mostSellingItems, styles.text6Clr]}>
                Most Selling Items
              </Text>
              <Pressable
                style={[styles.filterParent, styles.iconWrapperFlexBox]}
                onPress={showFilter}
              >
                <Text style={[styles.filter, styles.filterTypo]}>Filter</Text>
                
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require("../assets/vector3.png")}
                />
              </Pressable>
            </View>
            <View style={styles.parent}>
              <Text style={[styles.text6, styles.text6Clr]}>{`$12.56
`}</Text>
              <View style={styles.burgerParent}>
                <Text style={[styles.burger, styles.filterTypo]}>BURGER</Text>
                <Text style={[styles.servesFor4, styles.minTypo]}>
                  Serves for 4 Person
                </Text>
                <Text style={[styles.min, styles.minLayout]}>4 min</Text>
                <View style={styles.maskGroupParent}>
                  <Image
                    style={[styles.maskGroupIcon, styles.minLayout]}
                    contentFit="cover"
                    source={require("../assets/mask-group.png")}
                  />
                  <Text
                    style={[styles.cheezyPizza, styles.text6Clr]}
                  >{`Cheezy Pizza 
`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.parent}>
              <Text style={[styles.text6, styles.text6Clr]}>{`$12.56
`}</Text>
              <View style={styles.burgerParent}>
                <Text style={[styles.burger, styles.filterTypo]}>BURGER</Text>
                <Text style={[styles.servesFor4, styles.minTypo]}>
                  Serves for 4 Person
                </Text>
                <Text style={[styles.min, styles.minLayout]}>4 min</Text>
                <View style={styles.maskGroupParent}>
                  <Image
                    style={[styles.maskGroupIcon, styles.minLayout]}
                    contentFit="cover"
                    source={require("../assets/mask-group.png")}
                  />
                  <Text
                    style={[styles.cheezyPizza, styles.text6Clr]}
                  >{`Cheezy Pizza 
`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.parent}>
              <Text style={[styles.text6, styles.text6Clr]}>{`$12.56
`}</Text>
              <View style={styles.burgerParent}>
                <Text style={[styles.burger, styles.filterTypo]}>BURGER</Text>
                <Text style={[styles.servesFor4, styles.minTypo]}>
                  Serves for 4 Person
                </Text>
                <Text style={[styles.min, styles.minLayout]}>4 min</Text>
                <View style={styles.maskGroupParent}>
                  <View style={styles.maskGroupParent}>
                    <View style={styles.maskGroupParent}>
                      <Image
                        style={[styles.maskGroupIcon, styles.minLayout]}
                        contentFit="cover"
                        source={require("../assets/mask-group.png")}
                      />
                      <Text
                        style={[styles.cheezyPizza, styles.text6Clr]}
                      >{`Cheezy Pizza 
`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Menu 
        isVisible={menuVisible}
        slideAnim={slideAnim}
        onClose={hideMenu}
        navigation={navigation}
      />
      <Filter 
        visible={isFilterVisible}
        onClose={hideFilter}
        slideAnim={slideUpAnim}
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
    fontWeight: "600",
    fontFamily: FontFamily.headingH4SemiBold,
    alignSelf: "stretch",
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
  imageIcon: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    zIndex: 1,
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
    marginLeft: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    gap: Gap.gap_4xl,
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
  },
  headerWrapper: {
    padding: Padding.p_3xs,
    width: 355,
    left: 0,
    position: "absolute",
    top: 70,
  },
  chooseDate: {
    color: Color.neutral60,
    fontFamily: FontFamily.bodyMediumRegular,
    lineHeight: 16,
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
    fontSize: 18,
    color: Color.neutral10,
    fontWeight: "700",
    fontFamily: FontFamily.headingH4SemiBold,
    marginRight: 10,
    flexShrink: 1,
  },
  frameParent: {
    gap: Gap.gap_xs,
    width: 200,
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
    marginRight: -10,
  },
  date: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  dateWrapper: {
    top: 160,
    padding: Padding.p_3xs,
    width: 355,
    left: 10,
    position: "absolute",
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
  mostSellingItems: {
    fontWeight: "800",
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.bodyLargeMedium_size,
  },
  filter: {
    fontSize: 14,
    fontFamily: FontFamily.bodyMediumRegular,
    color: Color.neutral10,
  },
  vectorIcon: {
    height: 8,
    width: 10,
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
    marginLeft: 10,
  },
  homeV1Child: {
    top: 530,
    width: 372,
    left: 10,
    paddingLeft: 20,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  homeV1: {
    backgroundColor: Color.baseBlack,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FE5B18',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -1,
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
  profileIcon: {
    width: 50,
    height: 50,
    //marginRight: 5,
  },
  icon15: {
    top: 140,
    left: 350,
    width: 30,
    height: 30,
    position: "absolute",
  },
  filterOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  mostSellingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    marginTop: 420,
  },
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 0,
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
});

export default Orders;
