import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllCars, addCar, updateCar, deleteCar } from '../../services/adminService';
import { Car } from '../../types/car';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

// Типизация иконок
const IconPlus = FiPlus as React.FC;
const IconEdit = FiEdit2 as React.FC;
const IconTrash = FiTrash2 as React.FC;
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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #d9a34a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #c08b35;
  }
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

const CarsTable = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 1fr 1fr 120px;
  padding: 15px 20px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 1200px) {
    grid-template-columns: 80px 2fr 1fr 1fr 1fr 120px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 80px 2fr 1fr 1fr 120px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 1fr 1fr 120px;
  padding: 15px 20px;
  align-items: center;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: 80px 2fr 1fr 1fr 1fr 120px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 80px 2fr 1fr 1fr 120px;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
    
    > div::before {
      content: attr(data-label);
      font-weight: 600;
    }
  }
`;

const TableCell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CarImage = styled.div<{ image: string }>`
  width: 60px;
  height: 40px;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  border-radius: 4px;
`;

const Price = styled.div`
  font-weight: 600;
  color: #d9a34a;
`;

const CarStatus = styled.div<{ inStock: boolean }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => props.inStock ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.inStock ? '#43a047' : '#e53935'};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.edit {
    background-color: #e3f2fd;
    color: #1e88e5;
    
    &:hover {
      background-color: #bbdefb;
    }
  }
  
  &.delete {
    background-color: #ffebee;
    color: #e53935;
    
    &:hover {
      background-color: #ffcdd2;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 100px;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  background-color: #d9a34a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background-color: #c08b35;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

// Базовый шаблон новой машины
const emptyCarTemplate: Omit<Car, 'id'> = {
  brand: '',
  model: '',
  generation: '',
  year: new Date().getFullYear(),
  price: 0,
  images: [],
  mainImage: '',
  mileage: 0,
  engine: {
    type: 'Бензин',
    power: 0,
    volume: 0
  },
  transmission: 'Автомат',
  drive: 'Передний',
  color: '',
  interiorColor: '',
  features: [],
  description: '',
  isNew: true,
  inStock: true,
  specifications: {}
};

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [newCar, setNewCar] = useState<Omit<Car, 'id'>>(emptyCarTemplate);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getAllCars();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);
  
  useEffect(() => {
    const results = cars.filter(car => 
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(results);
    setPage(1); // Сбрасываем на первую страницу при поиске
  }, [searchTerm, cars]);
  
  const handleAddCar = () => {
    setEditingCar(null);
    setNewCar(emptyCarTemplate);
    setIsModalOpen(true);
  };
  
  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setNewCar(car);
    setIsModalOpen(true);
  };
  
  const handleDeleteCar = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      try {
        await deleteCar(id);
        setCars(prevCars => prevCars.filter(car => car.id !== id));
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCar) {
        // Редактирование существующего авто
        await updateCar({ ...newCar, id: editingCar.id } as Car);
        setCars(prevCars => 
          prevCars.map(car => car.id === editingCar.id ? { ...newCar, id: editingCar.id } as Car : car)
        );
      } else {
        // Добавление нового авто
        const addedCar = await addCar(newCar);
        setCars(prevCars => [...prevCars, addedCar]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Обработка вложенных свойств (например, engine.type)
      const [parent, child] = name.split('.');
      setNewCar(prev => {
        const parentObj = prev[parent as keyof typeof prev];
        if (typeof parentObj === 'object' && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      // Обработка обычных свойств
      setNewCar(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Обработка вложенных числовых свойств
      const [parent, child] = name.split('.');
      setNewCar(prev => {
        const parentObj = prev[parent as keyof typeof prev];
        if (typeof parentObj === 'object' && parentObj !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentObj,
              [child]: parseFloat(value) || 0
            }
          };
        }
        return prev;
      });
    } else {
      // Обработка обычных числовых свойств
      setNewCar(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewCar(prev => ({ ...prev, [name]: checked }));
  };
  
  // Пагинация
  const totalPages = Math.ceil(filteredCars.length / pageSize);
  const paginatedCars = filteredCars.slice((page - 1) * pageSize, page * pageSize);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'KZT', maximumFractionDigits: 0 }).format(price);
  };
  
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
          <PageTitle>Управление автомобилями</PageTitle>
          <AddButton onClick={handleAddCar}>
            <IconPlus /> Добавить автомобиль
          </AddButton>
        </PageHeader>
        
        <SearchContainer>
          <SearchIcon><IconSearch /></SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Поиск по марке или модели..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <CarsTable>
          <TableHeader>
            <TableCell>Фото</TableCell>
            <TableCell>Модель</TableCell>
            <TableCell>Год</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Двигатель</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Действия</TableCell>
          </TableHeader>
          
          {paginatedCars.length > 0 ? (
            paginatedCars.map(car => (
              <TableRow key={car.id}>
                <TableCell>
                  <CarImage image={car.mainImage} />
                </TableCell>
                <TableCell data-label="Модель">
                  {car.brand} {car.model}
                </TableCell>
                <TableCell data-label="Год">
                  {car.year}
                </TableCell>
                <TableCell data-label="Цена">
                  <Price>{formatPrice(car.price)}</Price>
                </TableCell>
                <TableCell data-label="Двигатель">
                  {car.engine.volume} л, {car.engine.power} л.с.
                </TableCell>
                <TableCell data-label="Статус">
                  <CarStatus inStock={car.inStock}>
                    {car.inStock ? 'В наличии' : 'Нет в наличии'}
                  </CarStatus>
                </TableCell>
                <TableCell>
                  <Actions>
                    <ActionButton className="edit" onClick={() => handleEditCar(car)}>
                      <IconEdit />
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleDeleteCar(car.id)}>
                      <IconTrash />
                    </ActionButton>
                  </Actions>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <div style={{ gridColumn: "span 7", textAlign: 'center' }}>
                Автомобили не найдены
              </div>
            </TableRow>
          )}
        </CarsTable>
        
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
        
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>
                  {editingCar ? 'Редактировать автомобиль' : 'Добавить автомобиль'}
                </ModalTitle>
                <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
              </ModalHeader>
              
              <form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="brand">Марка</FormLabel>
                    <FormInput 
                      id="brand"
                      name="brand"
                      value={newCar.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="model">Модель</FormLabel>
                    <FormInput 
                      id="model"
                      name="model"
                      value={newCar.model}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="generation">Поколение</FormLabel>
                    <FormInput 
                      id="generation"
                      name="generation"
                      value={newCar.generation}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="year">Год выпуска</FormLabel>
                    <FormInput 
                      id="year"
                      name="year"
                      type="number"
                      value={newCar.year}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="price">Цена (KZT)</FormLabel>
                    <FormInput 
                      id="price"
                      name="price"
                      type="number"
                      value={newCar.price}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="mileage">Пробег (км)</FormLabel>
                    <FormInput 
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={newCar.mileage}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="mainImage">URL основного изображения</FormLabel>
                    <FormInput 
                      id="mainImage"
                      name="mainImage"
                      value={newCar.mainImage}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="color">Цвет</FormLabel>
                    <FormInput 
                      id="color"
                      name="color"
                      value={newCar.color}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="engine.type">Тип двигателя</FormLabel>
                    <FormSelect 
                      id="engine.type"
                      name="engine.type"
                      value={newCar.engine.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Бензин">Бензин</option>
                      <option value="Дизель">Дизель</option>
                      <option value="Электро">Электро</option>
                      <option value="Гибрид">Гибрид</option>
                    </FormSelect>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="engine.volume">Объем двигателя (л)</FormLabel>
                    <FormInput 
                      id="engine.volume"
                      name="engine.volume"
                      type="number"
                      step="0.1"
                      value={newCar.engine.volume}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="engine.power">Мощность (л.с.)</FormLabel>
                    <FormInput 
                      id="engine.power"
                      name="engine.power"
                      type="number"
                      value={newCar.engine.power}
                      onChange={handleNumberInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="transmission">Трансмиссия</FormLabel>
                    <FormSelect 
                      id="transmission"
                      name="transmission"
                      value={newCar.transmission}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Автомат">Автомат</option>
                      <option value="Механика">Механика</option>
                      <option value="Робот">Робот</option>
                      <option value="Вариатор">Вариатор</option>
                    </FormSelect>
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="drive">Привод</FormLabel>
                    <FormSelect 
                      id="drive"
                      name="drive"
                      value={newCar.drive}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Передний">Передний</option>
                      <option value="Задний">Задний</option>
                      <option value="Полный">Полный</option>
                    </FormSelect>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="interiorColor">Цвет салона</FormLabel>
                    <FormInput 
                      id="interiorColor"
                      name="interiorColor"
                      value={newCar.interiorColor}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <FormLabel htmlFor="description">Описание</FormLabel>
                  <FormTextarea 
                    id="description"
                    name="description"
                    value={newCar.description}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        name="isNew" 
                        checked={newCar.isNew}
                        onChange={handleCheckboxChange}
                      />
                      Новый автомобиль
                    </label>
                  </FormGroup>
                  
                  <FormGroup>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        name="inStock" 
                        checked={newCar.inStock}
                        onChange={handleCheckboxChange}
                      />
                      В наличии
                    </label>
                  </FormGroup>
                </FormRow>
                
                <SubmitButton type="submit">
                  {editingCar ? 'Сохранить изменения' : 'Добавить автомобиль'}
                </SubmitButton>
              </form>
            </ModalContent>
          </Modal>
        )}
      </PageContainer>
    </AdminLayout>
  );
};

export default CarsPage; 