import React from 'react';
import FooterLogo from './FooterLogo';
import FooterSection from './FooterSection';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
        <FooterLogo />
        <FooterSection title="Company" links={["About us", "Contact us", "Careers", "Press"]} />
        <FooterSection title="Product" links={["Features", "Pricing", "News", "Help desk", "Support"]} />
        <FooterSection title="Services" links={["Digital Contracts", "AI", "Community"]} />
        <FooterSection title="Legal" links={["Privacy Policy", "Terms & Conditions"]} />
      </div>
    </footer>
  );
};

export default Footer;
