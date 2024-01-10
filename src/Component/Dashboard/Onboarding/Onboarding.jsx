import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react'

const Onboarding= () => {
  return (
   <>
   <Box margin={'1rem'}>
       <Flex justifyContent="space-evenly" marginTop="20px">
        <Text color="orange" fontWeight="bold">Name</Text>
        <Text color="orange" fontWeight="bold">Mobile</Text>
        <Text color="orange" fontWeight="bold">Status</Text>
      </Flex>
      <Flex justifyContent="space-evenly" marginTop="10px">
        <Text marginLeft="15%">John Deo</Text>
        <Text marginLeft="13%">9823516472</Text>
        <Text marginLeft="13%">On boarding</Text>
        <Button
          width={'fit-content'}
          height="6vh"
          backgroundColor="orange"
          color="white"
          borderRadius="7px"
          padding="0.5rem"
        >
          View details
        </Button>
      </Flex>
      <Flex justifyContent="space-evenly" marginTop="20px">
        <Text marginLeft="15%">John Deo</Text>
        <Text marginLeft="13%">9823516472</Text>
        <Text marginLeft="13%">On boarding</Text>
        <Button
         width={'fit-content'}
          height="6vh"
          backgroundColor="orange"
          color="white"
          borderRadius="7px"
          padding="0.5rem"
        >
          View details
        </Button>
      </Flex>
      <Flex justifyContent="space-evenly" marginTop="20px">
        <Text marginLeft="15%">John Deo</Text>
        <Text marginLeft="13%">9823516472</Text>
        <Text marginLeft="13%">On boarding</Text>
        <Button
         width={'fit-content'}
          height="6vh"
          backgroundColor="orange"
          color="white"
          borderRadius="7px"
          padding="0.5rem"
        >
          View details
        </Button>
      </Flex>
      </Box>
    </>
  )
}
export default Onboarding;