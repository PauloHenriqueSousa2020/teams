import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps, S.FilterStyleProps {
  title: string;
}

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <S.Container
      isActive={isActive}
      {...rest}
    >
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}