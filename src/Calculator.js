import React, { useState, useEffect } from "react";
import "./App.css";

function Calculator() {
  const [loaded, setLoaded] = useState(false);
  const [RemoteCalculator, setRemoteCalculator] = useState(null);

  /* 🔹 FETCH ENTIRE CALCULATOR CODE FROM S3 */
  useEffect(() => {
    fetch("https://akkshat-bucket.s3.ca-central-1.amazonaws.com/s3calc.js")
      .then((res) => res.text())
      .then((code) => {
        /* calculator.js in S3 must contain:
           export default function RemoteCalculator() { ... }
        */

        const cleanedCode = code
          .replace(/import.*from.*;/g, "")
          .replace("export default", "");

        const componentFactory = new Function(
          "React",
          `
          ${cleanedCode}
          return Calculator;
        `
        );

        const LoadedComponent = componentFactory(React);

        setRemoteCalculator(() => LoadedComponent);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load Calculator from S3:", err);
      });
  }, []);

  if (!loaded) {
    return (
      <div className="container">
        <h1>Calculator App</h1>
        <p>Loading calculator from S3...</p>
      </div>
    );
  }

  return <RemoteCalculator />;
}

export default Calculator;