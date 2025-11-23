import { useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import GuestNavbar from './components/navbar/GuestNavbar';
import UserNavbar from './components/navbar/UserNavbar';

import HeroSection from './components/heroSection/heroSection';
import SocialProof from './components/socialProof/SocialProof';
import CtaSection from './components/ctaSection/CtaSection';
import Services from './components/services/Services';
import Team from './components/team/Team';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

export default function LandingPage() {
  const { user } = useContext(AuthContext); // ✅ use actual user object
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);

      if (element) {
        let offset = 50;
        if (id === "about") offset = 230;

        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      {user ? <UserNavbar /> : <GuestNavbar />} {/* ✅ check actual user */}

      <section id='home'><HeroSection/></section>
      <SocialProof/>
      <section id='about'><CtaSection/></section>
      <section id='services'><Services/></section>
      <Team/>
      <section id='contact'><Contact/></section>
      <Footer/>
    </>
  );
}
