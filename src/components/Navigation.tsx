import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen = true, onClose, className = '' }) => {
  return (
    <motion.nav 
      className={`flex items-center space-x-8 ${className}`}
      initial={{ opacity: isOpen ? 0 : 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link 
        to="/" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        Главная
      </Link>
      <Link 
        to="/catalog" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        Каталог
      </Link>
      <Link 
        to="/#special-offers" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        Спецпредложения
      </Link>
      <Link 
        to="/test-drive" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        Тест-драйв
      </Link>
      <Link 
        to="/about" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        О компании
      </Link>
      <Link 
        to="/contact" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        Контакты
      </Link>
      <Link 
        to="/#faq" 
        className="text-gray-800 hover:text-primary font-medium transition-colors duration-300"
      >
        FAQ
      </Link>
    </motion.nav>
  );
};

export default Navigation; 