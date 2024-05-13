import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeoLocationComponent = () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchCountry = async (latitude, longitude) => {
      try {
        const apiKey = 'c68d3cd3362d4eb7a94db40e8da1fcc4';  // Replace with your API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
        
        const response = await axios.get(url);
        const country = response.data.results[0].components.country;
        setLocation(country);
      } catch (error) {
        console.error('Error fetching country:', error);
        setLocation('Country could not be determined.');
      }
    };

    const geoSuccess = position => {
      fetchCountry(position.coords.latitude, position.coords.longitude);
    };

    const geoError = error => {
      console.error('Error occurred in geolocation:', error);
      setLocation('Location permission denied.');
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  return (
    <div>
      Your current country: {location}
    </div>
  );
};

export default GeoLocationComponent;
