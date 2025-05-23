import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

// Type the icon components
const IconArrowLeft = FiArrowLeft as React.FC;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 160px auto 80px;
  padding: 0 20px;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 10rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #d9a34a 0%, #eac37c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
  
  @media (max-width: 576px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #d9a34a;
  color: white;
  font-weight: 600;
  padding: 15px 25px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: #c08b35;
    
    svg {
      transform: translateX(-5px);
    }
  }
`;

const LinksContainer = styled.div`
  margin-top: 40px;
`;

const PageLink = styled(Link)`
  display: inline-block;
  margin: 0 15px;
  color: #666;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d9a34a;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorCode>404</ErrorCode>
        <Title>Страница не найдена</Title>
        <Description>
          Извините, но запрашиваемая вами страница не существует или была перемещена.
          Вы можете вернуться на главную страницу или перейти к одному из разделов сайта.
        </Description>
        
        <Button to="/">
          <IconArrowLeft /> Вернуться на главную
        </Button>
        
        <LinksContainer>
          <PageLink to="/catalog">Каталог автомобилей</PageLink>
          <PageLink to="/test-drive">Тест-драйв</PageLink>
          <PageLink to="/about">О компании</PageLink>
          <PageLink to="/contact">Контакты</PageLink>
        </LinksContainer>
      </motion.div>
    </PageContainer>
  );
};

export default NotFoundPage; 