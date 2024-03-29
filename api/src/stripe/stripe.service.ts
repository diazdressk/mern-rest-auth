import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { Cart } from './Cart.model';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  checkout(cart: Cart) {
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    /* платёж */return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100,/* тк stripe испльзует центы,делаю доллрами */
      currency: 'usd',
      payment_method_types: ['card']
    })
  }

}
