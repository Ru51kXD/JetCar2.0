import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiFilter, FiX, FiSearch, FiChevronDown, FiChevronUp, FiSliders, FiClock, FiCalendar, FiTruck } from 'react-icons/fi';

import { cars, brands, getFilteredCars, sortCars } from '../data/cars';
import { Car, Brand, CarFilters, SortOption } from '../types/car';

// Properly typed AnimatePresence
const AnimatePresence = FramerAnimatePresence as React.FC<{
  children: React.ReactNode;
}>;

// Type the icon components
const IconFilter = FiFilter as React.FC;
const IconSliders = FiSliders as React.FC;
const IconChevronUp = FiChevronUp as React.FC;
const IconChevronDown = FiChevronDown as React.FC;
const IconX = FiX as React.FC;
const IconClock = FiClock as React.FC;
const IconCalendar = FiCalendar as React.FC;
const IconTruck = FiTruck as React.FC;

const CatalogContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 20px 60px;
`;

const CatalogHeader = styled.div`
  margin-bottom: 40px;
`;

const CatalogTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CatalogDescription = styled.p`
  font-size: 1.1rem;
  color: #777;
  max-width: 800px;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const FilterToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f5f5;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #eaeaea;
  }
`;

const SortContainer = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f5f5;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #eaeaea;
  }
`;

const SortDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 250px;
  overflow: hidden;
