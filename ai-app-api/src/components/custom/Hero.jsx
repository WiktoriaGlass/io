import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1
        className="font-extrabold text-[50px] text-center mt-16"
      > 
        <span className="text-[hsl(32,89%,58%)]">
          Aplikacja umożliwiająca zaplanowanie idealnych wakacji
        </span>
        <span className="block">
          Z wykorzystaniem elementów sztucznej inteligencji
        </span>
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Inżynieria Oprogramowania
      </p>
      <Link to ={'/create-trip'}>
      <Button>Kliknij, aby zacząć!</Button>
      </Link>
    </div>
  );

}

export default Hero;
