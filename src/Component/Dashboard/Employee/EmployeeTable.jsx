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
  useToast,
  Input,
  Menu,
  MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useUser } from "../../context/UserContext";
import Dropdown from 'react-dropdown';


function EmployeeTable() {
  const [data, setData] = useState([]);
  const [search, SetSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState("false");
  const navigate = useNavigate();
  const toast = useToast();
  const [flag, setFlag] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [editedId, setEditedId] = useState("");
  const [editedIdValue, setEditedIdValue] = useState("");
  //get user role from context
  const { userData } = useUser()
  const isSuper = userData?.userRole === "Super";
  // set employee id for sending assigned leads
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  console.log("selectedEmployeeId",selectedEmployeeId);


  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // options for assign to employee
  const options = [
    'one', 'two', 'three'
  ];

  // column values for react data-table
  const columns = [
    {
      name: "Name",
      selector: (row) => row.employeeName,
      sortable: true,
      cell: (row) => {
        if (editMode === row.employeeId) {
          return (
            <Input
              type="text"
              value={row.employeeName}
              onChange={(e) =>
                handleEditChange(row, "employeeName", e.target.value)
              }
            />
          );
        } else {
          return row.employeeName;
        }
      },
    },

    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => {
        if (editMode === row.employeeId) {
          return (
            <Input
              type="email"
              value={row.email}
              onChange={(e) => handleEditChange(row, "email", e.target.value)}
            />
          );
        } else {
          return row.email;
        }
      },
    },

    {
      name: "Id",
      selector: (row) => row.employeeId,
      sortable: true,
      cell: (row) => {
        return (
          <>
            {editMode === row.employeeId ? (
              <Input
                id={`edit-input-${row.employeeId}`}
                type="text"
                value={editedIdValue} // Use the new state variable
                onChange={(e) => setEditedIdValue(e.target.value)} // Update the new state variable
              />
            ) : (
              <span>{row.employeeId}</span>
            )}
          </>
        );
      },
    },

    {
      name: "Password",
      selector: (row) => row.employeePassword,
      sortable: true,
      cell: (row) => {
        if (editMode === row.employeeId) {
          return (
            <Input
              type="text"
              value={row.employeePassword}
              onChange={(e) =>
                handleEditChange(row, "employeePassword", e.target.value)
              }
            />
          );
        } else {
          return row.employeePassword;
        }
      },
    },
    {
      name: "Role",
      selector: (row) => row.employeeRole,
      sortable: true,
      cell: (row) => {
        if (editMode === row.employeeId) {
          return (
            <Input
              type="text"
              value={row.employeeRole}
              onChange={(e) =>
                handleEditChange(row, "employeeRole", e.target.value)
              }
            />
          );
        } else {
          return row.employeeRole;
        }
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {editMode === row.employeeId ? (
            <>
              <Button
                colorScheme="green"
                size="sm"
                marginRight="2"
                onClick={() => handleUpdate(row)}
              >
                Save
              </Button>
              <Button
                colorScheme="gray"
                size="sm"
                onClick={() => setEditMode(null)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              {isSuper && <>
                <Button
                  colorScheme="teal"
                  size="sm"
                  marginRight="2"
                  //nClick={() => setEditMode(row.employeeId)}
                  onClick={() => handleEditClick(row)}
                >
                  Edit
                </Button>

                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteRow(row)}
                >
                  Delete
                </Button>
              </>}
              <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteRow(row)}
                >
                  Delete
                </Button>
            </>
          )}
        </>
      ),
    },
  ];


  const defaultOption = options[0];

  /*const handleEditChange = (row, field, value) => {
    const updatedData = data.map((d) =>
      d.employeeId === row.employeeId ? { ...d, [field]: value } : d
    );
    setFilter(updatedData);
    console.log(updatedData);
  };*/
  const handleEditChange = (row, field, value) => {
    const updatedEditedData = editedData.map((d) =>
      d.employeeId === row.employeeId ? { ...d, [field]: value } : d
    );

    setEditedData(updatedEditedData);

    // Update the filter state
    const updatedFilter = data.map((d) =>
      d.employeeId === row.employeeId ? { ...d, [field]: value } : d
    );
    setFilter(updatedFilter);
  };

  //update employee
  const handleUpdate = async (rowData) => {
    const empId = rowData?._id;
    console.log("rowData", rowData);
    console.log("editedIdValue", editedIdValue);

    // Update the employeeId in the rowData object
    const updatedRowData = {
      ...rowData,
      employeeId: editedIdValue,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/admin/updateEmpoyeeDetails/${empId}`,
        {
          method: "POST",
          body: JSON.stringify({
            empId: empId,
            data: updatedRowData, // Use the updatedRowData here
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const resdata = await response.json();
      if (resdata) {
        setLoading(false);
        setFlag(!flag);
        toast({
          title: "Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setEditMode(null);
        setEditedData([]);
        setEditedIdValue(""); // Clear the editedIdValue after successful update
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error updating Employee",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleEditClick = (row) => {
    setEditMode(row.employeeId);

    // Set the editedIdValue only if it's not already set
    if (!editedIdValue) {
      setEditedIdValue(row.employeeId);
    }

    // Focus on the input element and set the cursor position to the start
    const inputElement = document.getElementById(
      `edit-input-${row.employeeId}`
    );
    if (inputElement) {
      inputElement.focus();
      inputElement.setSelectionRange(0, 0);
    }
  };

  //delete employee
  const handleDeleteRow = async (rowData) => {
    const empId = rowData._id;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/admin/deleteEmployee`, {
        method: "POST",
        body: JSON.stringify({
          empId: empId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resdata = await response.json();
      if (resdata) {
        setLoading(false);
        setFlag(!flag);
        toast({
          title: "Deleted sucessfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newEmpoyee");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Deleting Employee",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    // setLoading(true);
    const getEmployees = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/getAllEmployees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        });
        const data = await response.json();
        console.log(data);
        if (data) {
          setLoading(false);
          setData(data.employees);
        }
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };
    getEmployees();
  }, [flag]);

  useEffect(() => {
    const result = data.filter((item) =>
      item?.employeeName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  }, [search, data]);

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };

  // console.log(filter);
  console.log("editMode", editMode);
  return (
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

export default EmployeeTable;