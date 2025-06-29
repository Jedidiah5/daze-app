import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import { useState } from 'react';
import PlusIcon from '@/components/UI/Icons/plus-icon';
import BottomNav from './bottom-nav';

const countdowns = [
  {
    id: '1',
    category: 'Vacation',
    title: 'Trip to the beach',
    daysLeft: 12,
    image: require('../../../assets/images/splash-icon.png'),
  },
  {
    id: '2',
    category: 'Birthday',
    title: "Sophia's Birthday",
    daysLeft: 35,
    image: require('../../../assets/images/logo2.png'),
  },
  {
    id: '3',
    category: 'Anniversary',
    title: 'Our Anniversary',
    daysLeft: 100,
    image: require('../../../assets/images/logo.png'),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}> 
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mb-6`}> 
        <Text style={tw`text-white text-xl font-bold`}>Your Countdowns</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/add')}>
          <PlusIcon tw="w-7 h-7" fill="#A97A4D" />
        </TouchableOpacity>
      </View>
      {/* Countdown List */}
      <FlatList
        data={countdowns}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center mb-6`}> 
            <View style={tw`flex-1`}> 
              <Text style={tw`text-[#A97A4D] text-xs`}>{item.category}</Text>
              <Text style={tw`text-white font-bold text-base`}>{item.title}</Text>
              <Text style={tw`text-[#A97A4D] text-xs`}>{item.daysLeft} days left</Text>
            </View>
            <Image source={item.image} style={tw`w-20 h-14 rounded-lg ml-4`} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <BottomNav active="home" />
    </View>
  );
} 