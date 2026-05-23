import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useEffect, useState } from 'react';

import axiosInstance from '@/constants/api';

import { Product } from '@/types/product.type';

import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get('/product');

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        className="bg-white rounded-2xl p-3 mb-4 shadow-sm"
        style={{
          width: '31%',
        }}
        onPress={() =>
          router.push(`/product/${item.ProductId}`)
        }
      >
        <Image
          source={{
            uri:
              item.imgUrl ||
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          }}
          className="w-full h-28 rounded-xl"
          resizeMode="cover"
        />

        <Text
          numberOfLines={1}
          className="font-bold text-gray-800 mt-3"
        >
          {item.ProductName}
        </Text>

        <Text
          numberOfLines={1}
          className="text-gray-400 text-xs mt-1"
        >
          {item.brand}
        </Text>

        <Text className="text-blue-600 font-bold mt-2">
          {Number(item.price).toLocaleString()}đ
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      
      {/* HEADER */}
      <View className="bg-black rounded-b-[40px] px-6 pt-16 pb-8">
        <Text className="text-white text-4xl font-bold">
          Paint Store
        </Text>

        <Text className="text-gray-300 mt-2">
          Premium Paint For Your Home
        </Text>

        <View className="bg-white rounded-2xl px-4 py-4 mt-6">
          <TextInput placeholder="Search paint..." />
        </View>
      </View>

      {/* LOADING */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.ProductId}
          numColumns={3}
          contentContainerStyle={{
            padding: 12,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}