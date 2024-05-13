// import CreateResume from "components/contactForm";
import Signup from './views/signup/signup';
import Login from './views/login/login';
import Dashboard from './views/dashboard/dashboard';
import Transactions from './views/transactions/transactions';
import SendOTP from './components/OTP/send';
import VerifyOTP from './components/OTP/verify';
import UserProfile from './views/profile/userProfile';
import Cart from './views/cart/Cart';
import CheckOut from './views/checkout/CheckOut';
import VerifyPhrase from './components/UniquePhrase/VerifyPhrase';
import AddProduct from './views/addProduct/AddProduct';
import GeoLocationComponent from './views/test/GeoCoding';
import VerifySMSOTP from './components/OTP/verifySMS';
// import Camera from './views/facialRecognition/facialRecognition'

const routes = [
    {
        name:'Dashboard',
        route:'/',
        component:<Dashboard />
    },
    {
        name: "Login",
        route: "/login",
        component: <Login />,
    },
    {
        name: "Signup up",
        route: "/signup",
        component: <Signup />,
    },
    {
        name: "Dashboard",
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        name: "Transactions",
        route: "/transactions",
        component: <Transactions />,
    },
    {
        name: "OTP Send",
        route: "/send-otp",
        component: <SendOTP />,
    },
    {
        name: "OTP Verify",
        route: "/verify-otp",
        component: <VerifyOTP />,
    },
    {
        name: "User Profile",
        route: "/user-profile",
        component: <UserProfile />,
    },
    {
        name: "User Profile",
        route: "/cart",
        component: <Cart />,
    },
    {
        name: "Check out",
        route: "/checkout",
        component: <CheckOut />,
    },
    {
        name: "Verify Unique Phrase",
        route: "/verify-transaction",
        component: <VerifyPhrase />,
    },
    {
        name: "Verify SMS OTP",
        route: "/otp-sms",
        component: <VerifySMSOTP />,
    },
    {
        name: "Add product",
        route: "/add-product",
        component: <AddProduct />,
    },
    {
        name: "Test GeoCoding",
        route: "/test/geocode",
        component: <GeoLocationComponent />,
    },
    // {
    //     name: "Facial Recognition",
    //     route: "/face",
    //     component: <Camera />,
    // },
];
export default routes;
