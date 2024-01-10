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
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import DataTable from "react-data-table-component";
  
  
  function TransferedLeadsTable() {
    const [data, setData] = useState([]);
    const [search, SetSearch] = useState("");
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState("false");
    const [userRole, setUserRole] = useState("");
   
  
  
    const ExpandedComponent = ({ data }) => (
      <pre>{JSON.stringify(data, null, 2)}</pre>
    );
    const handleDelete = () => {};
    const columns = [
      {
        name: "Name",
        selector: (row) => row.clientName,
        sortable: true,
      },
  
      {
        name: "Mobile",
        selector: (row) => row.number,
        sortable: true,
      },
  
      {
        name: "Requirements",
        selector: (row) => row.requirement,
        sortable: true,
      },
  
      {
        name: "Date",
        selector: (row) => row.followUpDate,
  
        sortable: true,
      },
      ...(userRole !== "Sales"
        ? [
            {
              name: "Added By",
              selector: (row) => row?.createByName,
              sortable: true,
            },
          ]
        : []),
      {
        name: "Details",
        cell: (row) => (
          <Link
            to={{
              pathname: "/newleads/viewform",
            }}
            state={row} // Pass the row data as state
          >
            <Button colorScheme="teal" size="md">
              Details
            </Button>
          </Link>
        ),
      },
    ];
  
    const apiUrl = import.meta.env.VITE_APP_API_URL;
  
    useEffect(() => {
      setLoading(true);
      const storedUserRole = localStorage.getItem("userRole");
      setUserRole(storedUserRole);
      const token = localStorage.getItem("token");
      const getUsers = async () => {
        try {
          const response = await fetch(`${apiUrl}/sales/get_all_customers`, {
            method: "GET",
            "Content-Type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const resdata = await response.json();
          console.log("resdata", resdata);
          if (resdata) {
            setLoading(false);
            setData(resdata?.transferredLeads);
            setFilter(resdata?.transferredLeads);
          }
        } catch (error) {
          setLoading(false);
          alert(error);
        }
      };
      getUsers();
    }, []);
  
    useEffect(() => {
      const result = data.filter(
        (item) =>
        item?.lead?.requirement?.toLowerCase().includes(search.toLowerCase()) ||
        item?.lead?.clientName?.toLowerCase().includes(search.toLowerCase()) ||
        (userRole !== "Sales" &&
          item?.createByName?.toLowerCase().includes(search.toLowerCase()))
      );
      setFilter(result);
    }, [search, data, userRole]);
  
    const tableHeaderStyle = {
      headCells: {
        style: {
          fontWeight: "bold",
          fontSize: "14px",
          backgroundColor: "#ccc",
        },
      },
    };
  
    return loading ? (
      <Text>loading....</Text>
    ) : (
      <Center>
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
      </Center>
    );
  }
  
  export default TransferedLeadsTable;