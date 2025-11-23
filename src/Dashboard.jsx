import { Outlet, Link } from 'react-router-dom';

import Sidebar from "./components/sidebar/Sidebar";
import UserNavbar from "./components/navbar/UserNavbar";

export default function Dashboard(){
    return(
        <>
            <div className="flex flex-col">
                <UserNavbar/>
                <div className="flex">
                    <Sidebar/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}