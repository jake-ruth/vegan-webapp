import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RecipeCard } from '../../components/RecipeCard';
import { Footer } from '../../components/Footer';

export const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className='about-page'>
        <h1>About Us</h1>
        <div className='about-page__content'>
          <p>
            Plant based plates is a web app created by myself (Jake Ruth) as a way to bring plant based eaters together to share
            recipes, insights, and spread the joy of vegan cooking! I have found immense joy in creating meals are low cost,
            ethical, and better for the environment! Eating plant based is a great and easy way to do all of these things. My hope
            is that with our community, we can grow a large collection of plant based recipes to show the world that you don't
            have to restrict to eat a vegan diet! :)
          </p>
          <div className='about-page__contact'>
            <h2>Contact Us!</h2>
            <hr />
            <p>
              Send an email to <strong>plantbasedplates@gmail.com</strong> for feedback and suggestions
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
