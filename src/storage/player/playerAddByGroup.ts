import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "storage/storageConfig";
import { PlayerStorageDTO } from "./playerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

import { AppError } from "utils/AppError";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playersAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playersAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}