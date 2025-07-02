import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import tw from '@/lib/tailwind';
import BottomNav from '../bottom-nav';
import { useRouter } from 'expo-router';

// Mock booked days (YYYY-MM-DD)
const bookedDays = [
  '2025-06-01',
  '2024-05-12',
  '2024-05-20',
  '2024-06-10',
  '2024-06-15',
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function CalendarMonth({ year, month, onDatePress }: {
  year: number;
  month: number;
  onDatePress: (date: string) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const rows = [];
  let cells = [];

  // Fill initial empty cells
  for (let i = 0; i < firstDay; i++) {
    cells.push(<View key={`empty-${i}`} style={tw`flex-1 aspect-square`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(year, month, day);
    const isBooked = bookedDays.includes(dateStr);
    cells.push(
      <TouchableOpacity
        key={dateStr}
        style={tw`flex-1 aspect-square items-center justify-center`}
        onPress={() => onDatePress(dateStr)}
        activeOpacity={0.7}
      >
        <View>
          <Text style={tw`text-white text-base font-semibold`}>{day}</Text>
        </View>
        {isBooked && (
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#A97A4D', marginTop: 2 }} />
        )}
      </TouchableOpacity>
    );
    if ((cells.length) % 7 === 0) {
      rows.push(
        <View key={`row-${day}`} style={tw`flex-row w-full`}>{cells}</View>
      );
      cells = [];
    }
  }
  // Fill the last row with empty cells if needed
  if (cells.length > 0) {
    while (cells.length < 7) {
      cells.push(<View key={`empty-end-${cells.length}`} style={tw`flex-1 aspect-square`} />);
    }
    rows.push(
      <View key={`row-last`} style={tw`flex-row w-full`}>{cells}</View>
    );
  }

  return (
    <View style={tw`mb-6`}>
      <Text style={tw`text-white text-center text-base font-bold mb-2`}>{monthNames[month]} {year}</Text>
      <View style={tw`flex-row w-full mb-2`}>{['S','M','T','W','T','F','S'].map((d, i) => (
        <Text key={d + i} style={tw`flex-1 text-center text-[#A97A4D] font-bold`}>{d}</Text>
      ))}</View>
      {rows}
    </View>
  );
}

export default function BookingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();

  // Only July (6) to December (11) 2025
  const months = [6, 7, 8, 9, 10, 11];
  const year = 2025;

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={{ width: 32 }} />
        <Text style={tw`text-white text-lg font-bold`}>Events</Text>
        <View style={{ width: 32 }} />
      </View>
      {/* Scrollable Calendar Months */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {months.map(month => (
          <CalendarMonth
            key={month}
            year={year}
            month={month}
            onDatePress={handleDatePress}
          />
        ))}
      </ScrollView>
      {/* Modal for Add Event */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-60`}>
          <View style={tw`bg-background rounded-lg p-6 w-72 items-center`}>
            <Text style={tw`text-white text-lg font-bold mb-4`}>Add new event</Text>
            <Text style={tw`text-white mb-4`}>{selectedDate}</Text>
            <Pressable
              style={tw`bg-primary rounded-full py-3 px-6 mb-2`}
              onPress={() => {
                setModalVisible(false);
                if (selectedDate) {
                  router.push({ pathname: '/add-event', params: { date: selectedDate } });
                } else {
                  router.push('/add-event');
                }
              }}
            >
              <Text style={tw`text-white text-base font-semibold`}>Add new event</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={tw`text-[#A97A4D] mt-2`}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Always visible BottomNav */}
      <View style={tw`absolute left-0 right-0 bottom-0`} pointerEvents="box-none">
        <BottomNav active="booking" />
      </View>
    </View>
  );
} 