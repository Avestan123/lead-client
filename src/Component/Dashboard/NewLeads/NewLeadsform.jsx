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
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("altNumber", data.altNumber);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("followUpDate", data.followUpDate);
    formData.append("requirement", data.requirement);
    formData.append("remarks", data.remarks);
    formData.append("clientlevel", data.clientlevel);
    // formData.append("electricityBill", data.electricity[0]);
    // formData.append("pancard", data.pan[0]);
    // formData.append("adharcard", data.aadhar[0]);
    // formData.append("textRecipe", data.tax[0]);
    formData.append("state", Getstate);
    formData.append("contactPerson", data.contactPersonName);
    formData.append("gst", data.gstNumber);
    formData.append("source", data.source);
    formData.append("otherSource", data.otherSource);
    formData.append("dob", data.dob);

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
        position: "top",
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
        position: "top",
      });
    }
  };

  const saveAndTransfer = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("clientName", data.clientName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("altNumber", data.altNumber);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("followUpDate", data.followUpDate);
    formData.append("requirement", data.requirement);
    formData.append("remarks", data.remarks);
    formData.append("clientlevel", data.clientlevel);
    // formData.append("electricityBill", data.electricity[0]);
    // formData.append("pancard", data.pan[0]);
    // formData.append("adharcard", data.aadhar[0]);
    // formData.append("textRecipe", data.tax[0]);
    formData.append("state", Getstate);
    formData.append("contactPerson", data.contactPersonName);
    formData.append("gst", data.gstNumber);
    formData.append("source", data.source);
    formData.append("otherSource", data.otherSource);
    formData.append("dob", data.dob);

    const apiUrl = import.meta.env.VITE_APP_API_URL;
    try {
      let response = await fetch(`${apiUrl}/sales/saveAndTransfer`, {
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
          position: "top",
        });
        // resetForm(data);
        navigate("/newleads");
      } else {
        // resetForm(data);

        toast({
          title: Resdata.error || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      alert("Error during API call:", error);
    }
  };

  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", Getstate);

  return (
    <>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        gap="5"
        mt="5"
      >

        {/* Name & Email */}
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
            <FormControl isRequired>
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
                  required: "Email is required",

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
        </Stack>

       

        {/*  MOBILE && Address*/}
        <Stack
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
            <FormControl isRequired>
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

        {/* PIN and requirement */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
           <Box>
            <FormControl isRequired>
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
                name="requirement"
                id="requirement"
                onChange={(e) => handleSelectChange(e.target.value)}
                value={watch("requirement")}
                {...register("requirement", {
                  required: "Requirement Role is required",
                  message: "invalid input",
                })}


              >
                <option value="Project">Project</option>
                <option value="Staffing">Staffing</option>
              </Select>
              {errors.requirement && (
                <Text color="red.500">{errors.requirement.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Customer Requirement</FormLabel>
              <Textarea
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                // height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter requirement"
                isRequired
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="remarks"
                id="remarks"
                {...register("remarks", {
                  required: "remarks is required",
                  message: "invalid remarks",
                })}
              />
              {errors.remarks && (
                <Text color="red.500">{errors.remarks.message}</Text>
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

        {/* Documents */}
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
        </Stack>

        <Stack
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

        {/* <Stack direction="column">
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
              // width={"8rem"}
              // height={"2rem"}
              bg="orange"boxShadow='dark-lg'color="black" px="4" ms="2"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Stack> */}
      </Flex>
    </>
  );
}

export default NewLeadsform;
