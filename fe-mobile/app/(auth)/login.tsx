import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axiosInstance from '../../constants/api'; // Đảm bảo đường dẫn này đúng với dự án của bạn

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("http://localhost:3000/users/login", form);

      console.log("Login success:", res.data);
      Alert.alert("Thành công", "Đăng nhập thành công!");
      
      router.replace("/(home)/home");
    } catch (err: any) {
      console.log("Chi tiết lỗi:", err);
      
      // Hiển thị lỗi từ backend (ví dụ lỗi NOT NULL fullname)
      const errorMessage = err?.response?.data?.message || "Không thể kết nối tới server";
      Alert.alert("Đăng nhập thất bại", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-8 bg-slate-50">
      <View className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
        <Text className="text-3xl font-black text-blue-600 mb-2">PAINT PRO</Text>
        <Text className="text-slate-400 mb-8 font-medium">Đăng nhập để tiếp tục</Text>

        {/* Ô nhập Email */}
        <TextInput 
          className="bg-slate-100 p-4 rounded-2xl mb-4 text-slate-700"
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={form.email}
          onChangeText={(value) => handleChange('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Ô nhập Password */}
        <TextInput
          className="bg-slate-100 p-4 rounded-2xl mb-6 text-slate-700"
          placeholder="Mật khẩu"
          placeholderTextColor="#94a3b8"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value) => handleChange('password', value)}
        />

        {/* Nút Đăng nhập */}
        <TouchableOpacity 
          className={`p-4 rounded-2xl shadow-lg ${loading ? 'bg-blue-400' : 'bg-blue-600 shadow-blue-300'}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">Đăng nhập</Text>
          )}
        </TouchableOpacity>

        {/* Nút chuyển sang Đăng ký */}
        <TouchableOpacity
          onPress={() => router.push('/register')}
          className="mt-6"
        >
          <Text className="text-center text-gray-600">
            Chưa có tài khoản? <Text className="text-blue-600 font-bold">Đăng ký</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}