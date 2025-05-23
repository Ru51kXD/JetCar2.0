import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { getTestDriveRequests, updateTestDriveStatus } from '../../services/adminService';
import { getAllCars } from '../../services/carService';
import { TestDriveRequest, Car } from '../../types/car';
import { FiCheck, FiX, FiClock, FiSearch } from 'react-icons/fi';

// Типизация иконок
const IconCheck = FiCheck as React.FC;
const IconX = FiX as React.FC;
const IconClock = FiClock as React.FC;
const IconSearch = FiSearch as React.FC;

const PageContainer = styled.div`
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c2c40;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  max-width: 400px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 15px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isActive ? '#d9a34a' : '#f5f5f5'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border: none;
  
  &:hover {
    background-color: ${props => props.isActive ? '#c08b35' : '#e9e9e9'};
  }
`;

const RequestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const RequestCard = styled.div<{ status: string }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-left: 5px solid 
    ${props => {
      switch(props.status) {
        case 'pending': return '#f9a825';
        case 'approved': return '#43a047';
        case 'completed': return '#1e88e5';
        case 'canceled': return '#e53935';
        default: return '#9e9e9e';
      }
    }};
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const ClientName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const RequestDate = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const RequestCarInfo = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 6px;
`;

const CarImage = styled.div<{ image: string }>`
  width: 80px;
  height: 50px;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  margin-right: 15px;
`;

const CarDetails = styled.div`
  flex: 1;
`;

const CarName = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const CarSpecs = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const RequestInfo = styled.div`
  margin-bottom: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-weight: 500;
  width: 120px;
  color: #666;
`;

const InfoValue = styled.div`
  flex: 1;
