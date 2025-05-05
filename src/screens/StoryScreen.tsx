import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';

type StoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Story'>;

interface Section {
  id: string;
  text: string;
  choices: { text: string; nextId: string | null }[];
}

const storyData: Record<string, Section> = {
  start: {
    id: 'start',
    text: 'Bir sabah ormanda uyandın. İki yol var önünde.',
    choices: [
      { text: 'Sağdaki patikayı seç', nextId: 'path1' },
      { text: 'Soldaki yolu takip et', nextId: 'path2' },
    ],
  },
  path1: {
    id: 'path1',
    text: 'Sağdaki patikada garip bir ses duydun.',
    choices: [
      { text: 'Sesi takip et', nextId: 'end1' },
      { text: 'Geri dön', nextId: 'start' },
    ],
  },
  path2: {
    id: 'path2',
    text: 'Soldaki yol seni bir nehre götürdü.',
    choices: [
      { text: 'Nehri geç', nextId: 'end2' },
      { text: 'Yolun kenarında otur', nextId: 'end3' },
    ],
  },
  end1: {
    id: 'end1',
    text: 'Bir ayı buldun! Hikâye burada biter.',
    choices: [],
  },
  end2: {
    id: 'end2',
    text: 'Nehri geçtin ve hazineyi buldun! 🎉',
    choices: [],
  },
  end3: {
    id: 'end3',
    text: 'Manzarayı izlerken uyuyakaldın. 💤',
    choices: [],
  },
};

export default function StoryScreen() {
  const navigation = useNavigation<StoryScreenNavigationProp>();
  const [currentSectionId, setCurrentSectionId] = useState('start');

  const currentSection = storyData[currentSectionId];

  useEffect(() => {
    if (currentSection.choices.length === 0) {
      const timer = setTimeout(() => {
        navigation.navigate('End');
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const handleChoice = (nextId: string | null) => {
    if (nextId) {
      setCurrentSectionId(nextId);
    } else {
      navigation.navigate('End');
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-8 bg-white`}>
      <Text style={tw`text-xl font-semibold mb-6 text-center`}>{currentSection.text}</Text>

      {currentSection.choices.length > 0 ? (
        currentSection.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={tw`bg-indigo-600 py-3 px-4 rounded-lg mb-4`}
            onPress={() => handleChoice(choice.nextId)}
          >
            <Text style={tw`text-white text-center`}>{choice.text}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={tw`text-center text-gray-600 mt-4`}>Hikâye tamamlandı 🎉</Text>
      )}
    </ScrollView>
  );
}
