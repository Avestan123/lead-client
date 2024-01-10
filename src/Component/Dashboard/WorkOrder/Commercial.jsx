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
import axios from "axios";
import React, { useState,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"

const Commercial = () => {
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

  // submit handler
  const submitHandler = async (data) => {
    console.log(data);
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id");
    try {
      const response = await axios.post(
        `${apiUrl}/workOrder/addCommercialDetails/${client_id}`,
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
          title: "Commercial Details Added Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
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
  
  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  const handleInputChange = (e) => {
    console.log("called");
    const { name, value } = e.target;
    // Use the spread operator to clone the liasoningDetails object
    const updatedCommercial = { ...state.commercial };
     // Check if the dropdown value is "No" and reset specific fields to zero
  
     updatedCommercial[name] = value;
  
    //  console.log("Commercial:", updatedCommercial);
  
    // Update the amount in the products array
    console.log(name);
  // if (name.startsWith("amount")) {
  //   const updatedProducts = [...products];
  //   const amountValues = updatedProducts.map((product) =>
  //     parseFloat(product.productDetails.amount || 0)
  //   );
  //   const totalAmount = amountValues.reduce((acc, curr) => acc + curr, 0);
  //   console.log("Commercial:", updatedCommercial);

  //   // Update the "bill amount" in the commercial state
  //   // setValue("billAmount", totalAmount) ;
  //    setValue("billAmount", totalAmount);
    
  //   // Call the updateFormData function with the updated liasoningDetails and products
  //   updateFormData("commercial", updatedCommercial);
  //   setProducts(updatedProducts);
  // } else {
  //   // Call the updateFormData function with the updated liasoningDetails
  //   updateFormData("commercial", updatedCommercial);
  // }
  const indexMatch = name.match(/products\[(\d+)\]\.productDetails\.amount/);
  if (indexMatch) {
   
    const index = parseInt(indexMatch[1], 10);
    const updatedProducts = [...products];
    updatedProducts[index].productDetails.amount = value;

    // Calculate the total amount
    const totalAmount = updatedProducts.reduce(
      (acc, product) => acc + parseFloat(product.productDetails.amount || 0),
      0
    );
    console.log(totalAmount);

    // Update the "bill amount" in the commercial state
    // updatedCommercial.billAmount = totalAmount;
    // const gstBillAmount =(totalAmount +  (totalAmount*13.8/100)).toFixed(2);
    setValue("billAmount", totalAmount);

    // Call the updateFormData function with the updated liasoningDetails and products
    updateFormData("commercial", updatedCommercial);
    setProducts(updatedProducts);
  } else {
    // Call the updateFormData function with the updated liasoningDetails
    updateFormData("commercial", updatedCommercial);
  }
  };

    //manage state to persist data
    useEffect(() => {
      console.log("Context data:", state);
      const commercial = state.commercial;
      console.log(commercial);
    
      // Set values for non-array fields
      // setValue("billAmount", commercial.billAmount);
      setValue("meterCharges", commercial.meterCharges);
      setValue("otherCharges", commercial.otherCharges);
      setValue("totalCost", commercial.totalCost);
    
      // Set values for the 'products' array
      // if (commercial && Array.isArray(commercial.products) && commercial.products.length > 0) {
      //   commercial.products.forEach((product, index) => {
      //     if (product && product.productDetails) {
      //       Object.entries(product.productDetails).forEach(([key, value]) => {
      //         setValue(`products[${index}].productDetails.${key}`, value);
      //       });
      //     } else {
      //       console.error(`Invalid product structure at index ${index}`);
      //     }
      //   });
      // } else {
      //   console.error('Invalid or empty products array in commercial');
      // }
    }, [setValue, state]);
    
    
    

  // const handleAddProduct = () => {
  //   setProducts([
  //     ...products,
  //     {
  //       productDetails: {
  //         product: "",
  //         spvCapacity: "",
  //         unitPrice: "",
  //         amount: "",
  //         description: "",
  //       },
  //     },
  //   ]);
  // };
  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
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
  };

  
  

  return (
    <Box>
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="start"
        gap="5"
        mt={5}
      >
        {products.map((product, index) => (
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
                  <Select
                    placeholder="Select option"
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"40px"}
                    border={"1px solid #707070"}
                    control={control}
                    name={`product_${index}`}
                    // value={watch(`products[${index}].productDetails.product`)}
                    {...register(`products[${index}].productDetails.product`, {
                      required: "Product Role is required",
                      message: "invalid input",
                    })}
                    onChange={(e) => handleInputChange(e)} 
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Select>
                  {errors[`products[${index}].productDetails.product`] && (
                    <Text color="red.500">
                      {errors[`products[${index}].productDetails.product`].message}
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
                    // value={watch(`products[${index}].productDetails.spvCapacity`)}
                    name={`spvCapacity_${index}`}
                    {...register(`products[${index}].productDetails.spvCapacity`, {
                      required: "SPV Capacity is required",
                      message: "invalid input",
                    })}
                    onChange={(e) => handleInputChange(e)} 
                  />
                  {errors[`products[${index}].productDetails.spvCapacity`] && (
                    <Text color="red.500">{errors[`products[${index}].productDetails.spvCapacity`].message}</Text>
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
                    // value={watch(`products[${index}].productDetails.unitPrice`)}
                    {...register(`products[${index}].productDetails.unitPrice`, {
                      required: "Unit Price is required",
                      message: "invalid input",
                    })}
                    onChange={(e) => handleInputChange(e)} 
                  />
                  {errors[`products[${index}].productDetails.unitPrice`] && (
                    <Text color="red.500">{errors[`products[${index}].productDetails.unitPrice`].message}</Text>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="Amount"
                    marginTop={"0.2rem"}
                    type="number"
                    width={{ base: "120%", md: "400px" }}
                    height={"40px"}
                    border={"1px solid #707070"}
                    isRequired
                    control={control}
                    name={`amount_${index}`}
                    // value={watch(`products[${index}].productDetails.amount`)}
                    {...register(`products[${index}].productDetails.amount`, {
                      required: "amount is required",
                      message: "invalid input",
                    })}
                    onChange={(e) => handleInputChange(e)} 
                  />
                  {errors[`products[${index}].productDetails.amount`] && (
                    <Text color="red.500">{errors[`products[${index}].productDetails.amount`].message}</Text>
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
                    // value={watch(`products[${index}].productDetails.description`)}
                    {...register(`products[${index}].productDetails.description`, {
                      required: "description is required",
                      message: "invalid input",
                    })}
                    onChange={(e) => handleInputChange(e)} 
                  />
                  {errors[`products[${index}].productDetails.description`] && (
                    <Text color="red.500">{errors[`products[${index}].productDetails.description`].message}</Text>
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
          onClick={handleAddProduct}
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
                type="number"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="billAmount"
                {...register("billAmount", {
                  required: "Bill Amount is required",
                })}
                onChange={(e) => handleInputChange(e)} 
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
                type="number"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="meterCharges"
                {...register("meterCharges", {
                  required: "Meter Charges is required",
                  message: "Invalid Fields",
                })}
                onChange={(e) => handleInputChange(e)} 
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
                type="number"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="otherCharges"
                {...register("otherCharges", {
                  required: "Other Charges is required",
                  message: "Invalid Fields",
                })}
                onChange={(e) => handleInputChange(e)} 
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
                type="number"
                width={{ base: "120%", md: "400px" }}
                height={"40px"}
                border={"1px solid #707070"}
                control={control}
                name="totalCost"
                {...register("totalCost", {
                  required: "Total Cost is required",
                  message: "Invalid address",
                })}
                onChange={(e) => handleInputChange(e)} 
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
          onClick={handleSubmit(submitHandler)}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default Commercial;
