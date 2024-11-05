import Stripe from 'stripe';
import { config } from '../src/config.js';

const stripe = new Stripe(config.stripe.secretKey);

const PROMO_CODES = [
  {
    code: 'WELCOME10',
    percent_off: 10,
    description: '10% off your first purchase'
  },
  {
    code: 'WINTER20',
    percent_off: 20,
    description: '20% off winter sale'
  },
  {
    code: 'FLASH50',
    percent_off: 50,
    description: '50% off flash sale'
  },
  {
    code: 'FIXED25',
    amount_off: 2500,
    currency: 'eur',
    description: '25€ off your purchase'
  }
];

const createAllPromoCodes = async () => {
  for (const promoCode of PROMO_CODES) {
    try {
      let couponParams = {
        duration: 'once',
        id: promoCode.code,
        name: promoCode.description
      };

      if (promoCode.percent_off) {
        couponParams.percent_off = promoCode.percent_off;
      } else {
        couponParams.amount_off = promoCode.amount_off;
        couponParams.currency = promoCode.currency;
      }

      const coupon = await stripe.coupons.create(couponParams);
      const promoCodeParams = {
        coupon: coupon.id,
        code: promoCode.code,
        max_redemptions: 100
      };
      const createdPromoCode = await stripe.promotionCodes.create(promoCodeParams);

      console.log(`Created promo code: ${promoCode.code}`);
    } catch (error) {
      console.error(`Error creating promo code ${promoCode.code}:`, error);
    }
  }
};

const setupStripe = async () => {
  console.log('Setting up Stripe promocodes...');
  await createAllPromoCodes();
  console.log('Setup complete!');
};

setupStripe().catch(console.error);