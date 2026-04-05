import React, { useState } from "react";
import Login from "./login";
import Calculator from "./calculator";

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