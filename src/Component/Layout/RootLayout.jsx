import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box, Flex } from "@chakra-ui/react";
import SideBar from "../Sidebar/Sidebar";

function RootLayout() {
  console.log("root layout");
  return (
    <Flex direction="column" height="100vh" >
      {/* Navbar */}
      <Box w="100vw"  boxShadow="2xl"  height="15vh">
        <Navbar />
      </Box>

      {/* Main Content */}
      <Flex flexGrow={1} direction={{base:"column" ,md:"row"}}>
        {/* Sidebar */}
        <Box flexBasis={{ base: "10%", md: "20%" }} mt="1rem" w="150px">
          <SideBar />
        </Box>

        {/* Main Content */}
        <Box
          boxShadow="lg"
          // mx={{ base: "0.5rem"}}
          px="4" // Add padding for better content separation
          my="2"
          py="2"
          width="100%"
          height="100%"
        >
          {/* Outlet renders the matched child route's component */}
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default RootLayout;
