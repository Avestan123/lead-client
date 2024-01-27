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
  import React, { useEffect, useState } from "react";
  import { NavLink, useNavigate, useLocation } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import { Country, State, City } from "country-state-city";
  import { useUser } from "../../context/UserContext";
function CandidateView() {
    const location = useLocation();
    const useData = location.state;

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
        setValue("cName", useData.cName);
        setValue("experience", useData.experience);
        setValue("email", useData.email);
        setValue("number", useData.number);
        setValue("education", useData.education);
        setValue("skills", useData.skills);
        setValue("currCtc", useData.currCtc);
        setValue("expCtc", useData.expCtc);
        setValue("notice", useData.notice);
        setValue("relocate", useData.relocate);

      }, [useData, setValue])
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
                  <FormLabel>Candidate Experience</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    backgroundColor="gray.100"
                    placeholder="enter name"
                    control={control}
                    name="experience"
                    id="experience"
                    {...register("experience", {
                      message: "invalid input",
                    })}
                  />
                  {errors.experience && (
                    <Text color="red.500">{errors.experience.message}</Text>
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
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    backgroundColor="gray.100"
                    placeholder="enter name"
                    control={control}
                    name="education"
                    id="education"
                    {...register("education", {
                      message: "invalid input",
                    })}
                  />
                  {errors.education && (
                    <Text color="red.500">{errors.education.message}</Text>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Skills</FormLabel>
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    backgroundColor="gray.100"
                    placeholder="enter name"
                    control={control}
                    name="skills"
                    id="skills"
                    {...register("skills", {
                      message: "invalid input",
                    })}
                  />
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
                  <Input
                    marginTop={"0.5rem"}
                    isRequired
                    type="text"
                    width={{ base: "100%", md: "400px" }}
                    height={"50px"}
                    backgroundColor="gray.100"
                    placeholder="enter name"
                    control={control}
                    name="relocate"
                    id="relocate"
                    {...register("relocate", {
                      message: "invalid input",
                    })}
                  />
                  {errors.relocate && (
                    <Text color="red.500">{errors.relocate.message}</Text>
                  )}
                </FormControl>
              </Box>
            </Stack>
  
          </Flex>
        </>
      );
}

export default CandidateView