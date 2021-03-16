import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CharacterCard } from "../components/character/CharacterCard";
import { CreateCharacterButton } from "../components/character/CreateCharacterButton";
import { CHARACTERS_GET_ALL } from "../controllers/character/characterController";
import {
  ListChars,
  ListCharsVariables,
  ListChars_getUser_characters,
} from "../types/ListChars";
interface IProps {}
export const CharacterPage = (props: IProps) => {
  const [characters, setcharacters] = useState<
    (ListChars_getUser_characters | null)[]
  >();

  const { data, loading, error } = useQuery<ListChars, ListCharsVariables>(
    CHARACTERS_GET_ALL,
    { variables: { user: "samsam" }, pollInterval: 500 }
  );

  useEffect(() => {
    setcharacters(data?.getUser?.characters);
  }, [data]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p>{error}</p>}

      {characters?.map((char: any, i: any) => (
        <CharacterCard character={char} key={i} />
      ))}
    </div>
  );
};
