import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import BottomNav from '../bottom-nav';

export default function ProfileScreen() {
  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}>
      <Text style={tw`text-white text-xl font-bold mb-6`}>Profile</Text>
      <Text style={tw`text-white`}>Profile screen content will go here</Text>
      <BottomNav active="profile" />
    </View>
  );
} 