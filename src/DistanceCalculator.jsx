import { useState, useEffect } from 'react';
import { Box, Input, Button, Text, Spinner, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const DistanceCalculator = () => {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const bingMapsApiKey = "At0f7dw9H62jf_IFEb15zjn0RSIiUJK6uKGX_68gjYEKw4MY8iRexyajfJD99BMc";
    const url = `https://dev.virtualearth.net/REST/v1/Routes/Driving?wp.0=${city1}&wp.1=${city2}&key=${bingMapsApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.resourceSets[0].resources.length > 0) {
        const distance = data.resourceSets[0].resources[0].travelDistance;
        setDistance(distance);
        setError(null);
        setHistory(prevHistory => [...prevHistory, { city1, city2, distance }]);
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

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

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
      
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>City 1</Th>
            <Th>City 2</Th>
            <Th>Distance (km)</Th>
           
          </Tr>
        </Thead>
        <Tbody>
          {history.map((item, index) => (
            <Tr key={index}>
              <Td>{item.city1}</Td>
              <Td>{item.city2}</Td>
              <Td>{item.distance}</Td>
         
        </Tr>
      ))}
    </Tbody>
  </Table>
    </Box>
    );
}

export default DistanceCalculator;