`;

const RequestMessage = styled.div`
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 12px;
  font-size: 0.9rem;
  margin-bottom: 15px;
  color: #555;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'pending': return '#fff8e1';
      case 'approved': return '#e8f5e9';
      case 'completed': return '#e3f2fd';
      case 'canceled': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending': return '#f57c00';
      case 'approved': return '#43a047';
      case 'completed': return '#1e88e5';
      case 'canceled': return '#e53935';
      default: return '#757575';
    }
  }};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button<{ variant: 'approve' | 'cancel' | 'complete' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background-color: ${props => {
    switch(props.variant) {
      case 'approve': return '#e8f5e9';
      case 'cancel': return '#ffebee';
      case 'complete': return '#e3f2fd';
    }
  }};
  color: ${props => {
    switch(props.variant) {
      case 'approve': return '#43a047';
      case 'cancel': return '#e53935';
      case 'complete': return '#1e88e5';
    }
  }};
  
  &:hover {
    background-color: ${props => {
      switch(props.variant) {
        case 'approve': return '#c8e6c9';
        case 'cancel': return '#ffcdd2';
        case 'complete': return '#bbdefb';
      }
    }};
  }
`;

const NoRequestsMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  color: #666;
  grid-column: 1 / -1;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 5px;
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  width: 36px;
  height: 36px;
  border: 1px solid ${props => props.isActive ? '#d9a34a' : '#ddd'};
  border-radius: 4px;
  background-color: ${props => props.isActive ? '#d9a34a' : 'white'};
  color: ${props => props.isActive ? 'white' : '#333'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? '#c08b35' : '#f9f9f9'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Тип для статуса заявки
type RequestStatus = 'all' | 'pending' | 'approved' | 'completed' | 'canceled';

const TestDriveRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<TestDriveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<TestDriveRequest[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<RequestStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Получаем данные о заявках и автомобилях параллельно
        const [requestsData, carsData] = await Promise.all([
          getTestDriveRequests(),
          getAllCars()
        ]);
        
        // Сортируем заявки по дате создания (от новых к старым)
        const sortedRequests = requestsData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setRequests(sortedRequests);
        setFilteredRequests(sortedRequests);
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching test drive requests:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Обработка фильтрации
  useEffect(() => {
    let result = requests;
    
    // Фильтрация по статусу
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }
    
    // Фильтрация по поиску
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(request => 
        request.name.toLowerCase().includes(term) || 
        request.email.toLowerCase().includes(term) || 
        request.phone.toLowerCase().includes(term) ||
        cars.find(car => car.id === request.carId)?.brand.toLowerCase().includes(term) ||
        cars.find(car => car.id === request.carId)?.model.toLowerCase().includes(term)
      );
    }
    
    setFilteredRequests(result);
    setPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [statusFilter, searchTerm, requests, cars]);
  
  const handleStatusChange = async (requestId: number, newStatus: "pending" | "approved" | "completed" | "canceled") => {
    try {
      await updateTestDriveStatus(requestId, newStatus);
      
      // Обновляем статус локально
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };
  
  // Форматирование даты
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Получаем статус на русском
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'pending': return 'В ожидании';
      case 'approved': return 'Подтверждено';
      case 'completed': return 'Завершено';
      case 'canceled': return 'Отменено';
      default: return status;
    }
  };
  
  // Пагинация
  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const paginatedRequests = filteredRequests.slice((page - 1) * pageSize, page * pageSize);
  
  if (loading) {
    return (
      <AdminLayout>
        <PageContainer>
          <PageTitle>Загрузка...</PageTitle>
        </PageContainer>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Заявки на тест-драйв</PageTitle>
        </PageHeader>
        
        <SearchContainer>
          <SearchIcon><IconSearch /></SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Поиск по имени, email, телефону или модели..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <FilterContainer>
          <FilterButton 
            isActive={statusFilter === 'all'} 
            onClick={() => setStatusFilter('all')}
          >
            Все заявки
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'pending'} 
            onClick={() => setStatusFilter('pending')}
          >
            В ожидании
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'approved'} 
            onClick={() => setStatusFilter('approved')}
          >
            Подтвержденные
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'completed'} 
            onClick={() => setStatusFilter('completed')}
          >
            Завершенные
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'canceled'} 
            onClick={() => setStatusFilter('canceled')}
          >
            Отмененные
          </FilterButton>
        </FilterContainer>
        
        <RequestsGrid>
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map(request => {
              const car = cars.find(car => car.id === request.carId);
              
              return (
                <RequestCard key={request.id} status={request.status}>
                  <RequestHeader>
                    <ClientName>{request.name}</ClientName>
                    <RequestDate>{formatDate(request.createdAt)}</RequestDate>
                  </RequestHeader>
                  
                  {car && (
                    <RequestCarInfo>
                      <CarImage image={car.mainImage} />
                      <CarDetails>
                        <CarName>{car.brand} {car.model}</CarName>
                        <CarSpecs>
                          {car.year}, {car.engine.volume}л, {car.transmission}
                        </CarSpecs>
                      </CarDetails>
                    </RequestCarInfo>
                  )}
                  
                  <RequestInfo>
                    <InfoRow>
                      <InfoLabel>Телефон:</InfoLabel>
                      <InfoValue>{request.phone}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Email:</InfoLabel>
                      <InfoValue>{request.email}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Дата тест-драйва:</InfoLabel>
                      <InfoValue>{formatDate(request.preferredDate)}, {request.preferredTime}</InfoValue>
                    </InfoRow>
                  </RequestInfo>
                  
                  {request.message && (
                    <RequestMessage>
                      {request.message}
                    </RequestMessage>
                  )}
                  
                  <StatusBadge status={request.status}>
                    {getStatusText(request.status)}
                  </StatusBadge>
                  
                  <ActionsContainer>
                    {request.status === 'pending' && (
                      <>
                        <ActionButton 
                          variant="approve" 
                          onClick={() => handleStatusChange(request.id, 'approved')}
                        >
                          <IconCheck /> Подтвердить
                        </ActionButton>
                        <ActionButton 
                          variant="cancel" 
                          onClick={() => handleStatusChange(request.id, 'canceled')}
                        >
                          <IconX /> Отменить
                        </ActionButton>
                      </>
                    )}
                    
                    {request.status === 'approved' && (
                      <ActionButton 
                        variant="complete" 
                        onClick={() => handleStatusChange(request.id, 'completed')}
                      >
                        <IconClock /> Отметить как завершенный
                      </ActionButton>
                    )}
                  </ActionsContainer>
                </RequestCard>
              );
            })
          ) : (
            <NoRequestsMessage>
              Заявки на тест-драйв не найдены
            </NoRequestsMessage>
          )}
        </RequestsGrid>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationButton 
              onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
              disabled={page === 1}
            >
              &lt;
            </PaginationButton>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationButton 
                key={i + 1}
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ))}
            
            <PaginationButton 
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={page === totalPages}
            >
              &gt;
            </PaginationButton>
          </Pagination>
        )}
      </PageContainer>
    </AdminLayout>
  );
};

export default TestDriveRequestsPage; 