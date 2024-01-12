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
import PopUpModal from "./PopUpModal"
function ViewForm() {
  const location = useLocation();
  const useData = location.state;
  const [showMoreFolowUp, setShowMoreFollowUp] = useState(false);
  const [followUps, setFollowUps] = useState([{}]);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);

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

  //handle followup delete
  const handleDeleteFollowup = () => {
    setOTPModalOpen(true);
    // prompt("Are you sure want to delete?")
  }

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
    setValue("referredBy", useData.referredBy);
    setValue("email", useData.email);
    setValue("number", useData.number);
    setValue("clientType", useData.clientType);
    setValue("requirement", useData.requirement);
    setValue("source", useData.source);
    setValue("sourceurl", useData.sourceurl);
    setValue("followUpDate", useData.followUpDate);
    setValue("followUps", useData.followUps);
    setValue("quotation", useData.quotation);

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
    formData.append("referredBy",data.referredBy);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("clientType", data.clientType);
    formData.append("requirement", data.requirement);
    formData.append("source", data.source);
    formData.append("sourceurl", data.sourceurl)
    formData.append("followUpDate", data.followUpDate);
    formData.append("quotation", data.quotation);
    // Append file fields to the formData
 
    console.log(data);
    if (data.followUps) {
      data.followUps.forEach((followUp, index) => {
        formData.append(
          `followUps[${index}].followUpDate`,
          followUp.followUpDate
        );
        formData.append(`followUps[${index}].remarks`, followUp.remarks);
      });
    }else{
      return alert("add more followups")
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
        resetForm(data);
        navigate("/newleads");
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
        {/* name and referred */}
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
              <FormLabel>Referred By</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="email"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                // value = {data.email}
                backgroundColor="gray.100"
                name="referredBy"
                id="referredBy"
                isDisabled={isAdmin ? false : true}
                {...register("referredBy", {
                  // required: "referredBy is required",
                  message: "invalid referredBy",
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>
        
        {/* emain and mobile */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
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
                
                  message: "invalid email",
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                marginTop={"0.5rem"}
                
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
                  message: "invalid number",
                })}
              />
              {errors.number && (
                <Text color="red.500">{errors.number.message}</Text>
              )}
            </FormControl>
          </Box>
        </Stack>

        {/* Client type  & requirement */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl >
              <FormLabel>Client Type</FormLabel>
              <Select
                placeholder="Select option"
                marginTop={"0.5rem"}
                
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                control={control}
                backgroundColor="gray.100"
                name="clientType"
                id="clientType"
                isDisabled={isAdmin ? false : true}
                onChange={(e) => handleSelectChange(e.target.value)}
                {...register("clientType", {
                  message: "invalid input",
                })}
              >
                 <option value="Project">Project</option>
                <option value="Freelance">Freelance</option>
                <option value="IT Staffing">IT Staffing</option>
                <option value="Non IT Staffing">Non IT Staffing</option>
              </Select>
              {errors.clientType && (
                <Text color="red.500">{errors.clientType.message}</Text>
              )}
            </FormControl>
          </Box>
          <Box>
            <FormControl >
              <FormLabel>Customer Requirement</FormLabel>
              <Input
                marginTop={"0.5rem"}
                
                type="text"
                width={{ base: "100%", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                // value = {data.remarks}
                backgroundColor="gray.100"
                name="requirement"
                id="requirement"
                placeholder="Enter requirement"
                isDisabled={isAdmin ? false : true}
                {...register("requirement", {
                  
                })}
              />
              {errors.requirement && (
                <Text color="red.500">{errors.requirement.message}</Text>
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
            <FormControl >
              <FormLabel>Client Source</FormLabel>
              <Input
                marginTop={"0.5rem"}
                
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
            <FormControl >
              <FormLabel>Source Url</FormLabel>
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

        {/*followupdate & Quotation*/}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          mx="1rem"
          mt="1rem"
        >
          <Box>
            <FormControl >
              <FormLabel>Follow Up Date</FormLabel>
              <Input
                marginTop={"0.5rem"}
                type="date"
                width={{ base: "250px", md: "400px" }}
                height={"50px"}
                border={"1px solid #707070"}
                
                // value = {data.followUpDate}
                backgroundColor="gray.100"
                name="followUpDate"
                id="followUpDate"
                isDisabled={isAdmin ? false : true}
                {...register("followUpDate", {
                 
                  message: "invalid followUpDate",
                })}
              />
              {errors.date && (
                <Text color="red.500">{errors.date.message}</Text>
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
                      <FormControl >
                        <FormLabel>Next Follow Up Date</FormLabel>
                        <Input
                          marginTop={"0.5rem"}
                          type="date"
                          width={{ base: "250px", md: "400px" }}
                          height={"30px"}
                          border={"1px solid #707070"}
                          
                          name={`followUps[${index}].followUpDate`}
                          {...register(`followUps[${index}].followUpDate`, {
                           
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
                      <FormControl >
                        <FormLabel>New Remarks</FormLabel>
                        <Textarea
                          marginTop={"0.5rem"}
                          
                          type="text"
                          width={{ base: "100%", md: "400px" }}
                          height={"30px"}
                          border={"1px solid #707070"}
                          name={`followUps[${index}].remarks`}
                          placeholder="Enter new remarks"
                          {...register(`followUps[${index}].remarks`, {
                           
                          })}
                        />
                        {errors.followUps && (
                          <Text color="red.500">
                            {errors.followUps[index]?.remarks?.message}
                          </Text>
                        )}
                      </FormControl>
                    </Box>
                    {/* <Button colorScheme="red" size="sm" alignSelf="center" onClick={handleDeleteFollowup}>Delete</Button> */}
                  </Stack>
                </>
              ))}
            </Box>
            <Center>
              <Button colorScheme="green" onClick={handleNewFollowups} mr={5} >
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
      <PopUpModal
            isOpen={isOTPModalOpen}
            onClose={() =>

            setOTPModalOpen(false)

            }
            // handleDelete={handleVerifyOTP}
          />
    </>
  );
}

export default ViewForm;
