import * as actions from "./formActionType";

const addFormData = payload => {
  return {
    type: actions.ADD_FORM_DATA,
    payload
  };
};
const LoadingFormData = payload => ({
  type: actions.FORM_DATA_LOADING,
  payload
});
const setFormData = payload => ({
  type: actions.SET_FORM_DATA,
  payload
});
const FormDataErr = payload => ({
  type: actions.ADD_ERR_FORM_DATA
});
const SetModalFormData = () => ({
  type: actions.SET_MODAL_FORM_DATA
});

const clearData = () => ({
  type: actions.CLEAR_FORM_DATA
});

export {
  addFormData,
  LoadingFormData,
  setFormData,
  FormDataErr,
  SetModalFormData,
  clearData
};
