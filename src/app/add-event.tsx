import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function AddEvent() {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [selectedDay, setSelectedDay] = useState(5); // default to 5th
  const [image, setImage] = useState<string | null>(null);
  const year = 2024;
  const month = 6; // July (0-indexed)
  const daysInMonth = getDaysInMonth(year, month);

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
            <Text style={tw`text-white text-base font-bold`}>July 2024</Text>
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
        <TouchableOpacity style={tw`bg-[#F7931A] rounded-lg py-4 items-center mb-8`}>
          <Text style={tw`text-white text-base font-bold`}>Start Countdown</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
} 