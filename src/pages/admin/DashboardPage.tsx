import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTruck, FiCalendar, FiMessageSquare, FiUsers, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import AdminLayout from '../../components/admin/AdminLayout';
import { getTestDriveRequests, getContactRequests } from '../../services/adminService';
import { getAllCars } from '../../services/carService';
import { TestDriveRequest, ContactRequest, Car } from '../../types/car';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 30px;
  font-weight: 600;
  color: #2c2c40;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
  }
`;

const StatIconContainer = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${props => `${props.color}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  
  svg {
    color: ${props => props.color};
    font-size: 1.5rem;
  }
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #2c2c40;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const StatChange = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.isPositive ? '#2ecc71' : '#e74c3c'};
  margin-top: 5px;
  
  svg {
    margin-right: 5px;
  }
`;

const SectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c2c40;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #d9a34a;
  }
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RequestItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  border-left: 3px solid #d9a34a;
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RequestName = styled.div`
  font-weight: 600;
  color: #2c2c40;
`;

const RequestDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const RequestDetails = styled.div`
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 10px;
`;

const RequestStatus = styled.div<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  background-color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#fff8e1';
      case 'approved':
        return '#e8f5e9';
      case 'completed':
        return '#e3f2fd';
      case 'canceled':
        return '#ffebee';
      case 'new':
        return '#e0f7fa';
      case 'read':
        return '#f3e5f5';
      case 'replied':
        return '#e8f5e9';
      case 'archived':
        return '#eeeeee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending':
        return '#f57c00';
      case 'approved':
        return '#43a047';
      case 'completed':
        return '#1e88e5';
      case 'canceled':
        return '#e53935';
      case 'new':
        return '#00acc1';
      case 'read':
        return '#8e24aa';
      case 'replied':
        return '#43a047';
      case 'archived':
        return '#757575';
      default:
        return '#757575';
    }
  }};
`;

const NoRequestsMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
`;

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Типизация иконок
const IconTruck = FiTruck as React.FC;
const IconCalendar = FiCalendar as React.FC;
const IconMessageSquare = FiMessageSquare as React.FC;
const IconUsers = FiUsers as React.FC;
const IconArrowUp = FiArrowUp as React.FC;
const IconArrowDown = FiArrowDown as React.FC;

const DashboardPage: React.FC = () => {
  const [testDriveRequests, setTestDriveRequests] = useState<TestDriveRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [testDriveData, contactData, carsData] = await Promise.all([
          getTestDriveRequests(),
          getContactRequests(),
          getAllCars()
        ]);
        
        setTestDriveRequests(testDriveData);
        setContactRequests(contactData);
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'В ожидании';
      case 'approved':
        return 'Подтверждено';
      case 'completed':
        return 'Завершено';
      case 'canceled':
        return 'Отменено';
      case 'new':
        return 'Новое';
      case 'read':
        return 'Прочитано';
      case 'replied':
        return 'Отвечено';
      case 'archived':
        return 'В архиве';
      default:
        return status;
    }
  };
  
  // Статистика для карточек
  const pendingTestDrives = testDriveRequests.filter(req => req.status === 'pending').length;
  const unreadMessages = contactRequests.filter(req => req.status === 'new').length;
  const totalCars = cars.length;
  const availableCars = cars.filter(car => car.inStock).length;

  return (
    <AdminLayout>
      <DashboardContainer>
        <PageTitle>Панель управления</PageTitle>
        
        <StatsGrid>
          <StatCard>
            <StatIconContainer color="#1e88e5">
              <IconCalendar />
            </StatIconContainer>
            <StatContent>
              <StatValue>{pendingTestDrives}</StatValue>
              <StatLabel>Заявок на тест-драйв</StatLabel>
              <StatChange isPositive={true}>
                <IconArrowUp /> 12% с прошлой недели
              </StatChange>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer color="#43a047">
              <IconMessageSquare />
            </StatIconContainer>
            <StatContent>
              <StatValue>{unreadMessages}</StatValue>
              <StatLabel>Непрочитанных сообщений</StatLabel>
              <StatChange isPositive={false}>
                <IconArrowDown /> 5% с прошлой недели
              </StatChange>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer color="#e53935">
              <IconTruck />
            </StatIconContainer>
            <StatContent>
              <StatValue>{totalCars}</StatValue>
              <StatLabel>Всего автомобилей</StatLabel>
              <StatChange isPositive={true}>
                <IconArrowUp /> 8% с прошлого месяца
              </StatChange>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIconContainer color="#8e24aa">
              <IconUsers />
            </StatIconContainer>
            <StatContent>
              <StatValue>{availableCars}</StatValue>
              <StatLabel>Доступных авто</StatLabel>
              <StatChange isPositive={true}>
                <IconArrowUp /> 15% с прошлого месяца
              </StatChange>
            </StatContent>
          </StatCard>
        </StatsGrid>
        
        <SectionsContainer>
          <SectionCard>
            <SectionTitle>Последние заявки на тест-драйв</SectionTitle>
            
            {isLoading ? (
              <div>Загрузка...</div>
            ) : testDriveRequests.length > 0 ? (
              <RequestList>
                {testDriveRequests.slice(0, 5).map(request => (
                  <RequestItem key={request.id}>
                    <RequestHeader>
                      <RequestName>{request.name}</RequestName>
                      <RequestDate>{formatDate(request.createdAt)}</RequestDate>
                    </RequestHeader>
                    <RequestDetails>
                      <div>Автомобиль: {cars.find(car => car.id === request.carId)?.brand} {cars.find(car => car.id === request.carId)?.model}</div>
                      <div>Дата тест-драйва: {formatDate(request.preferredDate)}, {request.preferredTime}</div>
                    </RequestDetails>
                    <RequestStatus status={request.status}>
                      {getStatusText(request.status)}
                    </RequestStatus>
                  </RequestItem>
                ))}
              </RequestList>
            ) : (
              <NoRequestsMessage>Нет заявок на тест-драйв</NoRequestsMessage>
            )}
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>Последние сообщения</SectionTitle>
            
            {isLoading ? (
              <div>Загрузка...</div>
            ) : contactRequests.length > 0 ? (
              <RequestList>
                {contactRequests.slice(0, 5).map(request => (
                  <RequestItem key={request.id}>
                    <RequestHeader>
                      <RequestName>{request.name}</RequestName>
                      <RequestDate>{formatDate(request.createdAt)}</RequestDate>
                    </RequestHeader>
                    <RequestDetails>
                      <div>Тема: {request.subject || 'Без темы'}</div>
                      <div>{request.message.length > 100 ? `${request.message.substring(0, 100)}...` : request.message}</div>
                    </RequestDetails>
                    <RequestStatus status={request.status}>
                      {getStatusText(request.status)}
                    </RequestStatus>
                  </RequestItem>
                ))}
              </RequestList>
            ) : (
              <NoRequestsMessage>Нет новых сообщений</NoRequestsMessage>
            )}
          </SectionCard>
        </SectionsContainer>
      </DashboardContainer>
    </AdminLayout>
  );
};

export default DashboardPage; 