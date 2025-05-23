import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiInstagram, FiPhone, FiMail, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';

// Type the icon components
const IconInstagram = FiInstagram as React.FC;
const IconPhone = FiPhone as React.FC;
const IconMail = FiMail as React.FC;
const IconMapPin = FiMapPin as React.FC;
const IconClock = FiClock as React.FC;
const IconArrowRight = FiArrowRight as React.FC;
const IconTelegram = SiTelegram as React.FC;
const IconWhatsapp = SiWhatsapp as React.FC;

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #fff;
  padding: 80px 0 40px;
`;

const FooterInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  
  span {
    color: #d9a34a;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #d9a34a;
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: #fff;
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #d9a34a;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 12px;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    font-size: 0.8rem;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #d9a34a;
    
    svg {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  
  svg {
    margin-right: 15px;
    margin-top: 3px;
    color: #d9a34a;
  }
`;

const ContactText = styled.div`
  flex: 1;
  
  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
    
    &:hover {
      color: #d9a34a;
    }
  }
`;

const Copyright = styled.div`
  max-width: 1400px;
  margin: 60px auto 0;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterSection>
          <FooterLogo to="/">
            Premium<span>Auto</span>
          </FooterLogo>
          <FooterText>
            Премиальный автосалон с лучшими предложениями эксклюзивных автомобилей. 
            Мы предлагаем индивидуальный подход к каждому клиенту и 
            высочайший уровень сервиса.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <IconInstagram />
            </SocialLink>
            <SocialLink href="https://t.me" target="_blank" rel="noopener noreferrer">
              <IconTelegram />
            </SocialLink>
            <SocialLink href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <IconWhatsapp />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Быстрые ссылки</FooterTitle>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink to="/catalog">
                <IconArrowRight />
                Каталог автомобилей
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/test-drive">
                <IconArrowRight />
                Запись на тест-драйв
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/about">
                <IconArrowRight />
                О компании
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/contact">
                <IconArrowRight />
                Контакты
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/admin/login" style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                Панель администратора
              </FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Услуги</FooterTitle>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink to="/catalog">
                <IconArrowRight />
                Продажа автомобилей
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/services">
                <IconArrowRight />
                Покупка автомобилей
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/services">
                <IconArrowRight />
                Обмен автомобилей
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/services">
                <IconArrowRight />
                Прием на комиссию
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/services">
                <IconArrowRight />
                Заказ авто
              </FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Контакты</FooterTitle>
          <ContactItem>
            <IconPhone />
            <ContactText>
              <p><a href="tel:+79361526567">+7 (936) 152-65-67</a></p>
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <IconMail />
            <ContactText>
              <p><a href="mailto:info@premiumauto.ru">info@premiumauto.ru</a></p>
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <IconMapPin />
            <ContactText>
              <p>г. Астана, ул. Кабанбай батыра 53</p>
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <IconClock />
            <ContactText>
              <p>Пн-Вс: 10:00 - 21:00</p>
            </ContactText>
          </ContactItem>
        </FooterSection>
      </FooterInner>
      
      <Copyright>
        © {new Date().getFullYear()} PremiumAuto. Все права защищены.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 