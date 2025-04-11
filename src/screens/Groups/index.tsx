import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native"

import { Header } from 'components/Header';
import { Highlight } from 'components/Highlight';
import { GroupCard } from 'components/GroupCard';
import { ListEmpty } from 'components/ListEmpty';
import { Button } from 'components/Button';
import { Loading } from 'components/Loading';

import { groupsGetAll } from 'storage/group/groupsGetAll';

import * as S from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    setIsLoading(true);
    try {
      const data = await groupsGetAll();
      setGroups(data);

    } catch (error) {
      console.log(error);
      Alert.alert("Grupos", "Não foi possível carregar os grupos.")
    }
    setIsLoading(false);
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <S.Container>
      <Header />

      <Highlight
        title='Turmas'
        subTitle='jogue com a sua turma'
      />

      {isLoading ? <Loading /> : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() =>
            <ListEmpty
              message='Que tal cadastrar a primeira turma?'
            />
          }
        />
      )}

      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </S.Container>
  );
}