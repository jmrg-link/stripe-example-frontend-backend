import Stripe from 'stripe'
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config.js'

// Constants
const key_stripe = config.stripe.secretKey
const stripe = new Stripe(key_stripe)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plans
const PLANS = {
  1: {
    name: 'Asistence plan 1 hour',
    amount: 25000
  },
  2: {
    name: 'Asistence plan 2 hours Pack',
    amount: 50000
  },
  3: {
    name: 'Asistence plan 5 hours Pack',
    amount: 95000
  },
  4: {
    name: 'Asistence plan 10 hours Pack',
    amount: 180000
  }
};

/*************************************
*******  Payment Cancelled *********
* ***********************************/
const paymentCancelled = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/cancel.html'));
};

/*************************************
*******  Payment Success *************
* ***********************************/
const paymentSuccess = async (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/success.html'));
};

/*************************************
*******  Payment controllers *********
* ***********************************/
const createCheckoutSession = async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = PLANS[planId];

    if (!plan) {
      return res.status(400).json({
        message: 'Invalid plan ID'
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/api/v1/payment/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/api/v1/payment/cancel`,
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.amount
          },
          quantity: 1
        }
      ]
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating session'
    });
  }
};

export { paymentCancelled, paymentSuccess, createCheckoutSession }