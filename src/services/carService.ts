import { Car, CarFilters } from '../types/car';
import { cars, getFilteredCars } from '../data/cars';

/**
 * Get a single car by ID
 */
export const getCar = async (id: number): Promise<Car> => {
  // Simulate API fetch delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const car = cars.find(car => car.id === id);
      if (car) {
        resolve(car);
      } else {
        reject(new Error('Car not found'));
      }
    }, 300);
  });
};

/**
 * Get all cars with optional filters
 */
export const getAllCars = async (filters?: CarFilters): Promise<Car[]> => {
  // Simulate API fetch delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (filters) {
        resolve(getFilteredCars(cars, filters));
      } else {
        resolve(cars);
      }
    }, 300);
  });
};

/**
 * Get featured cars
 */
export const getFeaturedCars = async (count: number = 4): Promise<Car[]> => {
  // Simulate API fetch delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get random cars as featured
      const shuffled = [...cars].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, count));
    }, 300);
  });
};

/**
 * Submit a test drive request
 */
export const submitTestDriveRequest = async (requestData: any): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Test drive request submitted:', requestData);
      resolve();
    }, 500);
  });
};

/**
 * Submit a contact form
 */
export const submitContactForm = async (formData: any): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      resolve();
    }, 500);
  });
}; 