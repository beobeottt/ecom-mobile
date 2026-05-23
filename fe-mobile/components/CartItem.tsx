import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Props {
  item: any;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: Props) {
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 flex-row">
      <Image
        source={{ uri: item.imgUrl }}
        className="w-28 h-28 rounded-2xl"
      />

      <View className="flex-1 ml-4 justify-between">
        <View>
          <Text className="font-bold text-lg">
            {item.ProductName}
          </Text>

          <Text className="text-orange-500 font-bold mt-2">
            {Number(item.price).toLocaleString()}đ
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() =>
                decreaseQuantity(item.ProductId)
              }
              className="bg-gray-200 px-3 py-2 rounded-xl"
            >
              <Text>-</Text>
            </TouchableOpacity>

            <Text className="mx-4 font-bold">
              {item.cartQuantity}
            </Text>

            <TouchableOpacity
              onPress={() =>
                increaseQuantity(item.ProductId)
              }
              className="bg-gray-200 px-3 py-2 rounded-xl"
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              removeFromCart(item.ProductId)
            }
          >
            <Text className="text-red-500 font-bold">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}