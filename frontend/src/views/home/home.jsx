import React, { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        // Here you would check the user's authentication status when the component mounts
        // For now, we'll assume the user is not logged in by default
        // setIsLoggedIn(true or false based on auth status);
    }, []);

    return (
        <h1>Home Page</h1>
    );
};

export default Home;
