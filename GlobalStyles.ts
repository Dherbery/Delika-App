import { Platform } from 'react-native';

export const FontSize = {
  bodyMediumSemiBold_size: 14,
  headingH4SemiBold_size: 24,
  bodyLargeMedium_size: 16,
  bodyMediumMedium_size: 14,
  bodySmallMedium_size: 12,
  body1Regular_size: 16,
  headingH5SemiBold_size: 20, 
  // Add other font sizes as needed
};

export const FontFamily = {
  bodyMediumSemiBold: "Inter-SemiBold",
  bodyMediumMedium: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  interBold: "Inter-Bold",
  headingH4SemiBold: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  bodyMediumRegular: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  // Add other font families as needed
};

export const Color = {
  neutral10: "#FFFFFF",
  neutral60: "#999999",
  neutral100: "#000000",
  colorOrangered: "#FF4500",
  baseBlack: "#000000",
  otherOrange: "#FF9B3E",
  colorWhitesmoke: "#F5F5F5",
  colorGray_100: "#333333",
  dark500: "#000000",
  primaryPrimary5: "#F4EBFF", 
  primary500: "#FF6B00",
  // Add other colors as needed
};

export const Border = {
  br_11xl: 30,
  br_11xs_3: 1.3,
  br_5xl: 16,
  br_base: 16,
  br_10xs_7: 2.7,
  br_5xs: 10,
  br_3xs: 8,
  br_xl: 16,
  // Add other border values as needed
};

export const Padding = {
  p_base: 16,
  p_11xl: 32,
  p_3xs: 4,
  p_sm: 14,
  // Add other padding values as needed
};

export const Gap = {
  gap_md: 16,
  gap_xs: 4,
  gap_4xs: 4,
  gap_lg: 24,
  gap_sm: 8,
  gap_4xl: 64,
  gap_xl: 80, 
  gap_2xs: 8,
  // Add other gap values as needed
};

export const GlobalStyles = {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
  Gap,
};