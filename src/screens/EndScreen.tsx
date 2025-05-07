import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import tw from 'twrnc';
import { useTheme } from '../context/ThemeContext';

type EndScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'End'>;

interface EndScreenProps {
  route: {
    params: {
      finalMessage: string;
      image?: any;
    };
  };
}

const { width } = Dimensions.get('window');

export default function EndScreen({ route }: EndScreenProps) {
  const navigation = useNavigation<EndScreenNavigationProp>();
  const { finalMessage, image } = route.params;
  const { colors } = useTheme();

  return (
    <View style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      {image && (
        <View style={tw`w-full h-96`}>
          <Image
            source={image}
            style={tw`w-full h-full rounded-b-3xl`}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={tw`flex-1 px-6 pt-8`}>
        <View style={tw`items-center mb-8`}>
          <Text style={[tw`text-3xl font-bold mb-6 text-center`, { color: colors.text }]}>
            Hikaye Bitti! 🎉
          </Text>
          
          <View 
            style={[
              tw`p-6 rounded-2xl`,
              { backgroundColor: colors.card }
            ]}
          >
            <Text style={[tw`text-xl text-center leading-relaxed`, { color: colors.text }]}>
              {finalMessage}
            </Text>
          </View>
        </View>

        <View style={tw`w-full gap-4`}>
          <TouchableOpacity
            style={[
              tw`p-4 rounded-xl shadow-md`,
              { backgroundColor: colors.primary }
            ]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={tw`text-white text-center text-xl font-semibold`}>
              Ana Sayfaya Dön
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tw`p-4 rounded-xl border-2`,
              { borderColor: colors.primary }
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[tw`text-center text-xl font-semibold`, { color: colors.primary }]}>
              Hikayeyi Tekrar Oku
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
