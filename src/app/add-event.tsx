import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getCountdownDays(year: number, month: number, day: number) {
  const today = new Date();
  const target = new Date(year, month, day);
  // Zero out time for accurate day diff
  today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function AddEvent() {
  const router = useRouter();
  const today = new Date();
  const [eventName, setEventName] = useState('');
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const [category, setCategory] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const countdownDays = getCountdownDays(year, month, selectedDay);
  const targetDate = new Date(year, month, selectedDay);
  const formattedDate = targetDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}> 
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-6`}> 
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={tw`text-white text-2xl`}>×</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold`}>New Event</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Input */}
        <TextInput
          style={tw`bg-[#2B2217] text-white rounded-lg px-4 py-3 mb-4 text-base`}
          placeholder="Category (e.g. Vacation, Birthday)"
          placeholderTextColor="#A97A4D"
          value={category}
          onChangeText={setCategory}
        />
        {/* Event Name Input */}
        <TextInput
          style={tw`bg-[#2B2217] text-white rounded-lg px-4 py-3 mb-6 text-base`}
          placeholder="Event Name"
          placeholderTextColor="#A97A4D"
          value={eventName}
          onChangeText={setEventName}
        />
        {/* Add Image Section */}
        <Text style={tw`text-white font-bold mb-2`}>Image</Text>
        <TouchableOpacity
          style={tw`bg-[#2B2217] rounded-lg px-4 py-6 mb-6 items-center justify-center border-2 border-dashed border-[#A97A4D]`}
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={tw`w-24 h-24 rounded-lg`} resizeMode="cover" />
          ) : (
            <Text style={tw`text-[#A97A4D] text-base`}>Add an image</Text>
          )}
        </TouchableOpacity>
        {/* Date Section */}
        <Text style={tw`text-white font-bold mb-2`}>Date</Text>
        <View style={tw`bg-transparent mb-6`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-2xl`}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={tw`text-white text-base font-bold`}>{today.toLocaleString('default', { month: 'long' })} {year}</Text>
            <TouchableOpacity>
              <Text style={tw`text-white text-2xl`}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row w-full mb-2`}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <Text key={d + i} style={tw`flex-1 text-center text-[#A97A4D] font-bold`}>{d}</Text>
            ))}
          </View>
          {/* Calendar grid for July 2024 */}
          {(() => {
            const firstDay = new Date(year, month, 1).getDay();
            const rows = [];
            let cells = [];
            for (let i = 0; i < firstDay; i++) {
              cells.push(<View key={`empty-${i}`} style={tw`flex-1 aspect-square`} />);
            }
            for (let day = 1; day <= daysInMonth; day++) {
              const isSelected = selectedDay === day;
              cells.push(
                <TouchableOpacity
                  key={day}
                  style={tw`flex-1 aspect-square items-center justify-center`}
                  onPress={() => setSelectedDay(day)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      isSelected
                        ? { backgroundColor: '#F7931A', borderRadius: 999, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }
                        : {},
                    ]}
                  >
                    <Text style={tw`${isSelected ? 'text-white' : 'text-white'} text-base font-semibold`}>
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
              if ((cells.length) % 7 === 0 || day === daysInMonth) {
                rows.push(
                  <View key={`row-${day}`} style={tw`flex-row w-full`}>{cells}</View>
                );
                cells = [];
              }
            }
            return rows;
          })()}
        </View>
        {/* Start Countdown Button */}
        <TouchableOpacity
          style={tw`bg-[#F7931A] rounded-lg py-4 items-center mb-8`}
          onPress={() => setModalVisible(true)}
        >
          <Text style={tw`text-white text-base font-bold`}>Start Countdown</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Countdown Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-60`}>
          <View style={tw`bg-background rounded-lg p-6 w-72 items-center`}>
            {/* X Close Button */}
            <TouchableOpacity
              style={tw`absolute top-3 right-3 z-10`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-white text-2xl`}>×</Text>
            </TouchableOpacity>
            <Text style={tw`text-white text-2xl font-bold mb-2 mt-2`}>{countdownDays} Days Left</Text>
            <Text style={tw`text-white text-base mb-6`}>Until {formattedDate}</Text>
            <View style={tw`flex-row w-full justify-between mb-4`}>
              <TouchableOpacity
                style={tw`flex-1 bg-[#2B2217] py-3 rounded-lg mr-2 items-center`}
                onPress={() => {
                  setModalVisible(false);
                  // Scroll to top for editing (simulate by focusing event name input)
                  // You can add a ref to the ScrollView/TextInput for a real scroll/focus
                }}
              >
                <Text style={tw`text-white font-semibold`}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1 bg-[#2B2217] py-3 rounded-lg ml-2 items-center`}
                onPress={() => {
                  setModalVisible(false);
                  setEventName('');
                  setImage(null);
                }}
              >
                <Text style={tw`text-white font-semibold`}>Delete</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={tw`bg-[#F7931A] rounded-lg py-3 px-6 w-full items-center`}
              onPress={async () => {
                if (!eventName) return; // Optionally require a name
                const countdown = {
                  eventName,
                  category,
                  year,
                  month,
                  day: selectedDay,
                  image,
                  createdAt: Date.now(),
                };
                const prev = await AsyncStorage.getItem('countdowns');
                let arr = [];
                if (prev) arr = JSON.parse(prev);
                arr.push(countdown);
                await AsyncStorage.setItem('countdowns', JSON.stringify(arr));
                setModalVisible(false);
                router.replace('/(tabs)/home');
              }}
            >
              <Text style={tw`text-white font-bold`}>Save Countdown</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
} 