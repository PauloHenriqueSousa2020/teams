import logo from "assets/logo.png";
import * as S from "./styles";

interface Props {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.Logo
        source={logo}
      />
    </S.Container>
  )
}