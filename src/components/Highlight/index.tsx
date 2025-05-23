import * as S from "./styles";

interface Props {
  title: string;
  subTitle: string;
}

export function Highlight({ title, subTitle }: Props) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.Container>
  )
}