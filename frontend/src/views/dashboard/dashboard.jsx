import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductsList/ProductList";
// import BackgroundImage from "../../assets/images/best-ecommerce-security-solutions.avif";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        const usrnm = localStorage.getItem("username");
        const loginMessage = localStorage.getItem("loginMessage");
        console.log("userId: ", userId);
        console.log("username: ", usrnm);
        console.log("loginMessage: ", loginMessage);

        if (userId) {
            const userEmail = localStorage.getItem("email");
            console.log("User Email:", userEmail);

            setIsLoggedIn(true);
            setUserName(usrnm);

            if(loginMessage === "true") {
                // alert("Login true");
                toast.success("Loggedin!", {
                    position: toast.POSITION.TOP_CENTER,
                });

                localStorage.setItem("loginMessage", "false");
            }
        } else {
            setIsLoggedIn(false);
            // toast.warn("No user!", {
            //     position: toast.POSITION.TOP_CENTER,
            // });
        }
    }, []);

    return (
        <>
            {/* <h1>Dashboard Page</h1> */}
            {/* <div className="flex items-center justify-center h-screen" style={{backgroundImage: `url('../../assets/images/best-ecommerce-security-solutions.avif')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5}}>
                <img className="bg-cover h-500 w-half" src={BackgroundImage} alt="AVIF" />
            </div> */}
            
            <div className="container mx-auto mt-8">
                {
                    isLoggedIn ? (
                        <h1 className="text-3xl font-bold text-left">Welcome {userName}</h1>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-left">Welcome to SecureCommerce!</h1>
                            <h1 className="text-lg font-bold text-right">Login or Signup to start</h1>
                        </>
                    )
                }
            </div>
            <ProductList />
        </>
    );
};

export default Dashboard;
