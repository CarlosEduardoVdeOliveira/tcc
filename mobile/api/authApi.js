import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => await AsyncStorage.getItem("user_token");

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
