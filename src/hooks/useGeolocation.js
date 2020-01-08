import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    geo.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
    return () => { };
  }, []);
  return { ...position, geoError: error };
}