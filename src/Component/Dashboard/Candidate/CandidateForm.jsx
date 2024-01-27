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
//   import Select from 'react-select';
  
  function CandidateForm() {
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
      formData.append("cName", data.cName);
      formData.append("candidateSource",data.candidateSource);
      formData.append("email", data.email);
      formData.append("number", data.number);
      formData.append("education", data.education);
      formData.append("skills", data.skills);
      formData.append("currCtc", data.currCtc);
      formData.append("expCtc", data.expCtc)
      formData.append("notice", data.notice);
      formData.append("relocate", data.relocate);
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      let response = await fetch(`${apiUrl}/candidates/addCandidate`, {
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
          title: "candidate added.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        // resetForm(data);
        navigate("/candidateTable");
      } else {
        // resetForm(data);
  
        toast({
          title: Resdata.msg || "something wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
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
                <FormLabel>Candidate Name</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  isRequired
                  type="text"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="enter name"
                  control={control}
                  name="cName"
                  id="cName"
                  {...register("cName", {
                    required: "Candidate Name is required",
                    message: "invalid input",
                  })}
                />
                {errors.cName && (
                  <Text color="red.500">{errors.cName.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Candidate Source</FormLabel>
                <Select
                  placeholder="Select candidate source"
                  marginTop={"0.5rem"}
                  isRequired
                  type="text"
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="candidateSource"
                  id="candidateSource"
                  onChange={(e) => handleSelectChange(e.target.value)}
                  value={watch("candidateSource")}
                  {...register("candidateSource", {
                    message: "invalid input",
                  })}
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Nokari">Nokari</option>
                  <option value="Indeed">Indeed</option>
                  <option value="Other">Other</option>
                </Select>
                {errors.candidateSource && (
                  <Text color="red.500">{errors.candidateSource.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>

          {/* EMail & Mobile */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            // alignItems="center"
            mx="1rem"
          >
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

          {/* Qualification & Stack */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
            mt="1rem"
          >
            <Box>
              <FormControl>
                <FormLabel>Education</FormLabel>
                <Select
                  placeholder="Select Education"
                  marginTop={"0.5rem"}
                  isRequired
                  type="text"
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="education"
                  id="education"
                  onChange={(e) => handleSelectChange(e.target.value)}
                  value={watch("education")}
                  {...register("education", {
                    message: "invalid input",
                  })}
                >
                  <option value="Post-Graduate">Post-Graduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Diploma">Diploma</option>
                </Select>
                {errors.education && (
                  <Text color="red.500">{errors.education.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Skills</FormLabel>
                <Select
                  placeholder="Select Skills"
                  marginTop={"0.5rem"}
                  type="text"
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="skills"
                  id="skills"
                  onChange={(e) => handleSelectChange(e.target.value)}
                  value={watch("skills")}
                  {...register("skills", {
                    message: "invalid input",
                  })}
                >
                  <option value="MERN">MERN</option>
                  <option value="JAVA">JAVA</option>
                  <option value="DotNet">DotNet</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Python">Python</option>
                  <option value="React">React</option>
                  <option value="Angular">Angular</option>
                  <option value="Node.js">Node.js</option>
                  <option value="SQL">SQL</option>
                  <option value="Django">Django</option>
                  <option value="Vue.js">Vue.js</option>
                </Select>
                {errors.skills && (
                  <Text color="red.500">{errors.skills.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>

          {/* Current CTC & Expectations  */}

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
          >
            <Box>
              <FormControl>
                <FormLabel>Current CTC</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  isRequired
                  type="number"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="enter current CTC"
                  control={control}
                  name="currCtc"
                  id="currCtc"
                  {...register("currCtc", {
                    message: "invalid input",
                  })}
                />
                {errors.currCtc && (
                  <Text color="red.500">{errors.currCtc.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Expected CTC</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  isRequired
                  type="number"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="enter expected CTC"
                  control={control}
                  name="expCtc"
                  id="expCtc"
                  {...register("expCtc", {
                    message: "invalid input",
                  })}
                />
                {errors.expCtc && (
                  <Text color="red.500">{errors.expCtc.message}</Text>
                )}
              </FormControl>
            </Box>
          </Stack>

          {/* Notice Period & Ready to relocate  */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={6}
            alignItems="center"
            mx="1rem"
          >
            <Box>
              <FormControl>
                <FormLabel>Notice Period ( No. of days )</FormLabel>
                <Input
                  marginTop={"0.5rem"}
                  isRequired
                  type="number"
                  width={{ base: "100%", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  placeholder="enter current CTC"
                  control={control}
                  name="notice"
                  id="notice"
                  {...register("notice", {
                    message: "invalid input",
                  })}
                />
                {errors.notice && (
                  <Text color="red.500">{errors.notice.message}</Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Ready to relocate?</FormLabel>
                <Select
                  placeholder="Ready to relocate"
                  marginTop={"0.5rem"}
                  isRequired
                  type="text"
                  width={{ base: "250px", md: "400px" }}
                  height={"50px"}
                  backgroundColor="gray.100"
                  control={control}
                  name="relocate"
                  id="relocate"
                  onChange={(e) => handleSelectChange(e.target.value)}
                  value={watch("relocate")}
                  {...register("relocate", {
                    message: "invalid input",
                  })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
                {errors.relocate && (
                  <Text color="red.500">{errors.relocate.message}</Text>
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
  
  export default CandidateForm;
  