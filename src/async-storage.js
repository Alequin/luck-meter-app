import AsyncStorage from "@react-native-async-storage/async-storage";

const newStorageItem = (storageKey) => ({
  save: async (valueToSave) => {
    AsyncStorage.setItem(storageKey, JSON.stringify(valueToSave));
  },
  read: async () => {
    const item = await AsyncStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
  },
  clear: async () => AsyncStorage.removeItem(storageKey),
});

export const sessionId = newStorageItem("SESSION_ID_KEY");
export const luckScore = newStorageItem("LUCK_SCORE");
