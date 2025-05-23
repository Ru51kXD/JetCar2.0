import { Car, Brand, CarFilters, SortOption } from '../types/car';

// Car placeholder images - replace with your actual images
const carImages = {
  mercedes1: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  mercedes2: 'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  mercedes3: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  mercedes4: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  
  bmw1: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  bmw2: 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  bmw3: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  
  porsche1: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  porsche2: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  
  lambo1: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  lambo2: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  
  ferrari1: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  ferrari2: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  
  rolls1: 'https://images.unsplash.com/photo-1601929862217-f1bf94503333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  rolls2: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
};

// Brand logos
const brandLogos = {
  mercedes: 'https://www.carlogos.org/car-logos/mercedes-benz-logo-1916.png',
  bmw: 'https://www.carlogos.org/car-logos/bmw-logo-2020-grey.png',
  porsche: 'https://www.carlogos.org/car-logos/porsche-logo-2008.png',
  lamborghini: 'https://www.carlogos.org/car-logos/lamborghini-logo-1000x1100.png',
  ferrari: 'https://www.carlogos.org/car-logos/ferrari-logo-750x1100.png',
  rollsRoyce: 'https://www.carlogos.org/car-logos/rolls-royce-logo-2018-1100x1200.png',
  bentley: 'https://www.carlogos.org/car-logos/bentley-logo-1400x800.png',
  audi: 'https://www.carlogos.org/car-logos/audi-logo-2016.png',
  toyota: 'https://www.carlogos.org/car-logos/toyota-logo-2019-1350x1500.png',
  tesla: 'https://www.carlogos.org/car-logos/tesla-logo-2003-2500x2500.png',
};

