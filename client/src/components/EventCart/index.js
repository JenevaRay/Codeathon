import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const EventCart = ({ event }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = event => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: event._id
    });
    idbPromise('cart', 'delete', { ...event });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: event._id
      });
      idbPromise('cart', 'delete', { ...event });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: event._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...event, purchaseQuantity: parseInt(value) });

    }
  }
}
  export default EventCart;
