import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';
import { stories } from '../data/stories';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Story {
  id: number;
  title: string;
  image: any;
  description: string;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [hasProgress, setHasProgress] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkStoryProgress = async (storyId: number) => {
    try {
      const progressJson = await AsyncStorage.getItem(`@story_progress-${storyId}`);
      setHasProgress(!!progressJson);
    } catch (error) {
      console.error('İlerleme kontrolü sırasında hata:', error);
    }
  };

  const handleStorySelect = async (story: Story) => {
    setSelectedStory(story);
    await checkStoryProgress(story.id);
    setShowModal(true);
  };

  const handleStartNew = async () => {
    if (selectedStory) {
      await AsyncStorage.removeItem(`@story_progress-${selectedStory.id}`);
      navigation.navigate('Story', { storyId: selectedStory.id });
    }
    setShowModal(false);
  };

  const handleContinue = () => {
    if (selectedStory) {
      navigation.navigate('Story', { storyId: selectedStory.id });
    }
    setShowModal(false);
  };

  return (
    <View style={tw`flex-1 bg-white p-4 mt-10 justify-center`}>
      <Text style={tw`text-2xl font-bold mb-8`}>📚 Hoş Geldin!</Text>
      
      <View style={tw`flex-row flex-wrap justify-between`}>
        {stories.map((story: Story) => (
          <TouchableOpacity
            key={story.id}
            style={tw`bg-white rounded-lg shadow-md w-48 mb-4`}
            onPress={() => handleStorySelect(story)}
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

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-lg w-80`}>
            <Text style={tw`text-xl font-bold mb-4 text-center`}>
              {hasProgress ? 'Kaldığın Yerden Devam Et' : 'Hikayeye Başla'}
            </Text>
            
            {hasProgress && (
              <TouchableOpacity
                style={tw`bg-blue-500 p-4 rounded-lg mb-3`}
                onPress={handleContinue}
              >
                <Text style={tw`text-white text-center font-semibold`}>
                  Kaldığım Yerden Devam Et
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={tw`bg-green-500 p-4 rounded-lg`}
              onPress={handleStartNew}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                {hasProgress ? 'Baştan Başla' : 'Hikayeye Başla'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
