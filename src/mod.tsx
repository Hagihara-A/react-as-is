import { useState } from "react";

export const App = () => {
  const [name, setName] = useState("");
  return (
    <>
      <h2>Hello React</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <p>Your name is...</p>
      <h3>{name.toUpperCase()}</h3>
    </>
  );
};
