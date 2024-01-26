import React from 'react';
import TextComponent from './Text';

const Header = () => {
  return (
    <div className="flex items-center  justify-center flex-col md:flex-row">
      <img
        srcSet="/images/logo.png" 
        className="w-20 h-auto max-w-xl rounded-lg mb-4 md:mb-0 md:mr-4"
        alt="Al Hayyat Embroidery Logo"
      />
      <TextComponent title={'Al Hayat Embroidery'} />
    </div>
  );
}

export default Header;
