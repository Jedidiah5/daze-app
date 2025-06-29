import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import BackArrow from '@/components/UI/Icons/back-arrow';

const profileImages = [
  require('../../../assets/images/profile1.png'),
  require('../../../assets/images/profile2.png'),
  require('../../../assets/images/profile3.png'),
];

export default function NicknameScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  const canContinue = nickname.trim().length > 0 && selectedProfile !== null;

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
          onPress={() => {/* handle continue, e.g., save and navigate */}}
        >
          <Text style={tw`text-white text-center text-base font-semibold`}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
} 