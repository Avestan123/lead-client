import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Button,
  Stack,
  Text,
  Select,
  useToast
} from "@chakra-ui/react";
import { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"
const LiasoningDetails = () => {
  const toast = useToast();
  const { state, updateFormData,clearFormData } = useWorkForm();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  //  flag for showing and hiding fields
  const watchRequirement = watch("requirement") === "Yes" ? true : false;
  const watchLoad = watch("load") === "Yes" ? true : false;
  const watchMeter = watch("meter") === "Yes" ? true : false;

  // const handleInputChange = (e) => {
  //   console.log(e.target.name,e.target.value); // Corrected console.log
  //   const { name, value } = e.target;
  //   updateFormData("liasoningDetails", { ...state.liasoningDetails, [name]: value });
  // };

  const handleInputChange = (e) => {
    console.log("called");
    const { name, value } = e.target;
    console.log("Context data:", state,name, value);
    // Use the spread operator to clone the liasoningDetails object
    const updatedLiasoningDetails = { ...state.liasoningDetails };
     // Check if the dropdown value is "No" and reset specific fields to zero
  if (name === 'requirement' && value === 'No') {
    updatedLiasoningDetails.existingName = "";
    updatedLiasoningDetails.newName = "";
    updatedLiasoningDetails[name] = value;
    // Repeat this for other fields that need to be reset
  } else if(name === 'load' && value === 'No'){
    // Update only the specific field
    updatedLiasoningDetails.existingLoad = "";
    updatedLiasoningDetails.newLoad = "";
    updatedLiasoningDetails[name] = value;
   
  }else if(name === 'meter' && value === 'No'){ 
    updatedLiasoningDetails.existingMeterType = "";
    updatedLiasoningDetails.newMeterType = "";
    updatedLiasoningDetails[name] = value;
  }else{
    updatedLiasoningDetails[name] = value;
  }
  
    // Update only the specific field
    // updatedLiasoningDetails[name] = value;
  
    // Call the updateFormData function with the updated liasoningDetails
    updateFormData("liasoningDetails", updatedLiasoningDetails);
  };
  

  //manage state to persist data
  useEffect(()=>{
    console.log("Context data:", state);
    const liasoningDetails = state.liasoningDetails;
    console.log(liasoningDetails);
    setValue("requirement",state.liasoningDetails.requirement);
    setValue("existingName",state.liasoningDetails.existingName);
    setValue("newName",state.liasoningDetails.newName)
    setValue("load",state.liasoningDetails.load)
    setValue("existingLoad",state.liasoningDetails.existingLoad)
    setValue("newLoad",state.liasoningDetails.newLoad)
    setValue("meter",state.liasoningDetails.meter)
    setValue("existingMeterType",state.liasoningDetails.existingMeterType)
    setValue("newMeterType",state.liasoningDetails.newMeterType)

  },[setValue])
  const submitHandler = async (data) => {
    // Your form submission logic goes here
    console.log("data:", data);
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    console.log(data);
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/setLiasoningDetails/${client_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Move Content-Type inside headers
          },
        }
      );
      console.log(response);
      if (response?.data?.status === 200) {
        toast({
          title: "liasoning Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // resetForm(data);
        // navigate("/login");
        // clientID saving in local storage
        // const client_id = response.data?.newclientInfo?._id;
        // localStorage.setItem("client_id", client_id);
      } else {
        // resetForm(data);
  
        toast({
          title: response?.data?.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="start"
        gap="5"
        mt={1}
      >
        <Stack direction={{ base: "column", md: "row" }} spacing={6} mx="1rem">
          <Box>
            <FormControl>
              <FormLabel>Requirement</FormLabel>
              <Select
                placeholder="Select Options"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                name="requirement"
                value={watch("requirement")}
                {...register("requirement", {
                  required: "Requirement is required",
                  message: "Invalid Input",
                })}
                onChange={(e) => {
                  setValue('requirement', e.target.value);
                  console.log(e.target.value);
                  handleInputChange(e);
                }}
                
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.requirement && (
                <Text color="red.500">{errors.requirement.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {watchRequirement && (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            mx="1rem"
          >
            <Box>
              <FormControl isRequired>
                <FormLabel>Existing Name</FormLabel>
                <Input
                  placeholder="Existing Name"
                  marginTop={"0.2rem"}
                  isRequired
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="existingName"
                  {...register("existingName", {
                    required: "Existing Name is required",
                    message: "Invalid Input",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.existingName && (
                  <Text color="red.500">{errors.existingName.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>New Name</FormLabel>
                <Input
                  placeholder="New Name"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="newName"
                  {...register("newName", {
                    required: "New Name is required",
                    message: "Invalid Input",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.newName && (
                  <Text color="red.500">{errors.newName.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}

        <Stack direction={{ base: "column", md: "row" }} spacing={6} mx="1rem">
          <Box>
            <FormControl>
              <FormLabel>Change of Load Extension</FormLabel>
              <Select
                placeholder="Select option"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="load"
                value={watch("load")}
                {...register("load", {
                  required: "Load Extension is required",
                  message: "Invalid Input",
                })}
                onChange={(e) => {
                  setValue('load', e.target.value);
                  handleInputChange(e);
                }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.load && (
                <Text color="red.500">{errors.load.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {watchLoad && (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            mx="1rem"
          >
            <Box>
              <FormControl isRequired>
                <FormLabel>Existing Load</FormLabel>
                <Input
                  placeholder="Existing Load"
                  marginTop={"0.2rem"}
                  isRequired
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="existingLoad"
                  {...register("existingLoad", {
                    required: "Existing Load is required",
                    message: "Invalid Input",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.existingLoad && (
                  <Text color="red.500">{errors.existingLoad.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>New Load</FormLabel>
                <Input
                  placeholder="New Load"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="newLoad"
                  {...register("newLoad", {
                    required: "New Load is required",
                    message: "Invalid Input",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.newLoad && (
                  <Text color="red.500">{errors.newLoad.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}

        <Stack direction={{ base: "column", md: "row" }} spacing={6} mx="1rem">
          <Box>
            <FormControl>
              <FormLabel>Change In Meter</FormLabel>
              <Select
                placeholder="Select option"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="meter"
                value= {watch("meter")}
                {...register("meter", {
                  required: "Change in Meter is required",
                  message: "Invalid Input",
                })}
                onChange={(e) => {
                  setValue('meter', e.target.value);
                  handleInputChange(e);
                }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
              {errors.meter && (
                <Text color="red.500">{errors.meter.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {watchMeter && (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            mx="1rem"
          >
            <Box>
              <FormControl>
                <FormLabel>Existing Meter Type</FormLabel>
                <Input
                  placeholder="Existing Meter Type"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="existingMeterType"
                  {...register("existingMeterType", {
                    required: "Existing Meter Type is required",
                    message: "Invalid Input",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.existingMeterType && (
                  <Text color="red.500">
                    {errors.existingMeterType.message}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>New Meter Type</FormLabel>
                <Input
                  placeholder="New Meter Type"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="newMeterType"
                  {...register("newMeterType", {
                    required: "New Meter Type is required",
                    message: "Invalid Input",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.newMeterType && (
                  <Text color="red.500">{errors.newMeterType.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}
      </Flex>

      <Button
        backgroundColor={"#FF9130"}
        color={"#ffffff"}
        colorScheme="teal"
        ml={"15px"}
        mt={"20px"}
        onClick={handleSubmit(submitHandler)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default LiasoningDetails;
