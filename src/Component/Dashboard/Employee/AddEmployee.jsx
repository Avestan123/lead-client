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
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddEmployee() {
  const navigate = useNavigate();
  const toast = useToast();

  // reset form function
  function resetForm(data) {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
  }

 



  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("employeeName", data.employeeName);
    formData.append("email", data.email);
    formData.append("employeeId", data.employeeId);
    formData.append('employeePassword', data.employeePassword)
    formData.append("employeeRole", data.employeeRole)
    
    console.log(data);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem('token');
    let response = await fetch(`${apiUrl}/admin/addEmployee`, {
      method: "POST",
      body: formData,
      "Content-Type": "multipart/form-data",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    let Resdata = await response.json();
    console.log(Resdata);
    if (Resdata.status === 200) {
      toast({
        title: "Employeee Added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      resetForm(data);
      navigate("/newEmpoyee");
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
  };

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <>
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
                
                <option value="HR">HR</option>
                
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
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default AddEmployee;
