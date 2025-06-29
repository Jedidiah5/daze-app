import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import HomeIcon from '@/components/UI/Icons/home';
import CalendarIcon from '@/components/UI/Icons/home-filled';
import PlusIcon from '@/components/UI/Icons/plus-icon';
import ProfileIcon from '@/components/UI/Icons/lock-icon';
import SettingsIcon from '@/components/UI/Icons/verified-icon';

export default function BottomNav({ active }: { active: string }) {
  const router = useRouter();
  return (
    <View style={tw`flex-row justify-between items-center bg-[#23190F] px-6 py-3`}> 
      <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
        <HomeIcon tw={`w-7 h-7 ${active === 'home' ? 'text-primary' : 'text-[#A97A4D]'}`} fill={active === 'home' ? '#A97A4D' : '#6D6D6D'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/calendar')}>
        <CalendarIcon tw={`w-7 h-7 ${active === 'calendar' ? 'text-primary' : 'text-[#A97A4D]'}`} fill={active === 'calendar' ? '#A97A4D' : '#6D6D6D'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/add')}>
        <PlusIcon tw={`w-7 h-7 ${active === 'add' ? 'text-primary' : 'text-[#A97A4D]'}`} fill={active === 'add' ? '#A97A4D' : '#6D6D6D'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
        <ProfileIcon tw={`w-7 h-7 ${active === 'profile' ? 'text-primary' : 'text-[#A97A4D]'}`} fill={active === 'profile' ? '#A97A4D' : '#6D6D6D'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/settings')}>
        <SettingsIcon tw={`w-7 h-7 ${active === 'settings' ? 'text-primary' : 'text-[#A97A4D]'}`} fill={active === 'settings' ? '#A97A4D' : '#6D6D6D'} />
      </TouchableOpacity>
    </View>
  );
} 