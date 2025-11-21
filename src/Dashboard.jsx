import { Outlet, Link } from 'react-router-dom';

import Sidebar from "./components/sidebar/Sidebar";
import GuestNavbar from "./components/navbar/GuestNavbar";

export default function Dashboard(){
    return(
        <>
            <div className="flex flex-col">
                <GuestNavbar/>
                <div className="flex">
                    <Sidebar/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}