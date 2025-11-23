import hoponLogo from "../../assets/HopON.jpeg";

export default function Footer() {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* Logo SVG */}
          <img src={hoponLogo} alt="HopON" className="mr-2 h-8" />

          HopON
        </a>

        <p className="my-6 text-gray-500 dark:text-gray-400">
          Every ride comes with verified profiles, trip details, and real-time updates so you always know who you're traveling with.
        </p>

        {}

        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025-2026 <a href="#" className="hover:underline">HopON™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
