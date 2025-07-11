import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import tw from '@/lib/tailwind';
import BottomNav from '../bottom-nav';
import { useRouter } from 'expo-router';

const mockFriends = [
  {
    id: '1',
    name: 'Lucas Turner',
    joined: 'Joined 2 weeks ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Olivia Carter',
    joined: 'Joined 1 month ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '3',
    name: 'Owen Bennett',
    joined: 'Joined 2 months ago',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

export default function PeopleScreen() {
  const [invite, setInvite] = useState('');
  const [friends, setFriends] = useState(mockFriends);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  const handleSendInvite = () => {
    if (!invite.trim()) {
      setFeedback('Please enter a username or email.');
      return;
    }
    setFeedback('Invite sent!');
    setInvite('');
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleGenerateLink = () => {
    setFeedback('Share link copied!');
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleRemoveFriend = (id: string) => {
    Alert.alert(
      'Remove Friend',
      'Are you sure you want to remove this friend?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setFriends(friends.filter(f => f.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={tw`flex-1 bg-background pt-12 px-4`}> 
      {/* Header */}
      <View style={tw`flex-row items-center mb-6`}> 
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-2`}>
          <Text style={tw`text-white text-2xl`}>×</Text>
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold flex-1 text-center`}>Invite Friends</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* Invite input */}
      <TextInput
        style={tw`bg-[#3A2C20] text-white rounded-lg px-4 py-3 mb-3 text-base`}
        placeholder="Username  or email"
        placeholderTextColor="#A97A4D"
        value={invite}
        onChangeText={setInvite}
      />
      <TouchableOpacity
        style={tw`bg-[#F7931A] rounded-lg py-3 mb-3 items-center`}
        onPress={handleSendInvite}
      >
        <Text style={tw`text-white text-base font-semibold`}>Send Invite</Text>
      </TouchableOpacity>
      <Text style={tw`text-[#A97A4D] text-center mb-2`}>Or</Text>
      <TouchableOpacity
        style={tw`bg-[#3A2C20] rounded-lg py-3 mb-6 items-center`}
        onPress={handleGenerateLink}
      >
        <Text style={tw`text-white text-base`}>Generate Share Link</Text>
      </TouchableOpacity>
      {feedback ? (
        <Text style={tw`text-[#F7931A] text-center mb-2`}>{feedback}</Text>
      ) : null}
      {/* Linked Friends */}
      <Text style={tw`text-white text-lg font-bold mb-4`}>Linked Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center mb-4`}> 
            <Image
              source={{ uri: item.avatar }}
              style={tw`w-12 h-12 rounded-full mr-4 bg-[#3A2C20]`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-base font-semibold`}>{item.name}</Text>
              <Text style={tw`text-[#A97A4D] text-xs`}>{item.joined}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFriend(item.id)}>
              <Text style={tw`text-red-500 text-base ml-2`}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={tw`text-[#A97A4D] text-center`}>No friends linked yet.</Text>}
      />
      <BottomNav active="people" />
    </View>
  );
} 