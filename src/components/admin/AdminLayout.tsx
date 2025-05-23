import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiHome, 
  FiTruck,
  FiCalendar, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import { AdminUser } from '../../types/car';

// Типизация иконок
const IconHome = FiHome as React.FC;
const IconTruck = FiTruck as React.FC;
const IconCalendar = FiCalendar as React.FC;
const IconMessageSquare = FiMessageSquare as React.FC;
const IconSettings = FiSettings as React.FC;
const IconLogOut = FiLogOut as React.FC;
const IconMenu = FiMenu as React.FC;
const IconX = FiX as React.FC;
const IconChevronDown = FiChevronDown as React.FC;

const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div<{ isCollapsed: boolean }>`
  width: ${props => props.isCollapsed ? '80px' : '260px'};
  background: linear-gradient(135deg, #1e1e2f 0%, #2c2c40 100%);
  color: #fff;
  transition: width 0.3s ease;
  overflow-x: hidden;
  position: fixed;
  height: 100vh;
  z-index: 100;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transform: translateX(0);
  
  @media (max-width: 768px) {
    transform: translateX(-100%);
  }
`;

const MobileSidebar = styled(Sidebar)<{ isOpen: boolean }>`
  @media (max-width: 768px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(Link)<{ isCollapsed: boolean }>`
  font-family: 'Playfair Display', serif;
  font-size: ${props => props.isCollapsed ? '1.2rem' : '1.5rem'};
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  
  span {
    color: #d9a34a;
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarContent = styled.div`
  padding: 20px 0;
  overflow-y: auto;
  height: calc(100vh - 200px);
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: 0;
  width: 100%;
  background: inherit;
`;

const NavGroup = styled.div`
  margin-bottom: 15px;
`;

const NavGroupTitle = styled.h6<{ isCollapsed: boolean }>`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  padding: ${props => props.isCollapsed ? '10px 0' : '10px 20px'};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${props => props.isCollapsed ? 'center' : 'left'};
`;

const NavItem = styled(Link)<{ isActive: boolean, isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => props.isCollapsed ? '12px 0' : '12px 20px'};
  color: ${props => props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: ${props => props.isActive ? '#d9a34a' : 'transparent'};
  }
  
  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const NavItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 15px;
  color: #d9a34a;
`;

const NavItemText = styled.span<{ isCollapsed: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'block'};
  white-space: nowrap;
`;

const LogoutButton = styled.button<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: ${props => props.isCollapsed ? '12px 0' : '12px 20px'};
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease;
  justify-content: ${props => props.isCollapsed ? 'center' : 'flex-start'};
  
  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const LogoutIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 15px;
  color: #ff6b6b;
`;

const LogoutText = styled.span<{ isCollapsed: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'block'};
  white-space: nowrap;
`;

const UserInfo = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => props.isCollapsed ? '10px 0' : '10px 20px'};
  cursor: pointer;
  justify-content: ${props => props.isCollapsed ? 'center' : 'space-between'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #d9a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 15px;
`;

const UserDetails = styled.div<{ isCollapsed: boolean }>`
  flex: 1;
  display: ${props => props.isCollapsed ? 'none' : 'block'};
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserRole = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;

const ExpandIcon = styled.span<{ isCollapsed: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'flex'};
  font-size: 1.2rem;
`;

const Content = styled.div<{ isCollapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.isCollapsed ? '80px' : '260px'};
  padding: 20px;
  transition: margin-left 0.3s ease;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const MobileMenuButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  background-color: #2c2c40;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // При загрузке компонента проверяем авторизацию
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/admin/login');
    }
    
    // Закрываем мобильное меню при изменении маршрута
    setIsMobileMenuOpen(false);
  }, [navigate, location.pathname]);
  
  const handleLogout = () => {
    // Удаляем данные пользователя из localStorage
    localStorage.removeItem('adminUser');
    // Перенаправляем на страницу входа
    navigate('/admin/login');
  };
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Если пользователь не авторизован, не рендерим макет
  if (!currentUser) {
    return null;
  }
  
  // Получаем инициалы пользователя для аватара
  const userInitials = currentUser.fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .slice(0, 2);
  
  return (
    <AdminLayoutContainer>
      {/* Мобильная кнопка меню */}
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <IconX /> : <IconMenu />}
      </MobileMenuButton>
      
      {/* Боковое меню */}
      <MobileSidebar 
        isCollapsed={isCollapsed}
        isOpen={isMobileMenuOpen}
      >
        <SidebarHeader>
          <Logo to="/admin/dashboard" isCollapsed={isCollapsed}>
            {isCollapsed ? <span>PA</span> : <span>Premium Auto</span>}
          </Logo>
          <CollapseButton onClick={toggleSidebar}>
            {isCollapsed ? <IconMenu /> : <IconX />}
          </CollapseButton>
        </SidebarHeader>
        
        <UserInfo isCollapsed={isCollapsed}>
          <UserAvatar>{userInitials}</UserAvatar>
          <UserDetails isCollapsed={isCollapsed}>
            <UserName>{currentUser.fullName}</UserName>
            <UserRole>{currentUser.role === 'admin' ? 'Администратор' : 'Менеджер'}</UserRole>
          </UserDetails>
          <ExpandIcon isCollapsed={isCollapsed}>
            <IconChevronDown />
          </ExpandIcon>
        </UserInfo>
        
        <SidebarContent>
          <NavGroup>
            <NavGroupTitle isCollapsed={isCollapsed}>Основное</NavGroupTitle>
            <NavItem 
              to="/admin/dashboard" 
              isActive={location.pathname === '/admin/dashboard'} 
              isCollapsed={isCollapsed}
            >
              <NavItemIcon><IconHome /></NavItemIcon>
              <NavItemText isCollapsed={isCollapsed}>Дашборд</NavItemText>
            </NavItem>
          </NavGroup>
          
          <NavGroup>
            <NavGroupTitle isCollapsed={isCollapsed}>Управление</NavGroupTitle>
            <NavItem 
              to="/admin/cars" 
              isActive={location.pathname.includes('/admin/cars')} 
              isCollapsed={isCollapsed}
            >
              <NavItemIcon><IconTruck /></NavItemIcon>
              <NavItemText isCollapsed={isCollapsed}>Автомобили</NavItemText>
            </NavItem>
            <NavItem 
              to="/admin/test-drive" 
              isActive={location.pathname.includes('/admin/test-drive')} 
              isCollapsed={isCollapsed}
            >
              <NavItemIcon><IconCalendar /></NavItemIcon>
              <NavItemText isCollapsed={isCollapsed}>Заявки на тест-драйв</NavItemText>
            </NavItem>
            <NavItem 
              to="/admin/contacts" 
              isActive={location.pathname.includes('/admin/contacts')} 
              isCollapsed={isCollapsed}
            >
              <NavItemIcon><IconMessageSquare /></NavItemIcon>
              <NavItemText isCollapsed={isCollapsed}>Сообщения</NavItemText>
            </NavItem>
          </NavGroup>
          
          <NavGroup>
            <NavGroupTitle isCollapsed={isCollapsed}>Система</NavGroupTitle>
            <NavItem 
              to="/admin/settings" 
              isActive={location.pathname.includes('/admin/settings')} 
              isCollapsed={isCollapsed}
            >
              <NavItemIcon><IconSettings /></NavItemIcon>
              <NavItemText isCollapsed={isCollapsed}>Настройки</NavItemText>
            </NavItem>
          </NavGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <LogoutButton onClick={handleLogout} isCollapsed={isCollapsed}>
            <LogoutIcon><IconLogOut /></LogoutIcon>
            <LogoutText isCollapsed={isCollapsed}>Выйти</LogoutText>
          </LogoutButton>
        </SidebarFooter>
      </MobileSidebar>
      
      {/* Основной контент */}
      <Content isCollapsed={isCollapsed}>
        {children}
      </Content>
    </AdminLayoutContainer>
  );
};

export default AdminLayout; 