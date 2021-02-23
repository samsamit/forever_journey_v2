import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { ListChars } from "./types/ListChars";
import { GET_ALL_CHARACTERS } from "./controllers/character/characterController";
import { ListCharsVariables } from "./controllers/character/types/ListChars";

function App() {
  const { data, loading, error } = useQuery<ListChars, ListCharsVariables>(
    GET_ALL_CHARACTERS,
    { variables: { user: "samsam" } }
  );
  console.log(data);
  if (loading) return <p>Loading...</p>;
  const charList = (
    <ul>
      {data &&
        data!.getUser!.characters.map((char: any, i: any) => (
          <li key={i}>
            <h2>{char.name}</h2>
            <h3>{char.race}</h3>
          </li>
        ))}
    </ul>
  );
  return (
    <div className="App">
      <header className="App-header">
        {error && <p>{}error</p>}
        {charList}
      </header>
    </div>
  );
}

export default App;
