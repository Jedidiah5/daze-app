import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from '@/lib/tailwind';
import BackArrow from '@/components/UI/Icons/back-arrow';

const profileImages = [
  require('../../../assets/images/profile1.png'),
  require('../../../assets/images/profile2.png'),
  require('../../../assets/images/profile3.png'),
];

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function NicknameScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [signupData, setSignupData] = useState<SignupData | null>(null);

  const canContinue = nickname.trim().length > 0 && selectedProfile !== null;

  useEffect(() => {
    const loadSignupData = async () => {
      try {
        const data = await AsyncStorage.getItem('tempSignupData');
        if (data) {
          setSignupData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading signup data:', error);
      }
    };
    loadSignupData();
  }, []);

  const handleContinue = async () => {
    if (!signupData || !canContinue) return;

    // Combine signup data with nickname and profile picture
    const userData = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      username: nickname.trim(),
      nickname: nickname.trim(),
      fullName: `${signupData.firstName} ${signupData.lastName}`,
      avatar: profileImages[selectedProfile!],
      profileImageIndex: selectedProfile,
      joinedDate: new Date().toISOString(),
    };

    try {
      // Store complete user data
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      // Clean up temporary signup data
      await AsyncStorage.removeItem('tempSignupData');
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-background`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header with back arrow */}
      <View style={tw`flex-row items-center px-6 pt-12 pb-2`}>
        <TouchableOpacity onPress={() => router.replace('/auth/signup')}>
          <BackArrow tw="w-6 h-6" fill="#A97A4D" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 px-6 pt-4`}> 
        <Text style={tw`text-white text-2xl font-bold text-center mb-2`}>Set up your profile</Text>
        <Text style={tw`text-[#A97A4D] text-base text-center mb-8`}>Choose a nickname and profile picture</Text>
        {/* Nickname Input */}
        <Text style={tw`text-[#A97A4D] font-semibold mb-1`}>Nickname</Text>
        <TextInput
          placeholder="Enter your nickname"
          placeholderTextColor="#A97A4D"
          style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-6 text-white`}
          value={nickname}
          onChangeText={setNickname}
        />
        {/* Profile Image Selection */}
        <Text style={tw`text-[#A97A4D] font-semibold mb-3`}>Profile picture</Text>
        <View style={tw`flex-row justify-center mb-8`}> 
          {profileImages.map((img, idx) => (
            <TouchableOpacity
              key={idx}
              style={tw`${selectedProfile === idx ? 'border-4 border-primary' : 'border-2 border-[#3A2B1A]'} rounded-full mx-2 p-1`}
              onPress={() => setSelectedProfile(idx)}
            >
              <Image source={img} style={tw`w-20 h-20 rounded-full`} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Continue Button */}
        <TouchableOpacity
          style={tw`${canContinue ? 'bg-primary' : 'bg-[#A97A4D] opacity-50'} rounded-full py-3 mb-4`}
          disabled={!canContinue}
          onPress={handleContinue}
        >
          <Text style={tw`text-white text-center text-base font-semibold`}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
} 