// Sample car data
export const cars: Car[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    generation: 'XV70',
    year: 2021,
    price: 2890000,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 25000,
    engine: {
      type: 'Бензин',
      power: 200,
      volume: 2.5
    },
    transmission: 'Автомат',
    drive: 'Передний',
    color: 'Черный',
    interiorColor: 'Бежевый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация'
    ],
    description: 'Toyota Camry в отличном состоянии. Один владелец, полный комплект документов, сервисная книжка. Автомобиль на гарантии производителя.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Седан',
      'Количество дверей': 4,
      'Количество мест': 5,
      'Длина': '4885 мм',
      'Ширина': '1840 мм',
      'Высота': '1455 мм',
      'Колесная база': '2825 мм',
      'Объем багажника': '493 л',
      'Объем топливного бака': '60 л',
      'Разгон до 100 км/ч': '9.9 с',
      'Максимальная скорость': '210 км/ч'
    }
  },
  {
    id: 2,
    brand: 'BMW',
    model: '5 Series',
    generation: 'G30',
    year: 2020,
    price: 4350000,
    images: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 32000,
    engine: {
      type: 'Дизель',
      power: 249,
      volume: 3.0
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Серый',
    interiorColor: 'Черный',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Система помощи при парковке',
      'Датчик дождя',
      'Датчик света',
      'Система контроля слепых зон'
    ],
    description: 'BMW 5 серии в идеальном состоянии. Официальный автомобиль, приобретался у дилера. Полный комплект ключей и документов.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Седан',
      'Количество дверей': 4,
      'Количество мест': 5,
      'Длина': '4935 мм',
      'Ширина': '1868 мм',
      'Высота': '1466 мм',
      'Колесная база': '2975 мм',
      'Объем багажника': '530 л',
      'Объем топливного бака': '66 л',
      'Разгон до 100 км/ч': '6.2 с',
      'Максимальная скорость': '250 км/ч'
    }
  },
  {
    id: 3,
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    generation: 'W213',
    year: 2019,
    price: 3950000,
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 45000,
    engine: {
      type: 'Бензин',
      power: 197,
      volume: 2.0
    },
    transmission: 'Автомат',
    drive: 'Задний',
    color: 'Белый',
    interiorColor: 'Коричневый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Система помощи при парковке',
      'Датчик дождя',
      'Датчик света'
    ],
    description: 'Mercedes-Benz E-Class в превосходном состоянии. Полная история обслуживания у официального дилера. Два комплекта резины.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Седан',
      'Количество дверей': 4,
      'Количество мест': 5,
      'Длина': '4923 мм',
      'Ширина': '1852 мм',
      'Высота': '1468 мм',
      'Колесная база': '2939 мм',
      'Объем багажника': '540 л',
      'Объем топливного бака': '66 л',
      'Разгон до 100 км/ч': '7.8 с',
      'Максимальная скорость': '240 км/ч'
    }
  },
  {
    id: 4,
    brand: 'Audi',
    model: 'A6',
    generation: 'C8',
    year: 2022,
    price: 5120000,
    images: [
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 0,
    engine: {
      type: 'Бензин',
      power: 245,
      volume: 2.0
    },
    transmission: 'Робот',
    drive: 'Полный',
    color: 'Синий',
    interiorColor: 'Черный',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Система помощи при парковке',
      'Датчик дождя',
      'Датчик света',
      'Система контроля слепых зон',
      'Адаптивный круиз-контроль',
      'Система автоматической парковки'
    ],
    description: 'Новый Audi A6 в максимальной комплектации. Автомобиль в наличии. Возможно оформление в кредит или лизинг.',
    isNew: true,
    inStock: true,
    specifications: {
      'Кузов': 'Седан',
      'Количество дверей': 4,
      'Количество мест': 5,
      'Длина': '4939 мм',
      'Ширина': '1886 мм',
      'Высота': '1457 мм',
      'Колесная база': '2924 мм',
      'Объем багажника': '530 л',
      'Объем топливного бака': '73 л',
      'Разгон до 100 км/ч': '6.0 с',
      'Максимальная скорость': '250 км/ч'
    }
  },
  {
    id: 5,
    brand: 'Lexus',
    model: 'RX',
    generation: '4 поколение',
    year: 2020,
    price: 4780000,
    images: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 28000,
    engine: {
      type: 'Бензин',
      power: 300,
      volume: 3.5
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Черный',
    interiorColor: 'Красный',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Панорамная крыша',
      'Вентиляция сидений',
      'Память сидений'
    ],
    description: 'Lexus RX в отличном состоянии. Официальный автомобиль, приобретался и обслуживался у дилера. Один владелец.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Внедорожник',
      'Количество дверей': 5,
      'Количество мест': 5,
      'Длина': '4890 мм',
      'Ширина': '1895 мм',
      'Высота': '1720 мм',
      'Колесная база': '2790 мм',
      'Объем багажника': '553 л',
      'Объем топливного бака': '72 л',
      'Разгон до 100 км/ч': '7.7 с',
      'Максимальная скорость': '200 км/ч'
    }
  },
  {
    id: 6,
    brand: 'Porsche',
    model: 'Cayenne',
    generation: 'III поколение',
    year: 2022,
    price: 12800000,
    images: [
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 5000,
    engine: {
      type: 'Бензин',
      power: 340,
      volume: 3.0
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Черный',
    interiorColor: 'Бежевый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Панорамная крыша',
      'Вентиляция сидений',
      'Память сидений'
    ],
    description: 'Porsche Cayenne в идеальном состоянии. Приобретался и обслуживался у официального дилера. Полная история обслуживания.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Внедорожник',
      'Количество дверей': 5,
      'Количество мест': 5,
      'Длина': '4918 мм',
      'Ширина': '1983 мм',
      'Высота': '1696 мм',
      'Колесная база': '2895 мм',
      'Объем багажника': '772 л',
      'Объем топливного бака': '75 л',
      'Разгон до 100 км/ч': '6.2 с',
      'Максимальная скорость': '245 км/ч'
    }
  },
  {
    id: 7,
    brand: 'Lamborghini',
    model: 'Urus',
    generation: 'I поколение',
    year: 2023,
    price: 35600000,
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 0,
    engine: {
      type: 'Бензин',
      power: 650,
      volume: 4.0
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Желтый',
    interiorColor: 'Черный',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Панорамная крыша',
      'Вентиляция сидений',
      'Память сидений',
      'Адаптивный круиз-контроль',
      'Система автоматической парковки',
      'Система кругового обзора'
    ],
    description: 'Новый Lamborghini Urus. Автомобиль в наличии в нашем автосалоне. Возможна покупка в кредит или лизинг.',
    isNew: true,
    inStock: true,
    specifications: {
      'Кузов': 'Внедорожник',
      'Количество дверей': 5,
      'Количество мест': 5,
      'Длина': '5112 мм',
      'Ширина': '2016 мм',
      'Высота': '1638 мм',
      'Колесная база': '3003 мм',
      'Объем багажника': '616 л',
      'Объем топливного бака': '85 л',
      'Разгон до 100 км/ч': '3.6 с',
      'Максимальная скорость': '305 км/ч'
    }
  },
  {
    id: 8,
    brand: 'Tesla',
    model: 'Model S',
    generation: 'Рестайлинг',
    year: 2022,
    price: 14800000,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 15000,
    engine: {
      type: 'Электро',
      power: 670,
      volume: 0
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Белый',
    interiorColor: 'Белый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Автопилот',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Панорамная крыша',
      'Вентиляция сидений',
      'Память сидений',
      'Адаптивный круиз-контроль',
      'Беспроводная зарядка'
    ],
    description: 'Tesla Model S Plaid - сверхбыстрый электромобиль с впечатляющими характеристиками. Автомобиль в идеальном состоянии.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Седан',
      'Количество дверей': 5,
      'Количество мест': 5,
      'Длина': '4970 мм',
      'Ширина': '1964 мм',
      'Высота': '1445 мм',
      'Колесная база': '2960 мм',
      'Объем багажника': '793 л',
      'Запас хода': '637 км',
      'Разгон до 100 км/ч': '2.1 с',
      'Максимальная скорость': '322 км/ч'
    }
  },
  {
    id: 9,
    brand: 'Rolls-Royce',
    model: 'Ghost',
    generation: 'II поколение',
    year: 2021,
    price: 42500000,
    images: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601929862217-f1bf94503333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 3000,
    engine: {
      type: 'Бензин',
      power: 571,
      volume: 6.75
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Серебристый',
    interiorColor: 'Бежевый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Подогрев сидений',
      'Вентиляция сидений',
      'Массаж сидений',
      'Круиз-контроль',
      'Навигация',
      'Панорамная крыша',
      'Звездное небо',
      'Аудиосистема Bespoke',
      'Адаптивная подвеска',
      'Система ночного видения'
    ],
    description: 'Rolls-Royce Ghost в безупречном состоянии. Официальный автомобиль с полной историей обслуживания. Индивидуальная комплектация.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Седан',
      'Количество дверей': 4,
      'Количество мест': 5,
      'Длина': '5546 мм',
      'Ширина': '1978 мм',
      'Высота': '1571 мм',
      'Колесная база': '3295 мм',
      'Объем багажника': '500 л',
      'Объем топливного бака': '82 л',
      'Разгон до 100 км/ч': '4.8 с',
      'Максимальная скорость': '250 км/ч'
    }
  },
  {
    id: 10,
    brand: 'Bentley',
    model: 'Continental GT',
    generation: 'III поколение',
    year: 2022,
    price: 29800000,
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 8000,
    engine: {
      type: 'Бензин',
      power: 635,
      volume: 6.0
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Красный',
    interiorColor: 'Коричневый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Вентиляция сидений',
      'Массаж сидений',
      'Круиз-контроль',
      'Навигация',
      'Аудиосистема Naim',
      'Адаптивная подвеска',
      'Система кругового обзора'
    ],
    description: 'Bentley Continental GT в отличном состоянии. Оригинальный пробег, все ключи, документы и сервисная книжка в наличии.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Купе',
      'Количество дверей': 2,
      'Количество мест': 4,
      'Длина': '4850 мм',
      'Ширина': '1954 мм',
      'Высота': '1405 мм',
      'Колесная база': '2851 мм',
      'Объем багажника': '358 л',
      'Объем топливного бака': '90 л',
      'Разгон до 100 км/ч': '3.7 с',
      'Максимальная скорость': '333 км/ч'
    }
  },
  {
    id: 11,
    brand: 'Ferrari',
    model: 'Roma',
    generation: 'I поколение',
    year: 2022,
    price: 33700000,
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 2000,
    engine: {
      type: 'Бензин',
      power: 620,
      volume: 3.9
    },
    transmission: 'Робот',
    drive: 'Задний',
    color: 'Синий',
    interiorColor: 'Черный',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Круиз-контроль',
      'Навигация',
      'Система контроля слепых зон',
      'Карбоновый пакет',
      'Спортивный выхлоп',
      'Гоночный режим'
    ],
    description: 'Ferrari Roma - элегантное купе, сочетающее в себе изысканный дизайн и выдающиеся характеристики. Автомобиль практически новый.',
    isNew: false,
    inStock: true,
    specifications: {
      'Кузов': 'Купе',
      'Количество дверей': 2,
      'Количество мест': 2,
      'Длина': '4656 мм',
      'Ширина': '1974 мм',
      'Высота': '1301 мм',
      'Колесная база': '2670 мм',
      'Объем багажника': '272 л',
      'Объем топливного бака': '80 л',
      'Разгон до 100 км/ч': '3.4 с',
      'Максимальная скорость': '320 км/ч'
    }
  },
  {
    id: 12,
    brand: 'Land Rover',
    model: 'Range Rover',
    generation: 'V поколение',
    year: 2023,
    price: 24500000,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1549399542-7e8f29e5c3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    mileage: 1000,
    engine: {
      type: 'Дизель',
      power: 350,
      volume: 3.0
    },
    transmission: 'Автомат',
    drive: 'Полный',
    color: 'Черный',
    interiorColor: 'Бежевый',
    features: [
      'Климат-контроль',
      'Кожаный салон',
      'Парктроник',
      'Подогрев сидений',
      'Вентиляция сидений',
      'Массаж сидений',
      'Круиз-контроль',
      'Навигация',
      'Панорамная крыша',
      'Адаптивная подвеска',
      'Система кругового обзора',
      'Автопарковка'
    ],
    description: 'Новый Range Rover пятого поколения. Автомобиль в максимальной комплектации с минимальным пробегом. На заводской гарантии.',
    isNew: true,
    inStock: true,
    specifications: {
      'Кузов': 'Внедорожник',
      'Количество дверей': 5,
      'Количество мест': 5,
      'Длина': '5052 мм',
      'Ширина': '2047 мм',
      'Высота': '1870 мм',
      'Колесная база': '2997 мм',
      'Объем багажника': '818 л',
      'Объем топливного бака': '90 л',
      'Разгон до 100 км/ч': '6.1 с',
      'Максимальная скорость': '242 км/ч'
    }
  }
];

