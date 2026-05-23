import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useEffect, useState } from 'react';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import axiosInstance from '@/constants/api';

import { Product } from '@/types/product.type';

import { useCartStore } from '@/store/cart.store';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(false);

  const addToCart = useCartStore(
    (state) => state.addToCart,
  );

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/product/${id}`,
      );

      setProduct(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator
          size="large"
          color="#EA580C"
        />
      </View>
    );
    
}
if (!product) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-gray-500 text-lg">
        Product not found
      </Text>
    </View>
  );
}

return (
  <ScrollView className="flex-1 bg-white">

    <Image
      source={{
        uri:
          product.imgUrl ||
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      }}
      className="w-full h-80"
      resizeMode="cover"
    />

    <View className="p-6">

      <Text className="text-blue-600 font-semibold text-sm">
        {product.category}
      </Text>

      <Text className="text-3xl font-bold text-gray-800 mt-2">
        {product.ProductName}
      </Text>

      <Text className="text-gray-500 mt-2">
        Brand: {product.brand}
      </Text>

      <View className="flex-row items-center mt-3">
        <Text className="text-yellow-500 text-lg">
          ⭐
        </Text>

        <Text className="text-gray-700 ml-2">
          {product.rating} / 5
        </Text>

        <Text className="text-gray-400 ml-4">
          Sold: {product.sold}
        </Text>
      </View>

      <View className="flex-row items-center mt-5">
        <Text className="text-orange-500 text-3xl font-bold">
          {Number(product.price).toLocaleString()}đ
        </Text>

        {product.discount > 0 && (
          <View className="bg-red-500 px-3 py-1 rounded-xl ml-3">
            <Text className="text-white text-xs font-bold">
              -{product.discount}%
            </Text>
          </View>
        )}
      </View>

      {/* DESCRIPTION */}
      <View className="mt-8">
        <Text className="text-xl font-bold text-gray-800">
          Description
        </Text>

        <Text className="text-gray-600 leading-7 mt-3">
          {product.description}
        </Text>
      </View>

      {/* INFO */}
      <View className="mt-8 bg-gray-100 rounded-3xl p-5">

        <Text className="text-lg font-bold text-gray-800 mb-4">
          Product Information
        </Text>

        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-500">
            Brand
          </Text>

          <Text className="font-semibold">
            {product.brand}
          </Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-500">
            Quantity
          </Text>

          <Text className="font-semibold">
            {product.quantity}
          </Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-500">
            Category
          </Text>

          <Text className="font-semibold">
            {product.category}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">
            Discount
          </Text>

          <Text className="font-semibold text-red-500">
            {product.discount}%
          </Text>
        </View>
      </View>

      {/* BUTTONS */}
      <View className="flex-row items-center justify-between mt-10">

        {/* LEFT */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-gray-200 py-4 rounded-2xl items-center"
          style={{
            width: '18%',
          }}
        >
          <Text className="text-gray-700 font-bold">
            Back
          </Text>
        </TouchableOpacity>

        {/* RIGHT */}
        <View
          className="flex-row justify-between"
          style={{
            width: '78%',
          }}
        >

          <TouchableOpacity
            className="bg-gray-200 py-4 rounded-2xl items-center"
            style={{
              width: '48%',
            }}
          >
            <Text className="text-gray-700 font-bold">
              Comment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => addToCart(product)}
            className="bg-orange-500 py-4 rounded-2xl items-center"
            style={{
              width: '48%',
            }}
          >
            <Text className="text-white font-bold">
              Add To Cart
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>

    <View className="h-10" />
  </ScrollView>
);
}