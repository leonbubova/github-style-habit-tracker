import React, { useState, useEffect, useRef } from 'react';

interface BurgerMenuProps {
  links: { href: string; text: string }[];
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="burger-menu" ref={menuRef}>
      <button className="burger-button" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu-items">
          {links.map((link, index) => (
            <a key={index} href={link.href} onClick={toggleMenu}>
              {link.text}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .burger-menu {
          display: none;
        }
        .burger-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #24292e;
          padding: 5px;
        }
        .menu-items {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: #ffffff;
          border: 1px solid #e1e4e8;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(149,157,165,0.2);
          padding: 8px 0;
          min-width: 160px;
        }
        .menu-items a {
          display: block;
          padding: 8px 16px;
          color: #24292e;
          text-decoration: none;
          transition: background-color 0.2s ease;
          font-size: 14px;
        }
        .menu-items a:hover {
          background-color: #f6f8fa;
          color: #40c463;
        }

        @media (max-width: 768px) {
          .burger-menu {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default BurgerMenu;