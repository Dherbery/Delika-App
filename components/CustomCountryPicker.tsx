import React from 'react';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
]);

interface CustomCountryPickerProps {
  countryCode: CountryCode;
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  withFilter?: boolean;
  withFlag?: boolean;
  withCountryNameButton?: boolean;
  withAlphaFilter?: boolean;
  withCallingCode?: boolean;
  withEmoji?: boolean;
}

const CustomCountryPicker = ({
  countryCode,
  visible,
  onClose,
  onSelect,
  withFilter = true,
  withFlag = true,
  withCountryNameButton = false,
  withAlphaFilter = false,
  withCallingCode = true,
  withEmoji = true
}: CustomCountryPickerProps) => {
  return (
    <CountryPicker
      {...{
        countryCode,
        visible,
        onClose,
        onSelect,
        withFilter,
        withFlag,
        withCountryNameButton,
        withAlphaFilter,
        withCallingCode,
        withEmoji
      }}
    />
  );
};

export default CustomCountryPicker; 