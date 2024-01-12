import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    PinInput,
    PinInputField,
    HStack,
    Box,
    Center,
} from '@chakra-ui/react';
import { useEffect } from 'react';


function PopUpModal({ isOpen, onClose, onVerify }) {
    const [otp, setOTP] = useState('');
    const [value, setValue] = useState("");

    useEffect(()=>{
        setValue("")
    },[])

    const handleDelete = () => {
        alert("delete")
        onClose();
    };

    const cancelDelete = () =>{
        onClose();
    }
      const handleComplete = value => {
        setOTP(value)

      };
      const handleChange = value => {
        setValue(value);
        // onChange(value);
      };


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" textAlign="center">
            <ModalOverlay />
            <ModalContent textAlign="center" sx={{ top: "120px", borderRadius: "22px", width: "420px", height: "250px", padding: "20px" }} >
                <ModalHeader >Delete followup</ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody>
                    <HStack spacing='20px'>
                        <h2>Confirm followup delete?</h2>
                    </HStack>
                    {/* <Input  /> */}
                </ModalBody>
                <ModalFooter textAlign="center" >
                    <Button textAlign="center" colorScheme="red" borderRadius={'30px'} width={'207px'} height={'48px'} marginRight={'44px'} padding={'4.91px'} onClick={handleDelete}>
                        Yes, Delete!
                    </Button>
                    <Button textAlign="center" colorScheme="teal" borderRadius={'30px'} width={'207px'} height={'48px'} marginRight={'44px'} padding={'4.91px'} onClick={cancelDelete}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    );
}

export default PopUpModal;