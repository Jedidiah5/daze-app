import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from '@/lib/tailwind';
import QuestionIcon from '@/components/UI/Icons/question-icon';
import BackArrow from '@/components/UI/Icons/back-arrow';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      // You could add proper validation here
      return;
    }

    // Store user data for profile page
    const userData = {
      username: username.trim(),
      email: username.includes('@') ? username.trim() : `${username.trim()}@example.com`,
      name: username.trim().split('@')[0], // Use username as name for now
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username.trim())}&background=F7931A&color=fff&size=128`,
      joinedDate: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-background justify-center`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header with back arrow and question icon */}
      <View style={tw`flex-row justify-between items-center px-6 pt-12 pb-4`}>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <BackArrow tw="w-6 h-6" fill="#A97A4D" />
        </TouchableOpacity>
        <TouchableOpacity>
          <QuestionIcon tw="w-6 h-6" fill="#A97A4D" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 px-6`}> 
        <View style={tw`bg-background items-center pb-6`}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={tw`w-20 h-20`}
            resizeMode="contain"
          />
        </View>
        <Text style={tw`text-white text-2xl font-bold text-center mb-8`}>Welcome back</Text>
        <TextInput
          placeholder="Username or email"
          placeholderTextColor="#A97A4D"
          style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-4 text-white`}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A97A4D"
          secureTextEntry
          style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-2 text-white`}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={tw`text-[#A97A4D] text-sm mb-6`}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`bg-primary rounded-full py-3 mb-8`} 
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-center text-base font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`items-center mb-6`}> 
        <Text style={tw`text-[#A97A4D] text-sm`}>Don't have an account? 
          <Text style={tw`underline`} onPress={() => router.replace('/auth/signup')}>Sign up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
} 