import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';

type EndScreenRouteProp = RouteProp<RootStackParamList, 'End'>;
type EndScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'End'>;

export default function EndScreen() {
  const navigation = useNavigation<EndScreenNavigationProp>();
  const route = useRoute<EndScreenRouteProp>();
  const { finalMessage } = route.params;

  return (
    <View style={tw`flex-1 bg-white p-4 justify-center items-center`}>
      <Text style={tw`text-2xl font-bold mb-8 text-center`}>Hikaye Bitti! 🎉</Text>
      
      <View style={tw`bg-blue-50 p-6 rounded-lg mb-8`}>
        <Text style={tw`text-lg text-center`}>{finalMessage}</Text>
      </View>

      <TouchableOpacity
        style={tw`bg-blue-500 p-4 rounded-lg`}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          Ana Sayfaya Dön
        </Text>
      </TouchableOpacity>
    </View>
  );
}
