import { Link } from "react-router-dom";

export default function HeroSection() {
  const scrollToSection = (id, offset = 80) => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        
        {/* Left Text Section */}
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none 
                         md:text-5xl xl:text-6xl dark:text-white">
            Payments tool for software companies
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 
                        lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            From checkout to global sales tax compliance, companies around the world 
            use Flowbite to simplify their payment stack.
          </p>

          <div className="flex flex-wrap items-center gap-3">
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

            <button
              onClick={() => scrollToSection("about", 250)}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium 
                         text-gray-900 border border-gray-300 rounded-lg 
                         hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 
                         dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 
                         dark:focus:ring-gray-800"
            >
              Know More
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
