import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';
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
  image?: any;
}

interface StoryContent {
  storyId: number;
  steps: Record<string, Step>;
}

interface StoryProgress {
  storyId: number;
  currentStepId: string;
}

interface ChoiceStats {
  [key: string]: number;
}

interface TimelineStep {
  id: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

const typedContents = contents as StoryContent[];

export default function StoryScreen() {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const route = useRoute<StoryScreenRouteProp>();
  const { storyId } = route.params;
  const STORY_PROGRESS_KEY = `@story_progress-${storyId}`
  
  const storyContent = typedContents.find(content => content.storyId === storyId);
  const [currentStepId, setCurrentStepId] = useState('start');
  const [showStats, setShowStats] = useState(false);
  const [choiceStats, setChoiceStats] = useState<ChoiceStats>({});
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([]);
  const [totalSteps, setTotalSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadStoryProgress();
    initializeTimeline();
  }, []);

  const loadStoryProgress = async () => {
    try {
      const progressJson = await AsyncStorage.getItem(STORY_PROGRESS_KEY);
      if (progressJson) {
        const progress: StoryProgress = JSON.parse(progressJson);
        if (progress.storyId === storyId) {
          setCurrentStepId(progress.currentStepId);
          setTimelineSteps(prevSteps => 
            prevSteps.map(step => ({
              ...step,
              isCompleted: step.id === progress.currentStepId || step.isCompleted,
              isCurrent: step.id === progress.currentStepId
            }))
          );
          const completedCount = timelineSteps.filter(step => 
            step.isCompleted
          ).length;
          setCompletedSteps(completedCount);
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

  const generateFakeStats = (choices: Choice[]) => {
    const stats: ChoiceStats = {};
    let remaining = 100;
    
    choices.forEach((choice, index) => {
      if (index === choices.length - 1) {
        stats[choice.nextId] = remaining;
      } else {
        const random = Math.floor(Math.random() * (remaining - 10)) + 10;
        stats[choice.nextId] = random;
        remaining -= random;
      }
    });
    
    return stats;
  };

  const animateProgress = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const initializeTimeline = () => {
    if (!storyContent) return;
    
    const steps = Object.entries(storyContent.steps)
      .filter(([_, step]) => step.choices.length > 0)
      .map(([stepId]) => ({
        id: stepId,
        isCompleted: false,
        isCurrent: stepId === currentStepId
      }));
    
    setTimelineSteps(steps);
    setTotalSteps(steps.length);
  };

  const updateTimeline = (newStepId: string) => {
    setTimelineSteps(prevSteps => 
      prevSteps.map(step => ({
        ...step,
        isCompleted: step.id === currentStepId || step.isCompleted,
        isCurrent: step.id === newStepId
      }))
    );
    const completedCount = timelineSteps.filter(step => 
      step.isCompleted
    ).length;
    setCompletedSteps(completedCount);
  };

  const handleChoice = async (nextId: string) => {
    if (!storyContent) return;

    setShowStats(true);
    setChoiceStats(generateFakeStats(currentStep.choices));
    animateProgress();

    setTimeout(async () => {
      if (storyContent.steps[nextId].choices.length === 0) {
        await clearStoryProgress();
        navigation.navigate('End', { 
          finalMessage: storyContent.steps[nextId].text,
          image: storyContent.steps[nextId].image 
        });
      } else {
        updateTimeline(nextId);
        setCurrentStepId(nextId);
        setShowStats(false);
        saveStoryProgress(nextId);
      }
    }, 2000);
  };

  const TimelineComponent = () => (
    <View style={tw`px-4 py-2 bg-white rounded-lg shadow-sm mb-4`}>
      <View style={tw`flex-row justify-between mb-2`}>
        <Text style={tw`text-sm text-gray-600`}>
          İlerleme: {completedSteps}/{totalSteps}
        </Text>
        <Text style={tw`text-sm text-gray-600`}>
          {Math.round((completedSteps / totalSteps) * 100)}%
        </Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row items-center`}>
          {timelineSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <View style={tw`items-center`}>
                <View style={[
                  tw`w-4 h-4 rounded-full`,
                  step.isCompleted ? tw`bg-green-500` : 
                  step.isCurrent ? tw`bg-blue-500` : 
                  tw`bg-gray-300`
                ]} />
                <Text style={tw`text-xs text-gray-500 mt-1`}>
                  {index + 1}
                </Text>
              </View>
              {index < timelineSteps.length - 1 && (
                <View style={[
                  tw`h-0.5 w-8`,
                  step.isCompleted ? tw`bg-green-500` : tw`bg-gray-300`
                ]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  if (!storyContent) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Hikaye bulunamadı</Text>
      </View>
    );
  }

  const currentStep = storyContent.steps[currentStepId];

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {currentStep.image && (
        <Image
          style={tw`w-full h-80 rounded-b-3xl`}
          source={currentStep.image}
          resizeMode="cover"
        />
      )}

      <View style={tw`flex-1 px-6 py-4`}>
        <TimelineComponent />
        
        <Text style={tw`text-2xl font-semibold text-gray-800 mb-4 text-center`}>
          {currentStep.text}
        </Text>

        <View style={tw`w-full gap-4 mt-2`}>
          {currentStep.choices.map((choice: Choice, index: number) => (
            <View key={index}>
              <TouchableOpacity
                style={tw`bg-blue-600 p-4 rounded-xl shadow-md`}
                onPress={() => handleChoice(choice.nextId)}
              >
                <Text style={tw`text-white text-center text-base font-medium`}>
                  {choice.text}
                </Text>
              </TouchableOpacity>
              
              {showStats && (
                <View style={tw`mt-2`}>
                  <Animated.View 
                    style={[
                      tw`h-2 bg-blue-200 rounded-full overflow-hidden`,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', `${choiceStats[choice.nextId]}%`]
                        })
                      }
                    ]}
                  />
                  <Text style={tw`text-sm text-gray-600 mt-1`}>
                    {choiceStats[choice.nextId]}% seçti
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
