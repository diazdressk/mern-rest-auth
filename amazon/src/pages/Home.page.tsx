import { useEffect, useState } from "react";
import HeaderComponent from "../features/products/components/Header.component";
import ProductComponent from "../features/products/components/Product.component";
import { getProducts } from "../features/products/productSLice";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";

type Props = {};

const HomePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { cart, products } = useAppSelector((state) => state.product);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    dispatch(getProducts())
  }, []);
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', alignItems: 'center', marginTop: '48px' }}>
        {products.length > 0 && products.map(product => (
          <ProductComponent key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
