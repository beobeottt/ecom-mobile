import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Product } from '@/types/product.type';

import { useRouter } from 'expo-router';

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/product/${item.ProductId}`)
      }
      className="bg-white rounded-3xl p-3 mb-4"
      style={{
        width: '48%',
      }}
    >
      <Image
        source={{
          uri:
            item.imgUrl ||
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        }}
        className="w-full h-40 rounded-2xl"
        resizeMode="cover"
      />

      <Text className="text-gray-400 mt-3 text-xs">
        {item.category}
      </Text>

      <Text
        numberOfLines={2}
        className="font-bold text-lg mt-1"
      >
        {item.ProductName}
      </Text>

      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-orange-500 font-bold text-lg">
          {Number(item.price).toLocaleString()}đ
        </Text>

        <Text className="text-yellow-500">
          ⭐ {item.rating}
        </Text>
      </View>
    </TouchableOpacity>
  );
}