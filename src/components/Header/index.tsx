import { useNavigation } from "@react-navigation/native";

import logo from "assets/logo.png";

import * as S from "./styles";

interface Props {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('groups')
  }

  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={handleGoBack}>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.Logo
        source={logo}
      />
    </S.Container>
  )
}