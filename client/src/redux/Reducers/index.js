import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import form_data from "./reducer/formReducer";

const Reducers = combineReducers({
  form_data
});

export default Reducers;
// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist:["form_data"]
//   }

// export default  persistReducer(persistConfig, Reducers);
