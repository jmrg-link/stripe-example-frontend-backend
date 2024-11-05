async function checkout(planId) {
    try {
        const url = `/api/v1/payment/create-checkout-session/${planId}`;
        console.log('Sending request to:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received:', data);

        if (data.url) {
            console.log('Redirecting to:', data.url);
            window.location.href = data.url;
        } else {
            throw new Error('No checkout URL received');
        }

    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Something went wrong! Check console for details.');
    }
}

const createCoupon = async () => {
  try {
    const coupon = await stripe.coupons.create({
      name: 'Winter Sale',
      percent_off: 20,
      duration: 'once',
      id: 'WINTER20'
    });
    console.log('Coupon created:', coupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
  }
};


const createPromoCode = async () => {
  try {
    const promoCode = await stripe.promotionCodes.create({
      coupon: 'WINTER20',
      code: 'WINTER20',
      max_redemptions: 100
    });
    console.log('Promo code created:', promoCode);
  } catch (error) {
    console.error('Error creating promo code:', error);
  }
};