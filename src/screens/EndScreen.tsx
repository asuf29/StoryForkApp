import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';

type EndScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'End'>;

export default function EndScreen() {
  const navigation = useNavigation<EndScreenNavigationProp>();

  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-6`}>
      <Text style={tw`text-3xl font-bold text-center mb-4`}>🎉 Hikâyeyi Tamamladın 🎉</Text>
      <Text style={tw`text-gray-700 text-center mb-8`}>
        Maceran burada sona erdi. Yeni bir hikâyeye başlamak ister misin?
      </Text>

      <TouchableOpacity
        style={tw`bg-indigo-600 py-3 px-6 rounded-lg`}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}
