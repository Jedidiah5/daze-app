import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from '@/lib/tailwind';
import BottomNav from './bottom-nav';
import { useRouter } from 'expo-router';

type Countdown = {
  eventName: string;
  category?: string;
  year: number;
  month: number;
  day: number;
  image?: string;
  createdAt: number;
};

function getCountdownDays(year: number, month: number, day: number) {
  const today = new Date();
  const target = new Date(year, month, day);
  today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function HomeScreen() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCountdowns = async () => {
      const data = await AsyncStorage.getItem('countdowns');
      if (data) setCountdowns(JSON.parse(data));
    };
    fetchCountdowns();
  }, []);

  const handleDelete = async (index: number) => {
    const newCountdowns = [...countdowns];
    newCountdowns.splice(index, 1);
    setCountdowns(newCountdowns);
    await AsyncStorage.setItem('countdowns', JSON.stringify(newCountdowns));
    setModalVisible(false);
  };

  const handleShare = async (c: Countdown) => {
    const dateStr = new Date(c.year, c.month, c.day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    await Share.share({
      message: `${c.eventName} (${c.category || ''}) is in ${getCountdownDays(c.year, c.month, c.day)} days! Until ${dateStr}`
    });
    setModalVisible(false);
  };

  const handleEdit = (c: Countdown) => {
    setModalVisible(false);
    router.push({ pathname: '/add-event', params: { ...c } });
  };

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}>
      <Text style={tw`text-white text-xl font-bold mb-6`}>Home</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {countdowns.length === 0 ? (
          <Text style={tw`text-white text-center mt-12`}>No countdowns yet.</Text>
        ) : (
          countdowns.map((c: Countdown, i: number) => (
            <View key={i} style={tw`bg-[#2B2217] rounded-lg p-4 mb-4 flex-row items-center justify-between`}>
              <View style={tw`flex-1 mr-4`}>
                {c.category ? (
                  <Text style={tw`text-[#A97A4D] text-xs mb-1`}>{c.category}</Text>
                ) : null}
                <Text style={tw`text-white text-lg font-bold mb-1`}>{c.eventName}</Text>
                <Text style={tw`text-[#A97A4D] text-xs`}>{getCountdownDays(c.year, c.month, c.day)} days left</Text>
              </View>
              {c.image ? (
                <Image source={{ uri: c.image }} style={tw`w-20 h-14 rounded-2xl`} resizeMode="cover" />
              ) : null}
              {/* Three-dot menu */}
              <TouchableOpacity onPress={() => { setSelectedIndex(i); setModalVisible(true); }} style={tw`ml-2 p-2`}>
                <Text style={tw`text-white text-2xl`}>⋮</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      {/* Modal for options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-60`}>
          <View style={tw`bg-background rounded-lg p-6 w-64 items-center`}>
            <TouchableOpacity style={tw`w-full py-3 items-center`} onPress={() => handleEdit(countdowns[selectedIndex!]!)}>
              <Text style={tw`text-white text-base`}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`w-full py-3 items-center`} onPress={() => handleDelete(selectedIndex!)}>
              <Text style={tw`text-red-500 text-base`}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`w-full py-3 items-center`} onPress={() => handleShare(countdowns[selectedIndex!]!)}>
              <Text style={tw`text-[#F7931A] text-base`}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`w-full py-3 items-center`} onPress={() => setModalVisible(false)}>
              <Text style={tw`text-[#A97A4D] text-base`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <BottomNav active="home" />
    </View>
  );
} 