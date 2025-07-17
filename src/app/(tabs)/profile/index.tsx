import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from '@/lib/tailwind';
import BottomNav from '../bottom-nav';
import { useRouter } from 'expo-router';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  nickname: string;
  fullName: string;
  avatar: any; // This will be a require() statement for local images
  profileImageIndex: number;
  joinedDate: string;
};

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [countdownReminder, setCountdownReminder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const formatJoinedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Joined today';
    if (diffDays < 7) return `Joined ${diffDays} days ago`;
    if (diffDays < 30) return `Joined ${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `Joined ${Math.floor(diffDays / 30)} months ago`;
    return `Joined ${Math.floor(diffDays / 365)} years ago`;
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('countdowns');
              router.replace('/login');
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`w-8 h-8 items-center justify-center`}>
          <Text style={tw`text-white text-2xl`}>×</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold`}>Countdown</Text>
        <TouchableOpacity>
          <Text style={tw`text-white text-2xl`}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Settings Options */}
        <View style={tw`mb-6`}>
          <View style={tw`flex-row items-center justify-between py-4 border-b border-[#3A2C20]`}>
            <Text style={tw`text-white text-base`}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#3A2C20', true: '#F7931A' }}
              thumbColor={darkMode ? '#fff' : '#fff'}
            />
          </View>
          <View style={tw`flex-row items-center justify-between py-4 border-b border-[#3A2C20]`}>
            <Text style={tw`text-white text-base`}>Countdown Reminder</Text>
            <Switch
              value={countdownReminder}
              onValueChange={setCountdownReminder}
              trackColor={{ false: '#3A2C20', true: '#F7931A' }}
              thumbColor={countdownReminder ? '#fff' : '#fff'}
            />
          </View>
        </View>

        {/* Profile Section */}
        {userData && (
          <TouchableOpacity style={tw`flex-row items-center py-4 mb-6`}>
            <Image
              source={userData.avatar}
              style={tw`w-16 h-16 rounded-full mr-4 bg-[#3A2C20]`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-lg font-bold`}>Profile</Text>
              <Text style={tw`text-[#A97A4D] text-sm`}>{userData.fullName}</Text>
              <Text style={tw`text-[#A97A4D] text-xs`}>{formatJoinedDate(userData.joinedDate)}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* User Details Section */}
        {userData && (
          <View style={tw`mb-6`}>
            <Text style={tw`text-white text-base font-semibold mb-3`}>Account Details</Text>
            <View style={tw`bg-[#3A2C20] rounded-lg p-4 mb-3`}>
              <Text style={tw`text-[#A97A4D] text-xs mb-1`}>Email</Text>
              <Text style={tw`text-white text-sm`}>{userData.email}</Text>
            </View>
            <View style={tw`bg-[#3A2C20] rounded-lg p-4 mb-3`}>
              <Text style={tw`text-[#A97A4D] text-xs mb-1`}>Username</Text>
              <Text style={tw`text-white text-sm`}>{userData.nickname}</Text>
            </View>
            <View style={tw`bg-[#3A2C20] rounded-lg p-4`}>
              <Text style={tw`text-[#A97A4D] text-xs mb-1`}>Full Name</Text>
              <Text style={tw`text-white text-sm`}>{userData.fullName}</Text>
            </View>
          </View>
        )}

        {/* Additional Options */}
        <View style={tw`mb-6`}>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-4 border-b border-[#3A2C20]`}>
            <Text style={tw`text-white text-base`}>Notifications</Text>
            <Text style={tw`text-[#A97A4D] text-sm`}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-4 border-b border-[#3A2C20]`}>
            <Text style={tw`text-white text-base`}>Privacy</Text>
            <Text style={tw`text-[#A97A4D] text-sm`}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-4 border-b border-[#3A2C20]`}>
            <Text style={tw`text-white text-base`}>Help & Support</Text>
            <Text style={tw`text-[#A97A4D] text-sm`}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-4 border-b border-[#3A2C20]`}>
            <Text style={tw`text-white text-base`}>About</Text>
            <Text style={tw`text-[#A97A4D] text-sm`}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={tw`bg-[#3A2C20] rounded-lg py-3 items-center mt-auto mb-20`}
          onPress={handleLogout}
        >
          <Text style={tw`text-red-500 text-base font-semibold`}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav active="profile" />
    </View>
  );
} 