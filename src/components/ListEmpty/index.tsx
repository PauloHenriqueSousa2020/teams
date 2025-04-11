import * as S from "./styles";

interface Props {
  message: string;
}
export function ListEmpty({ message }: Props) {
  return (
    <S.Container>
      <S.Message>{message}</S.Message>
    </S.Container>
  )
}