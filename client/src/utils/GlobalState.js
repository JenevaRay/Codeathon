import { createContext, useContext } from 'react';
import { useRegistrationReducer } from './';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useRegistrationReducer({
    events: [],
    reservations: [],
    cart: [],
    cartOpen: false,
    currentEvent: '',
  });
  return (
    <Provider
      value={[state, dispatch]}
      {...props}
    />
  );
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
