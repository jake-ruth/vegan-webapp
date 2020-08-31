import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Modal } from '../../components/Modal';

export const AboutPage = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <div className='about-page'>
      <Navbar />
      <div>
        <h1>About Us</h1>
        <div className='about-page__content'>
          <p className='about-page__description'>
            Plant based plates is a web app created by myself (Jake Ruth) as a way to bring plant based eaters together to share
            recipes, insights, and spread the joy of vegan cooking! I have found immense joy in creating meals are low cost,
            ethical, and better for the environment! Eating plant based is a great and easy way to do all of these things. My hope
            is that with our community, we can grow a large collection of plant based recipes to show the world that you don't
            have to restrict to eat a vegan diet! :)
          </p>
          <div className='about-page__contact'>
            <h2>Contact Us!</h2>
            <p>
              Send an email to <strong>plantbasedplates@gmail.com</strong> for feedback and suggestions
            </p>
            <button className='btn-primary' onClick={() => setShowModal(true)}>
              Sign up for mailing list!
            </button>
          </div>
        </div>
      </div>
      <div className='footer-fixed'>
        <Footer />
      </div>
      <Modal visible={showModal} setVisible={setShowModal}>
        <h2>Subscribe to our mailing list!</h2>
        <label>Enter your email:</label>
        <input type='text' name='email' />
        <button className='btn-primary' onClick={() => setShowModal(!showModal)}>
          Submit
        </button>
      </Modal>
    </div>
  );
};
