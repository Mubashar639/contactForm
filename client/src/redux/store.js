import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./Reducers/index";
// import { persistStore } from "redux-persist";

let store = createStore(Reducers, applyMiddleware(thunk));
// let persistor = persistStore(store);
export { store,  };
// persistor