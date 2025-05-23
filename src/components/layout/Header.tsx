import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

// Properly typed AnimatePresence
const AnimatePresence = FramerAnimatePresence as React.FC<{
  children: React.ReactNode;
}>;

// Type the icon components
const IconPhone = FiPhone as React.FC;
const IconX = FiX as React.FC;
const IconMenu = FiMenu as React.FC;

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ isScrolled }) => isScrolled ? 'rgba(10, 10, 20, 0.92)' : 'rgba(25, 25, 35, 0.85)'};
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);
  box-shadow: ${({ isScrolled }) => isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.15)' : '0 5px 20px rgba(0, 0, 0, 0.1)'};
  border-bottom: ${({ isScrolled }) => isScrolled ? '1px solid rgba(217, 163, 74, 0.2)' : '1px solid rgba(217, 163, 74, 0.1)'};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  z-index: 1001;
  display: flex;
  align-items: center;
  
  span {
    color: #d9a34a;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #d9a34a;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
  }
  
  &:hover span:after {
    transform: scaleX(1);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 20px;
`;

const NavLinkStyled = styled(NavLink)`
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  padding: 5px 0;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #d9a34a;
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &.active {
    color: #d9a34a;
  }
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  margin-left: 30px;
  color: #fff;
  font-weight: 600;
  background-color: #d9a34a;
  padding: 12px 20px;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(217, 163, 74, 0.2);
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 163, 74, 0.3);
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(20, 20, 30, 0.97) 0%, rgba(30, 30, 40, 0.97) 100%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled(motion.li)`
  margin: 15px 0;
`;

const MobileNavLink = styled(NavLink)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  
  &.active {
    color: #d9a34a;
  }
`;

const MobileContactButton = styled(motion.a)`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #fff;
  font-weight: 600;
  background-color: #d9a34a;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(217, 163, 74, 0.2);
  
  svg {
    margin-right: 10px;
  }
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 20px rgba(217, 163, 74, 0.3);
  }
`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <HeaderInner>
        <Logo to="/">
          Premium<span>Auto</span>
        </Logo>
        
        <Nav>
          <NavList>
            <NavItem>
              <NavLinkStyled to="/">Главная</NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/catalog">Каталог</NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/test-drive">Тест-драйв</NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/about">О нас</NavLinkStyled>
            </NavItem>
            <NavItem>
              <NavLinkStyled to="/contact">Контакты</NavLinkStyled>
            </NavItem>
          </NavList>
          
          <ContactButton href="tel:+79361526567">
            <IconPhone />
            +7 (936) 152-65-67
          </ContactButton>
        </Nav>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <IconX /> : <IconMenu />}
        </MobileMenuButton>
        
        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MobileNavList>
                <MobileNavItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <MobileNavLink to="/" onClick={closeMenu}>Главная</MobileNavLink>
                </MobileNavItem>
                <MobileNavItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <MobileNavLink to="/catalog" onClick={closeMenu}>Каталог</MobileNavLink>
                </MobileNavItem>
                <MobileNavItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <MobileNavLink to="/test-drive" onClick={closeMenu}>Тест-драйв</MobileNavLink>
                </MobileNavItem>
                <MobileNavItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <MobileNavLink to="/about" onClick={closeMenu}>О нас</MobileNavLink>
                </MobileNavItem>
                <MobileNavItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <MobileNavLink to="/contact" onClick={closeMenu}>Контакты</MobileNavLink>
                </MobileNavItem>
              </MobileNavList>
              
              <MobileContactButton 
                href="tel:+79361526567"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <IconPhone />
                +7 (936) 152-65-67
              </MobileContactButton>
            </MobileMenu>
          )}
        </AnimatePresence>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header; 