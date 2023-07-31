import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBeersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetchBeers();
  }, [searchQuery]);

  const fetchBeers = async () => {
    const response = await fetch(
      `https://ih-beers-api2.herokuapp.com/beers/search?q=${searchQuery}`
    );
    if (response.status === 200) {
      const data = await response.json();
      setBeers(data);
    } else {
      console.log("Failed to fetch beers:", response.status);
    }
  };

  return (
    <>
      <h1>All Beers</h1>
      <input
        type="text"
        placeholder="Search for beers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {beers.map((beer) => (
        <div key={beer._id}>
          <Link to={`/beers/${beer._id}`}>
            <img src={beer.image_url} alt={beer.name} style={{ height: "200px" }} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
            <p>Contributed by: {beer.contributed_by}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default AllBeersPage;
