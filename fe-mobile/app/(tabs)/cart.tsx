import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import CartItem from '@/components/CartItem';

import { useCartStore } from '@/store/cart.store';

export default function CartScreen() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.cartQuantity,
    0,
  );

  return (
    <View className="flex-1 bg-[#F7F7F7] px-6 pt-16">
      <Text className="text-4xl font-bold mb-8">
        My Cart
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <CartItem
            key={item.ProductId}
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        ))}

        <View className="bg-white rounded-3xl p-6 mt-4 mb-10">
          <View className="flex-row justify-between">
            <Text className="text-gray-500 text-lg">
              Total
            </Text>

            <Text className="text-orange-500 text-2xl font-bold">
              {total.toLocaleString()}đ
            </Text>
          </View>

          <TouchableOpacity className="bg-orange-500 rounded-2xl py-5 items-center mt-6">
            <Text className="text-white font-bold text-lg">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}