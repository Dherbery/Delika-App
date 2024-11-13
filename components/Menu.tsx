import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Animated, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import Dashboard from "../components/Dashboard";
import { Color, Gap } from "../GlobalStyles";
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import the type from App.tsx

export type MenuType = {
  /** Variant props */
  property1?: "Light";
};

type MenuProps = {
  isVisible: boolean;
  slideAnim: Animated.Value;
  onClose: () => void;
  navigation: NavigationProp;
};

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Menu: React.FC<MenuProps> = ({ isVisible, slideAnim, onClose, navigation }) => {
  const [selectedItem, setSelectedItem] = useState<string>('Dashboard');

  if (!isVisible) return null;

  return (
    <>
      {/* Full screen blur background */}
      <BlurView 
        intensity={50} 
        tint="dark" 
        style={styles.fullScreenBlur}
      />
      
      {/* Menu content */}
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }],
            width: width * 0.8,
          }
        ]}
      >
        <View style={styles.sideMenuChild} />
        <View style={[styles.dashboardParent, styles.logoTextPosition]}>
          <View style={styles.dashboardRow}>
          <Dashboard
              vuesaxlinearcategory2={require("../assets/vuesaxlinearcategory2.png")}
              dashboard="Dashboard"
              isSelected={selectedItem === 'Dashboard'}
              onPress={() => setSelectedItem('Dashboard')}
              dashboardColor={selectedItem === 'Dashboard' ? "#FE5B18" : "#201A18"}
              dashboardFontFamily="System"
              rectangleViewOpacity={selectedItem === 'Dashboard' ? 0.1 : 0}
              rectangleViewBackgroundColor="#FE5B18"
              rectangleViewBorderColor="#FE5B18"
              rectangleViewBorderWidth={1}
              rectangleViewWidth={90}
            />
            <TouchableOpacity 
              style={styles.homeIconContainer}
              onPress={() => {
                Animated.timing(slideAnim, {
                  toValue: -375,
                  duration: 300,
                  useNativeDriver: true
                }).start(() => onClose());
              }}
            >
              <Ionicons 
                name="home" 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          <Dashboard
            vuesaxlinearcategory2={require("../assets/vuesaxlinearbox.png")}
            dashboard="My Orders"
            isSelected={selectedItem === 'My Orders'}
            onPress={() => {
              setSelectedItem('My Orders');
              navigation.navigate('orders');
            }}
            dashboardColor={selectedItem === 'My Orders' ? "#FE5B18" : "#201A18"}
            dashboardFontFamily="System"
            rectangleViewOpacity={selectedItem === 'My Orders' ? 0.1 : 0}
            rectangleViewBackgroundColor="#FE5B18"
            rectangleViewBorderColor="#FE5B18"
            rectangleViewBorderWidth={1}
            rectangleViewWidth={80}
          />
          <Dashboard
            vuesaxlinearcategory2={require("../assets/frame2.png")}
            dashboard="Menu Items"
            isSelected={selectedItem === 'Menu Items'}
            onPress={() => setSelectedItem('Menu Items')}
            dashboardColor={selectedItem === 'Menu Items' ? "#FE5B18" : "#201A18"}
            dashboardFontFamily="System"
            rectangleViewOpacity={selectedItem === 'Menu Items' ? 0.1 : 0}
            rectangleViewBackgroundColor="#FE5B18"
            rectangleViewBorderColor="#FE5B18"
            rectangleViewBorderWidth={1}
            rectangleViewWidth={80}
          />
          <Dashboard
            vuesaxlinearcategory2={require("../assets/vuesaxlinearprofile2user.png")}
            dashboard="Staff"
            isSelected={selectedItem === 'Staff'}
            onPress={() => setSelectedItem('Staff')}
            dashboardColor={selectedItem === 'Staff' ? "#FE5B18" : "#201A18"}
            dashboardFontFamily="System"
            rectangleViewOpacity={selectedItem === 'Staff' ? 0.1 : 0}
            rectangleViewBackgroundColor="#FE5B18"
            rectangleViewBorderColor="#FE5B18"
            rectangleViewBorderWidth={1}
            rectangleViewWidth={80}
          />
          <Dashboard
            vuesaxlinearcategory2={require("../assets/vuesaxlineardollarcircle.png")}
            dashboard="Transactions"
            isSelected={selectedItem === 'Transactions'}
            onPress={() => setSelectedItem('Transactions')}
            dashboardColor={selectedItem === 'Transactions' ? "#FE5B18" : "#201A18"}
            dashboardFontFamily="System"
            rectangleViewOpacity={selectedItem === 'Transactions' ? 0.1 : 0}
            rectangleViewBackgroundColor="#FE5B18"
            rectangleViewBorderColor="#FE5B18"
            rectangleViewBorderWidth={1}
            rectangleViewWidth={80}
          />
          <Dashboard
            vuesaxlinearcategory2={require("../assets/vuesaxlinearnote.png")}
            dashboard="Reports"
            isSelected={selectedItem === 'Reports'}
            onPress={() => setSelectedItem('Reports')}
            dashboardColor={selectedItem === 'Reports' ? "#FE5B18" : "#201A18"}
            dashboardFontFamily="System"
            rectangleViewOpacity={selectedItem === 'Reports' ? 0.1 : 0}
            rectangleViewBackgroundColor="#FE5B18"
            rectangleViewBorderColor="#FE5B18"
            rectangleViewBorderWidth={1}
            rectangleViewWidth={80}
          />
          <Dashboard
            vuesaxlinearcategory2={require("../assets/vuesaxlinearsetting.png")}
            dashboard="Settings"
            isSelected={selectedItem === 'Settings'}
            onPress={() => setSelectedItem('Settings')}
            dashboardColor={selectedItem === 'Settings' ? "#FE5B18" : "#201A18"}
            dashboardFontFamily="System"
            rectangleViewOpacity={selectedItem === 'Settings' ? 0.1 : 0}
            rectangleViewBackgroundColor="#FE5B18"
            rectangleViewBorderColor="#FE5B18"
            rectangleViewBorderWidth={1}
            rectangleViewWidth={80}
          />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    backgroundColor: 'transparent',
  },
  fullScreenBlur: {
    position: 'absolute',
    width: width,
    height: height,
  },
  logoTextPosition: {
    left: 30,
    position: "absolute",
  },
  sideMenuChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.neutral10,
    borderStyle: "solid",
    borderColor: Color.neutral60,
    borderRightWidth: 1,
    position: "absolute",
  },
  logoText: {
    top: 30,
    width: 125,
    height: 50,
    overflow: "hidden",
  },
  dashboardParent: {
    top: 110,
    gap: 24,
  },
  sideMenu: {
    top: 0,
    left: 0,
    width: 375,
    height: 1000,
    position: "absolute",
  },
  dashboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 20,
  },
  homeIconContainer: {
    backgroundColor: '#FE5B18',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 35,
  },
});

export default Menu;
