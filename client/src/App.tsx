import React, { useEffect } from "react";
import axios from "axios";
import { Counter } from "./features/counter/Counter";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post("http://localhost:3000/api/v1", {
        query: `
        mutation Login($username: String!) {
          login(username: $username) {
            username
          }
        } 
      `,
        variables: {
          username: "test",
        },
      });
      console.log(data);
    };
    fetchData();
  }, []);
  return <div className="App"></div>;
}

export default App;
