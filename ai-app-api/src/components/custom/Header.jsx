
import React from 'react';
import { Button } from '../ui/button';
function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Ograniczona wysokość logo */}
      <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
      {/* Przycisk Sign in */}
      <div>
        <Button className="px-4 py-2">Zalogowano</Button>
      </div>
    </div>
  );
}
export default Header;