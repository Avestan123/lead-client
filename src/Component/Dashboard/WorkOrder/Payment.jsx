import React, { useState } from "react";
import axios from "axios";
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
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"
const Payment = () => {
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

  const toast = useToast();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  // state for product save
  const [payment, setPayment] = useState([
    {
      installment: "",
      projectCost: "",
      paymentMode: "",
      paymentDate: "",
      percentage: "",
    },
  ]);

  // handle input change
  const handleInputChange = (index, key, value) => {
    const updatedProducts = [...payment];
    updatedProducts[index][key] = value;
    setPayment(updatedProducts);
  };

  // add payment handler
  const handleAddInstallement = () => {
    setPayment([
      ...payment,
      {
        installment: "",
        projectCost: "",
        paymentMode: "",
        paymentDate: "",
        percentage: "",
      },
    ]);
  };

  const submitHandler = async (data) => {
    
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    console.log(data);
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/addPaymentDetails/${client_id}`,
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
          title: "Payment Details Added Successfully.",
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
      <Box>
        <Flex
          direction={{ base: "column" }}
          justify="center"
          align="start"
          gap="5"
          mt={5}
        >
          {payment.map((payment, index) => (
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
                    <Select
                      placeholder="Select option"
                      marginTop={"0.5rem"}
                      type="text"
                      width={{ base: "100%", md: "400px" }}
                      height={"40px"}
                      border={"1px solid #707070"}
                      control={control}
                      name="installment"
                      onChange={(e) =>
                        handleInputChange(index, "payment", e.target.value)
                      }
                      value={watch("installment")}
                      {...register("installment", {
                        required: " Installment is required",
                        message: "Invalid Input",
                      })}
                    >
                      <option value="Advance">Advance</option>
                      <option value="1st Installment">1st Installment</option>
                      <option value="2nd Installment">2nd Installment</option>
                      <option value="3rd Installment">3rd Installment</option>
                      <option value="final Installment">final Installment</option>
                    </Select>
                    {errors.installment && (
                      <Text color="red.500">{errors.installment.message}</Text>
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
                    />
                    {errors.projectCost && (
                      <Text color="red.500">{errors.projectCost.message}</Text>
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
                    />
                    {errors.paymentMode && (
                      <Text color="red.500">{errors.paymentMode.message}</Text>
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
                    />
                    {errors.paymentDate && (
                      <Text color="red.500">{errors.paymentDate.message}</Text>
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
      <Button
        backgroundColor={"#FF9130"}
        color={"#ffffff"}
        colorScheme="teal"
        ml={"15px"}
        mt={"30px"}
        onClick={handleAddInstallement}
      >
        <AddIcon />
        Add Payment
      </Button>

      <Center>
       {/* save payment */}
       <Button
        colorScheme="green"
        color={"#ffffff"}
        ml={"15px"}
        mt={"30px"}
        onClick={handleSubmit(submitHandler)}
        size="lg"
      >
        Save
      </Button>
    </Center>
    </Box>
   
  );
};

export default Payment;