`;

const SortOptionButton = styled.button<{ active: boolean }>`
  display: block;
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  border: none;
  background-color: ${props => props.active ? '#f5f5f5' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const FiltersContainer = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  overflow: hidden;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const FiltersTitle = styled.h3`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #777;
  transition: color 0.3s ease;
  
  &:hover {
    color: #333;
  }
`;

const FiltersContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const FilterGroupTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const FilterOptions = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  
  input {
    cursor: pointer;
  }
`;

const BrandsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
`;

const BrandItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => props.active ? '#f0f0f0' : 'white'};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 120px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  img {
    height: 50px;
    object-fit: contain;
  }
  
  span {
    font-size: 0.9rem;
    text-align: center;
    font-weight: ${props => props.active ? '600' : '400'};
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const CarCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CarImage = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  ${CarCard}:hover &:before {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
    filter: brightness(0.97);
  }
  
  ${CarCard}:hover & img {
    transform: scale(1.1);
    filter: brightness(1.05);
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

const CarTag = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #d9a34a;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 3px 8px rgba(217, 163, 74, 0.3);
`;

const CarContent = styled.div`
  padding: 25px;
`;

const CarTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const CarSubtitle = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 15px;
`;

const CarPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d9a34a;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  
  &:before {
    content: '₸';
    font-size: 1.1rem;
    margin-right: 3px;
    opacity: 0.8;
  }
`;

const CarSpecs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-top: 1px solid #eee;
  padding-top: 15px;
  
  span {
    font-size: 0.9rem;
    color: #777;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const CarLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-align: center;
  background-color: #1a1a1a;
  color: white;
  padding: 14px;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: #d9a34a;
    box-shadow: 0 8px 20px rgba(217, 163, 74, 0.2);
    transform: translateY(-5px);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 5px;
  border: none;
  background-color: ${props => props.active ? '#d9a34a' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#d9a34a' : '#eaeaea'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 0;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1rem;
    color: #777;
    max-width: 500px;
    margin: 0 auto;
  }
`;

// Sort options
const sortOptions = [
  { value: 'price-asc', label: 'Цена (по возрастанию)' },
  { value: 'price-desc', label: 'Цена (по убыванию)' },
  { value: 'year-desc', label: 'Год выпуска (сначала новые)' },
  { value: 'year-asc', label: 'Год выпуска (сначала старые)' },
  { value: 'mileage-asc', label: 'Пробег (по возрастанию)' },
  { value: 'mileage-desc', label: 'Пробег (по убыванию)' }
];

// Форматирование цены
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Конвертация в тенге (курс примерно 1 рубль = 5.5 тенге)
const convertToTenge = (roublePrice: number): number => {
  return Math.round(roublePrice * 5.5);
};

const CatalogPage: React.FC = () => {
  // Состояния
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState<CarFilters>({});
  const [currentSort, setCurrentSort] = useState<SortOption>('price-desc');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    brands: true,
    price: true,
    year: true,
    engine: true,
    transmission: true,
    drive: true,
    other: true
  });
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;
  
  // Refs для анимации
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Создаем контроллеры анимаций
  const containerControls = useAnimation();
  
  // Запускаем анимации после монтирования компонента
  useLayoutEffect(() => {
    if (inView) {
      containerControls.start("visible");
    }
  }, [inView, containerControls]);
  
  // Обработка фильтров
  useEffect(() => {
    const newFilters: CarFilters = {};
    
    if (activeBrands.length > 0) {
      newFilters.brands = activeBrands;
    }
    
    setFilters(newFilters);
  }, [activeBrands]);
  
  // Применение фильтров и сортировки
  useEffect(() => {
    let result = getFilteredCars(cars, filters);
    result = sortCars(result, currentSort);
    setFilteredCars(result);
    setCurrentPage(1); // Сброс страницы при изменении фильтров
  }, [filters, currentSort]);
  
  // Переключение группы фильтров
  const toggleFilterGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };
  
  // Обработка выбора бренда
  const handleBrandClick = (brandName: string) => {
    setActiveBrands(prev => {
      if (prev.includes(brandName)) {
        return prev.filter(b => b !== brandName);
      } else {
        return [...prev, brandName];
      }
    });
  };
  
  // Пагинация
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Анимации для карточек автомобилей
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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

  return (
    <CatalogContainer>
      <CatalogHeader>
        <CatalogTitle>Каталог автомобилей</CatalogTitle>
        <CatalogDescription>
          Выберите идеальный автомобиль премиум-класса из нашей коллекции. Мы предлагаем широкий выбор
          моделей от ведущих мировых производителей с гарантией качества и безупречной историей.
        </CatalogDescription>
      </CatalogHeader>
      
      <FilterBar>
        <FilterToggleButton onClick={() => setShowFilters(!showFilters)}>
          <IconFilter />
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </FilterToggleButton>
        
        <SortContainer>
          <SortButton onClick={() => setShowSortDropdown(!showSortDropdown)}>
            <IconSliders />
            Сортировка: {sortOptions.find(opt => opt.value === currentSort)?.label}
            {showSortDropdown ? <IconChevronUp /> : <IconChevronDown />}
          </SortButton>
          
          <AnimatePresence>
            {showSortDropdown && (
              <SortDropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {sortOptions.map(option => (
                  <SortOptionButton
                    key={option.value}
                    active={currentSort === option.value}
                    onClick={() => {
                      setCurrentSort(option.value as SortOption);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option.label}
                  </SortOptionButton>
                ))}
              </SortDropdown>
            )}
          </AnimatePresence>
        </SortContainer>
      </FilterBar>
      
      <AnimatePresence>
        {showFilters && (
          <FiltersContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiltersHeader>
              <FiltersTitle>
                <IconFilter /> Фильтры
              </FiltersTitle>
              <CloseButton onClick={() => setShowFilters(false)}>
                <IconX />
              </CloseButton>
            </FiltersHeader>
            
            <FiltersContent>
              <FilterGroup>
                <FilterGroupTitle onClick={() => toggleFilterGroup('brands')}>
                  Марка автомобиля
                  {expandedGroups.brands ? <IconChevronUp /> : <IconChevronDown />}
                </FilterGroupTitle>
                
                <AnimatePresence>
                  {expandedGroups.brands && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BrandsList>
                        {brands.map(brand => (
                          <BrandItem
                            key={brand.id}
                            active={activeBrands.includes(brand.name)}
                            onClick={() => handleBrandClick(brand.name)}
                          >
                            <img src={brand.logo} alt={brand.name} />
                            <span>{brand.name}</span>
                          </BrandItem>
                        ))}
                      </BrandsList>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FilterGroup>
              
              {/* Здесь могут быть другие группы фильтров: цена, год, тип двигателя и т.д. */}
            </FiltersContent>
          </FiltersContainer>
        )}
      </AnimatePresence>
      
      {currentCars.length > 0 ? (
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={containerControls}
        >
          <CarsGrid>
            {currentCars.map(car => (
              <CarCard key={car.id} variants={itemVariants}>
                <CarImage>
                  <LazyImage src={car.mainImage} alt={`${car.brand} ${car.model}`} />
                  {car.isNew && <CarTag>Новый</CarTag>}
                </CarImage>
                <CarContent>
                  <CarTitle>{car.brand} {car.model}</CarTitle>
                  <CarSubtitle>{car.generation}, {car.year} г.</CarSubtitle>
                  <CarPrice>{formatPrice(convertToTenge(car.price))}</CarPrice>
                  <CarSpecs>
                    <span><IconClock />{car.engine.volume} л / {car.engine.power} л.с.</span>
                    <span><IconCalendar />{car.year} г.</span>
                    <span><IconTruck />{car.transmission}</span>
                  </CarSpecs>
                  <CarLink to={`/catalog/${car.id}`}>Подробнее</CarLink>
                </CarContent>
              </CarCard>
            ))}
          </CarsGrid>
          
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </PaginationButton>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationButton
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              ))}
              
              <PaginationButton 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </PaginationButton>
            </PaginationContainer>
          )}
        </motion.div>
      ) : (
        <NoResults>
          <h3>Автомобили не найдены</h3>
          <p>
            К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации
            или свяжитесь с нами для индивидуального подбора автомобиля.
          </p>
        </NoResults>
      )}
    </CatalogContainer>
  );
};

export default CatalogPage; 