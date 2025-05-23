import { Car, TestDriveRequest, ContactRequest, AdminUser } from '../types/car';
import { cars as initialCars } from '../data/cars';

// Эмуляция хранения данных (в реальном приложении это было бы на бэкенде)
let testDriveRequests: TestDriveRequest[] = loadFromLocalStorage('testDriveRequests', []);
let contactRequests: ContactRequest[] = loadFromLocalStorage('contactRequests', []);
let cars: Car[] = loadFromLocalStorage('cars', initialCars);
let adminUsers: AdminUser[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',  // В реальном приложении пароли были бы хешированными
    fullName: 'Администратор Системы',
    role: 'admin'
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager',
    fullName: 'Менеджер Продаж',
    role: 'manager'
  }
];

// Функция для загрузки данных из localStorage
function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Функция для сохранения данных в localStorage
function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Получение всех автомобилей
export const getAllCars = async (): Promise<Car[]> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  return cars;
};

// Аутентификация администратора
export const authenticateAdmin = async (username: string, password: string): Promise<AdminUser | null> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = adminUsers.find(user => 
    user.username === username && user.password === password
  );
  
  return user || null;
};

// Получение всех заявок на тест-драйв
export const getTestDriveRequests = async (): Promise<TestDriveRequest[]> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  return testDriveRequests;
};

// Получение всех контактных запросов
export const getContactRequests = async (): Promise<ContactRequest[]> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  return contactRequests;
};

// Добавление нового автомобиля
export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newCar: Car = {
    ...car,
    id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1,
  };
  
  cars.push(newCar);
  saveToLocalStorage('cars', cars);
  return newCar;
};

// Обновление существующего автомобиля
export const updateCar = async (car: Car): Promise<Car> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = cars.findIndex((c: Car) => c.id === car.id);
  if (index === -1) {
    throw new Error(`Car with id ${car.id} not found`);
  }
  
  cars[index] = car;
  saveToLocalStorage('cars', cars);
  return car;
};

// Удаление автомобиля
export const deleteCar = async (id: number): Promise<boolean> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = cars.findIndex((car: Car) => car.id === id);
  if (index === -1) {
    return false;
  }
  
  cars.splice(index, 1);
  saveToLocalStorage('cars', cars);
  return true;
};

// Обновление статуса заявки на тест-драйв
export const updateTestDriveStatus = async (id: number, status: "pending" | "approved" | "completed" | "canceled"): Promise<TestDriveRequest> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = testDriveRequests.findIndex(req => req.id === id);
  if (index === -1) {
    throw new Error(`Test drive request with id ${id} not found`);
  }
  
  testDriveRequests[index].status = status;
  saveToLocalStorage('testDriveRequests', testDriveRequests);
  
  return testDriveRequests[index];
};

// Обновление статуса контактного запроса
export const updateContactStatus = async (id: number, status: "new" | "read" | "replied" | "archived"): Promise<ContactRequest> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = contactRequests.findIndex(req => req.id === id);
  if (index === -1) {
    throw new Error(`Contact request with id ${id} not found`);
  }
  
  contactRequests[index].status = status;
  saveToLocalStorage('contactRequests', contactRequests);
  
  return contactRequests[index];
};

// Добавление новой заявки на тест-драйв
export const submitTestDriveRequest = async (data: Omit<TestDriveRequest, 'id' | 'createdAt' | 'status'>): Promise<TestDriveRequest> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newRequest: TestDriveRequest = {
    ...data,
    id: testDriveRequests.length > 0 ? Math.max(...testDriveRequests.map(r => r.id)) + 1 : 1,
    createdAt: new Date(),
    status: 'pending'
  };
  
  testDriveRequests.push(newRequest);
  saveToLocalStorage('testDriveRequests', testDriveRequests);
  
  return newRequest;
};

// Добавление нового контактного запроса
export const submitContactRequest = async (data: Omit<ContactRequest, 'id' | 'createdAt' | 'status'>): Promise<ContactRequest> => {
  // Имитация обращения к серверу
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newRequest: ContactRequest = {
    ...data,
    id: contactRequests.length > 0 ? Math.max(...contactRequests.map(r => r.id)) + 1 : 1,
    createdAt: new Date(),
    status: 'new'
  };
  
  contactRequests.push(newRequest);
  saveToLocalStorage('contactRequests', contactRequests);
  
  return newRequest;
}; 