import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,Image } from 'react-native';
import tw from '@/lib/tailwind';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-background justify-center`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={tw`flex-1 px-6 pt-12`}> 
      <Image
              source={require('../../assets/images/logo.png')}
              style={tw`w-18 h-18`}
              resizeMode="contain"
            />
        <Text style={tw`text-white text-2xl font-bold text-center mb-8`}>Welcome back</Text>
        <TextInput
          placeholder="Username or email"
          placeholderTextColor="#A97A4D"
          style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-4 text-white`}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A97A4D"
          secureTextEntry
          style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-2 text-white`}
        />
        <TouchableOpacity>
          <Text style={tw`text-[#A97A4D] text-sm mb-6`}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-primary rounded-full py-3 mb-8`}>
          <Text style={tw`text-white text-center text-base font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`items-center mb-6`}> 
        <Text style={tw`text-[#A97A4D] text-sm`}>Don't have an account? <Text style={tw`underline`}>Sign up</Text></Text>
      </View>
    </KeyboardAvoidingView>
  );
} 