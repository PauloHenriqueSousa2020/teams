import { Header } from "components/Header";
import { Highlight } from "components/Highlight";
import { Button } from "components/Button";

import * as S from "./styles";
import { Input } from "components/Input";

export function NewGroup() {
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
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </S.Content>
    </S.Container>
  )
}