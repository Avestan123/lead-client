import Avestan from "../../Images/avestan.jpeg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  Avatar,
  Icon,
  Image,
  WrapItem,
  Select,
  Tag,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// import { ChevronDownIcon } from '@chakra-ui/icons'
// import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { userData, clearUserIdAndRole } = useUser();
  const auth = useAuth();
  const [logout, setLogout] = useState(false);
  const navigation = useNavigate();
  console.log(userData, "navbar");
  // const auth = useAuth()


  const handleLogout = () => {
    auth.logout();
    clearUserIdAndRole();
    navigation('/login');

  };
  return (
    <div>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mx="2rem"
        mt="0.5rem"
      >
        <Box display="flex" alignItems="center">
          <Image
            boxSize={{ base: "5rem", md: "10rem" }}
            objectFit="cover"
            src={Avestan}
            width={{ base: "5rem", md: "10rem" }}
            height={{ base: "2rem", md: "5rem" }}
          />
        </Box>
        <Box>
          {/* <Heading marginLeft={{base:"0.2rem",md:"1rem"}} fontSize={{base:"1rem",md:"2.5rem"}}>
            Dashboard
          </Heading> */}
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "row", md: "column" }} // Use row for mobile and column for larger screens
          alignItems="center"
          textAlign="center"
          marginRight={{ xs: 0, md: "1rem" }} // No margin on mobile, 1rem margin on larger screens
        >
          <Text
            mx={{ base: "0.2rem", md: "1rem" }}
            fontSize={{ base: "0.5rem", md: "1rem" }}
            fontWeight="bold"
          >
            Hello {userData?.userName}
          </Text>

          <Tag size="lg" colorScheme="gray" borderRadius="full" p="2" cursor="pointer" onClick={handleLogout}>
            <Avatar
              borderRadius="50%"
              mx="2"
              width={{ base: "1rem", md: "2rem" }}
              height={{ base: "1rem", md: "2rem" }}
              src="user.png"
              marginRight={{ xs: "0.5rem", md: 0 }} // Add some margin on mobile, no margin on larger screens
              cursor="pointer"
            />


           <Text fontSize={{ base: "0.5rem", md: "1rem" }} color="#595c5f" px="2" >Logout</Text>

          </Tag>

          {/* <AccountCircleIcon style={{ width: "3.5rem", height: "3rem" }} /> */}
        </Box>
      </Flex>
    </div>
  );
}
