import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navBar/navBar";
import routes from "./routes";

function App() {
    return (
        <Router>
            <Navbar />
            <ToastContainer />
            <Routes>
                {routes.map((item, index) => (
                    <Route
                        exact
                        path={item.route}
                        element={item.component}
                        key={index}
                    />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
