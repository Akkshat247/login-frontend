import React, { useState } from "react";
import Login from "./Login";
import Calculator from "./Calculator";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <Calculator />
      ) : (
        <Login onLoginSuccess={() => setLoggedIn(true)} />
      )}
    </>
  );
}

export default App;