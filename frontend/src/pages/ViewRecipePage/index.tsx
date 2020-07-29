import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const ViewRecipePage = () => {
  return (
    <div>
      <Navbar />
      <div className='view-recipe'>
        <div className='view-recipe__header'>
          <img src={`${process.env.PUBLIC_URL}/veggieStirFry.jpg`} alt='stir fry' className='view-recipe__img' />
          <div>
            <h1>Tempeh Stirfry</h1>
            <p>Prep Time: 10 minutes</p>
            <p>Cook Time: 20 minutes</p>
            <p>Total Time: 30 minutes</p>
          </div>
        </div>
        <hr />
        <div className='view-recipe__content'>
          <div className='view-recipe__item'>
            <h2>Ingredients:</h2>
            <ul>
              <li>Head</li>
              <li>2 Legs</li>
              <li>2 Arms</li>
              <li>Eye sockets</li>
            </ul>
          </div>
          <div className='view-recipe__item'>
            <h2>Instructions:</h2>
            <ol>
              <li>Kill First born child.</li>
              <li>Chop up the body and skin the flesh from the boy</li>
              <li>Saute very slightly, however not too much</li>
              <li>Create a small slice in the head, this is important</li>
              <li>Enjoy! Serves up to 3 people.</li>
              <li>Saute very slightly, however not too much</li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
