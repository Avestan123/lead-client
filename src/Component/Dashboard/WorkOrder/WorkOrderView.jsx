import React, { useState, useEffect } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  Center,
} from "@chakra-ui/react";

import { green } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
const apiUrl = import.meta.env.VITE_APP_API_URL;
// import { useLocation } from "react-router-dom";
import  {useWorkForm}  from "../../context/WorkOrderFormContext.jsx"

function WorkOrderView() {
  const location = useLocation();
  const workOrderData = location.state;

  const useData = location.state;
  const { updateFormData } = useWorkForm();
  // console.log("useData", useData)
    console.log(workOrderData);
  const [allData, setAllData] = useState();
  const [clientData, setClientData] = useState()
  const [plantData, setPlantData] = useState();
  //   console.log(plantData,'plantData');
  const [commercial, setCommercial] = useState();
  console.log(commercial, "commercial");

  const [commercialTotal, setCommercialTotal] = useState();
  console.log(commercialTotal, "commercialTotal");
  const [liasoning, setLiasoning] = useState();
  const [payments, setPayments] = useState([]);
  console.log(payments, "ine 50 payments");
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

  useEffect(() => {
    console.log("WorkOrder data:", workOrderData);
    const clientInformationData = workOrderData.clientInformation;
    console.log(clientInformationData);
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
    //plant details page
    setValue("panelMake", plantData?.panelMake);
    setValue("panelRemark", plantData?.panelRemarks);
    setValue("inverterMake", plantData?.inverterMake);
    setValue("inverterRemark", plantData?.inverterRemarks);
    setValue("structureHeight", plantData?.structureHeight);
    setValue("structureRemarks", plantData?.structureRemark);
    setValue("meterHeight", plantData?.meterHeight);
    setValue("meterRemark", plantData?.meterRemark);
    setValue("subsidy", plantData?.subsidy);
    //liasoning data
    setValue("existingName", liasoning?.existingName);
    setValue("newName", liasoning?.newName);
    setValue("existingLoad", liasoning?.existingLoad);
    setValue("newLoad", liasoning?.newLoad);
    setValue("existingMeterType", liasoning?.existingMeterType);
    setValue("newMeterType", liasoning?.newMeterType);
    //for commercial
    // setValue("product", commercial[0].productDetails[0]?.product);
    // setValue("spvCapacity", commercial[0].productDetails[0].spvCapacity);
    // setValue(`products[${index}].productDetails.spvCapacity`, commercial[0].productDetails[0].spvCapacity);
    // console.log(commercialTotal[0].billAmt)
    // setValue("billAmount", commercialTotal[0].billAmt);
    // setValue("meterCharges", commercialTotal[0].meterCharges);
    // setValue("otherCharges", commercialTotal[0].otherCharges);
    // setValue("totalCost", commercialTotal[0].totalCost);
    // payment details
    // setValue("installment",payments[0].installment)
    // setValue("paymentDate",payments[0].paymentDate)
    // setValue("paymentMode",payments[0].paymentMode)
    // setValue("projectCost",payments[0].projectCost)
  }, [clientData,setValue, plantData, liasoning, workOrderData]);

  const fetchClientOrderDetails = async () => {
    const token = localStorage.getItem("token");

    const customerId = workOrderData._id;
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

      setAllData(Resdata.orders.documents[0]);
      console.log(allData, "allData");
      setClientData(Resdata.orders.clientInfo[0])
      setPlantData(Resdata.orders.plantDetails[0]);
      setLiasoning(Resdata.orders.liasoningDetails[0]);
      setCommercial(Resdata.orders.commercialDetails[0]);
      setCommercialTotal(Resdata.orders.commercialDetails[1]);
      setPayments(Resdata.orders.paymentsDetails[0]);

      console.log("Playments from WorkOrderView ", payments);
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

  // api calling 2 times

  useEffect(() => {
    fetchClientOrderDetails();
    console.log("Fetchclient ordered Called");
  }, [setAllData]);


  const saveData = () => {
    console.log("log called");
     updateFormData("clientInformation", clientData);
  }
  // useEffect(() => {
  //   if (useData) {
  //     // Assuming useData.step contains the step name and useData.data contains the data
  //     updateFormData("clientInformation", clientData);
  //   }
  // }, [useData]);

  //liasoning Page  flag for showing and hiding fields
  const watchRequirement = watch("requirement") === "Yes" ? true : false;
  const watchLoad = watch("load") === "Yes" ? true : false;
  const watchMeter = watch("meter") === "Yes" ? true : false;

  // for products page
  const [products, setProducts] = useState([
    {
      productDetails: {
        product: "",
        spvCapacity: "",
        unitPrice: "",
        amount: "",
        description: "",
      },
    },
  ]);

  // for payment page
  const [payment, setPayment] = useState([
    {
      installment: "",
      projectCost: "",
      paymentMode: "",
      paymentDate: "",
      percentage: "",
    },
  ]);

  return (
    <>
      <Tabs isLazy>
        <TabList>
          <Tab>CLIENT INFORMATION</Tab>
          <Tab>DOCUMENTS</Tab>
          <Tab>PLANT DETAILS</Tab>
          <Tab>LIASONING DETAILS</Tab>
          <Tab>COMMERCIAL</Tab>
          <Tab>PAYMENT</Tab>
        </TabList>

        <TabPanels>
          {/* <ClientInformation Page/> */}
          <TabPanel>
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
                      <FormLabel>
                        {toggle ? "Company" : "Client"} Name
                      </FormLabel>
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
                          required: `${
                            toggle ? "Company" : "Client"
                          } Name is required`,
                          message: "Invalid Inputs",
                        })}
                        // onChange={(e) => handleInputChange(e)}
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
                        // onChange={(e) => handleInputChange(e)}
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
                        // onChange={(e) => handleInputChange(e)}
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
                        // onChange={(e) => handleInputChange(e)}
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
                          //   onChange={(e) => handleInputChange(e)}
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
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.gstNumber && (
                          <Text color="red.500">
                            {errors.gstNumber.message}
                          </Text>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.billingUnitNumber && (
                        <Text color="red.500">
                          {errors.billingUnitNumber.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Consumer Number</FormLabel>
                      <Input
                        placeholder="Consumer Number"
                        marginTop={"0.2rem"}
                        type="number"
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
                        // onChange={(e) => handleInputChange(e)}
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
                        <Text color="red.500">
                          {errors.clientBookBy.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                </Stack>

                {/* Display installation service */}
                <Text fontSize={17} color={"#808080"}>
                  DISPATCH/INSTALLATION/SERVICE
                </Text>

                {/* check box */}
                {/* <Checkbox
                  color="green.800"
                  // value={watch("sameAsAbove")}
                  {...register("sameAsAbove")}
                >
                  Same as Above
                </Checkbox> */}

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
                        <Text color="red.500">
                          {errors.deliveryAdd.message}
                        </Text>
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
                        <Text color="red.500">
                          {errors.contactNumber.message}
                        </Text>
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
                      //   onChange={(e) => handleInputChange(e)}
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
                    // onClick={handleSubmit(saveData)}
                  onClick={saveData}
                >
                  Save
                </Button>
              </Flex>
            </Box>
          </TabPanel>

          {/* <Documents Page/> */}
          <TabPanel>
            <Box gap={50} mt={8}>
              {/* <form onSubmit={handleSubmit(submitForm)}> */}
              {/* Photo and aadhar Card */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="1rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Photo</FormLabel>
                    {/* Remove the file input */}
                    {/* <Input
    marginTop={"0.5rem"}
    alignItems={"center"}
    textAlign={"center"}
    justifyContent={"center"}
    width={{ base: "250px", md: "400px" }}
    type="file"
    display="none"
    height={"40px"}
    border={"1px solid #707070"}
    control={control}
    name="photo"
    id="photo"
    {...register("photo", {
      required: "Photo is required",
      message: "invalid file",
    })}
  /> */}
                    {/* Display the image preview */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.photo}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* <Button
    as="label"
    htmlFor="photo"
    cursor="pointer"
    marginTop={"0.5rem"}
    width={{ base: "250px", md: "400px" }}
    height={"40px"}
    border={"1px solid #707070"}
    px={2} // Padding on the x-axis
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    Choose Photo
  </Button> */}
                    {errors.photo && (
                      <Text color="red.500">{errors.photo.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel> Aadhar Card</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      // control={control}
                      name="aadhar"
                      id="aadhar"
                      {...register("aadhar", {
                        required: "aadhar photo  is required",
                        message: "invalid File",
                      })}
                      //   onChange={(e) => handleFileChange("aadhar", e)} // Make sure "aadhar" is the correct inputName
                    /> */}
                    {/* <Button
                      as="label"
                      htmlFor="aadhar"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose Adhaar
                    </Button> */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.adharcard}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* {selectedFiles.aadhar && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.aadhar.name}
                </Text>
                <Image
                  src={selectedFiles.aadhar.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.aadhar && (
                      <Text color="red.500">{errors.aadhar.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* pan and electricity bill */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="2rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Pan Card</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      isRequired
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      // control={control}
                      name="pan"
                      id="pan"
                      {...register("pan", {
                        required: "Pan card photo is required",
                        message: "invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("pan", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="pan"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.pancard}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* {selectedFiles.pan && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.pan.name}
                </Text>
                <Image
                  src={selectedFiles.pan.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.pan && (
                      <Text color="red.500">{errors.pan.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel> Electricity Bill</FormLabel>
                    {/* <Input
                      type="file"
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      isRequired
                      width={{ base: "250px", md: "400px" }}
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="electricity"
                      id="electricity"
                      {...register("electricity", {
                        required: "Electricity bill is required",
                        message: "Invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("electricity", e)} // Make sure "electricity" is the correct inputName
                    />
                    <Button
                      as="label"
                      htmlFor="electricity"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.electricitybill}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* {selectedFiles.electricity && (
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.electricity.name}
                </Text>
                <Image
                  src={selectedFiles.electricity.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.electricity && (
                      <Text color="red.500">{errors.electricity.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* Tax receipt and power of attorney */}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="2rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel> Tax Receipt</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      // isRequired
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="tax"
                      id="tax" // Add an id to match the htmlFor in the label
                      {...register("tax", {
                        required: "Tax Receipt photo is required",
                        message: "Invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("tax", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="tax" // Match the id of the file input
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.taxreceipt}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* {selectedFiles.tax && (
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.tax.name}
                </Text>
                <Image
                  src={selectedFiles.tax.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.tax && (
                      <Text color="red.500">{errors.tax.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Power of Attorney</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="attorney"
                      id="attorney" // Add an id to match the htmlFor in the label
                      {...register("attorney", {
                        required: "Power of Attorney Photo is required",
                        message: "Invalid File",
                      })}
                      //   onChange={(e) => handleFileChange("attorney", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="attorney" // Match the id of the file input
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    {/* {selectedFiles.attorney && (
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.attorney.name}
                </Text>
                <Image
                  src={selectedFiles.attorney.preview}
                  alt="Preview"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.powerofattorney}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {errors.attorney && (
                      <Text color="red.500">{errors.attorney.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* Annexure-2 and Applicatin Form*/}
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={50}
                alignItems="center"
                mx="1rem"
                mt="2rem"
              >
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Annexure-2</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      alignItems={"center"}
                      textAlign={"center"}
                      justifyContent={"center"}
                      width={{ base: "250px", md: "400px" }}
                      type="file"
                      display="none"
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="annexure"
                      id="annexure"
                      {...register("annexure", {
                        required: "Annexure photo is required",
                        message: "invalid file",
                      })}
                      //   onChange={(e) => handleFileChange("annexure", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="annexure"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.annexure2}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* {selectedFiles.annexure && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.annexure.name}
                </Text>
                <Image
                  src={selectedFiles.annexure.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.annexure && (
                      <Text color="red.500">{errors.annexure.message}</Text>
                    )}
                  </FormControl>
                </Box>
                <Box
                  width={{ base: "250px", md: "400px" }}
                  height={"100px"}
                  mt="10"
                  p="5"
                >
                  <FormControl>
                    <FormLabel>Application Form (A-1 Form)</FormLabel>
                    {/* <Input
                      marginTop={"0.5rem"}
                      type="file"
                      display="none"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="application"
                      id="application"
                      {...register("application", {
                        required: "Application form photo is required",
                        message: "invalid File",
                      })}
                      //   onChange={(e) => handleFileChange("application", e)}
                    />
                    <Button
                      as="label"
                      htmlFor="application"
                      cursor="pointer"
                      marginTop={"0.5rem"}
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      px={2} // Padding on the x-axis
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Choose File
                    </Button> */}
                    <img
                      name="photo"
                      id="photo"
                      width={{ base: "250px", md: "400px" }}
                      height={"40px"}
                      src={`${apiUrl}/uploads/${allData?.applicationform}`}
                      alt="Photo Preview"
                      style={{
                        width: "150px", // Set the width as needed
                        height: "150px", // Set the height as needed
                        borderRadius: "15px", // Set the border radius as needed
                      }}
                    />
                    {/* {selectedFiles.application && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.application.name}
                </Text>
                <Image
                  src={selectedFiles.application.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )} */}
                    {errors.application && (
                      <Text color="red.500">{errors.application.message}</Text>
                    )}
                  </FormControl>
                </Box>
              </Stack>

              {/* save button */}
              {/* <Button
                backgroundColor={"#FF9130"}
                color={"#ffffff"}
                colorScheme="teal"
                ml={"15px"}
                mt={"150px"}
                // onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button> */}
            </Box>
          </TabPanel>

          {/* <PlantDetails Page/> */}
          <TabPanel>
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
                        //
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
                        // onChange={(e) => handleInputChange(e)}
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.panelRemark && (
                        <Text color="red.500">
                          {errors.panelRemark.message}
                        </Text>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.inverterMake && (
                        <Text color="red.500">
                          {errors.inverterMake.message}
                        </Text>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.inverterRemark && (
                        <Text color="red.500">
                          {errors.inverterRemark.message}
                        </Text>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.structureHeight && (
                        <Text color="red.500">
                          {errors.structureHeight.message}
                        </Text>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.structureRemarks && (
                        <Text color="red.500">
                          {errors.structureRemarks.message}
                        </Text>
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
                      <FormLabel> Meter height</FormLabel>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.meterHeight && (
                        <Text color="red.500">
                          {errors.meterHeight.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>
                        Meter Remark{" "}
                        <span style={{ fontWeight: "400" }}>(if Any)</span>
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
                        // onChange={(e) => handleInputChange(e)}
                      />
                      {errors.meterRemark && (
                        <Text color="red.500">
                          {errors.meterRemark.message}
                        </Text>
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
                      //   onChange={(e) => handleInputChange(e)}
                    />
                    {errors.subsidy && (
                      <Text color="red.500">{errors.subsidy.message}</Text>
                    )}
                  </FormControl>
                </Box>
                {/* </Stack> */}
                {/* save button */}
                {/* <Button
                  backgroundColor={"#FF9130"}
                  color={"#ffffff"}
                  colorScheme="teal"
                  ml={"15px"}
                  mt={"10px"}
                  //   onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </Button> */}
              </Flex>
            </Box>
          </TabPanel>

          {/* <LiasoningDetails Page/> */}
          <TabPanel>
            <Box>
              <Flex
                direction={{ base: "column" }}
                justify="center"
                align="start"
                gap="5"
                mt={1}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  mx="1rem"
                >
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

                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.existingName && (
                          <Text color="red.500">
                            {errors.existingName.message}
                          </Text>
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
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.newName && (
                          <Text color="red.500">{errors.newName.message}</Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  mx="1rem"
                >
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
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.existingLoad && (
                          <Text color="red.500">
                            {errors.existingLoad.message}
                          </Text>
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
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.newLoad && (
                          <Text color="red.500">{errors.newLoad.message}</Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  mx="1rem"
                >
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
                          //   onChange={(e) => handleInputChange(e)}
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
                          //   onChange={(e) => handleInputChange(e)}
                        />
                        {errors.newMeterType && (
                          <Text color="red.500">
                            {errors.newMeterType.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>
              </Flex>

              <Button
                backgroundColor={"#FF9130"}
                color={"#ffffff"}
                colorScheme="teal"
                ml={"15px"}
                mt={"20px"}
                // onClick={handleSubmit(submitHandler)}
              >
                Submit
              </Button>
            </Box>
          </TabPanel>

          {/* <Commercial Page/> */}
          <TabPanel>
            <Box>
              <Flex
                direction={{ base: "column" }}
                justify="center"
                align="start"
                gap="5"
                mt={5}
              >
                {commercial &&
                  commercial.map((product, index) => (
                    <Box key={index}>
                      <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={6}
                        alignItems="center"
                        mx="1rem"
                      >
                        <Box>
                          <FormControl>
                            <FormLabel>Product</FormLabel>
                            {/* <Text>{product.productDetails[0].product}</Text> */}
                            <Input
                              type="text"
                              value={product.productDetails[0].product}
                              readOnly
                              width={{ base: "120%", md: "400px" }}
                              height={"40px"}
                              border={"1px solid #707070"}
                            />
                            {errors[
                              `products[${index}].productDetails.product`
                            ] && (
                              <Text color="red.500">
                                {
                                  errors[
                                    `products[${index}].productDetails.product`
                                  ].message
                                }
                              </Text>
                            )}
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl>
                            <FormLabel>SPV Capacity</FormLabel>
                            <Input
                              marginTop={"0.2rem"}
                              placeholder="Type"
                              type="text"
                              width={{ base: "120%", md: "400px" }}
                              height={"40px"}
                              border={"1px solid #707070"}
                              control={control}
                              // value={watch(
                              //   `products[${index}].productDetails.spvCapacity`
                              // )}
                              value={product.productDetails[0].spvCapacity}
                              name={`spvCapacity_${index}`}
                              {...register(
                                `products[${index}].productDetails.spvCapacity`,
                                {
                                  required: "SPV Capacity is required",
                                  message: "invalid input",
                                }
                              )}
                              // onChange={(e) => handleInputChange(e)}
                            />
                            {errors[
                              `products[${index}].productDetails.spvCapacity`
                            ] && (
                              <Text color="red.500">
                                {
                                  errors[
                                    `products[${index}].productDetails.spvCapacity`
                                  ].message
                                }
                              </Text>
                            )}
                          </FormControl>
                        </Box>
                      </Stack>

                      <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={6}
                        alignItems="center"
                        mx="1rem"
                        // mt="1rem"
                      >
                        <Box>
                          <FormControl>
                            <FormLabel>Unit Price</FormLabel>
                            <Input
                              placeholder="Type"
                              marginTop={"0.2rem"}
                              type="text"
                              width={{ base: "120%", md: "400px" }}
                              height={"40px"}
                              border={"1px solid #707070"}
                              control={control}
                              name={`unitPrice_${index}`}
                              // value={watch(
                              //   `products[${index}].productDetails.unitPrice`
                              // )}
                              value={product.productDetails[0].unitPrice}
                              {...register(
                                `products[${index}].productDetails.unitPrice`,
                                {
                                  required: "Unit Price is required",
                                  message: "invalid input",
                                }
                              )}
                              // onChange={(e) => handleInputChange(e)}
                            />
                            {errors[
                              `products[${index}].productDetails.unitPrice`
                            ] && (
                              <Text color="red.500">
                                {
                                  errors[
                                    `products[${index}].productDetails.unitPrice`
                                  ].message
                                }
                              </Text>
                            )}
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl isRequired>
                            <FormLabel>Amount</FormLabel>
                            <Input
                              placeholder="Amount"
                              marginTop={"0.2rem"}
                              type="text"
                              width={{ base: "120%", md: "400px" }}
                              height={"40px"}
                              border={"1px solid #707070"}
                              isRequired
                              control={control}
                              name={`amount_${index}`}
                              // value={watch(
                              //   `products[${index}].productDetails.amount`
                              // )}
                              value={product.productDetails[0].amount}
                              unitPrice
                              {...register(
                                `products[${index}].productDetails.amount`,
                                {
                                  required: "amount is required",
                                  message: "invalid input",
                                }
                              )}
                              // onChange={(e) => handleInputChange(e)}
                            />
                            {errors[
                              `products[${index}].productDetails.amount`
                            ] && (
                              <Text color="red.500">
                                {
                                  errors[
                                    `products[${index}].productDetails.amount`
                                  ].message
                                }
                              </Text>
                            )}
                          </FormControl>
                        </Box>
                      </Stack>

                      <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={6}
                        alignItems="center"
                        mx={{ base: "1rem", md: "0" }}
                        width="100%"
                        ml={{ base: "0px", md: "15px" }}
                      >
                        <Box width="71%">
                          <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input
                              placeholder="Description"
                              marginTop="0.2rem"
                              type="text"
                              width="100%" // Use 100% width for full width
                              height="100px"
                              border="1px solid #707070"
                              name={`description_${index}`}
                              // value={watch(
                              //   `products[${index}].productDetails.description`
                              // )}
                              value={product.productDetails[0].description}
                              {...register(
                                `products[${index}].productDetails.description`,
                                {
                                  required: "description is required",
                                  message: "invalid input",
                                }
                              )}
                              // onChange={(e) => handleInputChange(e)}
                            />
                            {errors[
                              `products[${index}].productDetails.description`
                            ] && (
                              <Text color="red.500">
                                {
                                  errors[
                                    `products[${index}].productDetails.description`
                                  ].message
                                }
                              </Text>
                            )}
                          </FormControl>
                        </Box>
                      </Stack>
                      <hr
                        style={{
                          marginTop: "20px",
                          height: "1px",
                          border: "none",
                          backgroundColor: "black",
                        }}
                      />
                    </Box>
                  ))}

                {/* Add Product Button */}
                <Button
                  backgroundColor={"#FF9130"}
                  color={"#ffffff"}
                  colorScheme="teal"
                  ml={"15px"}
                  //   onClick={handleAddProduct}
                >
                  <AddIcon />
                  Add Product
                </Button>

                {/* bill amount and meter Charges */}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  // mt="1rem"
                >
                  <Box>
                    <FormControl isRequired>
                      <FormLabel>A) Bill Amount</FormLabel>
                      <Input
                        placeholder="Xxxxxxxx"
                        marginTop={"0.2rem"}
                        isRequired
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="billAmount"
                        {...register("billAmount", {
                          required: "Bill Amount is required",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                    <Text color={"#FF9130"} fontWeight={"500"}>
                      (GST 18%)
                    </Text>
                    {errors.billAmount && (
                      <Text color="red.500">{errors.billAmount.message}</Text>
                    )}
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>B) Meter Charges</FormLabel>
                      <Input
                        placeholder="Meter Charges"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="meterCharges"
                        {...register("meterCharges", {
                          required: "Meter Charges is required",
                          message: "Invalid Fields",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                    <Text color={"#FF9130"} fontWeight={"500"}>
                      (GST 18%)
                    </Text>
                    {errors.meterCharges && (
                      <Text color="red.500">{errors.meterCharges.message}</Text>
                    )}
                  </Box>
                </Stack>

                {/*Other Charges and total project Cost (A+B)  */}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  alignItems="center"
                  mx="1rem"
                  // mt="1rem"
                >
                  <Box>
                    <FormControl>
                      <FormLabel>Other Charges</FormLabel>
                      <Input
                        placeholder="Xxxxxxxx"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="otherCharges"
                        {...register("otherCharges", {
                          required: "Other Charges is required",
                          message: "Invalid Fields",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                    <Text color={"#FF9130"} fontWeight={"500"}>
                      (Xxxx)
                    </Text>
                    {errors.otherCharges && (
                      <Text color="red.500">{errors.otherCharges.message}</Text>
                    )}
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Total Project Cost (A+B)</FormLabel>
                      <Input
                        placeholder="Total Project Cost"
                        marginTop={"0.2rem"}
                        type="text"
                        width={{ base: "120%", md: "400px" }}
                        height={"40px"}
                        border={"1px solid #707070"}
                        control={control}
                        name="totalCost"
                        {...register("totalCost", {
                          required: "Total Cost is required",
                          message: "Invalid address",
                        })}
                        // onChange={(e) => handleInputChange(e)}
                      />
                    </FormControl>
                    <Text color={"#FF9130"} fontWeight={"500"}>
                      (GST 18%)
                    </Text>
                    {errors.totalCost && (
                      <Text color="red.500">{errors.totalCost.message}</Text>
                    )}
                  </Box>
                </Stack>

                {/* save button */}
                <Button
                  backgroundColor={"#FF9130"}
                  color={"#ffffff"}
                  colorScheme="teal"
                  ml={"15px"}
                  mt={"10px"}
                  //   onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </Button>
              </Flex>
            </Box>
          </TabPanel>

          {/* <Payment Page /> */}
          <TabPanel>
            <Box>
              <Box>
                <Flex
                  direction={{ base: "column" }}
                  justify="center"
                  align="start"
                  gap="5"
                  mt={5}
                >
                  {payment &&
                    payment.map((payment, index) => (
                      <Box key={index}>
                        {/* installment and project Cost */}
                        <Stack
                          direction={{ base: "column", md: "row" }}
                          spacing={6}
                          alignItems="center"
                          mx="1rem"
                        >
                          <Box>
                            <FormControl>
                              <FormLabel>Installment</FormLabel>
                              {/* <Select
                              placeholder="Select option"
                              marginTop={"0.5rem"}
                              type="text"
                              width={{ base: "100%", md: "400px" }}
                              height={"40px"}
                              border={"1px solid #707070"}
                              control={control}
                              name="installment"
                              //   onChange={(e) =>
                              // handleInputChange(index, "payment", e.target.value)
                              //   }
                              // value={watch("installment")}
                              {...register("installment", {
                                required: " Installment is required",
                                message: "Invalid Input",
                              })}
                            >
                              <option value="Advance">Advance</option>
                              <option value="1st Installment">
                                1st Installment
                              </option>
                              <option value="2nd Installment">
                                2nd Installment
                              </option>
                              <option value="3rd Installment">
                                3rd Installment
                              </option>
                              <option value="final Installment">
                                final Installment
                              </option>
                            </Select> */}
                              <Input
                                type="text"
                                value={payments?.installment}
                                readOnly
                                // Add other props and styles as needed
                              />
                              {errors.installment && (
                                <Text color="red.500">
                                  {errors.installment.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl>
                              <FormLabel>Project Cost</FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                placeholder="Project Cost"
                                type="text"
                                width={{ base: "120%", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                control={control}
                                name="projectCost"
                                {...register("projectCost", {
                                  required: "Project Cost is required",
                                  message: "Invalid Input",
                                })}
                                value={payments?.projectCost}
                              />
                              {errors.projectCost && (
                                <Text color="red.500">
                                  {errors.projectCost.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                        </Stack>

                        {/* payment mode */}
                        <Stack
                          direction={{ base: "column", md: "row" }}
                          spacing={6}
                          alignItems="center"
                          mx="1rem"
                          mt="1rem"
                        >
                          <Box width="50%">
                            <FormControl>
                              <FormLabel>Payment Mode </FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                placeholder="Payment Mode"
                                type="text"
                                width={{ base: "120%", md: "100%" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                name="paymentMode"
                                {...register("paymentMode", {
                                  required: "Payment Mode is required",
                                  message: "Invalid Input",
                                })}
                                value={payments?.paymentMode}
                              />
                              {errors.paymentMode && (
                                <Text color="red.500">
                                  {errors.paymentMode.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                          <Box width="50%">
                            <FormControl>
                              <FormLabel>Payment Date</FormLabel>
                              <Input
                                marginTop={"0.2rem"}
                                type="date"
                                width={{ base: "250px", md: "400px" }}
                                height={"40px"}
                                border={"1px solid #707070"}
                                // min={getCurrentDate()} // Set the minimum date
                                // control={control}
                                name="paymentDate"
                                {...register("paymentDate", {
                                  required: "Payment Date is required",
                                  message: "Invalid Inputs",
                                })}
                                value={payments?.paymentDate}
                              />
                              {errors.paymentDate && (
                                <Text color="red.500">
                                  {errors.paymentDate.message}
                                </Text>
                              )}
                            </FormControl>
                          </Box>
                          {/* <Box width="10%">
                  <FormControl>
                    <FormLabel>Percentage</FormLabel>
                    <Input
                      marginTop={"0.2rem"}
                      placeholder="%"
                      type="text"
                      width={{ base: "120%", md: "100%" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      name="percentage"
                      {...register("percentage", {
                        required: "Percentage is Required",
                        message: "Invalid Input",
                      })}
                    />
                  </FormControl>
                </Box> */}
                        </Stack>

                        <hr
                          style={{
                            marginTop: "20px",
                            height: "1px",
                            border: "none",
                            backgroundColor: "black",
                          }}
                        />
                      </Box>
                    ))}
                </Flex>
              </Box>

              {/* Add Installement button */}
              {/* <Button
                backgroundColor={"#FF9130"}
                color={"#ffffff"}
                colorScheme="teal"
                ml={"15px"}
                mt={"30px"}
                // onClick={handleAddInstallement}
              >
                <AddIcon />
                Add Payment
              </Button> */}

              <Center>
                {/* save payment */}
                {/* <Button
                  colorScheme="green"
                  color={"#ffffff"}
                  ml={"15px"}
                  mt={"30px"}
                  // onClick={handleSubmit(submitHandler)}
                  size="lg"
                >
                  Save
                </Button> */}
              </Center>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default WorkOrderView;
