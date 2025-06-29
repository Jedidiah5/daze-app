import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import QuestionIcon from '@/components/UI/Icons/question-icon';
import BackArrow from '@/components/UI/Icons/back-arrow';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-background`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header with back arrow and question icon */}
      <View style={tw`flex-row justify-between items-center px-6 pt-12 pb-2`}>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <BackArrow tw="w-6 h-6" fill="#A97A4D" />
        </TouchableOpacity>
        <TouchableOpacity>
          <QuestionIcon tw="w-6 h-6" fill="#A97A4D" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 px-6`}> 
        {/* Logo */}
        <View style={tw`items-center mb-4`}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={tw`w-20 h-20`}
            resizeMode="contain"
          />
        </View>
        {/* Title */}
        <Text style={tw`text-white text-xl font-bold text-center mb-6`}>Create an account</Text>
        {/* Google Sign Up Button */}
        <TouchableOpacity style={tw`flex-row items-center justify-center bg-background rounded-lg py-3 mb-4 border border-[#E5E7EB]`}>
          <Image source={require('../../../assets/images/google.svg')} style={tw`w-5 h-5 mr-2`} />
          <Text style={tw`text-white font-semibold`}>Sign up with Google</Text>
        </TouchableOpacity>
        {/* Divider */}
        <View style={tw`flex-row items-center my-2`}> 
          <View style={tw`flex-1 h-px bg-primary`} />
          <Text style={tw`mx-2 text-[#A97A4D] font-semibold`}>OR</Text>
          <View style={tw`flex-1 h-px bg-primary`} />
        </View>
        {/* Form Fields */}
        <Text style={tw`text-[#A97A4D] font-semibold mb-1 mt-2`}>First name</Text>
        <TextInput placeholder="Enter first name" placeholderTextColor="#A97A4D" style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-3 text-white`} />
        <Text style={tw`text-[#A97A4D] font-semibold mb-1`}>Last name</Text>
        <TextInput placeholder="Enter last name" placeholderTextColor="#A97A4D" style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-3 text-white`} />
        <Text style={tw`text-[#A97A4D] font-semibold mb-1`}>Email</Text>
        <TextInput placeholder="Enter email" placeholderTextColor="#A97A4D" keyboardType="email-address" style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-3 text-white`} />
        <Text style={tw`text-[#A97A4D] font-semibold mb-1`}>Password</Text>
        <TextInput placeholder="Enter password" placeholderTextColor="#A97A4D" secureTextEntry style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-3 text-white`} />
        <Text style={tw`text-[#A97A4D] font-semibold mb-1`}>Confirm password</Text>
        <TextInput placeholder="Re-enter password" placeholderTextColor="#A97A4D" secureTextEntry style={tw`bg-[#3A2B1A] rounded-lg px-4 py-3 mb-6 text-white`} />
        {/* Create Account Button */}
        <TouchableOpacity style={tw`bg-primary rounded-full py-3 mb-4 flex-row items-center justify-center`}>
          <Text style={tw`text-white text-center text-base font-semibold`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
} 