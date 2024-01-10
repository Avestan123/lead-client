// WorkOrerFormContext.js
import React, { createContext, useContext, useReducer } from "react";

const WorkOrderFormContext = createContext();

const initialState = {
  clientInformation: {},
  documents: [],
  plantDetails: {},
  liasoningDetails: {},
  commercial: {},
  payment: {},
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
        console.log("Updating documents:", action.data);
      return {
        ...state,
        [action.step]: action.data,
      };
    case "CLEAR_FORM_DATA":
      return initialState;
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateFormData = (step, data) => {
    console.log("called update",data);
    dispatch({ type: "UPDATE_FORM_DATA", step, data });
  };

  const clearFormData = () => {
    dispatch({ type: "CLEAR_FORM_DATA" });
  };

  return (
    <WorkOrderFormContext.Provider value={{ state, updateFormData, clearFormData }}>
      {children}
    </WorkOrderFormContext.Provider>
  );
};

const useWorkForm = () => {
  const context = useContext(WorkOrderFormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useWorkForm };