// Sample brands
export const brands: Brand[] = [
  {
    id: 1,
    name: 'Toyota',
    logo: '/images/brands/toyota.png',
    models: ['Camry', 'RAV4', 'Land Cruiser', 'Corolla'],
    count: 15
  },
  {
    id: 2,
    name: 'BMW',
    logo: '/images/brands/bmw.png',
    models: ['3 Series', '5 Series', 'X5', 'X6'],
    count: 12
  },
  {
    id: 3,
    name: 'Mercedes-Benz',
    logo: '/images/brands/mercedes.png',
    models: ['E-Class', 'S-Class', 'GLE', 'C-Class'],
    count: 14
  },
  {
    id: 4,
    name: 'Audi',
    logo: '/images/brands/audi.png',
    models: ['A4', 'A6', 'Q5', 'Q7'],
    count: 10
  },
  {
    id: 5,
    name: 'Lexus',
    logo: '/images/brands/lexus.png',
    models: ['RX', 'LX', 'ES', 'NX'],
    count: 8
  },
  {
    id: 6,
    name: 'Porsche',
    logo: 'https://www.carlogos.org/car-logos/porsche-logo-2008.png',
    models: ['Cayenne', '911', 'Panamera', 'Taycan'],
    count: 7
  },
  {
    id: 7,
    name: 'Lamborghini',
    logo: 'https://www.carlogos.org/car-logos/lamborghini-logo-1000x1100.png',
    models: ['Urus', 'Huracan', 'Aventador'],
    count: 5
  },
  {
    id: 8,
    name: 'Tesla',
    logo: 'https://www.carlogos.org/car-logos/tesla-logo-2003-2500x2500.png',
    models: ['Model S', 'Model 3', 'Model X', 'Model Y'],
    count: 6
  },
  {
    id: 9,
    name: 'Rolls-Royce',
    logo: 'https://www.carlogos.org/car-logos/rolls-royce-logo-2018-1100x1200.png',
    models: ['Ghost', 'Phantom', 'Cullinan', 'Wraith'],
    count: 4
  },
  {
    id: 10,
    name: 'Bentley',
    logo: 'https://www.carlogos.org/car-logos/bentley-logo-1400x800.png',
    models: ['Continental GT', 'Bentayga', 'Flying Spur'],
    count: 6
  },
  {
    id: 11,
    name: 'Ferrari',
    logo: 'https://www.carlogos.org/car-logos/ferrari-logo-750x1100.png',
    models: ['Roma', 'F8 Tributo', 'SF90 Stradale', 'Portofino'],
    count: 4
  },
  {
    id: 12,
    name: 'Land Rover',
    logo: 'https://www.carlogos.org/car-logos/land-rover-logo-2020-3300x2550.png',
    models: ['Range Rover', 'Discovery', 'Velar', 'Defender'],
    count: 9
  }
];

