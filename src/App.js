import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://16.52.121.213:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.success ? "Login success" : "Login failed");
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;