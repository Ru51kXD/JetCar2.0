import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloseIcon } from './Icons';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  // Close mobile nav when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);
  
  // Animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      className="fixed inset-0 z-50 bg-white lg:hidden"
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <CloseIcon className="w-6 h-6 text-gray-900" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-6 text-xl font-medium">
          <Link
            to="/"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            Главная
          </Link>
          <Link
            to="/catalog"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            Каталог
          </Link>
          <Link
            to="/#special-offers"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            Спецпредложения
          </Link>
          <Link
            to="/test-drive"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            Тест-драйв
          </Link>
          <Link
            to="/about"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            О компании
          </Link>
          <Link
            to="/contact"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            Контакты
          </Link>
          <Link
            to="/#faq"
            className="text-gray-900 hover:text-primary transition-colors duration-300"
            onClick={onClose}
          >
            FAQ
          </Link>
        </nav>
      </div>
    </motion.div>
  );
};

export default MobileNavigation; 