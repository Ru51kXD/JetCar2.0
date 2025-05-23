import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-parallax';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FiArrowRight, FiClock, FiStar, FiKey, FiShield } from 'react-icons/fi';

// Type the icon components
const IconArrowRight = FiArrowRight as React.FC;
const IconStar = FiStar as React.FC;
const IconClock = FiClock as React.FC;
const IconKey = FiKey as React.FC;
const IconShield = FiShield as React.FC;

// Import placeholder images - replace with your actual images
const heroImage1 = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
const heroImage2 = 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
const heroImage3 = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
const parallaxBg = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80';
const aboutImage = 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80';

// Car placeholder images
const car1 = 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
const car2 = 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
const car3 = 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
const car4 = 'https://images.unsplash.com/photo-1588258524116-c7a0124e4462?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const HeroSlide = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

const HeroImage = styled.div<{ bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 100px;
  
  @media (max-width: 768px) {
    padding: 0 40px;
  }
`;

const HeroTitle = styled(motion.h1)`
  color: #fff;
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 20px;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  color: #fff;
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 40px;
  line-height: 1.5;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #d9a34a;
  color: #fff;
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px);
    
    svg {
      transform: translateX(5px);
    }
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  color: #fff;
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid #fff;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: #fff;
    color: #1a1a1a;
    transform: translateY(-3px);
    
    svg {
      transform: translateX(5px);
    }
  }
`;

const AboutSection = styled.section`
  padding: 120px 0;
  background-color: #fff;
`;

const AboutContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImageWrapper = styled.div`
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    border: 2px solid #d9a34a;
    z-index: 1;
  }
  
  img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 991px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const AboutContent = styled.div``;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 3px;
    background-color: #d9a34a;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 30px;
`;

const SectionText = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 30px;
`;

const FeatureList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  
  svg {
    margin-top: 5px;
    margin-right: 15px;
    font-size: 1.2rem;
    color: #d9a34a;
  }
`;

const FeatureText = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 0.9rem;
    color: #777;
    line-height: 1.5;
  }
`;

const ParallaxSection = styled.section`
  position: relative;
`;

const ParallaxOverlay = styled.div`
  position: relative;
  z-index: 10;
  padding: 120px 0;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 20px;
`;

const ParallaxTitle = styled(motion.h2)`
  color: #fff;
  font-size: 3.5rem;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ParallaxText = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
`;

const FeaturedSection = styled.section`
  padding: 120px 0;
  background-color: #f9f9f9;
`;

const FeaturedContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: #d9a34a;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #777;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const CarCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const CarImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${CarCard}:hover & img {
    transform: scale(1.1);
  }
`;

const CarContent = styled.div`
  padding: 20px;
`;

const CarTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const CarPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d9a34a;
  margin-bottom: 15px;
`;

const CarSpecs = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 15px;
  
  span {
    font-size: 0.9rem;
    color: #777;
  }
`;

const TestimonialSection = styled.section`
  padding: 120px 0;
  background-color: #fff;
`;

const CtaSection = styled.section`
  padding: 100px 0;
  background-color: #1a1a1a;
  text-align: center;
  color: #fff;
`;

const CtaContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CtaTitle = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CtaText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0.9;
`;

