import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import api from '../../constants/api'; // Axios instance bạn đã tạo
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      router.replace('/(tabs)');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center px-8 bg-slate-50">
      <View className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
        <Text className="text-3xl font-black text-blue-600 mb-2">PAINT PRO</Text>
        <Text className="text-slate-400 mb-8 font-medium">Đăng nhập để tiếp tục</Text>

        <TextInput 
          className="bg-slate-100 p-4 rounded-2xl mb-4 text-slate-700"
          placeholder="Email/Số điện thoại"
          placeholderTextColor="#94a3b8"
        />
        <TextInput
        className="bg-slate-100 p-4 rounded-2xl mb-4 text-slate-700"
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        ></TextInput>

        <TouchableOpacity 
          className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-300"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold text-lg">Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/register')}
          className="mt-4"
        >
          <Text className="text-center text-gray-600">Chưa có tài khoản? <Text className="text-blue-600 font-bold">Đăng kí</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}