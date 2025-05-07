import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Animated } from 'react-native';
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
  
  // Animation values
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showModal) {
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(modalScale, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 40,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showModal]);

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
    <View style={tw`flex-1 bg-white px-4 pt-12`}>
      <View style={tw`flex-row items-center mb-6 mt-6`}>
        <Image
          source={require('../assets/images/user.png')} 
          style={tw`w-12 h-12 rounded-full`}
        />
        <Text style={tw`text-xl font-bold text-gray-800 ml-2`}>
          Merhaba, <Text style={tw`italic font-semibold`}>Asu</Text>! 👋
        </Text>      
      </View>

      <View style={tw`flex-row flex-wrap justify-between`}>
        {stories.map((story: Story) => (
          <TouchableOpacity
            key={story.id}
            style={tw`bg-white rounded-2xl shadow-lg w-48 mb-4`}
            onPress={() => handleStorySelect(story)}
          >
            <Image
              source={story.image}
              style={tw`w-full h-48 rounded-t-2xl`}
              resizeMode="cover"
            />

            <View style={tw`p-3`}>
              <Text style={tw`text-xl font-semibold`}>{story.title}</Text>
              <Text style={tw`text-gray-600 mt-2`}>{story.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowModal(false)}
      >
        <Animated.View 
          style={[
            tw`flex-1 justify-center items-center`,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
              opacity: modalOpacity,
            }
          ]}
        >
          <Animated.View 
            style={[
              tw`bg-white p-6 rounded-2xl w-80 shadow-xl relative`,
              {
                transform: [{ scale: modalScale }],
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={tw`absolute top-2 right-2 z-10`}
            >
              <Text style={tw`text-xl text-gray-400`}>✖️</Text>
            </TouchableOpacity>

            <Text style={tw`text-xl font-bold mb-6 text-center`}>
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
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}
