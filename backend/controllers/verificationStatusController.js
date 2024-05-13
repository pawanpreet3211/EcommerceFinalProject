const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the model
async function loadModel() {
    const model = await tf.loadLayersModel('../ML/authentication_model.h5');
    return model;
}

// Safe encoding function
function safeEncode(column, encoder) {
    try {
        return encoder.transform(column);
    } catch (error) {
        // If the category is unknown, assign a default label (e.g., the last label + 1)
        return Array(column.length).fill(encoder.classes_.length);
    }
}

// Make prediction function
async function makePrediction(inputData, model) {
    const userId = inputData['User ID'];
    const sessionDuration = inputData['Session Duration'];
    const pagesVisited = inputData['Pages Visited'];
    const itemsViewed = inputData['Items Viewed'];
    const loginFrequency = inputData['Login Frequency'];
    const cartAdditions = inputData['Cart Additions'];
    const successfulTransactions = inputData['Successful Transactions'];
    const failedTransactions = inputData['Failed Transactions'];
    const deviceType = inputData['Device Type'];
    const age = inputData['Age'];
    const location = inputData['Location'];

    const locationEncoder = model.getLayer('Location').getWeights()[0].arraySync();
    const deviceTypeEncoder = model.getLayer('Device Type').getWeights()[0].arraySync();
    const userIdEncoder = model.getLayer('User ID').getWeights()[0].arraySync();

    // Apply encoding safely
    const locationEncoded = safeEncode([location], locationEncoder);
    const deviceTypeEncoded = safeEncode([deviceType], deviceTypeEncoder);
    const userIdEncoded = safeEncode([userId], userIdEncoder);

    // Standard scaling
    const scaledData = [
        sessionDuration, pagesVisited, itemsViewed, loginFrequency,
        cartAdditions, successfulTransactions, failedTransactions,
        age
    ];

    // Make prediction
    const inputDataTensor = tf.tensor2d([[
        userIdEncoded[0], sessionDuration, pagesVisited, itemsViewed,
        loginFrequency, cartAdditions, successfulTransactions,
        failedTransactions, deviceTypeEncoded[0], age, locationEncoded[0]
    ]]);

    const prediction = model.predict(inputDataTensor);
    const predictedClass = prediction.argMax(1).dataSync()[0];
    
    return predictedClass;
}

// Example input data
const input_data = {
    'User ID': 50, 'Session Duration': 10, 'Pages Visited': 2, 'Items Viewed': 1,
    'Login Frequency': 1, 'Cart Additions': 2, 'Successful Transactions': 1,
    'Failed Transactions': 0, 'Device Type': 'Mobile', 'Age': 30, 'Location': 'USA'
};

exports.getStatus = async (req, res) => {
    const input = {
        "User ID": req.body.userId,
    }
    const model = await loadModel();
    const predictedClass = await makePrediction(input_data, model);
    console.log(`Predicted Authentication Method: ${predictedClass}`);

    // res.status(200).json({
    //     verificationMethod: "Not Required"
    // });
}
