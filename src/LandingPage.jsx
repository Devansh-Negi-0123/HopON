import { useState } from 'react'

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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <>
      {isUserLoggedIn ? <UserNavbar/>: <GuestNavbar/> }
      <HeroSection/>
      <SocialProof/>
      <CtaSection/>
      <Services/>
      <Team/>
      <Contact/>
      <Footer/>
    </>
  )
}