import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { contents } from '../data/contents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;
type StoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Story'>;

interface Choice {
  text: string;
  nextId: string;
}

interface Step {
  id: string;
  text: string;
  choices: Choice[];
}

interface StoryContent {
  storyId: number;
  steps: Record<string, Step>;
}

interface StoryProgress {
  storyId: number;
  currentStepId: string;
}

const typedContents = contents as StoryContent[];

export default function StoryScreen() {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { storyId } = route.params;
  const STORY_PROGRESS_KEY = `@story_progress-${storyId}`
  
  const storyContent = typedContents.find(content => content.storyId === storyId);
  const [currentStepId, setCurrentStepId] = useState('start');

  useEffect(() => {
    loadStoryProgress();
  }, []);

  const loadStoryProgress = async () => {
    try {
      const progressJson = await AsyncStorage.getItem(STORY_PROGRESS_KEY);
      if (progressJson) {
        const progress: StoryProgress = JSON.parse(progressJson);
        if (progress.storyId === storyId) {
          setCurrentStepId(progress.currentStepId);
        }
      }
    } catch (error) {
      console.error('Hikaye ilerlemesi yüklenirken hata:', error);
    }
  };

  const saveStoryProgress = async (stepId: string) => {
    try {
      const progress: StoryProgress = {
        storyId,
        currentStepId: stepId
      };
      await AsyncStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Hikaye ilerlemesi kaydedilirken hata:', error);
    }
  };

  const clearStoryProgress = async () => {
    try {
      await AsyncStorage.removeItem(STORY_PROGRESS_KEY);
    } catch (error) {
      console.error('Hikaye ilerlemesi silinirken hata:', error);
    }
  };

  if (!storyContent) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Hikaye bulunamadı</Text>
      </View>
    );
  }

  const currentStep = storyContent.steps[currentStepId];

  const handleChoice = async (nextId: string) => {
    if (storyContent.steps[nextId].choices.length === 0) {
      await clearStoryProgress();
      navigation.navigate('End', { finalMessage: storyContent.steps[nextId].text });
    } else {
      setCurrentStepId(nextId);
      await saveStoryProgress(nextId);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4 justify-center items-center`}>
      <Text style={tw`text-xl mb-6`}>{currentStep.text}</Text>
      
      <View style={tw`gap-4`}>
        {currentStep.choices.map((choice: Choice, index: number) => (
          <TouchableOpacity
            key={index}
            style={tw`bg-blue-500 p-4 rounded-lg`}
            onPress={() => handleChoice(choice.nextId)}
          >
            <Text style={tw`text-white text-center`}>{choice.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
