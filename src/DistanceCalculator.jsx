import React, { useState } from 'react';
import { Box, Button, Input, Text, Spinner } from '@chakra-ui/react';

const DistanceCalculator = () => {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const bingMapsApiKey = "At0f7dw9H62jf_IFEb15zjn0RSIiUJK6uKGX_68gjYEKw4MY8iRexyajfJD99BMc";
    const url = `http://dev.virtualearth.net/REST/v1/Routes/Driving?wp.0=${city1}&wp.1=${city2}&key=${bingMapsApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.resourceSets[0].resources.length > 0) {
        const distance = data.resourceSets[0].resources[0].travelDistance;
        setDistance(distance);
        setError(null);
      } else {
        setDistance(null);
        setError("Unable to calculate distance.");
      }
    } catch (error) {
      setDistance(null);
      setError("Error fetching distance data.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box maxW="md" mx="auto" my="8">
      <form onSubmit={handleSubmit}>
      
              <Input
  type="text"
  placeholder="Enter City 1"
  value={city1}
  onChange={(e) => setCity1(e.target.value)}
  mb="4"
  colorScheme="whiteAlpha"
/>
<Input
  type="text"
  placeholder="Enter City 2"
  value={city2}
  onChange={(e) => setCity2(e.target.value)}
  mb="4"
  colorScheme="whiteAlpha"
/>


        <Button type="submit" colorScheme="blue" mb="4" isLoading={isLoading}>
          {isLoading ? <Spinner /> : 'Calculate Distance'}
        </Button>
      </form>
      {distance && <Text>Distance between {city1} and {city2}: {distance} km</Text>}
      {error && <Text color="red">{error}</Text>}
    </Box>
  );
};

export default DistanceCalculator;
