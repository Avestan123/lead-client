import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Center,
    Text,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import { NavLink } from "react-router-dom";
  import MissedTable from "./MissedTable";
  
  function Missed() {
    // const [leads, setLeads] = useState();
  
    // const apiUrl = import.meta.env.VITE_APP_API_URL;
  
    // useEffect(() => {
    //   const token = localStorage.getItem('token'); 
    //   const getUsers = async () => {
    //     try {
    //       const response = await fetch(`${apiUrl}/sales/get_todays_leads`, {
    //         method: "GET",
    //         "Content-Type": "application/json",
    //         headers: {
    //           'Authorization': `Bearer ${token}`,
    //         },
    //       });
    //       const data = await response.json();
         
    //       if (data) {
    //         setUsers(data.customers);
    //       }
    //     } catch (error) {
    //       alert(error);
    //     }
    //   };
    //   getUsers();
    // }, []);
  
    return (
      <Box>
        <Center>
          <Flex direction="column" align="center" mt="2rem">
            {/* <Flex justify="flex-end" w="100%" >
              <NavLink to="form">
                <Button
                  width={"8rem"}
                  height={"3rem"}
                  borderRadius={"15px"}
                  background={"orange"}
                  mx="2rem"
                  p="1rem"
                >
                 Add New Leads
                </Button>
              </NavLink>
            </Flex> */}
            <Flex  mt="2rem" justify="center">
              <MissedTable/>
            </Flex>
          </Flex>
        </Center>
      </Box>
    );
  }
  
  export default Missed;
  