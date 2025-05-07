import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';
import { stories } from '../data/stories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

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
  
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const { colors, isDark, toggleTheme } = useTheme();

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
    <View style={[tw`flex-1 px-4 pt-12`, { backgroundColor: colors.background }]}>
      <View style={tw`flex-row items-center justify-between mt-6`}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={require('../assets/images/user.png')} 
            style={tw`w-12 h-12 rounded-full`}
          />
          <Text style={[tw`text-xl font-bold ml-2`, { color: colors.text }]}>
            Merhaba, <Text style={tw`italic font-semibold`}>Asu</Text>! 👋
          </Text>
        </View>
        
        <TouchableOpacity
          onPress={toggleTheme}
          style={[tw`p-2 rounded-full`, { backgroundColor: colors.card }]}
        >
          <Text style={tw`text-2xl`}>
            {isDark ? '🌞' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`px-4 py-6`}>
        <Text style={[tw`font-bold text-xl text-center`, { color: colors.text }]}>
          Kitaplığın
        </Text>
      </View>


      <View style={tw`flex-row flex-wrap justify-between`}>
        {stories.map((story: Story) => (
          <TouchableOpacity
            key={story.id}
            style={[tw`rounded-2xl shadow-lg w-48 mb-4`, { backgroundColor: colors.card }]}
            onPress={() => handleStorySelect(story)}
          >
            <Image
              source={story.image}
              style={tw`w-full h-48 rounded-t-2xl`}
              resizeMode="cover"
            />

            <View style={tw`p-3`}>
              <Text style={[tw`text-xl font-semibold`, { color: colors.text }]}>
                {story.title}
              </Text>
              <Text style={[tw`mt-2`, { color: colors.textSecondary }]}>
                {story.description}
              </Text>
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
              tw`p-6 rounded-2xl w-80 shadow-xl relative`,
              {
                transform: [{ scale: modalScale }],
                backgroundColor: colors.card
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={tw`absolute top-2 right-2 z-10`}
            >
              <Text style={[tw`text-xl`, { color: colors.textSecondary }]}>✖️</Text>
            </TouchableOpacity>

            <Text style={[tw`text-xl font-bold mb-2 text-center`, { color: colors.text }]}>
              {selectedStory?.title}
            </Text>

            {hasProgress && (
              <TouchableOpacity
                style={[tw`p-4 rounded-lg mb-3`, { backgroundColor: colors.primary }]}
                onPress={handleContinue}
              >
                <Text style={tw`text-white text-center font-semibold`}>
                  Kaldığım Yerden Devam Et
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[tw`p-4 rounded-lg`, { backgroundColor: colors.primary }]}
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
