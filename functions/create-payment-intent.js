
// domain/.netlify/functions/create-payment-intent

require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRECT_KEY);



exports.handler = async function(event,context){
    if(event.body){
        const { cart, total_amount, shipping_fee } = JSON.parse(event.body);

        const calculateOrderAmount = () => {
            return shipping_fee + total_amount
        }

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount:calculateOrderAmount(),
                currency:'eur',
                description:"Software development services",
                // customer:'anandakumar',
                // address:'510 Townsend St',
                // postal_code:626001,
                // city:'virudhungar',
                // state:'tamilnadu',
                // country:'india',
            })
            return {
                statusCode:200,
                body:JSON.stringify({clientSecret:paymentIntent.client_secret}),
            }
        } catch (error) {
            return {
                statusCode:500,
                body:JSON.stringify({msg:error.message})
              }
        }
      
    }
    return {
        statusCode:200,
        body:'Create Payment Intent'
    }
}