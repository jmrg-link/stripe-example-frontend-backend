import { Router } from 'express'
import { 
  paymentCancelled,
  paymentSuccess,
  createCheckoutSession,
} from '../controllers/payment.controllers.js'
const paymentRoutes = Router()

paymentRoutes.get('/cancel',paymentCancelled )
paymentRoutes.get('/success' ,paymentSuccess )
paymentRoutes.post('/create-checkout-session/:planId' ,createCheckoutSession )

export { paymentRoutes }