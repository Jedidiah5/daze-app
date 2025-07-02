import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import tw from '@/lib/tailwind';
import HomeNav from '@/components/UI/Icons/home-nav';
import HomeOutlineNav from '@/components/UI/Icons/home-outline-nav';
import CalendarNav from '@/components/UI/Icons/calendar-nav';
import CalendarOutlineNav from '@/components/UI/Icons/calendar-outline-nav';
import AddOutlineNav from '@/components/UI/Icons/add-outline-nav';
import PeopleNav from '@/components/UI/Icons/people-nav';
import PeopleOutlineNav from '@/components/UI/Icons/people-outline-nav';
import PersonNav from '@/components/UI/Icons/person-nav';
import PersonOutlineNav from '@/components/UI/Icons/person-outline-nav';

export default function BottomNav({ active }: { active: string }) {
  const router = useRouter();
  return (
    <View style={tw`flex-row justify-between items-center bg-background px-6 py-3`}> 
      <TouchableOpacity onPress={() => router.push('/(tabs)/home' as any)}>
        {active === 'home' ? (
          <HomeNav tw={`w-7 h-7`} fill="#A97A4D" />
        ) : (
          <HomeOutlineNav tw={`w-7 h-7`} fill="#A97A4D" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/booking' as any)}>
        {active === 'booking' ? (
          <CalendarNav tw={`w-7 h-7`} fill="#A97A4D" />
        ) : (
          <CalendarOutlineNav tw={`w-7 h-7`} fill="#A97A4D" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/add-event' as any)}>
        <AddOutlineNav tw={`w-7 h-7`} fill="#A97A4D" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/people' as any)}>
        {active === 'people' ? (
          <PeopleNav tw={`w-7 h-7`} fill="#A97A4D" />
        ) : (
          <PeopleOutlineNav tw={`w-7 h-7`} fill="#A97A4D" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)}>
        {active === 'profile' ? (
          <PersonNav tw={`w-7 h-7`} fill="#A97A4D" />
        ) : (
          <PersonOutlineNav tw={`w-7 h-7`} fill="#A97A4D" />
        )}
      </TouchableOpacity>
    </View>
  );
} 