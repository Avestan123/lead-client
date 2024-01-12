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
  Switch,
  InputGroup,
  InputLeftAddon,
  Textarea,
  NumberInput,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";

function NewLeadsform() {
  const navigate = useNavigate();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);
  const [otherSource, setOtherSource] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [Getstate, setstate] = useState();

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

  //handleSourceChange
  const handleSourceChange = () => {
    if (data.source === "other") {
      setOtherSource(true);
    }
  };
  //for getting current date

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
    setValue("requirement", selectedValue);
  };

  // const clearRemarksField = () => {
  //   setValue('remarks', '');
  // };

  const onSubmit = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("clientName", data.clientName);
    formData.append("referredBy",data.referredBy);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("clientType", data.clientType);
    formData.append("requirement", data.requirement);
    formData.append("source", data.source);
    formData.append("sourceurl", data.sourceurl)
    formData.append("followUpDate", data.followUpDate);
    formData.append("quotation", data.quotation);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    let response = await fetch(`${apiUrl}/sales/addCustomer`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "multipart/form-data",
    });
    let Resdata = await response.json();
    if (Resdata.status === 200) {
      toast({
        title: "client Registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "center",
      });
      // resetForm(data);
      navigate("/newleads");
    } else {
      // resetForm(data);

      toast({
        title: Resdata.msg || "something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "center",
      });
    }
  };

 


  return (
    <>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        gap="5"
        mt="5"
      >

        {/* Name & Refeence */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>{toggle ? "Company" : "Client"} Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter name"
                control={control}
                name="clientName"
                id="clientName"
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
              <FormLabel>Referred By</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter reference person Name"
                control={control}
                name="referredBy"
                id="referredBy"
                {...register("referredBy", {
                })}
              />
              {errors.referredBy && (
                <Text color="red.500">{errors.referredBy.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

         {/* Name & Email */}
         <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          // alignItems="center"
          mx="1rem"
        >
          {/* <Box>
            <FormControl isRequired>
              <FormLabel>{toggle ? "Company" : "Client"} Name</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter name"
                control={control}
                name="clientName"
                id="clientName"
                {...register("clientName", {
                  required: "Client Name is required",
                  message: "invalid input",
                })}
              />
              {errors.clientName && (
                <Text color="red.500">{errors.clientName.message}</Text>
              )}
            </FormControl>
          </Box> */}
          <Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="email"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter email"
                control={control}
                name="email"
                id="email"
                {...register("email", {

                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                    message: "invalid email",
                  },
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <InputGroup>
                <InputLeftAddon marginTop={"0.5rem"} height={"50px"}>
                  +91
                </InputLeftAddon>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  width={{ base: "200px", md: "350px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter mobile"
                  isRequired
                  maxLength={10} // Change maxlength to maxLength and set it to 10
                  control={control}
                  name="number"
                  id="number"
                  {...register("number", {
                    required: "Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                      message: "Invalid number format",
                    },
                    validate: (value) => {
                      // validate if it is not an number
                      if (isNaN(value)) {
                        return "Invalid number format";
                      }
                    },
                  })}
                />
              </InputGroup>
              {errors.number && (
                <Text color="red.500">{errors.number.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

       

        {/*  MOBILE && Address*/}
        {/* <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <InputGroup>
                <InputLeftAddon marginTop={"0.5rem"} height={"50px"}>
                  +91
                </InputLeftAddon>
                <Input
                  marginTop={"0.5rem"}
                  type="text"
                  width={{ base: "200px", md: "350px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="Enter mobile"
                  isRequired
                  maxLength={10} // Change maxlength to maxLength and set it to 10
                  control={control}
                  name="number"
                  id="number"
                  {...register("number", {
                    required: "Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // Ensure exactly 10 digits
                      message: "Invalid number format",
                    },
                    validate: (value) => {
                      // validate if it is not an number
                      if (isNaN(value)) {
                        return "Invalid number format";
                      }
                    },
                  })}
                />
              </InputGroup>
              {errors.number && (
                <Text color="red.500">{errors.number.message}</Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Enter address"
                isRequired
                control={control}
                name="address"
                id="address"
                {...register("address", {
                  message: "invalid address",
                })}
              />
              {errors.address && (
                <Text color="red.500">{errors.address.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack> */}

       

        {/* state and city */}
        {/* <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel color={"#002A53"}>State</FormLabel>

              <Select
                onChange={(e) => {
                  setstate(e.target.value);
                }}
                value={Getstate}
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Select state"
                isRequired
                // {...register("state", {
                //   required: "state is required",
                // })}
                // name="state"
                // id="state"
              >
                {states.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.state && (
                <Text color="red.500">{errors.state.message}</Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl isRequired>
              <FormLabel color={"#002A53"}>City</FormLabel>
              <Select
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Select city"
                isRequired
                {...register("city", {
                  required: "city is required",
                })}
                name="city"
                id="city"
              >
                {cities.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errors.city && (
                <Text color="red.500">{errors.city.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack> */}

        {/* Client type & Requirement */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
           <Box>
            <FormControl>
              <FormLabel>Client Type</FormLabel>
              <Select
                placeholder="Select Client type"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                control={control}
                name="clientType"
                id="clientType"
                onChange={(e) => handleSelectChange(e.target.value)}
                value={watch("clientType")}
                {...register("clientType", {
                  message: "invalid input",
                })}
              >
                <option value="Project">Project</option>
                <option value="Staffing">Staffing</option>
              </Select>
              {errors.clientType && (
                <Text color="red.500">{errors.clientType.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Client Requirement</FormLabel>
              <Textarea
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                // height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter requirement"
                
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="requirement"
                id="requirement"
                {...register("requirement", {
                  
                  message: "invalid requirement",
                })}
              />
              {errors.requirement && (
                <Text color="red.500">{errors.requirement.message}</Text>
              )}
            </FormControl>
          </Box>
         
        </Stack>

 {/* ClientSource & url */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
           <Box>
            <FormControl >
              <FormLabel>Client Source</FormLabel>
              <Input
                marginTop={"0.5rem"}
                
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter source"
                control={control}
                name="source"
                id="source"
                {...register("source", {
                  
                  message: "invalid input",
                })}
              />
              {errors.source && (
                <Text color="red.500">{errors.source.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl >
              <FormLabel>Source URL</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="url"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter requirement"
                
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="sourceurl"
                id="sourceurl"
                {...register("sourceurl", {
                
                  message: "invalid sourceurl",
                })}
              />
              {errors.sourceurl && (
                <Text color="red.500">{errors.sourceurl.message}</Text>
              )}
            </FormControl>
          </Box>


         
        </Stack>

     

      

        {/* FOllowup Date */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Follow up Date</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="date" // Use type="text" instead of type="number"
                // pattern="[0-9]{6}" // Ensure exactly 6 digits
                min={today}
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="Enter Followup Date"
                control={control}
                name="followUpDate"
                id="followUpDate"
                {...register("followUpDate", {
                  required: "followUpDate Date is required",
                  message: "Invalid followUpDate date.",
                })}
              />
              {errors.followUpDate && (
                <Text color="red.500">{errors.followUpDate.message}</Text>
              )}
            </FormControl>
          </Box>

          {/* Quotation */}
          <Box>
            <FormControl>
              <FormLabel>Quotation Sent Status</FormLabel>
              <Select
                placeholder="is quotation sent?"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                control={control}
                name="quotation"
                id="quotation"
                onChange={(e) => handleSelectChange(e.target.value)}
                value={watch("quotation")}
                {...register("quotation", {
                  message: "invalid input",
                })}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.quotation && (
                <Text color="red.500">{errors.quotation.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Submit Buttons*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Button
            bg="orange"
            boxShadow="dark-lg"
            color="black"
            px="4"
            ms="2"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Stack>

        
      </Flex>
    </>
  );
}

export default NewLeadsform;