/**
 * Filter cars based on provided filters
 */
export const getFilteredCars = (cars: Car[], filters: CarFilters): Car[] => {
  return cars.filter(car => {
    // Filter by brands
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(car.brand)) {
        return false;
      }
    }
    
    // Filter by price range
    if (filters.priceRange) {
      if (car.price < filters.priceRange.min || car.price > filters.priceRange.max) {
        return false;
      }
    }
    
    // Filter by year range
    if (filters.yearRange) {
      if (car.year < filters.yearRange.min || car.year > filters.yearRange.max) {
        return false;
      }
    }
    
    // Filter by engine types
    if (filters.engineTypes && filters.engineTypes.length > 0) {
      if (!filters.engineTypes.includes(car.engine.type)) {
        return false;
      }
    }
    
    // Filter by transmissions
    if (filters.transmissions && filters.transmissions.length > 0) {
      if (!filters.transmissions.includes(car.transmission)) {
        return false;
      }
    }
    
    // Filter by drive types
    if (filters.drives && filters.drives.length > 0) {
      if (!filters.drives.includes(car.drive)) {
        return false;
      }
    }
    
    // Filter by new/used
    if (filters.isNew !== undefined) {
      if (car.isNew !== filters.isNew) {
        return false;
      }
    }
    
    // Filter by in stock
    if (filters.inStock !== undefined) {
      if (car.inStock !== filters.inStock) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Sort cars based on provided sort option
 */
export const sortCars = (cars: Car[], sortOption: SortOption): Car[] => {
  const sortedCars = [...cars];
  
  switch (sortOption) {
    case 'price-asc':
      return sortedCars.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedCars.sort((a, b) => b.price - a.price);
    case 'year-asc':
      return sortedCars.sort((a, b) => a.year - b.year);
    case 'year-desc':
      return sortedCars.sort((a, b) => b.year - a.year);
    case 'mileage-asc':
      return sortedCars.sort((a, b) => a.mileage - b.mileage);
    case 'mileage-desc':
      return sortedCars.sort((a, b) => b.mileage - a.mileage);
    default:
      return sortedCars;
  }
};

export const getCarById = (id: number): Car | undefined => {
  return cars.find(car => car.id === id);
}; 