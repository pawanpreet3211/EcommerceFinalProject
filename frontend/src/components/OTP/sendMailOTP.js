import axios from 'axios';

const SendMailOTP = async (email) => {
    try {
        const response = await axios.post('http://localhost:5000/otp/send', {
            email: email
        });

        return response.data; // Assuming backend sends a success message
    } catch (error) {
        console.error('Error sending OTP via email:', error);
        throw new Error('Failed to send OTP via email. Please try again later.');
    }
};

export default SendMailOTP;
