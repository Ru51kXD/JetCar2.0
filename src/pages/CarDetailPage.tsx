import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiTruck, FiSettings, FiInfo } from 'react-icons/fi';
import { Car } from '../types/car';
import { getCar } from '../services/carService';

// Type the icon components
const IconArrowRight = FiArrowRight as React.FC;
const IconCalendar = FiCalendar as React.FC;
const IconTruck = FiTruck as React.FC;
const IconSettings = FiSettings as React.FC;
const IconInfo = FiInfo as React.FC;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 100px auto 80px;
  padding: 0 20px;
`;

const BreadcrumbsContainer = styled.div`
  margin-bottom: 30px;
  
  a {
    color: #777;
    transition: color 0.3s ease;
    
    &:hover {
      color: #d9a34a;
    }
  }
  
  span {
    margin: 0 8px;
    color: #999;
  }
`;

const CarDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryContainer = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #f0f0f0 30%, #f8f8f8 50%, #f0f0f0 70%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  
  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Thumbnail = styled.div<{active: boolean}>`
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.7};
  transition: all 0.3s ease;
  border: ${props => props.active ? '2px solid #d9a34a' : 'none'};
  box-shadow: ${props => props.active ? '0 5px 15px rgba(217, 163, 74, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    opacity: 1;
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarInfo = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 35px;
  align-self: flex-start;
  position: sticky;
  top: 100px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CarTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 5px;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #d9a34a;
  margin: 20px 0;
  position: relative;
  display: flex;
  align-items: center;
  
  &:before {
    content: '₸';
    font-size: 1.5rem;
    margin-right: 3px;
    opacity: 0.8;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
  
  svg {
    margin-right: 15px;
    color: #d9a34a;
    font-size: 1.2rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PrimaryButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #d9a34a;
  color: white;
  padding: 16px 30px;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(217, 163, 74, 0.2);
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 163, 74, 0.3);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const SecondaryButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: transparent;
  color: #333;
  padding: 16px 30px;
  border-radius: 30px;
  font-weight: 600;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #d9a34a;
    color: #d9a34a;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const CarDetailsSection = styled.div`
  margin-top: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
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

const DescriptionText = styled.div`
  line-height: 1.8;
  color: #555;
  margin-bottom: 40px;
  
  p {
    margin-bottom: 20px;
  }
`;

const SpecificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div`
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const SpecName = styled.span`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
`;

const SpecValue = styled.span`
  font-weight: 600;
  color: #333;
`;

// Конвертация в тенге (курс примерно 1 рубль = 5.5 тенге)
const convertToTenge = (roublePrice: number): number => {
  return Math.round(roublePrice * 5.5);
};

// Форматирование цены
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        if (id) {
          setLoading(true);
          const carData = await getCar(parseInt(id));
          setCar(carData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);
  
  // Компонент для отложенной загрузки изображений
  const LazyImage = ({ src, alt }: { src: string, alt: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    
    useEffect(() => {
      // Сразу установить src для быстрой загрузки
      if (imgRef.current) {
        imgRef.current.src = src;
      }
      
      const handleLoad = () => {
        setIsLoaded(true);
      };
      
      // Если изображение уже загружено в кэш
      if (imgRef.current && imgRef.current.complete) {
        setIsLoaded(true);
      }
      
      const img = imgRef.current;
      if (img) {
        img.addEventListener('load', handleLoad);
        return () => {
          img.removeEventListener('load', handleLoad);
        };
      }
    }, [src]);
    
    return (
      <>
        {!isLoaded && <ImagePlaceholder />}
        <img 
          ref={imgRef}
          alt={alt}
          style={{ display: isLoaded ? 'block' : 'none' }}
        />
      </>
    );
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '500px',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <ImagePlaceholder style={{ width: '100%', maxWidth: '800px', height: '400px', borderRadius: '12px' }} />
          <div>Загрузка информации об автомобиле...</div>
        </div>
      </PageContainer>
    );
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <PageContainer>
      <BreadcrumbsContainer>
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/catalog">Каталог</Link>
        <span>/</span>
        {car.brand} {car.model}
      </BreadcrumbsContainer>

      <CarDetailContainer>
        <GalleryContainer>
          <MainImage>
            <LazyImage src={car.images[activeImage]} alt={`${car.brand} ${car.model}`} />
          </MainImage>
          <Thumbnails>
            {car.images.map((image, index) => (
              <Thumbnail 
                key={index} 
                active={index === activeImage}
                onClick={() => setActiveImage(index)}
              >
                <LazyImage src={image} alt={`${car.brand} ${car.model} thumbnail ${index + 1}`} />
              </Thumbnail>
            ))}
          </Thumbnails>
        </GalleryContainer>

        <CarInfo>
          <CarTitle>{car.brand} {car.model}</CarTitle>
          <div>{car.generation}, {car.year}</div>
          <Price>{formatPrice(convertToTenge(car.price))}</Price>
          
          <FeaturesList>
            <FeatureItem>
              <IconCalendar /> {car.year} год
            </FeatureItem>
            <FeatureItem>
              <IconTruck /> {car.mileage.toLocaleString()} км
            </FeatureItem>
            <FeatureItem>
              <IconSettings /> {car.engine.volume} л / {car.engine.power} л.с. / {car.engine.type}
            </FeatureItem>
            <FeatureItem>
              <IconInfo /> {car.transmission} / {car.drive}
            </FeatureItem>
          </FeaturesList>
          
          <ButtonsContainer>
            <PrimaryButton to="/test-drive">
              Записаться на тест-драйв <IconArrowRight />
            </PrimaryButton>
            <SecondaryButton href="tel:+79361526567">
              Связаться по телефону
            </SecondaryButton>
          </ButtonsContainer>
        </CarInfo>
      </CarDetailContainer>

      <CarDetailsSection>
        <SectionTitle>Описание</SectionTitle>
        <DescriptionText dangerouslySetInnerHTML={{ __html: car.description }} />
        
        <SectionTitle>Характеристики</SectionTitle>
        <SpecificationsGrid>
          {Object.entries(car.specifications).map(([key, value]) => (
            <SpecItem key={key}>
              <SpecName>{key}</SpecName>
              <SpecValue>{value}</SpecValue>
            </SpecItem>
          ))}
        </SpecificationsGrid>
      </CarDetailsSection>
    </PageContainer>
  );
};

export default CarDetailPage; 