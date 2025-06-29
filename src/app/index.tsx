import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import QuestionIcon from '@/components/UI/Icons/question-icon';

export default function OnboardingScreen() {
  const [showIntro, setShowIntro] = useState(false);
  const router = useRouter();

  if (!showIntro) {
    return (
      <View style={tw`flex-1 bg-background justify-center items-center`}>
        <View style={tw`absolute top-12 right-6 z-10`}>
          <TouchableOpacity>
            <QuestionIcon tw="w-6 h-6" fill="#A97A4D" />
          </TouchableOpacity>
        </View>
        
        <Image
          source={require('../../assets/images/logo.png')}
          style={tw`w-24 h-24`}
          resizeMode="contain"
        />
        <Text style={tw`text-primary text-5xl font-bold`}>Daze</Text>
        <TouchableOpacity
          style={tw`absolute inset-0`}
          activeOpacity={1}
          onPress={() => setShowIntro(true)}
        />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-background justify-end`}> 
      <View style={tw`absolute top-12 right-6 z-10`}>
        <TouchableOpacity>
          <QuestionIcon tw="w-6 h-6" fill="#A97A4D" />
        </TouchableOpacity>
      </View>
      
      <View style={tw`rounded-t-3xl px-8 pt-10 pb-10 flex-col h-[70%]`}> 
        <View style={tw`items-center`}> 
          <View style={tw`bg-background rounded-full p-4 -mt-16`}> 
            <Image
              source={require('../../assets/images/logo.png')}
              style={tw`w-18 h-18`}
              resizeMode="contain"
            />
          </View>
          <Text style={tw`text-center text-xl font-semibold text-[#A97A4D] `}>Easy <Text style={tw`text-primary`}>countdowns</Text></Text>
          <Text style={tw`text-center text-xl font-semibold text-[#A97A4D] mb-6`}>for your special events.</Text>
        </View>
        <View style={tw`flex-1 justify-end`}> 
          <TouchableOpacity
            style={tw`w-full bg-primary rounded-full py-3 mb-4`}
            onPress={() => router.replace('/auth/signup')}
          >
            <Text style={tw`text-white text-center text-base font-semibold`}>Get started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-full border border-primary rounded-full py-3`}
            onPress={() => router.replace('/login')}
          >
            <Text style={tw`text-primary text-center text-base font-semibold`}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}