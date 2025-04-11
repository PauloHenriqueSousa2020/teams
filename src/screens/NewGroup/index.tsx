import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "components/Header";
import { Highlight } from "components/Highlight";
import { Button } from "components/Button";
import { Input } from "components/Input";

import { groupCreate } from "storage/group/groupCreate";

import { AppError } from "utils/AppError";

import * as S from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', "Insira um nome para o grupo.")
      }

      await groupCreate(group);
      navigation.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message)
      } else {
        Alert.alert('Novo grupo', "Não foi possível criar um novo grupo.")
        console.log(error);
      }
    }
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