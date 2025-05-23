import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import { authenticateAdmin } from '../../services/adminService';

// Типизация иконок
const IconUser = FiUser as React.FC;
const IconLock = FiLock as React.FC;
const IconLogIn = FiLogIn as React.FC;

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e1e2f 0%, #2c2c40 100%);
`;

const LoginCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 460px;
  padding: 40px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, #d9a34a, #c08b35);
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Logo = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2c2c40;
  
  span {
    color: #d9a34a;
  }
`;

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #d9a34a;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px 15px 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
    box-shadow: 0 0 0 3px rgba(217, 163, 74, 0.1);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #d9a34a;
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #d9a34a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background-color: #c08b35;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled(motion.div)`
  background-color: #ffe4e4;
  border-left: 4px solid #ff5757;
  padding: 10px 15px;
  color: #c62828;
  font-size: 0.9rem;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Проверяем, авторизован ли пользователь уже
  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const user = await authenticateAdmin(username, password);
      
      if (user) {
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('adminUser', JSON.stringify(user));
        // Перенаправляем на дашборд
        navigate('/admin/dashboard');
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      setError('Произошла ошибка при входе. Пожалуйста, попробуйте снова.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoContainer>
          <Logo>
            Premium <span>Auto</span>
          </Logo>
        </LogoContainer>
        
        <LoginTitle>Вход в панель администратора</LoginTitle>
        
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon>
              <IconUser />
            </InputIcon>
            <Input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </FormGroup>
          
          <FormGroup>
            <InputIcon>
              <IconLock />
            </InputIcon>
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти в систему'}
            {!isLoading && <IconLogIn />}
          </SubmitButton>
        </Form>
      </LoginCard>
    </PageContainer>
  );
};

export default LoginPage; 