import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

// Type the icon components
const IconPhone = FiPhone as React.FC;
const IconMail = FiMail as React.FC;
const IconMapPin = FiMapPin as React.FC;
const IconClock = FiClock as React.FC;
const IconSend = FiSend as React.FC;

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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactInfoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 30px;
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 20px;
`;

const ContactInfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactInfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  svg {
    margin-right: 15px;
    margin-top: 3px;
    color: #d9a34a;
  }
`;

const ContactInfoText = styled.div`
  flex: 1;
  
  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    color: #444;
  }
  
  a {
    color: #444;
    transition: color 0.3s ease;
    
    &:hover {
      color: #d9a34a;
    }
  }
`;

const WorkingHoursContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
`;

const WorkingHoursItem = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
  
  p {
    margin: 0;
  }
  
  p:first-child {
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

const MapContainer = styled.div`
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 40px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, #d9a34a, #c08b35);
  }
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
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
    box-shadow: 0 0 0 3px rgba(217, 163, 74, 0.1);
    background-color: #fff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  resize: vertical;
  background-color: #f9f9f9;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
    box-shadow: 0 0 0 3px rgba(217, 163, 74, 0.1);
    background-color: #fff;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #d9a34a;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(217, 163, 74, 0.2);
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: #c08b35;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(217, 163, 74, 0.3);
    
    svg {
      transform: translateX(5px);
    }
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    svg {
      transform: none;
    }
  }
`;

const SuccessMessage = styled.div`
  padding: 20px;
  background-color: #f0f9f0;
  border-left: 4px solid #4caf50;
  margin-bottom: 30px;
  border-radius: 4px;
`;

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to submit the contact form
    console.log({
      name,
      email,
      phone,
      subject,
      message
    });
    
    // For demo, just show success
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader>
          <PageTitle>Контакты</PageTitle>
          <PageDescription>
            Мы всегда рады ответить на ваши вопросы и помочь с выбором автомобиля. 
            Свяжитесь с нами любым удобным способом или посетите наш автосалон.
          </PageDescription>
        </PageHeader>
      </motion.div>

      <ContactContainer>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactInfoContainer>
            <ContactInfoCard>
              <ContactInfoTitle>Наши контакты</ContactInfoTitle>
              <ContactInfoList>
                <ContactInfoItem>
                  <IconPhone />
                  <ContactInfoText>
                    <p><a href="tel:+79361526567">+7 (936) 152-65-67</a></p>
                  </ContactInfoText>
                </ContactInfoItem>
                
                <ContactInfoItem>
                  <IconMail />
                  <ContactInfoText>
                    <p><a href="mailto:info@premiumauto.ru">info@premiumauto.ru</a></p>
                  </ContactInfoText>
                </ContactInfoItem>
                
                <ContactInfoItem>
                  <IconMapPin />
                  <ContactInfoText>
                    <p>г. Астана, ул. Кабанбай батыра 53</p>
                  </ContactInfoText>
                </ContactInfoItem>
                
                <ContactInfoItem>
                  <IconClock />
                  <ContactInfoText>
                    <p>Режим работы:</p>
                    <WorkingHoursContainer>
                      <WorkingHoursItem>
                        <p>Пн-Пт</p>
                        <p>10:00 - 21:00</p>
                      </WorkingHoursItem>
                      <WorkingHoursItem>
                        <p>Сб-Вс</p>
                        <p>10:00 - 20:00</p>
                      </WorkingHoursItem>
                    </WorkingHoursContainer>
                  </ContactInfoText>
                </ContactInfoItem>
              </ContactInfoList>
            </ContactInfoCard>
            
            <ContactInfoCard>
              <ContactInfoTitle>Как нас найти</ContactInfoTitle>
              <ContactInfoText>
                <p>Наш автосалон расположен в центре Астаны, недалеко от Байтерека. Для вашего удобства есть бесплатная парковка на территории автосалона.</p>
              </ContactInfoText>
              <MapContainer>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d165400.90481211575!2d71.31283341953123!3d51.17290140000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424580c47db54609%3A0x97f9148dddb19228!2sNur-Sultan%2C%20Kazakhstan!5e0!3m2!1sen!2sus!4v1659602693977!5m2!1sen!2sus" 
                  title="Premium Auto на карте" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </MapContainer>
            </ContactInfoCard>
          </ContactInfoContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FormContainer>
            <FormTitle>Отправить сообщение</FormTitle>
            
            {submitted && (
              <SuccessMessage>
                Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
              </SuccessMessage>
            )}
            
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
                    disabled={submitted}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={submitted}
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
                  disabled={submitted}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Тема</Label>
                <Input 
                  id="subject" 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={submitted}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Сообщение</Label>
                <TextArea 
                  id="message" 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={submitted}
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={submitted}>
                Отправить сообщение <IconSend />
              </SubmitButton>
            </form>
          </FormContainer>
        </motion.div>
      </ContactContainer>
    </PageContainer>
  );
};

export default ContactPage; 