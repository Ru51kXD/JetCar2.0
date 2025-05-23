import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiTruck, FiShield } from 'react-icons/fi';

// Type the icon components
const IconUsers = FiUsers as React.FC;
const IconAward = FiAward as React.FC;
const IconTruck = FiTruck as React.FC;
const IconShield = FiShield as React.FC;

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

const AboutSection = styled.section`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
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

const AboutImage = styled.div`
  height: 500px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const AboutText = styled.div`
  line-height: 1.8;
  color: #444;
  
  p {
    margin-bottom: 20px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin: 60px 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #d9a34a;
  margin-bottom: 10px;
`;

const StatTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StatDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const TeamMemberPhoto = styled.div`
  height: 280px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TeamMemberInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const TeamMemberPosition = styled.div`
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
  gap: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #d9a34a;
  flex-shrink: 0;
`;

const ValueContent = styled.div`
  flex: 1;
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const AboutPage: React.FC = () => {
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
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader>
          <PageTitle>О компании Premium Auto</PageTitle>
          <PageDescription>
            Мы – команда профессионалов, объединенных любовью к автомобилям и стремлением 
            сделать процесс покупки и обслуживания автомобилей максимально комфортным.
          </PageDescription>
        </PageHeader>
      </motion.div>

      <AboutSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AboutImage>
            <LazyImage src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Premium Auto автосалон" />
          </AboutImage>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionTitle>Наша история</SectionTitle>
          <AboutText>
            <p>
              Premium Auto – это современный автосалон, основанный в 2010 году командой 
              энтузиастов и профессионалов автомобильного рынка. За 13 лет успешной работы 
              мы зарекомендовали себя как надежный партнер для тысяч клиентов.
            </p>
            <p>
              Мы начинали с небольшого шоурума и команды из 5 человек, а сегодня наша компания 
              – это просторный современный автосалон площадью более 2000 кв.м., собственный 
              технический центр и штат высококвалифицированных специалистов.
            </p>
            <p>
              Мы специализируемся на продаже премиальных автомобилей в Астане, предлагая нашим клиентам 
              только лучшие модели с безупречной историей и техническим состоянием. Каждый 
              автомобиль проходит тщательную проверку перед тем, как попасть в наш автосалон.
            </p>
          </AboutText>
        </motion.div>

        <StatsContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatItem>
              <StatNumber>13+</StatNumber>
              <StatTitle>Лет на рынке</StatTitle>
              <StatDescription>Мы работаем с 2010 года</StatDescription>
            </StatItem>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StatItem>
              <StatNumber>5000+</StatNumber>
              <StatTitle>Довольных клиентов</StatTitle>
              <StatDescription>Доверили нам выбор своего автомобиля</StatDescription>
            </StatItem>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatItem>
              <StatNumber>100+</StatNumber>
              <StatTitle>Автомобилей в наличии</StatTitle>
              <StatDescription>Всегда широкий выбор моделей</StatDescription>
            </StatItem>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <StatItem>
              <StatNumber>30+</StatNumber>
              <StatTitle>Специалистов</StatTitle>
              <StatDescription>Профессиональная команда</StatDescription>
            </StatItem>
          </motion.div>
        </StatsContainer>
      </AboutSection>

      <AboutSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Наши ценности</SectionTitle>
          <ValuesContainer>
            <ValueItem>
              <ValueIcon>
                <IconUsers />
              </ValueIcon>
              <ValueContent>
                <ValueTitle>Клиентоориентированность</ValueTitle>
                <ValueDescription>
                  Мы ставим интересы клиента на первое место и делаем всё возможное, 
                  чтобы обеспечить максимальное удовлетворение от сотрудничества с нами.
                </ValueDescription>
              </ValueContent>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>
                <IconAward />
              </ValueIcon>
              <ValueContent>
                <ValueTitle>Качество</ValueTitle>
                <ValueDescription>
                  Мы предлагаем только проверенные автомобили, прошедшие многоступенчатую 
                  диагностику и подготовку перед продажей.
                </ValueDescription>
              </ValueContent>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>
                <IconTruck />
              </ValueIcon>
              <ValueContent>
                <ValueTitle>Надежность</ValueTitle>
                <ValueDescription>
                  Мы несем ответственность за каждый проданный автомобиль и предоставляем 
                  гарантию на все автомобили из нашего салона.
                </ValueDescription>
              </ValueContent>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>
                <IconShield />
              </ValueIcon>
              <ValueContent>
                <ValueTitle>Прозрачность</ValueTitle>
                <ValueDescription>
                  Мы всегда открыты с нашими клиентами и предоставляем полную информацию 
                  о каждом автомобиле, включая его историю.
                </ValueDescription>
              </ValueContent>
            </ValueItem>
          </ValuesContainer>
        </motion.div>
      </AboutSection>

      <AboutSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Наша команда</SectionTitle>
          <TeamContainer>
            <TeamMember>
              <TeamMemberPhoto>
                <LazyImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Алексей Иванов" />
              </TeamMemberPhoto>
              <TeamMemberInfo>
                <TeamMemberName>Алексей Иванов</TeamMemberName>
                <TeamMemberPosition>Генеральный директор</TeamMemberPosition>
              </TeamMemberInfo>
            </TeamMember>
            
            <TeamMember>
              <TeamMemberPhoto>
                <LazyImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Мария Петрова" />
              </TeamMemberPhoto>
              <TeamMemberInfo>
                <TeamMemberName>Мария Петрова</TeamMemberName>
                <TeamMemberPosition>Руководитель отдела продаж</TeamMemberPosition>
              </TeamMemberInfo>
            </TeamMember>
            
            <TeamMember>
              <TeamMemberPhoto>
                <LazyImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Сергей Смирнов" />
              </TeamMemberPhoto>
              <TeamMemberInfo>
                <TeamMemberName>Сергей Смирнов</TeamMemberName>
                <TeamMemberPosition>Технический директор</TeamMemberPosition>
              </TeamMemberInfo>
            </TeamMember>
            
            <TeamMember>
              <TeamMemberPhoto>
                <LazyImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Екатерина Соколова" />
              </TeamMemberPhoto>
              <TeamMemberInfo>
                <TeamMemberName>Екатерина Соколова</TeamMemberName>
                <TeamMemberPosition>Директор по маркетингу</TeamMemberPosition>
              </TeamMemberInfo>
            </TeamMember>
          </TeamContainer>
        </motion.div>
      </AboutSection>
    </PageContainer>
  );
};

export default AboutPage; 