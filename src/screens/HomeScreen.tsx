import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const stories = [
    {
      id: 1,
      title: 'Macera Başlasın!',
      image: require('../assets/images/adventure.png'),
      description: 'Heyecan dolu bir yolculuğa çıkmak için tıklayın.',
    },
    {
      id: 2,
      title: 'Gizemli Adalar',
      image: require('../assets/images/island.png'),
      description: 'Bilinmeyen adaların sırlarını keşfedin.',
    },
    {
      id: 3,
      title: 'Uzay Yolculuğu',
      image: require('../assets/images/moon-base.png'),
      description: 'Uzayda yeni keşifler yapmaya hazır mısınız?',
    },
    {
      id: 4,
      title: 'Zaman Yolculuğu',
      image: require('../assets/images/time-travel.png'),
      description: 'Geçmişe veya geleceğe gitmeye ne dersiniz?',
    },
  ];

  return (
    <View style={tw`flex-1 bg-white p-4 mt-10 justify-center`}>
      <Text style={tw`text-2xl font-bold mb-8`}>📚 Hoş Geldin!</Text>
      
      <View style={tw`flex-row flex-wrap justify-between`}>
        {stories.map((story) => (
          <TouchableOpacity
            key={story.id}
            style={tw`bg-white rounded-lg shadow-md w-48 mb-4`}
            onPress={() => navigation.navigate('Story')}
          >
            <Image
              source={story.image}
              style={tw`w-full h-48 rounded-t-lg`}
              resizeMode="cover"
            />

            <View style={tw`p-4`}>
              <Text style={tw`text-xl font-semibold`}>{story.title}</Text>
              <Text style={tw`text-gray-600 mt-2`}>{story.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
