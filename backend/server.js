const express = require('express');
const cors = require('cors');
const env = require('dotenv').config( {path: '../.env'});
const { v4: uuidv4 } = require('uuid');
const products = require('./products');
const { Client, CheckoutAPI} = require("@adyen/api-library");

const app = express();
app.use(cors());
app.use(express.json())

createId = () =>{
  return uuidv4();
}

// Set up the client and service.
const client = new Client({
        apiKey: process.env.ADYEN_API_KEY,
        environment: "TEST" 
    });
  const checkoutApi = new CheckoutAPI(client);

//adyen route
app.post('/api/session', async (req, res) => {
	try {
    const {
        amount,
        returnUrl,
    } = req.body;

    const checkoutSessionData = {
        merchantAccount: process.env.MERCHANT_ACCOUNT,
        amount: amount,
        returnUrl: returnUrl,
        reference: createId()
      };
        
    // Send the request
    const response =  await checkoutApi.PaymentsApi.sessions(checkoutSessionData);
    response.clientKey = process.env.CLIENT_KEY
    console.log(response)
    res.status(201).json(response)

    } catch (error) {
        console.error(error)
    }
});


//route for filling product data
app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 