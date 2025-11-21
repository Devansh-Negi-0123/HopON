import { useState } from "react"
import profileImage from "../../assets/image.png";

export default function UserNavbar(){
    const [isDropdownOn, setIsDropdownOn] = useState(false);
    const [isUserDropdownOn , setIsUserDropdownOn] = useState(false);

    const toggleDropdown = () => {
        if(isUserDropdownOn){
            setIsUserDropdownOn(false);
        }
        setIsDropdownOn(prev => !prev);
    };

    const toggleUserDropdown = () => {
        if(isDropdownOn){
            setIsDropdownOn(false);
        }
        setIsUserDropdownOn(prev => !prev);
    }

    return(
        <>
            <nav className="sticky top-0 z-50 bg-white shadow-lg border-b  flex justify-between items-center p-4 md:px-8 sm:px-6 px-4">
                <span>
                    <a href="">
                        <img src="" alt="" />
                        <span className="font-bold text-2xl">HopON</span>
                    </a>
                </span>
                <span className="hidden md:flex gap-16 items-center">
                    <a href="" className="">Home</a>
                    <a href="" className="">About</a>
                    <a href="" className="">Services</a>
                    <a href="" className="">Contact Us</a>
                </span>
                <span className="flex gap-4 items-center">
                    <div className="relative flex items-center">
                        <button onClick={toggleUserDropdown}>
                        <img src={profileImage} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
                        </button>
                        <div
                        className={`flex flex-col gap-2 pl-2 py-2 w-32 sm:w-48 rounded-lg border absolute 
                            top-full right-0 z-40 mt-2 shadow-lg transition-all duration-200 ease-in-out transform
                            bg-gray-100
                            ${isUserDropdownOn ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                        `}
                        >
                        <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Profile</a>
                        <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Dashboard</a>
                        <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Settings</a>
                        <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Logout</a>
                        </div>
                    </div>

                    <div className="relative">
                        <button className="md:hidden font-bold text-2xl" onClick={toggleDropdown}>
                            &#9776;
                        </button>
                        <div
                        className={`md:hidden flex flex-col gap-2 pl-2 py-2 w-32 sm:w-48 rounded-lg border absolute
                             top-full right-0 z-60 mt-3 shadow-lg transition-all duration-200 ease-in-out transform
                             bg-gray-100
                            ${isDropdownOn ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                        `}
                        >
                        <a href="" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">Home</a>
                        <a href="" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">About</a>
                        <a href="" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">Services</a>
                        <a href="" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">Contact Us</a>
                        </div>
                    </div>
                </span>
            </nav>
        </>
    )
}