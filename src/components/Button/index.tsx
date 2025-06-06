import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  type?: S.ButtonTypeStyleProps;
}

export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <S.Container type={type} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}