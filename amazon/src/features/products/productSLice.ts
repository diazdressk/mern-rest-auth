import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cart } from './models/Cart';
import { ProductDocument } from './models/Product';
import productService from './services/product.service';

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  products: ProductDocument[];
  cart: Cart;
}
const initialState: ProductState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  products: [],
  cart: [],
};

export const getProducts = createAsyncThunk('product', async () => {
  try {
    return await productService.getProducts();
  } catch (error) {
    console.log('Error: ', error);
  }
});

/* добавление или  убирание товара из корзины */
export const modifyQtyByOne = (
  cart: Cart,
  selectedProduct: ProductDocument,
  modificationType: 'INCREMENT' | 'DECREMENT',
) => {
  const previosCart = [...cart];

  /* нахожу товар,который добавляется в корзину среди тех, которые уже есть там */
  const productInCart = previosCart.find((product) => product._id === selectedProduct._id);

  let newCart = [];

  if (!productInCart) {
    /* если товар в первый раз добавляется, то просто добавляю этот товар к тем, которые уже там, указываю количество 1 */
    previosCart.push({ ...selectedProduct, quantity: 1 });
    newCart = previosCart;
  } else {
    /* это все остальные товары,помимо товара,с которым сейчас работаю, их отдельно отфильтровал, чтобы, если товар убираю из корзины, в корзине останутся только эти товары,  */
    const filteredCart = previosCart.filter((p) => p._id !== productInCart._id);
    /* тут определяю Добавляется товар или Убирается */
    const modification = modificationType === 'INCREMENT' ? 1 : -1;
    /*тут либо увеличиваю количество или уменьшаю */
    productInCart.quantity = productInCart.quantity + modification;

    if (productInCart.quantity === 0) {
      /* вот тут, если убрал товар из корзины и его уже не осталось, то корзину делаю равной остальным товарам, которые вычислил на 52 строчке */
      newCart = [...filteredCart];
    } else {
      /* но если товар в корзине остался, то просто обратно к остальным добавляю и сформировываю корзину обратно */
      newCart = [...filteredCart, productInCart];
    }
  }
  return newCart;
};

export const productSLice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'INCREMENT');
      state.cart = modifiedCart;
    },
    decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(state.cart, action.payload, 'DECREMENT');
      state.cart = modifiedCart;
    },
    resetCart: (state) => {/* очищу корзину после оплаты */
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
      });
  },
});

export const { incrementProduct, decrementProduct, resetCart } = productSLice.actions;
export default productSLice.reducer;
