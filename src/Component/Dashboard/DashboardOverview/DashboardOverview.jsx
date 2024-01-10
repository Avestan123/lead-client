import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Img,
  Button,
  Spinner
} from "@chakra-ui/react";
import { useUser } from "../../context/UserContext";
import TodaysLeads from "./TodaysLeads";
import { Link } from "react-router-dom";
import TotalCumstmer from "../../../../public/totalCust.svg";
import TodaysFollowup from "../../../../public/todays.svg";
import AssignedLeads from "../../../../public/assigned.svg";
import Missed from "../../../../public/missed.svg";
import Transfer from "../../../../public/transfer.svg";
import nextDay from "../../../../public/nextDay.svg"
import filter from  "../../../../public/filter.svg" ;
import upcomingImage from "../../../../public/upcoming.svg"
import lostLeadsIcon from "../../../../public/lostLeads.svg";
import {  AddIcon } from '@chakra-ui/icons'



const DashboardOverview = () => {
  const [users, setUsers] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [transfered, setTransfered] = useState([]);
  const [leads, setLeads] = useState([]);
  const { userData } = useUser();
  const [loading, setLoading] = useState("false");
  const [upcoming, setUpcoming] = useState([]);
  const [missed, setMissed] = useState([]);
  const [todaysFollowups, setTodaysFollowups] = useState([])
  const [nextDaysleads, setNextDaysleads] = useState([])
  const [workOrders, setWorkOrders] = useState([])
  const [lostLeads, setLostLeads] = useState([])
  console.log("leads", leads);
  console.log("users", users);

  const isSales = userData?.userRole === "Sales";

  const apiUrl = import.meta.env.VITE_APP_API_URL;


  //   const token = localStorage.getItem("token");

  //   const getTodaysLeads = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/sales/get_todays_leads`, {
  //         method: "GET",
  //         "Content-Type": "application/json",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.json();
  //       console.log("data", data?.todaysLeads?.length);

  //       if (data) {
  //         setLeads(data.todaysLeads?.length);
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };

  //   // Check if the user role is "Admin" or "Sales" before calling getTodaysLeads
  //   if (userData?.userRole === "Admin" || userData?.userRole === "Sales") {
  //     getTodaysLeads();
  //   }
  // }, [userData?.userRole]);

  useEffect(() => {
    setLoading(false);
    const token = localStorage.getItem("token");
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLoading(false);
        console.log("all data", data);
        if (data) {
          setUsers(data.customers);
          setLeads(data.totalLeads)
          setAssigned(data.assignedLeads);
          setTransfered(data.transferredLeads);
          setMissed(data.missedFollowUps);
          setTodaysFollowups(data.todaysFollowUps);
          setNextDaysleads(data.nextDaysFollowUps);
          setWorkOrders(data.activeWorkOrders);
          setUpcoming(data.upcomingFollowUps);
          setLostLeads(data.lostLeads);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Box position="absolute"
        top="50%"
        left="50%">
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='red.500'
      size='xl'
      
    />
    <h3>loading...</h3></Box>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" mx="5">
            <Link to="/newleads/form">
              <Button colorScheme='whatsapp' leftIcon={<AddIcon />}>Add Leads</Button>
            </Link>
          </Box>
          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/* Total Customers and Total Leads*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              {/* Chnage Link */}
              {/* <Link
               to ={{
                pathname: "/customers",
                state: { users }
               }}
              >
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  borderLeft="4px solid #FF0000"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="2" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={TotalCumstmer} alt="Total Customers" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Total Customers
                  </Text>
                  {users && (
                    <Heading size="lg" color="black" textAlign="center">
                      {users.length}
                      {console.log("users length", users.length)}
                    </Heading>
                  )}
                </Card>
              </Link> */}
  
              <Link to="/newleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "350px" }}
                  height={{ base: "100%", md: "100px" }}
                  minW="200px"
                  maxH="100px"
                  borderLeft="4px solid red"
                  borderBottom="4px solid red"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={filter} alt="Total FollowUp" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Total Leads
                  </Text>
                  {leads && (
                    <Heading size="lg" color="black">
                      {leads.length}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
            {/* Today and Next day followups*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/todayleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "350px" }}
                  height={{ base: "100%", md: "100px" }}
                  minW="200px"
                  maxH="100px"
                  borderLeft="4px solid lightBlue"
                  borderBottom="4px solid lightBlue"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={TodaysFollowup} alt="Total FollowUp" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Todays Follow Ups
                  </Text>
                  {todaysFollowups && (
                    <Heading size="lg" color="black">
                      {todaysFollowups.length}
                    </Heading>
                  )}
                </Card>
              </Link>
              <Link to="/nextday">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "350px" }}
                  height={{ base: "100%", md: "100px" }}
                  minW="200px"
                  maxH="100px"
                  borderLeft="4px solid teal"
                  borderBottom="4px solid teal"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  {/* <div style={{ flex: 1 }}> */}
                  <img src={nextDay} alt="Total Customers" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Next Days Followups
                  </Text>
                  {nextDaysleads && (
                    <Heading size="lg" color="black" textAlign="center">
                      {nextDaysleads.length}
                      {/* {console.log("users length", users.length)} */}
                    </Heading>
                  )}
                  {/* </div> */}
                </Card>
              </Link>
            </Flex>
          </Flex>
  
          {/* second row  */}
          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/* Upcoming followupsand missedfollowups*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              <Link to="/upcoming">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "350px" }}
                  height={{ base: "100%", md: "100px" }}
                  minW="200px"
                  maxH="100px"
                  borderLeft="4px solid teal"
                  borderBottom="4px solid teal"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={upcomingImage} alt="upcomingImage" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Upcoming Followups
                  </Text>
                  {upcoming && (
                    <Heading size="lg" color="black">
                      {upcoming.length}
                    </Heading>
                  )}
                </Card>
              </Link>
  
              <Link to="/missed">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "350px" }}
                  height={{ base: "100%", md: "100px" }}
                  minW="200px"
                  maxH="100px"
                  borderLeft="4px solid gray"
                  borderBottom="4px solid gray"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={Missed} alt="Transfered Leads" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Missed followups
                  </Text>
                  {missed && (
                    <Heading size="lg" color="black">
                      {missed.length}
                    </Heading>
                  )}
                </Card>
              </Link>
            </Flex>
            {/* Assigned & Transfered Leads*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              {/* <Link to="/assignedleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  borderLeft="4px solid slateBlue"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={AssignedLeads} alt="Assigned Leads" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Assigned Leads
                  </Text>
                  {assigned && (
                    <Heading size="lg" color="black">
                      {assigned.length}
                    </Heading>
                  )}
                </Card>
              </Link> */}
  
              {/* <Link to="/transferleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  borderLeft="4px solid tomato"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={Transfer} alt="Transfered Leads" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Transfered Leads
                  </Text>
                  {transfered && (
                    <Heading size="lg" color="black">
                      {transfered.length}
                    </Heading>
                  )}
                </Card>
              </Link> */}
            </Flex>
          </Flex>
          {/* third row  */}
          <Flex direction={{ base: "column", md: "row" }} gap="25px">
            {/* Active work Order*/}
            <Flex
              direction={{ md: "row" }}
              gap="25px"
              justifyContent="center"
              marginTop="30px"
              align="center"
            >
              {/* <Link to="/lostleads">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  borderLeft="4px solid red"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={lostLeadsIcon} alt="Transfered Leads" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Lost Leads
                  </Text>
                  {lostLeads && (
                    <Heading size="lg" color="black">
                      {lostLeads.length}
                    </Heading>
                  )}
                </Card>
              </Link> */}
              {/* <Link to="/workorder">
                <Card
                  as="flex"
                  width={{ base: "100%", md: "200px" }}
                  height={{ base: "100%", md: "150px" }}
                  minW="150px"
                  maxH="150px"
                  borderLeft="4px solid orange"
                  borderRadius="12px"
                  boxShadow="md" // Add a shadow for a card-like appearance
                  p="4" // Adjust padding as needed
                  display="flex"
                  direction={{ base: "column", md: "row", lg: "row" }}
                  justifyContent={{ base: "center", md: "space-around" }}
                  alignItems="center"
                  gap="20px"
                >
                  <img src={filter} alt="Transfered Leads" />
                  <Text fontSize={{ base: "0.7rem", md: "1.2rem" }} fontWeight="bold">
                    Active Work Orders
                  </Text>
                  {workOrders && (
                    <Heading size="lg" color="black">
                      {workOrders.length}
                    </Heading>
                  )}
                </Card>
              </Link> */}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
  
};

export default DashboardOverview;
