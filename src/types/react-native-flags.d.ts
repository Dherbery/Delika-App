declare module 'react-native-flags' {
  interface FlagsProps {
    code: string;
    size: number;
    type: 'flat' | 'shiny';
  }
  declare module 'react-native-vector-icons/Ionicons';
  const Flags: React.FC<FlagsProps>;
  export default Flags;
} 