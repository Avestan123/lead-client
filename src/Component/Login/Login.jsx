import React, { useRef } from "react";
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
  useToast,
  Text
} from "@chakra-ui/react";
import "./Login.css";
import loginimage from "../../Images/vector.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const Login = () => {
  const userIdRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const toast = useToast()
  const auth = useAuth();
  const { setUserIdAndRole } = useUser();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredUserId = userIdRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if(!enteredUserId || !enteredPassword){
      return alert("userId / password required")
    }

    // get  url
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    let response = await fetch(`${apiUrl}/signin`, {
      method: "POST",
      body: JSON.stringify({
        employeeId: enteredUserId,
        employeePassword: enteredPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    let Resdata = await response.json();
    if (Resdata.status===200) {
      localStorage.setItem('token',Resdata.token)
      auth.login(Resdata.token, Resdata.userId);
      console.log('53 Before navigating to /',Resdata);
      setUserIdAndRole(Resdata.employeeId, Resdata.role,Resdata.name);
      navigate("/");
      toast({
        title: "login sucessful.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      console.log('after navigating to /');
    } else {
      toast({
        title: Resdata.msg || "Invalid Credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
};

  return (
    <Box
      margin={{ base: "1rem", md: "1.5rem" }}
      width={"98%"}
      height={"90vh"}
      mr={{ base: "2rem" }}
      // bg="red.100"
      justifyContenty="center" mx="2rem" alignItems="center"
    >
      <Flex direction={{base:"column",md:"row"}} gap="1rem" justify={{base:"center", md:"center"}} mx="2rem" align="center">
        

        <Box height={{base:"50vh", md:"75vh"}} width={{base:"85vw",md:"40vw"}}
            mx={{base:"3rem", md:'0rem'}}
            mr={{base:"4rem"}}
            p={{base:"0.5rem", md:"1rem"}}
            className="login-data"
            bg={"#f2f2f2"}>
          <Box
            
          >
            <Center>
              <Text color="teal" fontWeight="bold" fontSize={{base:"20", md:"30"}} id="login" my="4" decoration="blink">
               Avestan Lead Management
              </Text>
            </Center>
            <form>
              {/* <FormControl className="form-group">
                <FormLabel color={"red.400"} htmlFor="role" id="log">
                  Select Role
                </FormLabel>
                <Select id="role" name="role">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="user">Sales</option>
                  <option value="user">Customer Service</option>
                  <option value="user">Acccount</option>
                </Select>
              </FormControl> */}
              <FormControl className="form-group">
                <FormLabel color={"red.400"} htmlFor="userID" id="log">
                  User ID
                </FormLabel>
                <Input
                  ref ={userIdRef}
                  type="text"
                  id="userID"
                  name="userID"
                  placeholder="Enter UserID or Email"
                />
              </FormControl>
              <FormControl className="form-group">
                <FormLabel color={"red.400"} htmlFor="password" id="log">
                  Enter Password
                </FormLabel>
                <InputGroup>
                  <Input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="form-group">
                <ChakraLink color={"red.400"} href="#forgot-password">
                  Forgot Password?
                </ChakraLink>
              </FormControl>
              <FormControl className="form-group" id="btnn">
                <Center marginTop={"1rem"}>
                    <Button bg={"red.400"} type="submit" id="btn" onClick={handleSubmit} >
                      Login
                    </Button>
                </Center>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
