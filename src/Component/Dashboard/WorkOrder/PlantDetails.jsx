import React, { useEffect } from "react";
import {
  Switch,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  Box,
  Button,
  ButtonGroup,
  Stack,
  useToast,
  Text,
  Select,
  Checkbox,
  CheckboxGroup,
  border,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"
const PlantDetails = () => {
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { state, updateFormData,clearFormData } = useWorkForm();
  // form
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    console.log("Context data:", state);
    const plantDetails = state.plantDetails;
    console.log(plantDetails);
    if(state.plantDetails){
      setValue("panelMake",state.plantDetails.panelMake);
      setValue("panelRemark",state.plantDetails.panelRemark);
      setValue("inverterMake",state.plantDetails.inverterMake)
      setValue("inverterRemark",state.plantDetails.inverterRemark)
      setValue("structureHeight",state.plantDetails.structureHeight)
      setValue("structureRemarks",state.plantDetails.structureRemarks)
      setValue("meterHeight",state.plantDetails.meterHeight)
      setValue("meterRemark",state.plantDetails.meterRemark)
      setValue("subsidy",state.plantDetails.subsidy)
    }
    
  },[setValue,state])

// toset data fromcontext
  useEffect(()=>{

  },[])

  const handleInputChange = (e) => {
    console.log(e.target.name,e.target.value); // Corrected console.log
    const { name, value } = e.target;
    updateFormData("plantDetails", { ...state.plantDetails, [name]: value });
  };

  const submitHandler = async (data) => {
    
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    console.log(data);
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/setPlantDetails/${client_id}`,
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
          title: "Plant Details Added Successfully.",
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
      {/* Form Started */}
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="start"
        gap="5"
        mt={5}
      >
        {/* Panel make and panel Remark*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Panel Make</FormLabel>
              <Input
                placeholder="Panel Make"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="panelMake"
                {...register("panelMake", {
                  required: "Panel Make is required",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.panelMake && (
                <Text color="red.500">{errors.panelMake.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>
                Panel Remarks{" "}
                <span style={{ fontWeight: "400" }}>(if Any)</span>
              </FormLabel>
              <Input
                placeholder="Panel Remarks"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                isRequired
                control={control}
                name="panelRemark"
                {...register("panelRemark", {
                  required: "Panel Remark is required",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.panelRemark && (
                <Text color="red.500">{errors.panelRemark.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/*  Inverter make and inverter remark*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Inverter Make</FormLabel>
              <Input
                placeholder="Inverter Make"
                marginTop={"0.2rem"}
                isRequired
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="inverterMake"
                {...register("inverterMake", {
                  required: "Inverter Make is required",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.inverterMake && (
                <Text color="red.500">{errors.inverterMake.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                Inverter Remarks{" "}
                <span style={{ fontWeight: "400" }}>(if Any)</span>
              </FormLabel>
              <Input
                placeholder="Inverter Remarks"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="inverterRemark"
                {...register("inverterRemark", {
                  required: "Inverter Remark is required",
                  message: "invalid field",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.inverterRemark && (
                <Text color="red.500">{errors.inverterRemark.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* structure height and structure emark */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel> Structure Height</FormLabel>
              <Input
                placeholder="Panel Make"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="structureHeight"
                {...register("structureHeight", {
                  required: "Structure Height is required",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.structureHeight && (
                <Text color="red.500">{errors.structureHeight.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                Structure Remarks{" "}
                <span style={{ fontWeight: "400" }}>(if Any)</span>
              </FormLabel>
              <Input
                placeholder="Panel Remarks"
                marginTop={"0.2rem"}
                type="email"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="structureRemarks"
                {...register("structureRemarks", {
                  required: "Structure Remarks is required",
                  message: "invalid address",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.structureRemarks && (
                <Text color="red.500">{errors.structureRemarks.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Meter Type and Meter Remark */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel> Meter type</FormLabel>
              <Input
                placeholder="Meter height"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="meterHeight"
                {...register("meterHeight", {
                  required: "Meter height is required",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.meterHeight && (
                <Text color="red.500">{errors.meterHeight.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>
                Meter Remark <span style={{ fontWeight: "400" }}>(if Any)</span>
              </FormLabel>
              <Input
                placeholder="Meter Remark"
                marginTop={"0.2rem"}
                type="email"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="meterRemark"
                {...register("meterRemark", {
                  required: "Meter Remark is required",
                  message: "invalid address",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.meterRemark && (
                <Text color="red.500">{errors.meterRemark.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* any Additional remark */}
        <Box mx="1rem" mt="1rem" width={"80%"}>
          <FormControl>
            <FormLabel>Subsidy</FormLabel>
            <Input
              placeholder="N/A"
              marginTop={"0.2rem"}
              type="text"
              width={{ base: "110%", md: "400px" }}
              height={"40px"}
              border={"1px solid #707070"}
              control={control}
              name="subsidy"
              {...register("subsidy", {
                required: "Subsidy is required",
                message: "invalid subsidy",
              })}
              onChange={(e) => handleInputChange(e)} 
            />
            {errors.subsidy && (
              <Text color="red.500">{errors.subsidy.message}</Text>
            )}
          </FormControl>
        </Box>
        {/* </Stack> */}
        {/* save button */}
        <Button
          backgroundColor={"#FF9130"}
          color={"#ffffff"}
          colorScheme="teal"
          ml={"15px"}
          mt={"10px"}
          onClick={handleSubmit(submitHandler)}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default PlantDetails;
