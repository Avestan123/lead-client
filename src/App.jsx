import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import RootLayout from "./Component/Layout/RootLayout";
import DashboardOverview from "./Component/Dashboard/DashboardOverview/DashboardOverview";
// import Dashboard from "./Component/Dashboard/Dashboard";
import NewLeads from "./Component/Dashboard/NewLeads/NewLeads";
import Onboarding from "./Component/Dashboard/Onboarding/Onboarding";
// import SignOut from "./Component/Dashboard/SignOut/SignOut";
import FollowUP from "./Component/Dashboard/FollowUP/FollowUp";
// import InProgress from "./Component/Dashboard/InProgress/InProgress";
import NewLeadsform from "./Component/Dashboard/NewLeads/NewLeadsform";
import Login from "./Component/Login/Login"; // Import your Login component
import ProtectedRoute from "./Component/Protected/ProtectedRoute";
import ViewForm from "./Component/Dashboard/NewLeads/ViewForm";
import AddEmployee from "./Component/Dashboard/Employee/AddEmployee";
import NewEmployee from "./Component/Dashboard/Employee/NewEmployee";
import EmpViewForm from "./Component/Dashboard/Employee/EmpViewForm";

//import AddProduct from "./Component/Dashboard/Product/AddProduct";
//import NewProduct from "./Component/Dashboard/Product/NewProduct";

import TodaysLeads from "./Component/Dashboard/DashboardOverview/TodaysLeads";
import WorkOrder from "./Component/Dashboard/WorkOrder/WorkOrder";
import WorkOrderLanding from "./Component/Dashboard/WorkOrder/WorkOrderLanding";
import WorkOrderView from "./Component/Dashboard/WorkOrder/WorkOrderView";
import LostLeads from "./Component/Dashboard/LostLeads/LostLeads";
//import EmpViewProduct from "./Component/Dashboard/EmpProducte/EmpViewForm";

// Transfer Leads
import TransferLeads from "./Component/Dashboard/TransferedLeads/TransferedLeads";

// Assigned Leads
import AssignedLeads from "./Component/Dashboard/AssignedLeads/AssignedLeadsTable";
import Customers from "./Component/Dashboard/Customers/Customers";
import NextDay from "./Component/Dashboard/NextDay/NextDay";
import Upcoming from "./Component/Dashboard/Upcoming/Upcoming";
import Missed from "./Component/Dashboard/Missed/Missed";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        {/* Use the "index" attribute to specify the default child route */}
        <Route
          index
          element={<ProtectedRoute Component={DashboardOverview} />}
        />
        <Route
          path="followup"
          element={<ProtectedRoute Component={FollowUP} />}
        />
        <Route
          path="nextday"
          element={<ProtectedRoute Component={NextDay} />}
        />
        <Route
          path="upcoming"
          element={<ProtectedRoute Component={Upcoming} />}
        />
        <Route path="missed" element={<ProtectedRoute Component={Missed} />} />
        <Route
          path="customers"
          element={<ProtectedRoute Component={Customers} />}
        />
        <Route
          path="newleads"
          element={<ProtectedRoute Component={NewLeads} />}
        />
        <Route
          path="newleads/form"
          element={<ProtectedRoute Component={NewLeadsform} />}
        />
        <Route
          path="newleads/viewform"
          element={<ProtectedRoute Component={ViewForm} />}
        />
        <Route
          path="newEmpoyee"
          element={<ProtectedRoute Component={NewEmployee} />}
        />
        <Route
          path="newEmpoyee/addEmployee"
          element={<ProtectedRoute Component={AddEmployee} />}
        />
        <Route
          path="newEmpoyee/empViewForm"
          element={<ProtectedRoute Component={EmpViewForm} />}
        />
        <Route
          path="todayleads"
          element={<ProtectedRoute Component={TodaysLeads} />}
        />

        <Route
          path="onboarding"
          element={<ProtectedRoute Component={Onboarding} />}
        />

        {/* work order route */}

        <Route
          path="workorder"
          element={<ProtectedRoute Component={WorkOrderLanding} />}
        />
        {/* <Route
          path="workorder/:customerId"
          element={<ProtectedRoute Component={WorkOrderView} />}
        /> */}
        <Route
          path="workorder/WorkOrderform"
          element={<ProtectedRoute Component={WorkOrder} />}
        />

        <Route
          path="lostleads"
          element={<ProtectedRoute Component={LostLeads} />}
        />

        {/* Route for Transfer Leads */}

        <Route
          path="transferleads"
          element={<ProtectedRoute Component={TransferLeads} />}
        />

        {/* Assigned Leads Route */}

        <Route
          path="assignedleads"
          element={<ProtectedRoute Component={AssignedLeads} />}
        />
        <Route
          path="lostleads"
          element={<ProtectedRoute Component={LostLeads} />}
        />
        {/* Uncomment the following line if you have a SignOut component */}
        {/* <Route path="signout" element={<ProtectedRoute element={<SignOut />} />} /> */}
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
