import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "components/Header";
import { Highlight } from "components/Highlight";
import { Button } from "components/Button";
import { Input } from "components/Input";

import * as S from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('players', { group })
  }

  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </S.Content>
    </S.Container>
  )
}