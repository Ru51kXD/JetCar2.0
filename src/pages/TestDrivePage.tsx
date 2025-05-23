import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Car } from '../types/car';
import { getAllCars } from '../services/carService';
import { submitTestDriveRequest } from '../services/adminService';

// Properly typed AnimatePresence
const AnimatePresence = FramerAnimatePresence as React.FC<{
  children: React.ReactNode;
}>;

// Type the icon components
const IconCalendar = FiCalendar as React.FC;
const IconClock = FiClock as React.FC;
const IconCheck = FiCheck as React.FC;
const IconArrowLeft = FiArrowLeft as React.FC;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 100px auto 80px;
  padding: 0 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TestDriveContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 40px;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #d9a34a;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  transition: border-color 0.3s ease;
  resize: vertical;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  background-color: #d9a34a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1rem;
  
  svg {
    margin-right: 10px;
    color: #d9a34a;
  }
`;

// Новые стили для улучшенной анимации успешной записи
const SuccessCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  padding: 50px 40px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eaf9f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  
  svg {
    color: #2ecc71;
    width: 50px;
    height: 50px;
    stroke-width: 2;
  }
`;

const SuccessTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const SuccessText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #555;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: #d9a34a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    border-color: #333;
    transform: translateY(-3px);
  }
`;

const CarGroupDetails = styled.div`
  margin-top: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid #eee;
`;

const CarDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CarImage = styled.div`
  width: 60px;
  height: 40px;
  margin-right: 15px;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
`;

const CarInfo = styled.div`
  flex: 1;
`;

const CarName = styled.div`
  font-weight: 600;
  margin-bottom: 3px;
`;

const CarSpecs = styled.div`
  font-size: 0.85rem;
  color: #777;
`;

const TestDrivePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await getAllCars({ inStock: true });
        setCars(carsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // Обновить детали выбранного автомобиля при изменении selectedCar
    if (selectedCar) {
      const carDetails = cars.find(car => car.id === selectedCar) || null;
      setSelectedCarDetails(carDetails);
    } else {
      setSelectedCarDetails(null);
    }
  }, [selectedCar, cars]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar || !selectedCarDetails) return;

    // Отправляем данные через сервис
    submitTestDriveRequest({
      carId: selectedCar,
      name,
      phone,
      email,
      preferredDate: new Date(date),
      preferredTime: time,
      message
    }).then(() => {
      // Показываем успешное подтверждение
      setSubmitted(true);
    }).catch(error => {
      console.error('Ошибка при отправке заявки на тест-драйв:', error);
      // В реальном приложении здесь был бы код для отображения ошибки пользователю
    });
  };

  if (submitted) {
    return (
      <PageContainer>
        <AnimatePresence>
          <SuccessCard
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.3, 
                type: "spring",
                stiffness: 200
              }}
            >
              <SuccessIcon>
                <IconCheck />
              </SuccessIcon>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <SuccessTitle>Запись успешно создана!</SuccessTitle>
              <SuccessText>
                Мы получили вашу заявку на тест-драйв и скоро свяжемся с вами для подтверждения.
                {selectedCarDetails && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <CarGroupDetails>
                      <strong>Выбранный автомобиль:</strong>
                      <CarDetails>
                        <CarImage 
                          style={{ backgroundImage: `url(${selectedCarDetails.mainImage})` }} 
                        />
                        <CarInfo>
                          <CarName>{selectedCarDetails.brand} {selectedCarDetails.model}</CarName>
                          <CarSpecs>
                            {selectedCarDetails.year}, {selectedCarDetails.engine.volume}л, 
                            {selectedCarDetails.transmission}
                          </CarSpecs>
                        </CarInfo>
                      </CarDetails>
                    </CarGroupDetails>
                  </motion.div>
                )}
              </SuccessText>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <ButtonsContainer>
                <SecondaryButton to="/">
                  <IconArrowLeft /> Вернуться на главную
                </SecondaryButton>
                <PrimaryButton to="/catalog">
                  Посмотреть все автомобили
                </PrimaryButton>
              </ButtonsContainer>
            </motion.div>
          </SuccessCard>
        </AnimatePresence>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader>
          <PageTitle>Запись на тест-драйв</PageTitle>
          <PageDescription>
            Хотите оценить автомобиль перед покупкой? Запишитесь на тест-драйв, и наши 
            специалисты помогут вам узнать все о выбранном автомобиле.
          </PageDescription>
        </PageHeader>
      </motion.div>

      <TestDriveContainer>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormContainer>
            <FormTitle>Заполните форму</FormTitle>
            <form onSubmit={handleSubmit}>
              <Row>
                <FormGroup>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>
              </Row>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="car">Выберите автомобиль</Label>
                <Select 
                  id="car" 
                  required
                  value={selectedCar || ''}
                  onChange={(e) => setSelectedCar(Number(e.target.value))}
                >
                  <option value="">Выберите автомобиль</option>
                  {cars.map(car => (
                    <option key={car.id} value={car.id}>
                      {car.brand} {car.model} ({car.year}) - {car.engine.volume}л, {car.transmission}
                    </option>
                  ))}
                </Select>
                
                {selectedCarDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CarGroupDetails>
                      <CarDetails>
                        <CarImage 
                          style={{ backgroundImage: `url(${selectedCarDetails.mainImage})` }} 
                        />
                        <CarInfo>
                          <CarName>{selectedCarDetails.brand} {selectedCarDetails.model}</CarName>
                          <CarSpecs>
                            {selectedCarDetails.year}, {selectedCarDetails.engine.volume}л, 
                            {selectedCarDetails.engine.power} л.с., {selectedCarDetails.transmission}, 
                            {selectedCarDetails.color}
                          </CarSpecs>
                        </CarInfo>
                      </CarDetails>
                    </CarGroupDetails>
                  </motion.div>
                )}
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label htmlFor="date">Дата</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="time">Время</Label>
                  <Select 
                    id="time" 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Выберите время</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                  </Select>
                </FormGroup>
              </Row>

              <FormGroup>
                <Label htmlFor="message">Сообщение (опционально)</Label>
                <TextArea 
                  id="message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormGroup>

              <SubmitButton type="submit">Записаться на тест-драйв</SubmitButton>
            </form>
          </FormContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <InfoContainer>
            <InfoCard>
              <InfoTitle>Как проходит тест-драйв?</InfoTitle>
              <InfoText>
                Во время тест-драйва вы сможете оценить динамические характеристики автомобиля, 
                комфорт салона, эргономику и другие важные аспекты. Наш специалист будет 
                сопровождать вас и ответит на все интересующие вопросы.
              </InfoText>
              <InfoList>
                <InfoItem>
                  <IconClock /> Продолжительность тест-драйва: 30-60 минут
                </InfoItem>
                <InfoItem>
                  <IconCalendar /> Тест-драйв проводится ежедневно с 10:00 до 20:00
                </InfoItem>
              </InfoList>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Что нужно для тест-драйва?</InfoTitle>
              <InfoText>
                Для прохождения тест-драйва вам понадобится:
              </InfoText>
              <InfoList>
                <InfoItem>• Водительское удостоверение категории B</InfoItem>
                <InfoItem>• Стаж вождения от 2 лет</InfoItem>
                <InfoItem>• Паспорт гражданина РФ</InfoItem>
              </InfoList>
            </InfoCard>
          </InfoContainer>
        </motion.div>
      </TestDriveContainer>
    </PageContainer>
  );
};

export default TestDrivePage; 