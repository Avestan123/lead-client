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
  import EmployeeTable from "./EmployeeTable";
  import { useUser } from "../../context/UserContext";
  
  function NewEmployee() {
    const [employees, setEmployees] = useState();
    const token = localStorage.getItem('token')
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const { userData } = useUser();
    const isAdmin = userData?.userRole === "Admin";
  
    useEffect(() => {
      const getEmployees = async () => {
        try {
          const response = await fetch(`${apiUrl}/admin/getAllEmployees`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            "Content-Type": "application/json",
          });
          const data = await response.json();
          console.log(data);
          if (data) {
            setEmployees(data.employees);
          }
        } catch (error) {
          alert(error);
        }
      };
      getEmployees();
    }, []);
  
    return (
      <Box>
        <Center>
          <Flex direction="column" align="center" mt="2rem">
            <Flex justify="flex-end" w="100%" >
              { isAdmin && 
              <NavLink to="addEmployee">
                <Button
                  width={"8rem"}
                  height={"3rem"}
                  borderRadius={"15px"}
                  background={"teal.400"}
                  mx="2rem"
                  p="1rem"
                >
                 Add Employee
                </Button>
              </NavLink>}
            </Flex>
            <Flex  mt="2rem" justify="center">
              <EmployeeTable employees={employees} />
            </Flex>
          </Flex>
        </Center>
      </Box>
    );
  }
  
  export default NewEmployee;
  