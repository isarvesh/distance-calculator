import React, { useState } from 'react';
import { Box, Heading, ChakraProvider, Text } from '@chakra-ui/react';
import DistanceCalculator from './DistanceCalculator';
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    black: "#1a202c",
    white: "#f7fafc",
    gray: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
    red: {
      500: "#e53e3e",
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      variants: {
        solid: (props) => ({
          bg: "gray.700",
          color: "white",
          _hover: {
            bg: "gray.800",
          },
        }),
      },
    },
  },
})

function App() {
  const [distance, setDistance] = useState(null);

  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
  };
   
  const [city1] = useState('');
  const [city2] = useState('');

  return (
    <ChakraProvider theme={theme}>
      <Box
        backgroundImage="url('https://coolbackgrounds.io/images/backgrounds/white/white-unsplash-9d0375d2.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          mx="auto"
          my="8"
          bg="white"
          boxShadow="0 10px 25px rgba(0, 0, 0, 0.3)"
          maxWidth="md"
          borderRadius="md"
          p="8"
        >
          <Heading color="black" mb="8">
            Distance Calculator
          </Heading>
          <DistanceCalculator onDistanceChange={handleDistanceChange} />
          {distance !== null && (
            <Text mt="8" fontWeight="bold" color="red:1000">
              The distance between the {city1} and  {city2} is {distance} km.
            </Text>
          )}
          
          <Box bg="gray.700" p="2">
            <Text fontSize="sm" color="white" textAlign="center">
              Created with ❤️ by Sarvesh.
            </Text>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
