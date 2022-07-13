### LannisterPay (TPSS)
LannisterPay has reached out to you to help implement a transaction payment splitting service (TPSS). The service is meant to calculate the amount due to one or more split payment "entities" as well as the amount left after all splits have been computed

### Requirements I (Endpoint)

Your API service should expose a single HTTP POST endpoint /split-payments/compute that accepts a transaction object with the following properties:

1. ID: Unique numeric ID of the transaction
2. Amount: Amount to be splitted between the split entities defined in the SplitInfo array (see below)
3. Currency: The currency of the transaction
4. CustomerEmail: Email address of the transaction customer
5. SplitInfo: An array of split entity objects. Each object conatins the fields below:
6. SplitType: This defines how the split amount for the entity is calculated. It has 3 possible values, "FLAT", "PERCENTAGE" AND "RATIO"
7. SplitValue: This is used together with the SplitType to determine the final value of the split amount for the entity. Example, a SplitType of FLAT and SplitValue of 45 means the split entity gets NGN 45. Another example, A SplitType of PERCENTAGE and SplitValue of 3 means the split entity gets 3 percent of the transaction amount or Balance. You can read more about split computation under the Requirement II (Split computation rules) section.
8. SplitEntityId: This is the unique identifier for the split entity.

### Technologies used: 
Node.JS, MongoDB database, Express.JS, PostMan for testing API

### Steps to run app:
1. npm install to install dependencies
2. npm start to run server
3. open browser and go to postman to test API http://localhost:3005/api/split-payments/compute