import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-200`}>
      <Text style={tw`text-xl font-bold text-blue-500`}>Hello Tailwind!</Text>
    </View>
  );
}
