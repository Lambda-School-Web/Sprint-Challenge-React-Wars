import React, { useState, useEffect } from "react";
import axios from "axios";
import SWWrapper from "./components/SWWrapper";
import "./App.css";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    "https://swapi.co/api/people/?page=1"
  );

  useEffect(() => {
    axios
      .get(`${currentPage}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [currentPage]);

  const handlePageClick = page => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      {data ? (
        <SWWrapper data={data} callback={handlePageClick} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
