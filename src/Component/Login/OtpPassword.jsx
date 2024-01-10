import React from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  Select,
  Heading,
  Link as ChakraLink,
  Image,
  Flex,
  Container,
  Center,
} from '@chakra-ui/react';
import './Login.css';
import loginimage from "../../Images/vector.png"
import { NavLink } from 'react-router-dom';

const OtpPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Form submitted');
  };

  return (
    <Box
  
    margin={'1rem'} width={'98%'}  height={'90vh'}>
      <Flex >
   <Box  
   className='image-box'
 >
  <Image 
  height={'95vh'}
  width={'1000px'}
  src={loginimage} />
</Box>

      <Box
    
      marginLeft={'3rem'}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}
    
      height={'fit-content'}
      >
        <Box
        width={'330px'}
        padding={'1rem'}
        className='login-data'
        bg={'#f2f2f2'}
        >
      <Center marginBottom={'1rem'}>
        <Heading
        
        color={'#FF7F50'}
        as="h3" id='login'>Verify</Heading>
        </Center>
        <form onSubmit={handleSubmit}>
        
          <FormControl className="form-group">
            <FormLabel
             color={'orange'}
            htmlFor="userID" id='log'>OTP</FormLabel>
            <Input type="text" id="userID" name="userID" placeholder='Enter OTP'/>
          </FormControl>


          <FormControl className="form-group">
            <FormLabel
             color={'orange'}
            htmlFor="userID" id='log'>New Password</FormLabel>
            <Input type="text" id="userID" name="userID" placeholder='Enter Password'/>
          </FormControl>
        
          <FormControl 
          
          className="form-group" id='btnn'>
            <Center marginTop={'1rem'}>
            <NavLink to="/dashboard">
            <Button 
            bg={'orange'}
            type="submit" id='btn'>Submit
            </Button>
            </NavLink>
            </Center>
          </FormControl>
        </form>
        </Box>
      </Box>
      </Flex>
    </Box>
  );
};

export default OtpPassword;
