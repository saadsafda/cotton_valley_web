import QuickView from '../QuickView';
import AddToWishlist from '../AddToWishlist';
import AddToCompare from '../AddToCompare';

const ProductBoxAction = ({ productObj,listClass }) => {
  return (
    <ul className={listClass} style={{justifyContent: 'center'}}>
      <QuickView productObj={productObj} />
    </ul>
  );
};

export default ProductBoxAction;
