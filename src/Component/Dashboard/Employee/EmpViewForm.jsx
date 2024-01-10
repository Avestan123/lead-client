import React , { useState, useEffect } from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
    Text,
    Flex,
    Select
  } from "@chakra-ui/react";
  import { useNavigate,useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"

function EmpViewForm() {
    const location = useLocation();
    const useData = location.state;

   
    var customerId = useData._id;
    console.log('customer id ', useData,customerId);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()
 
    const {
      register,
      handleSubmit,
      control,
      getValues,
      setValue,
      watch,
      formState: { errors },
    } = useForm();

      // reset form function
  function resetForm(data) {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  
   // for selected fles 
   const [selectedFiles, setSelectedFiles] = useState({
    electricity: null,
    pan: null,
    aadhar: null,
    tax: null,
  });

  const handleFileChange = (fieldName) => (e) => {
    const file = e.target.files[0];
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));
  };



  const handleSelectChange = (selectedValue) => {
    setValue('requirement', selectedValue);
  };


   const apiUrl = import.meta.env.VITE_APP_API_URL;

   useEffect(() => {
    // Set initial form values
    setValue("clientName", useData.clientName);
    setValue("email", useData.email);
    setValue("number", useData.number);
    setValue("address", useData.address);
    setValue("city", useData.city);
    setValue("followUpDate", useData.followUpDate);
    setValue("requirement", useData.requirement);
    setValue("remarks", useData.remarks);
    // Set other form values...
  
  }, [useData, setValue]); 

   //Update the details
   const updateCustomer = async (data) => {
    const token = localStorage.getItem('token');
    // const customerId = data._id;
    const apiUrl = import.meta.env.VITE_APP_API_URL;
  
    // Create a new FormData instance
    const formData = new FormData();
  
    // Append fields to the formData
    formData.append("clientName", data.clientName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("followUpDate", data.followUpDate);
    formData.append("requirement", data.requirement);
    formData.append("remarks", data.remarks);
  
    // Append file fields to the formData
    formData.append("electricityBill", data.electricityBill);
    formData.append("pancard", data.pancard);
    formData.append("adharcard", data.adharcard);
    formData.append("textRecipe", data.textRecipe);
    console.log(formData);
    try {
      // Make the fetch request
      console.log(customerId,data, formData);
      let response = await fetch(`${apiUrl}/sales/updateCustomerDetails/${customerId}`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      let Resdata = await response.json();
      if (Resdata.status === 200) {
        toast({
          title: "Customer Information Updated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads");
      } else {
        resetForm(data);
  
        toast({
          title: Resdata.msg || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error updating customer information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  
  // Delete The customer
   const handleDelete = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${apiUrl}/sales/deleteCustomer`, {
        method: "POST",
      body: JSON.stringify({
        customerId: id,
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      });
      const resdata = await response.json();
      if (resdata) {
        setLoading(false)
        toast({
          title: "Deleted sucessfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate('/newleads')
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: "Error Deleting Customer",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      
    }
  };
   
  return (
    <>
    <Flex direction="column"   alignItems="center" justifyContent="center">
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={6}
        alignItems="center"
        mx="1rem"
      >
        <Box>
          <FormControl isRequired>
            <FormLabel>Client Name</FormLabel>
            <Input
              marginTop={"0.5rem"}
              isRequired
              type="text"
              width={{ base: "100%", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              contentEditable
              name="clientName"
              id="clientName"
              // value = {clientName}
              // onChange={(e) => setClientName(e.target.value)}
              {...register("clientName", {
                required: "Client Name is required",
                message: "invalid input",
              })}
            />
            {errors.clientName && (
              <Text color="red.500">{errors.clientName.message}</Text>
            )}
           
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              marginTop={"0.5rem"}
              type="email"
              width={{ base: "100%", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              // value = {data.email}
              name="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                message: "invalid email",
              })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>
        </Box>
      </Stack>

      <Stack
       direction={{ base: "column", md: "row" }}
       spacing={6}
       alignItems="center"
       mx="1rem"
       mt="1rem"
      >
        <Box>
          <FormControl isRequired>
            <FormLabel>Enter Number</FormLabel>
            <Input
             marginTop={"0.5rem"}
             isRequired
             type="text"
             width={{ base: "100%", md: "400px" }}
             height={"30px"}
             border={"1px solid #707070"}
              // value = {data.number}
              name="number"
              id="number"
              {...register("number", {
                required: "Mobile Number is required",
                message: "invalid number",
              })}
            />
            {errors.number && (
              <Text color="red.500">{errors.number.message}</Text>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              marginTop={"0.5rem"}
              type="text"
              width={{ base: "100%", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              isRequired
              // value = {data.address}
              name="address"
              id="address"
              {...register("address", {
                required: "Address is required",
                message: "invalid address",
              })}
            />
            {errors.address && (
              <Text color="red.500">{errors.address.message}</Text>
            )}
          </FormControl>
        </Box>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={6}
        alignItems="center"
        mx="1rem"
        mt="1rem"
      >
        <Box>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              marginTop={"0.5rem"}
              isRequired
              type="text"
              width={{ base: "100%", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              // value = {data.city}
              name="city"
              id="city"
              {...register("city", {
                required: "City Name is required",
                message: "invalid city",
              })}
            />
            {errors.city && <Text color="red.500">{errors.city.message}</Text>}
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Follow Up Date</FormLabel>
            <Input
              marginTop={"0.5rem"}
              type="text"
              width={{ base: "250px", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              isRequired
              // value = {data.followUpDate}
              name="followUpDate"
              id="followUpDate"
              
              {...register("followUpDate", {
                required: "followUpDate is required",
                message: "invalid followUpDate",
              })}
            />
            {errors.date && <Text color="red.500">{errors.date.message}</Text>}
          </FormControl>
        </Box>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={6}
        alignItems="center"
        mx="1rem"
        mt="1rem"
      >
        
        <Box>
          <FormControl isRequired>
            <FormLabel>Requirement</FormLabel>
            <Select
              placeholder="Select option"
             
              marginTop={"0.5rem"}
              isRequired
              type="text"
              width={{ base: "100%", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              control={control}
              name="requirement"
              id="requirement"
              onChange={(e) => handleSelectChange(e.target.value)}
              // value={data.requirement}
              // value={watch('requirement')}
              {...register('requirement', {
                required: 'Requirement Role is required',
                message: 'invalid input',
              })}
            >
              <option value="Project">Project</option>
              <option value="Retail">Retail</option>
            </Select>
            {errors.requirement && (
              <Text color="red.500">{errors.requirement.message}</Text>
            )}
          
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired>
            <FormLabel>Remarks</FormLabel>
            <Input
              marginTop={"0.5rem"}
              isRequired
              type="text"
              width={{ base: "100%", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              // value = {data.remarks}
              name="city"
              id="city"
              placeholder="Enter remarks"
              {...register('remarks', {
                required: 'Remarks are required for Project',
              })}
            />
            {errors.remarks && (
              <Text color="red.500">{errors.remarks.message}</Text>
            )}
          </FormControl>
        </Box>
      </Stack>


      <Flex
        direction={{ base: "column", md: "row" }}
        gap="10"
        alignItems="center"
        justify="start"
        // mx="1rem"
        mt="1rem"
      >
        <Box w={{base:"15rem", md:"25rem"}} bg="gray.300" p="0.5rem" borderRadius="15px">
          <FormControl>
            <FormLabel>Electricity Bill</FormLabel>
            {/* <Input
              marginTop={"0.5rem"}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"center"}
              isRequired
              width={{ base: "400px", md: "400px" }}
              display="none"
              height={"30px"}
              border={"1px solid #707070"}
              value={data.electricityBill}
              name="electricity"
              id="electricity"
            /> */}
            <Text>{useData.electricityBill}</Text>
          </FormControl>
        </Box>
        <Box w={{base:"15rem",md:"25rem"}} bg="gray.300" p="0.5rem" borderRadius="15px">
          <FormControl>
            <FormLabel>Pan Card</FormLabel>
            <Input
              marginTop={"0.5rem"}
              type="file"
              display="none"
              width={{ base: "400px", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              name="pan"
              id="pan"
            />
            <Text>{useData.pancard}</Text>
          </FormControl>
        </Box>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap="10"
        alignItems="center"
        justify="start"
        mx="1rem"
        mt="2rem"
      >
        <Box w={{base:"15rem", md:"25rem"}} bg="gray.300" p="0.5rem" borderRadius="15px">
          <FormControl >
            <FormLabel>Aadhar Card</FormLabel>
            <Input
              marginTop={"0.5rem"}
              isRequired
              type="file"
              display="none"
              width={{ base: "400px", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              name="aadhar"
              id="aadhar"
            />
            <Text>{useData.adharcard}</Text>
          </FormControl>
        </Box>
        <Box w={{base:"15rem",md:"25rem"}} bg="gray.300" p="0.5rem" borderRadius="15px">
          <FormControl>
            <FormLabel>Upload Tax Receipt</FormLabel>
            <Input
              marginTop={"0.5rem"}
              type="file"
              display="none"
              width={{ base: "100vw", md: "400px" }}
              height={"30px"}
              border={"1px solid #707070"}
              name="tax"
              id="tax"
            />
            <Text>{useData.textRecipe}</Text>
          </FormControl>
        </Box>
      </Flex>

      <Flex direction={{base:"column", md:"row"}} alignItems="center"
          justifyContent="center" gap={{base:"0.2rem",md:"1rem"}}>
        <Box
       
          display="flex"
         
          width="100%"
          py={{base:"2", md:"12"}}
          mt={"1.5rem"}
          bgPosition="center"
          // bgRepeat="no-repeat"
          mb={{base:"0", md:"2"}}
        >
          <Button
            width={"8rem"}
            height={"2.5rem"}
            borderRadius={"15px"}
            background={"orange"}
            onClick={handleSubmit(updateCustomer)}
          >
            Update
          </Button>
        </Box>

        <Box
       
          display="flex"
         
          width="100%"
          py={{base:"2", md:"12"}}
          mt={{base:"0rem", md:"1.6rem"}}
          bgPosition="center"
          // bgRepeat="no-repeat"
          mb={{base:"0", md:"2"}}
        >
          <Button
            width={"8rem"}
            height={"2.5rem"}
            borderRadius={"15px"}
            background={"red"}
            onClick={()=>handleDelete(useData._id)}
          >
            Delete
          </Button>
        </Box>
      </Flex>
      </Flex>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        gap="5"
        mt="5rem"
      >
        {/* name & Email */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Employee Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="employeeName"
                id="employeeName"
                {...register("employeeName", {
                  required: "Employee Name is required",
                  message: "invalid input",
                })}
              />
              {errors.employeeName && (
                <Text color="red.500">{errors.employeeName.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="email"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="email"
                id="email"
                {...register("email", {
                  //   required: "Email is required",
                  message: "invalid email",
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Id & Password*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Employee Id</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="employeeId"
                id="employeeId"
                {...register("employeeId", {
                  required: "Employee Id is required",
                  message: "invalid input",
                })}
              />
              {errors.employeeId && (
                <Text color="red.500">{errors.employeeId.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Employee Password</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="email"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="employeePassword"
                id="employeePassword"
                {...register("employeePassword", {
                  required: "Employee Password is required",
                  message: "invalid email",
                })}
              />
              {errors.employeePassword && (
                <Text color="red.500">{errors.employeePassword.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* role */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="left"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Employee Role</FormLabel>
              <Select
                placeholder="Select option"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="employeeRole"
                id="employeeRole"
                {...register("employeeRole", {
                  required: "Employee Role is required",
                  message: "invalid input",
                })}
              >
                <option value="Admin">Admin</option>
                <option value="Sales">Sales</option>
                <option value="Accounts">Accounts</option>
                <option value="Customer Care">Customer Care</option>
                <option value="Services">Services</option>
                
              </Select>
              {errors.employeeRole && (
                <Text color="red.500">{errors.employeeRole.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Enter Number</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="number"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="number"
                id="number"
                {...register("number", {
                  required: "Mobile Number is required",
                  message: "invalid number",
                })}
              />
              {errors.number && (
                <Text color="red.500">{errors.number.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                isRequired
                control={control}
                name="address"
                id="address"
                {...register("address", {
                  required: "Address is required",
                  message: "invalid address",
                })}
              />
              {errors.address && (
                <Text color="red.500">{errors.address.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>
   */}
        {/* <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="city"
                id="city"
                {...register("city", {
                  required: "City Name is required",
                  message: "invalid city",
                })}
              />
              {errors.city && <Text color="red.500">{errors.city.message}</Text>}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Follow Up Date</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                isRequired
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="followUpDate"
                id="followUpDate"
                {...register("followUpDate", {
                  required: "followUpDate is required",
                  message: "invalid followUpDate",
                })}
              />
              {errors.date && <Text color="red.500">{errors.date.message}</Text>}
            </FormControl>
          </Box>
        </Stack> */}

        {/* <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Upload Electricity Bill</FormLabel>
              <Input
                marginTop={"0.5rem"}
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"center"}
                isRequired
                width={{ base: "250px", md: "400px" }}
                type="file"
                display="none"
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="electricity"
                id="electricity"
                {...register("electricity", {
                  // required: "Electricity Bill is required",
                  message: "invalid file",
                })}
              />
              <Button
                as="label"
                htmlFor="electricity"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Choose File
              </Button>
              {errors.electricity && (
                <Text color="red.500">{errors.electricity.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Upload Pan Card</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="file"
                display="none"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="pan"
                id="pan"
                {...register("pan", {
                  // required: "Pan Card is required",
                  message: "invalid File",
                })}
              />
              <Button
                as="label"
                htmlFor="pan"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Choose File
              </Button>
              {errors.pan && <Text color="red.500">{errors.pan.message}</Text>}
            </FormControl>
          </Box>
        </Stack> */}

        {/* <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Upload Aadhar Card</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="file"
                display="none"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                control={control}
                name="aadhar"
                id="aadhar"
                {...register("aadhar", {
                  // required: "Aadhar Card is required",
                  message: "invalid file",
                })}
              />
              <Button
                as="label"
                htmlFor="aadhar"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Choose File
              </Button>
              {errors.aadhar && (
                <Text color="red.500">{errors.aadhar.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Upload Tax Reciept</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="file"
                display="none"
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                // px={3}
                control={control}
                name="tax"
                id="tax"
                {...register("tax", {
                  // required: "Tax Reciept is required",
                  message: "invalid file",
                })}
              />
              <Button
                as="label"
                htmlFor="tax"
                cursor="pointer"
                marginTop={"0.5rem"}
                width={{ base: "250px", md: "400px" }}
                height={"30px"}
                border={"1px solid #707070"}
                px={2} // Padding on the x-axis
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Choose File
              </Button>
              {errors.tax && <Text color="red.500">{errors.tax.message}</Text>}
            </FormControl>
          </Box>
        </Stack> */}

        <Stack direction="column">
          <Box
            display="flex"
            alignItems="center "
            justifyContent="start"
            width="100%"
            py={1}
            mt={"1.5rem"}
            bgPosition="center"
            bgRepeat="no-repeat"
            mb={2}
          >
            <Button
              width={"8rem"}
              height={"2rem"}
              borderRadius={"15px"}
              background={"orange"}
              onClick={handleSubmit()}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default EmpViewForm