import { Card, CardHeader } from "@material-ui/core";
import { CharacterRef } from "../../types/globalTypes";
interface IProps {
  partyName: string;
  characters: Array<CharacterRef>;
}
export const PartyCard = ({ partyName, characters }: IProps) => {
  return (
    <Card>
      <CardHeader title={partyName} />
      <ul>
        {characters.map(
          (char, i) => char && <li key={char.name}>{char.name}</li>
        )}
      </ul>
    </Card>
  );
};
