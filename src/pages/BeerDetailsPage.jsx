import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

/* Fetch data */
const fetchBeer = async (setter, id) => {
    const response = await fetch(`https://ih-beers-api2.herokuapp.com/beers/${id}`)
    if (response.status === 200) {
        const beer = await response.json()
        setter(beer)
    }
}

const BeerDetailsPage = () => {
    const { beerId } = useParams()
    const [oneBeer, setOneBeer] = useState(null)

    useEffect(() => {
        fetchBeer(setOneBeer, beerId)
    }, []);

    if(!oneBeer) {
        return <div>Loading...</div>
    }

    return (
        <div>
          <img src={oneBeer.image_url} alt={oneBeer.name} style={{ height: '200px' }} />
          <h1>{oneBeer.name}</h1>
          <p>{oneBeer.tagline}</p>
          <p>First Brewed: {oneBeer.first_brewed}</p>
          <p>Attenuation Level: {oneBeer.attenuation_level}</p>
          <p>Description: {oneBeer.description}</p>
          <p>Contributed by: {oneBeer.contributed_by}</p>
        </div>
    );
}

export default BeerDetailsPage;

