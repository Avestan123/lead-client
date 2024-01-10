import React, {  useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
} from "@chakra-ui/react";
import ClientInformation from "./ClientInformation.jsx";
import Documents from "./Documents.jsx";
import PlantDetails from "./PlantDetails.jsx";
import LiasoningDetails from "./LiasoningDetails.jsx";
import Commercial from "./Commercial.jsx";
import Payment from "./Payment.jsx";
import { useLocation } from "react-router-dom";
import { useWorkForm } from "../../context/WorkOrderFormContext.jsx"


const WorkOrder = () => {
  const location = useLocation();
  const useData = location.state;
  const { updateFormData } = useWorkForm();
  console.log("useData", useData)
  const isMobile = useBreakpointValue({ base: true, md: false });


  useEffect(() => {
    if (useData) {
      // Assuming useData.step contains the step name and useData.data contains the data
      updateFormData("clientInformation", useData);
    }
  }, [useData]);

  return (
   
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
        <TabPanel>
          <ClientInformation />
        </TabPanel>
        <TabPanel>
          <Documents />
        </TabPanel>
        <TabPanel>
          <PlantDetails />
        </TabPanel>
        <TabPanel>
          <LiasoningDetails />
        </TabPanel>
        <TabPanel>
          <Commercial />
        </TabPanel>
        <TabPanel>
          <Payment />
        </TabPanel>
      </TabPanels>
    </Tabs>
    
  );
};

export default WorkOrder;