const HomePage: React.FC = () => {
  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const buttonControls = useAnimation();
  
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [parallaxRef, parallaxInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  useEffect(() => {
    const sequence = async () => {
      await titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
      await subtitleControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
      await buttonControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    };
    
    sequence();
    
    if (aboutInView) {
      // Animations for about section
    }
    
    if (parallaxInView) {
      // Animations for parallax section
    }
    
    if (ctaInView) {
      // Animations for CTA section
    }
  }, [titleControls, subtitleControls, buttonControls, aboutInView, parallaxInView, ctaInView]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          autoplay={{ delay: 5000 }}
          loop
          style={{ height: '100%' }}
        >
          <SwiperSlide>
            <HeroSlide>
              <HeroImage bgImage={heroImage1} />
              <HeroContent>
                <HeroTitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleControls}
                >
                  Премиальные автомобили для истинных ценителей
                </HeroTitle>
                <HeroSubtitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={subtitleControls}
                >
                  Откройте для себя мир роскоши и комфорта с нашей коллекцией премиальных автомобилей ведущих мировых брендов.
                </HeroSubtitle>
                <ButtonContainer
                  initial={{ opacity: 0, y: 30 }}
                  animate={buttonControls}
                >
                  <PrimaryButton to="/catalog">
                    Смотреть каталог <IconArrowRight />
                  </PrimaryButton>
                  <SecondaryButton to="/test-drive">
                    Записаться на тест-драйв <IconArrowRight />
                  </SecondaryButton>
                </ButtonContainer>
              </HeroContent>
            </HeroSlide>
          </SwiperSlide>
          
          <SwiperSlide>
            <HeroSlide>
              <HeroImage bgImage={heroImage2} />
              <HeroContent>
                <HeroTitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleControls}
                >
                  Эксклюзивные предложения от PremiumAuto
                </HeroTitle>
                <HeroSubtitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={subtitleControls}
                >
                  Индивидуальный подход к каждому клиенту и выгодные условия покупки автомобилей премиум-класса.
                </HeroSubtitle>
                <ButtonContainer
                  initial={{ opacity: 0, y: 30 }}
                  animate={buttonControls}
                >
                  <PrimaryButton to="/catalog">
                    Смотреть каталог <IconArrowRight />
                  </PrimaryButton>
                  <SecondaryButton to="/test-drive">
                    Записаться на тест-драйв <IconArrowRight />
                  </SecondaryButton>
                </ButtonContainer>
              </HeroContent>
            </HeroSlide>
          </SwiperSlide>
          
          <SwiperSlide>
            <HeroSlide>
              <HeroImage bgImage={heroImage3} />
              <HeroContent>
                <HeroTitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={titleControls}
                >
                  Лучший выбор автомобилей премиум-класса
                </HeroTitle>
                <HeroSubtitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={subtitleControls}
                >
                  Мы предлагаем широкий выбор автомобилей от ведущих мировых производителей с безупречной историей и гарантией.
                </HeroSubtitle>
                <ButtonContainer
                  initial={{ opacity: 0, y: 30 }}
                  animate={buttonControls}
                >
                  <PrimaryButton to="/catalog">
                    Смотреть каталог <IconArrowRight />
                  </PrimaryButton>
                  <SecondaryButton to="/test-drive">
                    Записаться на тест-драйв <IconArrowRight />
                  </SecondaryButton>
                </ButtonContainer>
              </HeroContent>
            </HeroSlide>
          </SwiperSlide>
        </Swiper>
      </HeroSection>

      {/* About Section */}
      <AboutSection ref={aboutRef}>
        <AboutContainer>
          <AboutImageWrapper>
            <img src={aboutImage} alt="About Premium Auto" />
          </AboutImageWrapper>
          <AboutContent>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              О компании PremiumAuto
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ваш надежный партнер в мире премиальных автомобилей
            </SectionSubtitle>
            <SectionText
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              PremiumAuto – это автосалон премиум-класса, специализирующийся на продаже эксклюзивных автомобилей. Мы работаем с ведущими мировыми брендами и предлагаем нашим клиентам только лучшие автомобили с проверенной историей и безупречным техническим состоянием.
            </SectionText>
            <FeatureList
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <FeatureItem>
                <IconStar />
                <FeatureText>
                  <h4>Премиальное качество</h4>
                  <p>Автомобили с безупречной историей и гарантией</p>
                </FeatureText>
              </FeatureItem>
              <FeatureItem>
                <IconClock />
                <FeatureText>
                  <h4>Экономия времени</h4>
                  <p>Быстрое оформление и индивидуальный подход</p>
                </FeatureText>
              </FeatureItem>
              <FeatureItem>
                <IconKey />
                <FeatureText>
                  <h4>Тест-драйв</h4>
                  <p>Возможность протестировать автомобиль перед покупкой</p>
                </FeatureText>
              </FeatureItem>
              <FeatureItem>
                <IconShield />
                <FeatureText>
                  <h4>Гарантия</h4>
                  <p>Расширенная гарантия на все автомобили</p>
                </FeatureText>
              </FeatureItem>
            </FeatureList>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ marginTop: '30px' }}
            >
              <PrimaryButton to="/about">
                Узнать больше <IconArrowRight />
              </PrimaryButton>
            </motion.div>
          </AboutContent>
        </AboutContainer>
      </AboutSection>

      {/* Parallax Section */}
      <ParallaxSection ref={parallaxRef}>
        <Parallax
          bgImage={parallaxBg}
          strength={500}
          renderLayer={(percentage) => (
            <div
              style={{
                position: 'absolute',
                background: `rgba(0, 0, 0, ${0.7 - percentage * 0.2})`,
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
              }}
            />
          )}
        >
          <ParallaxOverlay>
            <ParallaxTitle
              initial={{ opacity: 0, y: 30 }}
              animate={parallaxInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Испытайте роскошь на дороге
            </ParallaxTitle>
            <ParallaxText
              initial={{ opacity: 0, y: 30 }}
              animate={parallaxInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Запишитесь на тест-драйв любого понравившегося автомобиля и ощутите все преимущества премиального вождения. Наши специалисты помогут вам подобрать автомобиль, который идеально соответствует вашим ожиданиям.
            </ParallaxText>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={parallaxInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <PrimaryButton to="/test-drive">
                Записаться на тест-драйв <IconArrowRight />
              </PrimaryButton>
            </motion.div>
          </ParallaxOverlay>
        </Parallax>
      </ParallaxSection>

      {/* Featured Cars Section */}
      <FeaturedSection>
        <FeaturedContainer>
          <SectionHeader>
            <h2>Популярные автомобили</h2>
            <p>Ознакомьтесь с самыми популярными моделями премиальных автомобилей в нашем каталоге</p>
          </SectionHeader>
          
          <CarsGrid>
            <CarCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CarImage>
                <img src={car1} alt="Mercedes-Benz G-Class" />
              </CarImage>
              <CarContent>
                <CarTitle>Mercedes-Benz G-Class</CarTitle>
                <CarPrice>32 900 000 ₽</CarPrice>
                <CarSpecs>
                  <span>2023</span>
                  <span>585 л.с.</span>
                  <span>4.0 AMG</span>
                </CarSpecs>
              </CarContent>
            </CarCard>
            
            <CarCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CarImage>
                <img src={car2} alt="BMW X7" />
              </CarImage>
              <CarContent>
                <CarTitle>BMW X7</CarTitle>
                <CarPrice>17 605 000 ₽</CarPrice>
                <CarSpecs>
                  <span>2023</span>
                  <span>340 л.с.</span>
                  <span>3.0 xDrive</span>
                </CarSpecs>
              </CarContent>
            </CarCard>
            
            <CarCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CarImage>
                <img src={car3} alt="Porsche Cayenne" />
              </CarImage>
              <CarContent>
                <CarTitle>Porsche Cayenne</CarTitle>
                <CarPrice>29 300 000 ₽</CarPrice>
                <CarSpecs>
                  <span>2023</span>
                  <span>640 л.с.</span>
                  <span>4.0 Turbo</span>
                </CarSpecs>
              </CarContent>
            </CarCard>
            
            <CarCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CarImage>
                <img src={car4} alt="Lamborghini Urus" />
              </CarImage>
              <CarContent>
                <CarTitle>Lamborghini Urus</CarTitle>
                <CarPrice>39 000 000 ₽</CarPrice>
                <CarSpecs>
                  <span>2023</span>
                  <span>666 л.с.</span>
                  <span>4.0 V8</span>
                </CarSpecs>
              </CarContent>
            </CarCard>
          </CarsGrid>
          
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <PrimaryButton to="/catalog">
              Смотреть все автомобили <IconArrowRight />
            </PrimaryButton>
          </div>
        </FeaturedContainer>
      </FeaturedSection>

      {/* CTA Section */}
      <CtaSection ref={ctaRef}>
        <CtaContainer>
          <CtaTitle
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Готовы выбрать свой премиальный автомобиль?
          </CtaTitle>
          <CtaText
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Наши консультанты помогут вам подобрать идеальный автомобиль, соответствующий вашим требованиям и бюджету. Свяжитесь с нами или посетите наш автосалон в Москве.
          </CtaText>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PrimaryButton to="/contact">
              Связаться с нами <IconArrowRight />
            </PrimaryButton>
          </motion.div>
        </CtaContainer>
      </CtaSection>
    </>
  );
};

export default HomePage; 