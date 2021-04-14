import { Card, CardHeader, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../GlobalState/store";
import { AddPartyButton } from "../user/AddPartyButton";
import { CharacterCard } from "./CharacterCard";
const useStyle = makeStyles({
  partyCard: {
    margin: 20,
    padding: 10,
  },
});
interface IProps {}
export const CharacterList = (props: IProps) => {
  const classes = useStyle();
  const user = useSelector((state: IRootState) => state.user.userInfo!);
  const { parties, characters } = user;
  return (
    <>
      <AddPartyButton User={user} />
      {parties?.map((party, i) => (
        <Card key={i} className={classes.partyCard}>
          <CardHeader title={party} />
          {characters?.map((char, j) => {
            if (char?.party === party)
              return <CharacterCard key={j} character={char} />;
          })}
        </Card>
      ))}
      <Card className={classes.partyCard}>
        <CardHeader title="Characters without party" />
        {characters?.map((char, i) => {
          if (char && !char.party)
            return <CharacterCard key={i} character={char} />;
        })}
      </Card>
    </>
  );
};
