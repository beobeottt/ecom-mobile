import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      
      {/* Logo */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
        }}
        className="w-52 h-52 rounded-3xl mb-8"
      />

      {/* Title */}
      <Text className="text-4xl font-bold text-center text-blue-600">
        Paint Store
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-500 text-center mt-3 text-base">
        Premium Paint For Your Dream House
      </Text>

      
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="bg-blue-600 w-full py-4 rounded-2xl mt-12"
      >
        <Text className="text-white text-center text-lg font-bold">
          Get Started
        </Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="border border-blue-600 w-full py-4 rounded-2xl mt-4"
      >
        <Text className="text-blue-600 text-center text-lg font-bold">
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}