import React, { useState, useEffect } from "react";
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
import { green } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"

const ClientInformation = () => {
  const { state, updateFormData,clearFormData } = useWorkForm();
  const [clientData, setClientData] = useState()
  const [allData, setAllData] = useState();
  const location = useLocation();
  const customerData = location.state;
  console.log(customerData);

 

  const handleInputChange = (e) => {
    console.log(e.target.name,e.target.value); // Corrected console.log
    const { name, value } = e.target;
    updateFormData("clientInformation", { ...state.clientInformation, [name]: value });
  };
  
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
  const navigate = useNavigate();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // customer id from
  // // logic to set value of client name to contact Person Name
  // const watchSameAsAbove = watch("sameAsAbove");
  // const clientNameValue = watch("clientName");
  // const consumerNumberValue = watch("consumerNumber");
  // const billingAddressValue = watch("billingAdd");


  // useEffect(() => {
  //   const clientInformationData = state.clientInformation;
  //   if (watchSameAsAbove) {
  //     setValue("contactPersonNameInst", clientNameValue);
  //     setValue("contactNumber", consumerNumberValue);
  //     setValue("deliveryAdd", billingAddressValue);
     
  //   // Update context with the new values when sameAsAbove is true
  //   updateFormData("clientInformation", {
  //     ...clientInformationData, // Preserve other fields
  //     contactPersonNameInst: clientNameValue,
  //     contactNumber: consumerNumberValue,
  //     deliveryAdd: billingAddressValue,
  //   })
  // }}, [watchSameAsAbove,setValue]);

  useEffect(()=>{
    setValue("clientName", clientData?.clientName);
    setValue("category", clientData?.category);
    setValue("billingAdd", clientData?.billingAdd);
    setValue("billingUnitNumber", clientData?.billingUnitNumber);
    setValue("emailID", clientData?.emailID);
    setValue("consumerNumber", clientData?.consumerNumber);
    setValue("clientBookBy", clientData?.clientBookBy);
    setValue("deliveryAdd", clientData?.deliveryAdd);
    setValue("contactNumber", clientData?.contactNumber);
    setValue("contactPersonNameInst", clientData?.contactPersonNameInst);
    setValue("transportationDetails", clientData?.transportationDetails);
    setValue("anyAddRemark", clientData?.anyAddRemark);
  },[clientData,setValue])




  const fetchClientOrderDetails = async () => {
    const token = localStorage.getItem("token");

    const customerId = customerData._id;
   
    try {
      let response = await fetch(
        `${apiUrl}/workOrder/get_client_work_details/${customerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let Resdata = await response.json();
      console.log("WorkOrderViewData ", Resdata);

      // setAllData(Resdata.orders.documents[0]);
      // console.log(allData, "allData");
      localStorage .setItem("client_id", Resdata.orders.clientInfo[0]._id)
      setClientData(Resdata.orders.clientInfo[0])
      // setPlantData(Resdata.orders.plantDetails[0]);
      // setLiasoning(Resdata.orders.liasoningDetails[0]);
      // setCommercial(Resdata.orders.commercialDetails[0]);
      // setCommercialTotal(Resdata.orders.commercialDetails[1]);
      // setPayments(Resdata.orders.paymentsDetails[0]);

      // console.log("Playments from WorkOrderView ", payments);
      if (Resdata.status === 200) {
        toast({
          title: "Customer Information fetched",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
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
        title: "Error fetching other information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };


  useEffect(() => {
    fetchClientOrderDetails();
    console.log("Fetchclient ordered Called");
  }, [setAllData]);
  // watchSameAsAbove ? setValue("contactPersonName")
  const submitHandler = async (data) => {
    const token = localStorage.getItem("token");
    console.log(data);
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/setClientInfo`,
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
          title: "Client Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        // resetForm(data);
        // navigate("/login");
        // clientID saving in local storage
        const client_id = response.data?.newclientInfo?._id;
        localStorage.setItem("client_id", client_id);
      } else {
        resetForm(data);
  
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
  

  // reset form function
  const resetForm = (data) => {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, "");
    });
  };

  return (
    <Box>
      {/* <h1>Client Information</h1> */}
      {/* <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Filling for {toggle ? "company" : "client"}
        </FormLabel>
        <Switch
          id="email-alerts"
          checked={toggle}
          onChange={() => {
            setToggle(!toggle);
          }}
        />
      </FormControl> */}

      {/* Form Started */}
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="start"
        gap="5"
        mt={5}
      >
        {/* client name and Category */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>{toggle ? "Company" : "Client"} Name</FormLabel>
              <Input
                marginTop={"0.2rem"}
                placeholder={toggle ? "Company Name" : "Client Name"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="clientName"
                id="clientName"
                {...register("clientName", {
                  required: `${toggle ? "Company" : "Client"} Name is required`,
                  message: "Invalid Inputs",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {/* {errors[toggle ? "companyName" : "clientName"] && (
                <Text color="red.500">
                  {errors[toggle ? "companyName" : "clientName"].message}
                </Text>
              )} */}
              {errors.clientName && (
                <Text color="red.500">{errors.clientName.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Category"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                // control={control}
                name="category"
                
                // value={watch("category")}
                {...register("category", {
                  required: "Category is required",
                  message: "invalid input",
                })}
                onChange={(e) => handleInputChange(e)} 
              >
                <option value="Project">Project</option>
                <option value="Retail">Retail</option>
              </Select>
              {errors.category && (
                <Text color="red.500">{errors.category.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Billing Address and Email ID */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Billing Address</FormLabel>
              <Input
                placeholder="Billing Address"
                marginTop={"0.2rem"}
                isRequired
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="billingAdd"
                id="billingAdd"
                {...register("billingAdd", {
                  required: "Billing Address is required",
                  message: "Invalid Inputs",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.billingAdd && (
                <Text color="red.500">{errors.billingAdd.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Email Id</FormLabel>
              <Input
                placeholder="Email Id"
                marginTop={"0.2rem"}
                type="email"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="emailID"
                
                {...register("emailID", {
                  required: "Email is required",
                  message: "invalid address",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.emailID && (
                <Text color="red.500">{errors.emailID.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* contact person name and gst number */}
        {toggle && (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"
          >
            <Box>
              <FormControl>
                <FormLabel>Contact Person Name</FormLabel>
                <Input
                  placeholder="Contact Person Name"
                  marginTop={"0.2rem"}
                  type="text"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="contactPersonName"
                  
                  {...register("contactPersonName", {
                    required: "GST Number is required",
                    message: "invalid address",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.contactPersonName && (
                  <Text color="red.500">
                    {errors.contactPersonName.message}
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>GST Number</FormLabel>
                <Input
                  placeholder="GST Number"
                  marginTop={"0.2rem"}
                  type="Number"
                  width={{ base: "120%", md: "400px" }}
                  height={"40px"}
                  border={"1px solid #707070"}
                  control={control}
                  name="gstNumber"
                  
                  {...register("gstNumber", {
                    required: "GST Number is required",
                    message: "invalid address",
                  })}
                  onChange={(e) => handleInputChange(e)} 
                />
                {errors.gstNumber && (
                  <Text color="red.500">{errors.gstNumber.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>
        )}

        {/* Billing Unit and Consumer number */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Billing Unit Number</FormLabel>
              <Input
                placeholder="Billing Unit Number"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="billingUnitNumber"
               
                {...register("billingUnitNumber", {
                  required: "Billing Unit Number is required",
                  message: "invalid Field",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.billingUnitNumber && (
                <Text color="red.500">{errors.billingUnitNumber.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Consumer Number</FormLabel>
              <Input
                placeholder="Consumer Number"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="consumerNumber"
               
                {...register("consumerNumber", {
                  required: "Consumer Number is required",
                  pattern: {
                    value: /^[0-9]{10,}$/, // Ensure at least 10 digits
                    message: "Invalid number format",
                  },
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.consumerNumber && (
                <Text color="red.500">
                  {errors.consumerNumber.message}
                </Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Client Book By */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Client Book By</FormLabel>
              <Input
                placeholder="Client Book By"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="clientBookBy"
                
                {...register("clientBookBy", {
                  required: "Client Book By is required",
                  message: "invalid field",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.clientBookBy && (
                <Text color="red.500">{errors.clientBookBy.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Display installation service */}
        <Text fontSize={17} color={"#808080"}>
          DISPATCH/INSTALLATION/SERVICE
        </Text>

        {/* check box */}
        <Checkbox
          color="green.800"
          // value={watch("sameAsAbove")}
          {...register("sameAsAbove")}
        >
          Same as Above
        </Checkbox>

        {/* Delivery Address and Contact Number */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Delivery Address</FormLabel>
              <Input
                placeholder="Delivery Address"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="deliveryAdd"
                id-="deiveryAdd"
                
                {...register("deliveryAdd", {
                  required: "Delivery Address is required",
                  message: "invalid city",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.deliveryAdd && (
                <Text color="red.500">{errors.deliveryAdd.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                placeholder="Contact Number"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="contactNumber"
               id="contactNumber"
                {...register("contactNumber", {
                  required: "Contact Number is required",
                  message: "invalid Field",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.contactNumber && (
                <Text color="red.500">{errors.contactNumber.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Contact Person and Transportation details */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl>
              <FormLabel>Contact Person Name</FormLabel>
              <Input
                placeholder="Contact Person Name"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                // name="contactPerson"
                name="contactPersonNameInst"
                
                {...register("contactPersonNameInst", {
                  required: "Contact Person Name is required",
                  message: "invalid Fields",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.contactPersonNameInst && (
                <Text color="red.500">
                  {errors.contactPersonNameInst.message}
                </Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Transportation Detail</FormLabel>
              <Input
                placeholder="Transportation Detail"
                marginTop={"0.2rem"}
                type="text"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="transportationDetails"
              
                {...register("transportationDetails", {
                  required: "Transporatation Details is required",
                  message: "invalid Fields",
                })}
                onChange={(e) => handleInputChange(e)} 
              />
              {errors.transportationDetails && (
                <Text color="red.500">
                  {errors.transportationDetails.message}
                </Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Any Additional Details */}
        {/* <Stack
            // direction={{ base: "column", md: "row" }}
            // spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"
            
          > */}
        <Box mx="1rem" mt="1rem" width={"80%"}>
          <FormControl>
            <FormLabel>Any Additional Remark:</FormLabel>
            <Input
              placeholder="N/A"
              marginTop={"0.2rem"}
              type="text"
              width={{ base: "110%", md: "400px" }}
              height={"40px"}
              border={"1px solid #707070"}
              control={control}
              name="anyAddRemark"
              
              {...register("anyAddRemark", {
                required: "Any Additional Remark is required",
                message: "invalid city",
              })}
              onChange={(e) => handleInputChange(e)} 
            />
            {errors.anyAddRemark && (
              <Text color="red.500">{errors.anyAddRemark.message}</Text>
            )}
          </FormControl>
        </Box>
        {/* </Stack> */}

        {/* save payment */}
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

export default ClientInformation;
