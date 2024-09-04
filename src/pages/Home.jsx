import React from 'react';
import Header from '../Components/landingPage/Header/Header';
import Hero from '../Components/landingPage/Hero/Hero';
import Footer from '../Components/landingPage/Footer/Footer';
import Section from "../Components/landingPage/Section";
import Services from '../Components/landingPage/Services';
import Mission from '../Components/landingPage/Mission';

const Home = () => {
  return (
    <div className="bg-[#D6EFD8] min-h-screen text-black scrollbar-hide">
      <Header />
      <Hero />
      <Section />
      <Services />
      <Mission/>
      <Footer />

    </div>
  );
};

export default Home;