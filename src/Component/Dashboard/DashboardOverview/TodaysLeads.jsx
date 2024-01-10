import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useUser } from "../../context/UserContext";

function TodaysLeads() {
  const [data, setData] = useState([]);
  const [search, SetSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState("false");
  const { userData } = useUser();

  const isSales = userData?.userRole === "Sales";

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const getTodaysLeads = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
          method: "GET",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const leadsdata = await response.json();

        if (leadsdata) {
          setLoading(false);
          setData(leadsdata.todaysFollowUps);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getTodaysLeads();
  }, []);

  useEffect(() => {
    const result = data?.filter(
      (item) =>
        item?.lead?.requirement?.toLowerCase().includes(search.toLowerCase()) ||
        item?.lead?.clientName?.toLowerCase().includes(search.toLowerCase()) ||
        (!isSales &&
          item?.createByName?.toLowerCase().includes(search.toLowerCase()))
    );
    setFilter(result);
  }, [search, data, isSales]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.lead.clientName,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row.lead.number,
      sortable: true,
    },

    {
      name: "Requirement",
      selector: (row) => row.lead.requirement,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => row.lead.followUpDate,
      sortable: true,
    },

    ...(isSales
      ? []
      : [
          {
            name: "Added By",
            selector: (row) => row.createByName,
            sortable: true,
          },
        ]),
    {
      name: "Detail",
      cell: (row) => (
        <Link
          to={{
            pathname: "/newleads/viewform",
          }}
          state={row.lead} // Pass the row data as state
        >
          <Button colorScheme="teal" size="md">
            Details
          </Button>
        </Link>
      ),
    },
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };

  return  loading ? (
    <Text>loading....</Text>
  ) : (
    <Center>
      <Flex justify="center" direction="column" align="center" mt="1em">
        <Text fontSize="20" fontWeight="bold">
          Todays Followups
        </Text>
        <Box width={{ base: "90vw", md: "70vw" }} overflowX="auto" p={4}>
          <DataTable
            columns={columns}
            data={filter}
            customStyles={tableHeaderStyle}
            selectableRows
            pagination
            highlightOnHover
            responsive
            selectableRowsHighlight
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => SetSearch(e.target.value)}
                style={{
                  border: "1px solid gray",
                  borderRadius: "15px",
                  padding: "10px",
                  paddingLeft: "15px",
                  width: "100%",
                }}
              />
            }
          />
        </Box>
      </Flex>
    </Center>
  );
}

export default TodaysLeads;