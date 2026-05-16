import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";

import axios from "axios";
import axiosInstance from "@/constants/api";

interface ProductVariant {
  id?: string;
  label: string;
  price: number;
  quantity: number;
  sku?: string;
  image?: string;
}

interface Product {
  ProductId: string;
  ProductName: string;
  description: string;
  price: number;
  brand: string;
  quantity: number;
  imgUrl?: string;
  images?: string[];
  category: string;
  rating: number;
  sold: number;
  discount: number;
  variants?: ProductVariant[];
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        "http://localhost:3000/product"
      );

      setProducts(res.data);
    } catch (err) {
      console.log("Fetch products failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      
      {/* HEADER */}
      <View className="bg-blue-600 pt-16 pb-8 px-6 rounded-b-[40px]">
        <Text className="text-white text-3xl font-bold">
          Paint Store
        </Text>

        <Text className="text-blue-100 mt-2">
          Premium Paint For Your Home
        </Text>

        {/* SEARCH */}
        <View className="bg-white rounded-2xl mt-6 px-4 py-3">
          <TextInput
            placeholder="Search paint..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* BANNER */}
      <View className="mx-6 mt-6 bg-orange-400 rounded-3xl p-6 flex-row items-center">
        <View className="flex-1">
          <Text className="text-white text-2xl font-bold">
            Summer Sale
          </Text>

          <Text className="text-white mt-2">
            Up to 30% off all paints
          </Text>

          <TouchableOpacity className="bg-white self-start px-5 py-3 rounded-2xl mt-4">
            <Text className="text-orange-500 font-bold">
              Shop Now
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
          }}
          className="w-28 h-28 rounded-2xl"
        />
      </View>

      {/* TITLE */}
      <View className="px-6 mt-10 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-800">
          Best Seller
        </Text>

        <Text className="text-blue-600 font-semibold">
          See All
        </Text>
      </View>

      {/* LOADING */}
      {loading && (
        <View className="mt-10">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <View className="items-center mt-10">
          <Text className="text-gray-500">
            No products found
          </Text>
        </View>
      )}

      {/* PRODUCT LIST */}
      <View className="px-6 mt-5">
        {products.map((item) => (
          <TouchableOpacity
            key={item.ProductId}
            className="bg-white rounded-3xl p-4 mb-5 border border-gray-100 shadow-sm"
          >
            {/* IMAGE */}
            <Image
              source={{
                uri:
                  item.imgUrl ||
                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
              }}
              className="w-full h-52 rounded-2xl"
            />

            {/* PRODUCT INFO */}
            <View className="mt-4">
              
              {/* CATEGORY */}
              <Text className="text-blue-600 font-semibold text-sm">
                {item.category}
              </Text>

              {/* NAME */}
              <Text className="text-xl font-bold text-gray-800 mt-1">
                {item.ProductName}
              </Text>

              {/* DESCRIPTION */}
              <Text
                numberOfLines={2}
                className="text-gray-500 mt-2"
              >
                {item.description}
              </Text>

              {/* PRICE */}
              <View className="flex-row items-center justify-between mt-5">
                <View>
                  <Text className="text-orange-500 text-2xl font-bold">
                    {item.price.toLocaleString()}đ
                  </Text>

                  <Text className="text-gray-400 mt-1">
                    Sold: {item.sold}
                  </Text>
                </View>

                {/* BUTTON */}
                <TouchableOpacity className="bg-blue-600 px-5 py-3 rounded-2xl">
                  <Text className="text-white font-bold">
                    Buy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* SPACE */}
      <View className="h-10" />
    </ScrollView>
  );
}