import axios from 'axios';

const SendSMSOTP = async (phone) => {
    try {
        const response = await axios.post('http://localhost:5000/otp/send-otp-sms', {
            phone: phone
        });

        return response.data;
    } catch (error) {
        console.error('Error sending OTP via SMS:', error);
        throw new Error('Failed to send OTP via SMS. Please try again later.');
    }
};

export default SendSMSOTP;
