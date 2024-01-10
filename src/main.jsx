import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./Component/context/AuthContext.jsx";
import { UserProvider } from "./Component/context/UserContext.jsx";
import { FormProvider } from "./Component/context/WorkOrderFormContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(

    <ChakraProvider>
      <AuthProvider>
        <UserProvider>
        <FormProvider>
            <App />
          </FormProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>

);
