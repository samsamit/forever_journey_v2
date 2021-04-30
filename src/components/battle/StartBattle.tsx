import { Card, Button, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { START_BATTLE } from "../../GlobalState/Reducers/GameStateReducer";
import { IRootState } from "../../GlobalState/store";
import { CharacterRef } from "../../types/globalTypes";
import { PartyCard } from "../Party/PartyCard";
interface IProps {}
export const StartBattle = (props: IProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user.userInfo);
  const [selectedPartyName, setselectedPartyName] = useState("");
  const [selectedParty, setselectedParty] = useState<CharacterRef[]>();
  const { enqueueSnackbar } = useSnackbar();
  const startBattle = () => {
    if (selectedParty && selectedParty.length > 0) {
      dispatch({
        type: START_BATTLE,
        data: selectedParty,
      });
    } else {
      enqueueSnackbar("No party selected", { variant: "error" });
    }
  };

  const partyClick = (party: string, chars: CharacterRef[]) => {
    if (chars.length === 0) return;
    setselectedPartyName(party);
    setselectedParty(chars);
  };

  if (!user) return <p>Loading...</p>;
  return (
    <Card>
      <Typography variant="h5">
        {selectedPartyName !== ""
          ? "Selected party: " + selectedPartyName
          : "No selected party"}
      </Typography>
      <Button onClick={startBattle}>Start battle</Button>
      {user.parties?.map((party) => {
        const partyChars = user?.characters?.filter(
          (char) => char != null && char?.party === party
        );
        if (party && partyChars && partyChars.length > 0) {
          return (
            <div
              key={party}
              onClick={() => partyClick(party, partyChars! as CharacterRef[])}
            >
              <PartyCard
                partyName={party}
                characters={partyChars as CharacterRef[]}
              />
            </div>
          );
        }
      })}
    </Card>
  );
};
