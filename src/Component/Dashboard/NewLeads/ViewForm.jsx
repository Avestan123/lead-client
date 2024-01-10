import { useState, useEffect } from "react";
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
  Checkbox,
  CheckboxGroup,
  Divider,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
function ViewForm() {
  const location = useLocation();
  const useData = location.state;
  const [showMoreFolowUp, setShowMoreFollowUp] = useState(false);
  const [followUps, setFollowUps] = useState([{}]);

  const addFollowUp = () => {
    setFollowUps([...followUps, {}]);
  };

  console.log("userData", useData);

  const { userData } = useUser();

  const isAdmin = userData?.userRole === "Admin";
  const isSales = userData?.userRole === "Sales";
  // console.log("isAdmin", isAdmin, "isSales", isSales);

  //add more followups and remarks
  const handleNewFollowups = () => {
    setFollowUps([...followUps, {}]);
    // setChecked(!isChecked);
    // Add your custom logic or event handling here
    // if (e.target.checked) {
    //   // Checkbox is checked, do something
    //   console.log("Checkbox is checked!");
    //   setShowMoreFollowUp(true)
    // } else {
    //   // Checkbox is unchecked, do something else
    //   console.log("Checkbox is unchecked!");
    //   setShowMoreFollowUp(false)
    // }
  };

  var customerId = useData._id;
  // console.log("customer id ", customerId);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // console.log("_id:", _id);
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
    setValue("requirement", selectedValue);
  };

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    // Set initial form values
    setValue("clientName", useData.clientName);
    setValue("email", useData.email);
    setValue("number", useData.number);
    setValue("dob", useData.dob);
    setValue("address", useData.address);
    setValue("city", useData.city);
    setValue("followUpDate", useData.followUpDate);
    setValue("requirement", useData.requirement);
    setValue("remarks", useData.remarks);
    setValue("clientlevel", useData.clientlevel);
    setValue("followUps", useData.followUps);
    setValue("electricityBill", useData.electricityBill);
    setValue("gstnumber", useData.gstnumber);
    setValue("contactperson", useData.contactperson);
    setValue("source",useData.source)
    setValue("sourceurl", useData.sourceurl)

    setFollowUps(useData.additionalFollowups || []);
    // additional followups
    if (useData.additionalFollowups) {
      console.log(useData.additionalFollowups);
      useData.additionalFollowups.forEach((followUp, index) => {
        console.log(
          `Setting value for followUpDate[${index}]:`,
          followUp.followUpDate
        );
        console.log(`Setting value for remarks[${index}]:`, followUp.remarks);
        setValue(`followUps[${index}].followUpDate`, followUp.followUpDate);
        setValue(`followUps[${index}].remarks`, followUp.remarks);
        // Set other values if needed
      });
      // setFollowUps(useData.additionalFollowups)
    }
  }, [useData, setValue]);

  //Update the details
  const updateCustomer = async (data) => {
    console.log("data for update", data);
    const token = localStorage.getItem("token");
    // const customerId = data._id;
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    // Create a new FormData instance
    const formData = new FormData();

    // Append fields to the formData
    console.log("update Customer Date", data);

    console.log("viewForm Daata", data);
    formData.append("clientName", data.clientName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("followUpDate", data.followUpDate);
    formData.append("requirement", data.requirement);
    formData.append("remarks", data.remarks);
    formData.append("source",data.source);
    formData.append("url", data.url)

    // Append file fields to the formData
    formData.append("electricityBill", data.electricityBill);
    formData.append("pancard", data.pancard);
    formData.append("adharcard", data.adharcard);
    formData.append("textRecipe", data.textRecipe);
   

    if (data.gstnumber) {
      formData.append("gstnumber", data.gstnumber);
    }
    if (data.contactperson) {
      formData.append("contactperson", data.contactperson);
    }
    console.log(data);
    if (data.followUps) {
      data.followUps.forEach((followUp, index) => {
        formData.append(
          `followUps[${index}].followUpDate`,
          followUp.followUpDate
        );
        formData.append(`followUps[${index}].remarks`, followUp.remarks);
      });
    }
    // Append follow-ups array to the formData
    formData.append("followUps", JSON.stringify(data.followUps));

    console.log(formData);
    try {
      // Make the fetch request
      console.log(customerId, data, formData);
      let response = await fetch(
        `${apiUrl}/sales/updateCustomerDetails/${customerId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      console.error("Update Data button Error", error);
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/sales/deleteCustomer`, {
        method: "POST",
        body: JSON.stringify({
          customerId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resdata = await response.json();
      if (resdata) {
        setLoading(false);
        toast({
          title: "Deleted sucessfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Deleting Customer",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // addd customer to ost lead
  const handleLostLead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/sales/setCustomerAsLost/${id}`, {
        method: "POST",
        body: JSON.stringify({
          customerId: id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const resdata = await response.json();
      if (resdata) {
        setLoading(false);
        toast({
          title: "Added to lost customers.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/newleads");
      }
    } catch (error) {
      alert("Error", error);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        mt="4"
      >
        {/* name and email */}
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
                height={"50px"}
                backgroundColor="gray.100"
                // border={"1px solid #707070"}
                contentEditable
                name="clientName"
                id="clientName"
                isDisabled={isAdmin ? false : true}
                color="dark"
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
                height={"50px"}
                border={"1px solid #707070"}
                // value = {data.email}
                backgroundColor="gray.100"
                name="email"
                id="email"
                isDisabled={isAdmin ? false : true}
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

       

        {/* dob and number */}
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
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                border={"1px solid #707070"}
                // value = {data.number}
                name="number"
                id="number"
                isDisabled={isAdmin ? false : true}
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
                height={"50px"}
                border={"1px solid #707070"}
                isRequired
                backgroundColor="gray.100"
                // value = {data.address}
                name="address"
                id="address"
                isDisabled={isAdmin ? false : true}
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

        {/* number and adddress*/}
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
                height={"50px"}
                border={"1px solid #707070"}
                backgroundColor="gray.100"
                // value = {data.number}
                name="number"
                id="number"
                isDisabled={isAdmin ? false : true}
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
                height={"50px"}
                border={"1px solid #707070"}
                isRequired
                backgroundColor="gray.100"
                // value = {data.address}
                name="address"
                id="address"
                isDisabled={isAdmin ? false : true}
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

      
        {/* Requirements & remarks */}
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
                placeholder="Select option"
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                control={control}
                backgroundColor="gray.100"
                name="requirement"
                id="requirement"
                isDisabled={isAdmin ? false : true}
                onChange={(e) => handleSelectChange(e.target.value)}
                // value={data.requirement}
                // value={watch('requirement')}
                {...register("requirement", {
                  required: "Requirement Role is required",
                  message: "invalid input",
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
              <FormLabel>Customer Requirement</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                // value = {data.remarks}
                backgroundColor="gray.100"
                name="city"
                id="city"
                placeholder="Enter remarks"
                isDisabled={isAdmin ? false : true}
                {...register("remarks", {
                  required: "Remarks are required for Project",
                })}
              />
              {errors.remarks && (
                <Text color="red.500">{errors.remarks.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

         {/* Source & Url */}
         <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl isRequired>
              <FormLabel>Client Source</FormLabel>
              <Input
                marginTop={"0.5rem"}
                isRequired
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter name"
                control={control}
                name="source"
                id="source"
                {...register("source", {
                  required: "source is required",
                  message: "invalid input",
                })}
              />
                
              {errors.requirement && (
                <Text color="red.500">{errors.requirement.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel>Source Url</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="url"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                backgroundColor="gray.100"
                placeholder="enter requirement"
                isRequired
                min={getCurrentDate()} // Set the minimum date
                control={control}
                name="sourceurl"
                id="sourceurl"
                {...register("sourceurl", {
                  required: "sourceurl is required",
                  message: "invalid sourceurl",
                })}
              />
              {errors.sourceurl && (
                <Text color="red.500">{errors.sourceurl.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* city and followupdate*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          
          <Box>
            <FormControl isRequired>
              <FormLabel>Follow Up Date</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                isRequired
                // value = {data.followUpDate}
                backgroundColor="gray.100"
                name="followUpDate"
                id="followUpDate"
                isDisabled={isAdmin ? false : true}
                {...register("followUpDate", {
                  required: "followUpDate is required",
                  message: "invalid followUpDate",
                })}
              />
              {errors.date && (
                <Text color="red.500">{errors.date.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>


        {/* divider */}
        <Center w="100%" mt="2">
          <Divider
            borderWidth="2px"
            colorScheme="red"
            orientation="horizontal"
          />
        </Center>

        {/* add new follow up */}
        <Stack
          mt="2rem"
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
        >
          <Box>
            {/* <Checkbox
              defaultChecked
              // isChecked={false}
              onChange={(e)=>handleCheckboxChange(e)}
            >
              Add new followup
            </Checkbox> */}
            {/* new followup */}
            <Box my="4">
              {followUps.map((followUp, index) => (
                <>
                  <Stack
                    key={index}
                    direction={{ base: "column", md: "row" }}
                    spacing={6}
                    alignItems="center"
                    mx="1rem"
                    mt="1rem"
                  >
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Next Follow Up Date</FormLabel>
                        <Input
                          marginTop={"0.5rem"}
                          type="date"
                          width={{ base: "250px", md: "400px" }}
                          height={"30px"}
                          border={"1px solid #707070"}
                          isRequired
                          name={`followUps[${index}].followUpDate`}
                          {...register(`followUps[${index}].followUpDate`, {
                            required: "Follow Up Date is required",
                            message: "invalid follow-up date",
                          })}
                        />
                        {errors.followUps && (
                          <Text color="red.500">
                            {errors.followUps[index]?.followUpDate?.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>New Remarks</FormLabel>
                        <Textarea
                          marginTop={"0.5rem"}
                          isRequired
                          type="text"
                          width={{ base: "100%", md: "400px" }}
                          height={"30px"}
                          border={"1px solid #707070"}
                          name={`followUps[${index}].remarks`}
                          placeholder="Enter new remarks"
                          {...register(`followUps[${index}].remarks`, {
                            required:
                              "New remarks are required for the follow-up",
                          })}
                        />
                        {errors.followUps && (
                          <Text color="red.500">
                            {errors.followUps[index]?.remarks?.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </>
              ))}
            </Box>
            <Center>
              <Button colorScheme="green" onClick={handleNewFollowups} mr={5}>
                Add more followups
              </Button>

             

              <Button
                colorScheme="red"
                onClick={() => handleLostLead(useData._id)}
                mr={5}
                mx="4"
              >
                Add to Lost Leads
              </Button>
            </Center>
          </Box>
        </Stack>

        {/* <Flex
          direction={{ base: "column", md: "row" }}
          gap="10"
          alignItems="center"
          justify="start"
          // mx="1rem"
          mt="1rem"
        >
          <Box
            w={{ base: "15rem", md: "25rem" }}
            bg="gray.300"
            p="0.5rem"
            borderRadius="15px"
          >
            <FormControl>
              <FormLabel>Electricity Bill</FormLabel>
              <Text>{useData.electricityBill}</Text>
            </FormControl>
          </Box>
          <Box
            w={{ base: "15rem", md: "25rem" }}
            bg="gray.300"
            p="0.5rem"
            borderRadius="15px"
          >
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
        </Flex> */}

        {/* <Flex
          direction={{ base: "column", md: "row" }}
          gap="10"
          alignItems="center"
          justify="start"
          mx="1rem"
          mt="2rem"
        >
          <Box
            w={{ base: "15rem", md: "25rem" }}
            bg="gray.300"
            p="0.5rem"
            borderRadius="15px"
          >
            <FormControl>
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
          <Box
            w={{ base: "15rem", md: "25rem" }}
            bg="gray.300"
            p="0.5rem"
            borderRadius="15px"
          >
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
        </Flex> */}

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: "0.2rem", md: "1rem" }}
        >
          <Box
            display="flex"
            width="100%"
            py={{ base: "2", md: "12" }}
            mt={"1.5rem"}
            bgPosition="center"
            // bgRepeat="no-repeat"
            mb={{ base: "0", md: "2" }}
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
          {isAdmin && (
            <Box
              display="flex"
              width="100%"
              py={{ base: "2", md: "12" }}
              mt={{ base: "0rem", md: "1.6rem" }}
              bgPosition="center"
              // bgRepeat="no-repeat"
              mb={{ base: "0", md: "2" }}
            >
              <Button
                width={"8rem"}
                height={"2.5rem"}
                borderRadius={"15px"}
                background={"red"}
                onClick={() => handleDelete(useData._id)}
              >
                Delete
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default ViewForm;
