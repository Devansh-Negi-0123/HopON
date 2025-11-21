import { useState } from "react"
import { Link } from "react-router-dom";

export default function GuestNavbar(){
    const [isDropdownOn, setIsDropdownOn] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOn(prev => !prev);
    };

    const scrollToSection = (id, offset = 80) => {
        const section = document.getElementById(id);
        if (section) {
            const top = section.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return(
        <>
            <nav className="sticky top-0 z-50 bg-gray-100 flex justify-between items-center p-2 md:px-12 sm:px-8 px-4 h-16 shadow-lg">
                <span>
                    <a href="">
                        <img src="" alt="" />
                        <span>HopON</span>
                    </a>
                </span>
                <span className="hidden md:flex gap-16 items-center">
                    <button onClick={() => scrollToSection("home", 100)}>Home</button>
                    <button onClick={() => scrollToSection("about", 250)}>About</button>
                    <button onClick={() => scrollToSection("services", 100)}>Services</button>
                    <button onClick={() => scrollToSection("contact", 40)}>Contact</button>


                </span>
                <span className="flex gap-4 items-center">
                    <Link to="/register">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium 
                                    text-white rounded-lg bg-blue-600 hover:bg-blue-700 
                                    focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                        >
                            Get started
                            <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 
                                01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 
                                1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                            </svg>
                        </a>
                    </Link>
                    <div className="relative">
                        <button 
                            className="md:hidden"
                            onClick={toggleDropdown}
                            >
                                &#9776; 
                        </button>
                        <div
                            className={`md:hidden flex flex-col gap-2 pl-2 py-2 w-32 sm:w-48
                                rounded-lg border absolute top-full right-0 z-40 mt-4 shadow-lg
                                transition-all duration-200 ease-in-out transform
                                ${isDropdownOn ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                            `}
                            >
                                <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Home</a>
                                <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">About</a>
                                <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Services</a>
                                <a href="" className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200">Contact Us</a>
                        </div>
                    </div>
                </span>
            </nav>
        </>
    )
}