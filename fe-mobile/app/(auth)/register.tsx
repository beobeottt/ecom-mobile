import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { useRouter } from "expo-router";

import axiosInstance from "@/constants/api";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    shippingAddress: "",
    gender: "Male",
  });

  const handleRegister = async () => {
    try {
      const res = await axiosInstance.post("/users", form);

      console.log("Register success:", res.data);

      Alert.alert("Success", "Register successfully");

      router.replace("/login");
    } catch (err: any) {
      console.error(err);

      Alert.alert(
        "Register Failed",
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">

      {/* Title */}
      <Text className="text-3xl font-bold text-center text-blue-700 mb-10">
        Create Account
      </Text>

      {/* Fullname */}
      <TextInput
        placeholder="Full Name"
        className="border border-gray-300 rounded-2xl p-4 mb-4"
        value={form.fullname}
        onChangeText={(text) =>
          setForm({ ...form, fullname: text })
        }
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-gray-300 rounded-2xl p-4 mb-4"
        value={form.email}
        onChangeText={(text) =>
          setForm({ ...form, email: text })
        }
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border border-gray-300 rounded-2xl p-4 mb-4"
        value={form.password}
        onChangeText={(text) =>
          setForm({ ...form, password: text })
        }
      />

      {/* Shipping Address */}
      <TextInput
        placeholder="Shipping Address"
        className="border border-gray-300 rounded-2xl p-4 mb-4"
        value={form.shippingAddress}
        onChangeText={(text) =>
          setForm({
            ...form,
            shippingAddress: text,
          })
        }
      />

      <View className="border border-gray-300 rounded-2xl mb-4 overflow-hidden px-2 justify-center">
        <Picker
          selectedValue={form.gender}
          onValueChange={(value) =>
            setForm({
              ...form,
              gender: value,
            })
          }
          style={{
            height: "auto",
            color: "#000",
            fontSize: 16,
          }}
          dropdownIconColor="#2563eb"
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="FeMale" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {/* Register Button */}
      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-2xl"
        onPress={handleRegister}
      >
        <Text className="text-center text-white font-bold text-lg">
          Register
        </Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="mt-6"
      >
        <Text className="text-center text-gray-600">
          Already have an account?{" "}
          <Text className="text-blue-600 font-bold">
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}