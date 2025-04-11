import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "components/Header";
import { Highlight } from "components/Highlight";
import { ButtonIcon } from "components/ButtonIcon";
import { Input } from "components/Input";
import { Filter } from "components/Filter";
import { PlayerCard } from "components/PlayerCard";
import { ListEmpty } from "components/ListEmpty";
import { Button } from "components/Button";

import * as S from "./styles";

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlaters] = useState([]);

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subTitle="adicione a galera e separe os times"
      />

      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
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

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => { }} />
        )}
        ListEmptyComponent={() =>
          <ListEmpty
            message='Não há pessoas nesse time.'
          />
        }
        showsVerticalScrollIndicator
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </S.Container>
  )
}