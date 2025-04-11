import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "components/Header";
import { Highlight } from "components/Highlight";
import { ButtonIcon } from "components/ButtonIcon";
import { Input } from "components/Input";
import { Filter } from "components/Filter";
import { PlayerCard } from "components/PlayerCard";
import { ListEmpty } from "components/ListEmpty";
import { Button } from "components/Button";
import { Loading } from "components/Loading";

import { AppError } from "utils/AppError";

import { playerAddByGroup } from "storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "storage/player/playerGetByGroupAndTeam";

import * as S from "./styles";
import { PlayerStorageDTO } from "storage/player/playerStorageDTO";
import { playerRemoveByGroup } from "storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef?.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
      }
    }
  };

  async function fetchPlayersByTeam() {
    setIsLoading(true);
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado.")
    }
    setIsLoading(false);
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.")
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      fetchPlayersByTeam();
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.")
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover o grupo", [
      { text: "Não", style: 'cancel' },
      { text: "Sim", onPress: () => groupRemove() }
    ])

  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="adicione a galera e separe os times"
      />

      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <S.NumberOfPlayers>
          {players.length}
        </S.NumberOfPlayers>
      </S.HeaderList>

      {isLoading ? <Loading /> : (
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
          )}
          ListEmptyComponent={() =>
            <ListEmpty
              message='Não há pessoas nesse time.'
            />
          }
          showsVerticalScrollIndicator
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
        />
      )}

      <Button title="Remover turma" type="SECONDARY" onPress={handleGroupRemove} />
    </S.Container>
  )
}