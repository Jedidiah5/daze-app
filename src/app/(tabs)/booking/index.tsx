import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import tw from '@/lib/tailwind';
import BottomNav from '../bottom-nav';

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

function CalendarMonth({ year, month, selected, onSelect }: {
  year: number;
  month: number;
  selected: string;
  onSelect: (date: string) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const today = new Date();
  const rows = [];
  let cells = [];

  // Fill initial empty cells
  for (let i = 0; i < firstDay; i++) {
    cells.push(<View key={`empty-${i}`} style={tw`flex-1 aspect-square`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(year, month, day);
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    const isSelected = selected === dateStr;
    const isBooked = bookedDays.includes(dateStr);
    cells.push(
      <TouchableOpacity
        key={dateStr}
        style={tw`flex-1 aspect-square items-center justify-center`}
        onPress={() => onSelect(dateStr)}
        activeOpacity={0.7}
      >
        <View
          style={[
            isSelected || isToday
              ? { backgroundColor: '#F7931A', borderRadius: 999, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }
              : {},
          ]}
        >
          <Text
            style={tw`${isSelected || isToday ? 'text-white' : 'text-white'} text-base font-semibold`}
          >
            {day}
          </Text>
        </View>
        {isBooked && (
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#A97A4D', marginTop: 2 }} />
        )}
      </TouchableOpacity>
    );
    if ((cells.length) % 7 === 0 || day === daysInMonth) {
      rows.push(
        <View key={`row-${day}`} style={tw`flex-row w-full`}>{cells}</View>
      );
      cells = [];
    }
  }

  return (
    <View style={tw`mb-6`}>
      <Text style={tw`text-white text-center text-base font-bold mb-2`}>{monthNames[month]} {year}</Text>
      <View style={tw`flex-row w-full mb-2`}>{['S','M','T','W','T','F','S'].map(d => (
        <Text key={d} style={tw`flex-1 text-center text-[#A97A4D] font-bold`}>{d}</Text>
      ))}</View>
      {rows}
    </View>
  );
}

export default function BookingScreen() {
  const today = new Date();
  const [selected, setSelected] = useState(formatDate(today.getFullYear(), today.getMonth(), today.getDate()));

  // Range: Jan 2020 to Dec 2030
  const startYear = 2020;
  const endYear = 2030;
  const months: { year: number; month: number }[] = [];
  for (let y = startYear; y <= endYear; y++) {
    for (let m = 0; m < 12; m++) {
      months.push({ year: y, month: m });
    }
  }

  // Find index of current month
  const currentMonthIndex = months.findIndex(
    m => m.year === today.getFullYear() && m.month === today.getMonth()
  );

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}> 
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={{ width: 32 }} />
        <Text style={tw`text-white text-lg font-bold`}>Events</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={tw`text-white text-2xl`}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={months}
        keyExtractor={item => `${item.year}-${item.month}`}
        renderItem={({ item }) => (
          <CalendarMonth
            year={item.year}
            month={item.month}
            selected={selected}
            onSelect={setSelected}
          />
        )}
        initialScrollIndex={currentMonthIndex}
        getItemLayout={(_, index) => ({ length: 340, offset: 340 * index, index })}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
      <BottomNav active="booking" />
    </View>
  );
} 