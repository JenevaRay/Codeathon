import { createContext, useContext } from 'react';
import { useEventReducer } from './';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useEventReducer({
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
