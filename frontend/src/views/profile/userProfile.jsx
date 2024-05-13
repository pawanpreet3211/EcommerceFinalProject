import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [uniquePhraseForm, setUniquePhraseForm] = useState(false);
    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        showPassword: false,
    });
    const [passwordError, setPasswordError] = useState("");
    const [uniquePhrase, setUniquePhrase] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
        // Fetch user info from API
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem("_id");
            console.log("Profile page user id: ", userId);

            if (userId) {
                try {
                    const response = await fetch("http://localhost:5000/user/getInfo", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userID: userId }),
                    });

                    if (response) {
                        const data = await response.json();
                        console.log("User profile data: ", data);
                        setUserInfo(data.result);
                    } else {
                        console.error("Failed to fetch user info");
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            } else {
                navigator('/');
            }
        };

        fetchUserInfo();
    }, [navigator]);

    const handleVerifyOTP = () => {
        navigator("/verify-otp");
    };

    // const handleSetUniquePhrase = () => {
    //     navigator("/set-unique-phrase");
    // };

    const toggleUniphraseFormState = () => {
        if (uniquePhraseForm) {
            setUniquePhraseForm(false);
        } else {
            setUniquePhraseForm(true);
        }
    }

    // const handleUpdateUniquePhrase = () => {
    //     navigator("/update-unique-phrase");
    // };

    const handleInputChange = (e) => {
        setPasswordFormData({
            ...passwordFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleShowPassword = () => {
        setPasswordFormData({
            ...passwordFormData,
            showPassword: !passwordFormData.showPassword,
        });
    };

    const handleSubmitPasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
            setPasswordError("New password and confirm new password must be same.");
            return;
        }

        const userId = localStorage.getItem("_id");
        try {
            const response = await fetch("http://localhost:5000/user/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserID: userId,
                    currentPassword: passwordFormData.currentPassword,
                    newPassword: passwordFormData.newPassword,
                }),
            });
            const data = await response.json();
            console.log(data);
            
            // toast.success()
            toast.success("Password Updated!", {
                position: toast.POSITION.TOP_CENTER,
            });

            // Reset form fields
            setPasswordFormData({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
                showPassword: false,
            });
            setPasswordError("");
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password.", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    const handleSubmitUniquePhrase = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("_id");

        if (userInfo.uniquePhrase) {
            try {
                const response = await fetch("http://localhost:5000/user/update-phrase", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userId,
                        uniquePhrase: uniquePhrase, // Add your logic to get the unique phrase from the form input
                    }),
                });
                const data = await response.json();
                console.log(data);
                toast.success("Updated unique phrase!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                // Reset form fields
                setUniquePhraseForm(false);
            } catch (error) {
                console.error("Error setting unique phrase:", error);
                toast.error("Cannot update unique phrase.", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            
        } else {
            try {
                const response = await fetch("http://localhost:5000/user/set-phrase", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userID: userId,
                        uniquePhrase: uniquePhrase, // Add your logic to get the unique phrase from the form input
                    }),
                });
                const data = await response.json();
                console.log(data);
                toast.success("Unique phrase set successfull!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                // Reset form fields
                setUniquePhraseForm(false);
            } catch (error) {
                console.error("Error setting unique phrase:", error);
                toast.error("Cannot set unique phrase.", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            {userInfo && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
                    <div className="p-4">
                        <h3 className="font-bold text-lg">User Profile</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="col-span-1">
                                <div className="text-gray-800 mb-2">
                                    <strong>Username:</strong> {userInfo.username}
                                </div>
                                <div className="text-gray-800 mb-2">
                                    <strong>Email:</strong> {userInfo.email}
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="text-gray-800 mb-2">
                                    <strong>OTP Verified:</strong> {userInfo.otpVerified ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                    ) : (
                                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                                    )}
                                    {!userInfo.otpVerified && (
                                        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={handleVerifyOTP}>
                                            Verify OTP
                                        </button>
                                    )}
                                </div>
                                <div className="text-gray-800 mb-2">
                                    <strong>Unique Phrase Status:</strong> {userInfo.uniquePhrase ? "Updated" : "Not Set"}
                                    {userInfo.uniquePhrase ? (
                                        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={toggleUniphraseFormState}>
                                            Update Unique Phrase
                                        </button>
                                    ) : (
                                        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={toggleUniphraseFormState}>
                                            Set Unique Phrase
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {uniquePhraseForm && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-4">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-4">Set Unique Phrase</h3>
                    <form onSubmit={handleSubmitUniquePhrase}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uniquePhrase">
                                Unique Phrase
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="uniquePhrase"
                                type="text"
                                name="uniquePhrase"
                                placeholder="Unique Phrase"
                                value={uniquePhrase}
                                onChange={(e) => setUniquePhrase(e.target.value)}
                                required
                                // Add value and onChange if needed
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            

                            {userInfo.uniquePhrase ? (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Update Unique Phrase
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Set Unique Phrase
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-7  ">
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-4">Change Password</h3>
                    <form onSubmit={handleSubmitPasswordUpdate}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="currentPassword"
                                    type={passwordFormData.showPassword ? "text" : "password"}
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    value={passwordFormData.currentPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={passwordFormData.showPassword ? faEyeSlash : faEye}
                                    className="absolute top-0 right-0 m-3 cursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="newPassword"
                                    type={passwordFormData.showPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={passwordFormData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={passwordFormData.showPassword ? faEyeSlash : faEye}
                                    className="absolute top-0 right-0 m-3 cursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmNewPassword"
                                    type={passwordFormData.showPassword ? "text" : "password"}
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    value={passwordFormData.confirmNewPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={passwordFormData.showPassword ? faEyeSlash : faEye}
                                    className="absolute top-0 right-0 m-3 cursor-pointer"
                                    onClick={handleShowPassword}
                                />
                            </div>
                            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
