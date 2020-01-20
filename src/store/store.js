import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialValue = { plants: [] };
const store = createContext(initialValue);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'ADD_PLANT': {
        const newState = { plants: [...prevState.plants, action.plant] };
        return newState;
      }
      case 'Add_PLANTS_LIST': {
        const newState = { plants: [...action.plants] };
        return newState;
      }
      case 'REMOVE_PLANT': {
        const newState = {
          plants: prevState.plants.filter(
            item => item.uid !== action.plant_uuid
          )
        };
        return newState;
      }
      default:
        return prevState;
    }
  }, initialValue);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { store, StateProvider };
