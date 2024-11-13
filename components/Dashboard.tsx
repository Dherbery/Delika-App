import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

type DashboardProps = {
  vuesaxlinearcategory2: any;
  dashboard: string;
  isSelected: boolean;
  onPress: () => void;
  dashboardColor: string;
  dashboardFontFamily: string;
  rectangleViewOpacity: number;
  rectangleViewBackgroundColor: string;
  rectangleViewBorderColor: string;
  rectangleViewBorderWidth: number;
  rectangleViewWidth: number;
  navigate?: () => void;
};

const Dashboard = ({
  vuesaxlinearcategory2,
  dashboard,
  isSelected = false,
  onPress,
  rectangleViewOpacity = 1,
  dashboardColor = '#fff',
  dashboardFontFamily = 'Inter-Medium',
  rectangleViewBackgroundColor = "#FE5B18",
  rectangleViewBorderColor = "FE5B18",
  rectangleViewBorderWidth = 1,
  rectangleViewWidth = 80,
}: DashboardProps) => {
  return (
    <View 
      style={styles.container}
      onTouchEnd={onPress}
    >
      {isSelected && (
        <View style={[
          styles.rectangleView,
          {
            opacity: rectangleViewOpacity,
            backgroundColor: rectangleViewBackgroundColor,
            borderColor: rectangleViewBorderColor,
            borderWidth: rectangleViewBorderWidth,
          }
        ]} />
      )}
      <Image 
        source={vuesaxlinearcategory2} 
        style={[
          styles.icon,
          isSelected && { tintColor: '#FE5B18' }
        ]} 
      />
      <Text 
        style={[
          styles.text, 
          { 
            color: isSelected ? '#FE5B18' : dashboardColor,
            fontFamily: dashboardFontFamily 
          }
        ]}
      >
        {dashboard}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  rectangleView: {
    position: 'absolute',
    width: '90%',
    height: '180%',
    borderLeftWidth: 5,
    borderLeftColor: '#FE5B18',
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
    //elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Dashboard; 