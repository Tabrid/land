import { Outlet } from "react-router-dom";

import Navbar from "../page/Navbar";
import Footer from "../page/Footer";


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;