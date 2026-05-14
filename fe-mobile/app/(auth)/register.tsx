import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleRegister = async () => {
    // Gọi API NestJS ở đây (ví dụ: axios.post('.../auth/register', form))
    console.log("Register data:", form);
    Alert.alert("Thành công", "Tài khoản của bạn đã được tạo.");
    router.replace('/login');
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-900">Đăng ký Hãng Sơn</Text>
      
      <TextInput 
        className="border border-gray-300 p-4 rounded-xl mb-4" 
        placeholder="Họ và tên"
        onChangeText={(text) => setForm({...form, name: text})}
      />
      <TextInput 
        className="border border-gray-300 p-4 rounded-xl mb-4" 
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setForm({...form, email: text})}
      />
      <TextInput 
        className="border border-gray-300 p-4 rounded-xl mb-6" 
        placeholder="Mật khẩu"
        secureTextEntry
        onChangeText={(text) => setForm({...form, password: text})}
      />

      <TouchableOpacity className="bg-blue-600 p-4 rounded-xl" onPress={handleRegister}>
        <Text className="text-white text-center font-bold text-lg">Tạo tài khoản</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')} className="mt-4">
        <Text className="text-center text-gray-600">Đã có tài khoản? <Text className="text-blue-600 font-bold">Đăng nhập</Text></Text>
      </TouchableOpacity>
    </View>
  );
}