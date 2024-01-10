import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"

const Documents = () => {
  const { state, updateFormData } = useWorkForm();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // const handleInputChange = (e) => {
  //   console.log(e.target.name,e.target.value); // Corrected console.log
  //   const { name, value } = e.target;
  //   updateFormData("documents", { ...state.documents, [name]: value });
  // };
  // form
  useEffect(()=>{
    console.log("Context data:", state.documents);
  },[state])


  useEffect(() => {
    console.log("Context data:", state);
  
    // Ensure that 'documents' is an array before proceeding
    if (Array.isArray(state.documents)) {
      const documents = state.documents;
      console.log(documents);
  
      // Your other code...
  
      const initialPreviews = {};
      documents.forEach((document) => {
        initialPreviews[document.fileName] = {
          file: null, // You might want to fetch the actual file if needed
          preview: document.path,
        };
      });
  
      setSelectedFiles(initialPreviews);
      // Update local state for file preview
    }
  }, [setValue, state]);
  


  const toast = useToast();
  // state to store file
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    aadhar: null,
    pan: null,
    electricity: null,
    tax: null,
    attorney: null,
    annexure: null,
    application: null,
  });
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB
  // handle files seection
  // const handleFileChange = (inputName, e) => {
  //   console.log(inputName);
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Validate file type
  //     if (!allowedFileTypes.includes(file.type)) {
  //       alert("Invalid file type. Please select an image or PDF.");
  //       e.target.value = null; // Clear the file input
  //       return;
  //     }

  //     // Validate file size
  //     if (file.size > maxFileSize) {
  //       alert(
  //         "File size exceeds the limit (5 MB). Please choose a smaller file."
  //       );
  //       e.target.value = null; // Clear the file input
  //       return;
  //     }

  //     setSelectedFiles((prevFiles) => ({
  //       ...prevFiles,
  //       [inputName]: file,
  //     }));

  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setSelectedFiles((prevFiles) => ({
  //         ...prevFiles,
  //         [inputName]: { file, preview: reader.result },
  //       }));
  //     };

  //     // Read the file as a data URL
  //     reader.readAsDataURL(file);

  //     // const { name, files } = e.target;
  //     // const file = files[0]; // Assuming only one file is allowed, adjust as needed
    
  //     // Assuming you have an updateFormData function in your context
  //   updateFormData("documents", (prevDocuments) => ({
  //     ...prevDocuments,
  //     [inputName]: { file, preview: URL.createObjectURL(file) }, // Using createObjectURL for image preview
  //   }));
  //   }
  // };

  // const handleFileChange = (inputName, e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Validate file type and size (as you've already implemented)
  
  //     // Update local state for file preview
  //     setSelectedFiles((prevFiles) => ({
  //       ...prevFiles,
  //       [inputName]: { file:file, preview: URL.createObjectURL(file) },
  //     }));
  
  //     // Update context state with the selected file
  //     const newDocument = { fileName: inputName, path: URL.createObjectURL(file) };
  //     updateFormData("documents", [...state.documents, newDocument]);

      
  
  //     // Log the updated state
  //     console.log("Updated Documents State:", state.documents,state);

      
  //   }
  // };

  const handleFileChange = (inputName, e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
  
      console.log("Selected File:", file);
  
      // Check if the state is updated correctly
      setSelectedFiles((prevFiles) => {
        const updatedFiles = {
          ...prevFiles,
          [inputName]: { file, preview: URL.createObjectURL(file) },
        };
        console.log("Updated Files State:", updatedFiles);
        return updatedFiles;
      });
    }
  };
  
  

  // handler to submit form
  const onSubmit = async (data) => {
    console.log(data,selectedFiles);
    // const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("photo", selectedFiles.photo.file);
    formData.append("adharcard", selectedFiles.aadhar.file);
    formData.append("pancard", selectedFiles.pan.file);
    formData.append("electricitybill", selectedFiles.electricity.file);
    formData.append("taxreceipt", selectedFiles.tax.file);
    formData.append("powerofattorney", selectedFiles.attorney.file);
    formData.append("annexure2", selectedFiles.annexure.file);
    formData.append("applicationform", selectedFiles.application.file);


    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");
    const client_id = localStorage.getItem("client_id")
    let response = await fetch(`${apiUrl}/workOrder/saveDocuments/${client_id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "multipart/form-data",
      
    });
    let Resdata = await response.json();
    if (Resdata.status === 200) {
      console.log(Resdata);
      toast({
        title: Resdata.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      // resetForm(data);
      // navigate("/newleads");
    } else {
      // resetForm(data);

      toast({
        title: Resdata.msg || "something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
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
        <Box>
          <FormControl>
            <FormLabel>Photo</FormLabel>
            <Input
              marginTop={"0.5rem"}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"center"}
              width={{ base: "250px", md: "400px" }}
              type="file"
              display="none"
              // visibility="hidden"
              height={"40px"}
              border={"1px solid #707070"}
              control={control}
              name="photo"
              id="photo"
              {...register("photo", {
                required: "Photo is required",
                message: "invalid file",
              })}
              onChange={(e) => handleFileChange("photo", e)}
            />
            <Button
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
            </Button>
            {selectedFiles.photo && (
              // console.log(selectedFiles.aadhar)
              <Box mt={2}>
                <Text color="green.500">
                  File selected: {selectedFiles.photo.name}
                </Text>
                <Image
                  src={selectedFiles.photo.preview}
                  alt="Preview"
                  // maxW="200px"
                  w="150px"
                  h="150px"
                  borderRadius="15px"
                />
              </Box>
            )}
            {errors.photo && (
              <Text color="red.500">{errors.photo.message}</Text>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Upload Aadhar Card</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("aadhar", e)} // Make sure "aadhar" is the correct inputName
            />
            <Button
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
            </Button>
            {selectedFiles.aadhar && (
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
            )}
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
        <Box>
          <FormControl>
            <FormLabel>Upload Pan Card</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("pan", e)}
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
            </Button>
            {selectedFiles.pan && (
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
            )}
            {errors.pan && <Text color="red.500">{errors.pan.message}</Text>}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Upload Electricity Bill</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("electricity", e)} // Make sure "electricity" is the correct inputName
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
            </Button>
            {selectedFiles.electricity && (
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
            )}
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
        <Box>
          <FormControl>
            <FormLabel>Upload Tax Receipt</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("tax", e)}
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
            </Button>
            {selectedFiles.tax && (
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
            )}
            {errors.tax && <Text color="red.500">{errors.tax.message}</Text>}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Power of Attorney</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("attorney", e)}
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
            </Button>
            {selectedFiles.attorney && (
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
            )}
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
        <Box>
          <FormControl>
            <FormLabel>Annexure-2</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("annexure", e)}
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
            </Button>
            {selectedFiles.annexure && (
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
            )}
            {errors.annexure && (
              <Text color="red.500">{errors.annexure.message}</Text>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Application Form (A-1 Form)</FormLabel>
            <Input
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
              onChange={(e) => handleFileChange("application", e)}
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
            </Button>
            {selectedFiles.application && (
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
            )}
            {errors.application && (
              <Text color="red.500">{errors.application.message}</Text>
            )}
          </FormControl>
        </Box>
      </Stack>

      {/* save button */}
      <Button
        backgroundColor={"#FF9130"}
        color={"#ffffff"}
        colorScheme="teal"
        ml={"15px"}
        mt={"30px"}
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Documents;
