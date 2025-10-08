import React, { useContext, useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';


const HandleQuantity = ({ classes = {}, productObj, elem, customIcon }) => {
  const { cartProducts, handleIncDec } = useContext(CartContext);
  const [productQty, setProductQty] = useState(0);
  
  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find((el) => el.product_id === elem?.product_id);
      if (foundProduct) {
        setProductQty(foundProduct.quantity); // Use the quantity from the found product directly
      } else {
        setProductQty(0);
      }
    } else {
      setProductQty(0);
    }
  }, [cartProducts]);

  // Handle direct input change
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Allow empty string for user to clear and type new value
    if (value === '') {
      setProductQty('');
      return;
    }
    
    // Parse and validate the input
    const qty = parseInt(value, 10);
    if (!isNaN(qty) && qty >= 1) {
      setProductQty(qty);
    }
  };

  // Handle blur to update cart and ensure minimum quantity
  const handleQuantityBlur = () => {
    const currentQty = productQty === '' ? 1 : productQty;
    if (!currentQty || currentQty < 1) {
      setProductQty(1);
      return;
    }

    // Find the current quantity in cart
    const foundProduct = cartProducts.find((el) => el.product_id === elem?.product_id);
    if (foundProduct) {
      const difference = currentQty - foundProduct.quantity;
      if (difference !== 0) {
        // Update the cart with the new quantity
        handleIncDec(difference, productObj, foundProduct.quantity, setProductQty, false, elem?.id);
      }
    }
  };

  return (
    <li className={classes?.customClass ? classes?.customClass : ''}>
      <div className='cart_qty'>
        <InputGroup>
          <Btn type='button' className='btn qty-left-minus' onClick={() => handleIncDec(-1, productObj, productQty, setProductQty, false, elem?.id)}>
            {customIcon && customIcon && productQty <= 1 ? customIcon : <RiSubtractLine />}
          </Btn>
          <Input 
            className='input-number qty-input' 
            type='text' 
            name='quantity' 
            value={productQty} 
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
          />
          <Btn type='button' className='btn qty-right-plus' onClick={() => handleIncDec(1, productObj, productQty, setProductQty, false, elem?.id)}>
            <RiAddLine />
          </Btn>
        </InputGroup>
      </div>
    </li>
  );
};

export default HandleQuantity;
