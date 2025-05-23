import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';
import { getContactRequests, updateContactStatus } from '../../services/adminService';
import { ContactRequest } from '../../types/car';
import { FiMail, FiCheck, FiArchive, FiSearch } from 'react-icons/fi';

// Типизация иконок
const IconMail = FiMail as React.FC;
const IconCheck = FiCheck as React.FC;
const IconArchive = FiArchive as React.FC;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 15px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isActive ? '#d9a34a' : '#f5f5f5'};
  color: ${props => props.isActive ? 'white' : '#333'};
  border: none;
  
  &:hover {
    background-color: ${props => props.isActive ? '#c08b35' : '#e9e9e9'};
  }
`;

const MessagesLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  height: calc(100vh - 250px);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const MessagesList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 992px) {
    height: 300px;
  }
`;

const MessageItem = styled.div<{ isActive: boolean; isUnread: boolean }>`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background-color: ${props => 
    props.isActive ? '#f5f5f5' : props.isUnread ? '#fff8e1' : 'white'};
  
  &:hover {
    background-color: ${props => props.isActive ? '#f5f5f5' : '#f9f9f9'};
  }
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: ${props => 
      props.isActive ? '#d9a34a' : props.isUnread ? '#d9a34a' : 'transparent'};
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SenderName = styled.div<{ isUnread: boolean }>`
  font-weight: ${props => props.isUnread ? '700' : '500'};
  color: #2c2c40;
`;

const MessageDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const MessageSubject = styled.div<{ isUnread: boolean }>`
  font-weight: ${props => props.isUnread ? '600' : 'normal'};
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessagePreview = styled.div`
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageDetail = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NoMessageSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  
  svg {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 15px;
  }
`;

const MessageDetailHeader = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const MessageDetailSubject = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

const MessageDetailInfo = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  margin-bottom: 5px;
`;

const MessageDetailLabel = styled.div`
  font-weight: 500;
  color: #666;
`;

const MessageDetailValue = styled.div``;

const MessageDetailContent = styled.div`
  flex: 1;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
  overflow-y: auto;
  white-space: pre-wrap;
`;

const MessageActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'default' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #ddd'};
  background-color: ${props => props.variant === 'primary' ? '#d9a34a' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#c08b35' : '#f5f5f5'};
  }
`;

const PaginationContainer = styled.div`
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

const NoMessagesMessage = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
`;

const ReplyContainer = styled.div`
  margin-top: 20px;
`;

const ReplyTextarea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    border-color: #d9a34a;
    outline: none;
  }
`;

// Тип для статуса сообщения
type MessageStatus = 'all' | 'new' | 'read' | 'replied' | 'archived';

const ContactsPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactRequest[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactRequest[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<MessageStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getContactRequests();
        
        // Сортируем сообщения по дате (новые сверху)
        const sortedMessages = data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setMessages(sortedMessages);
        setFilteredMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, []);
  
  // Применяем фильтры и поиск
  useEffect(() => {
    let result = messages;
    
    // Фильтрация по статусу
    if (statusFilter !== 'all') {
      result = result.filter(message => message.status === statusFilter);
    }
    
    // Поиск
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(message => 
        message.name.toLowerCase().includes(term) || 
        message.email.toLowerCase().includes(term) || 
        message.subject?.toLowerCase().includes(term) || 
        message.message.toLowerCase().includes(term)
      );
    }
    
    setFilteredMessages(result);
    setPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [statusFilter, searchTerm, messages]);
  
  const handleMessageSelect = (message: ContactRequest) => {
    setSelectedMessage(message);
    
    // Если сообщение новое, помечаем его как прочитанное
    if (message.status === 'new') {
      handleStatusChange(message.id, 'read');
    }
    
    setIsReplying(false);
    setReplyText('');
  };
  
  const handleStatusChange = async (messageId: number, newStatus: "new" | "read" | "replied" | "archived") => {
    try {
      await updateContactStatus(messageId, newStatus);
      
      // Обновляем статус локально
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      );
      
      setMessages(updatedMessages);
      
      // Если это текущее выбранное сообщение, обновляем и его
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };
  
  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    // В реальном приложении здесь был бы код для отправки ответа
    // через API или email сервис
    
    // Помечаем сообщение как отвеченное
    handleStatusChange(selectedMessage.id, 'replied');
    
    // Сбрасываем форму ответа
    setIsReplying(false);
    setReplyText('');
  };
  
  // Форматирование даты
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Получаем статус на русском
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'new': return 'Новое';
      case 'read': return 'Прочитано';
      case 'replied': return 'Отвечено';
      case 'archived': return 'В архиве';
      default: return status;
    }
  };
  
  // Пагинация для списка сообщений
  const totalPages = Math.ceil(filteredMessages.length / pageSize);
  const paginatedMessages = filteredMessages.slice((page - 1) * pageSize, page * pageSize);
  
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
          <PageTitle>Сообщения</PageTitle>
        </PageHeader>
        
        <SearchContainer>
          <SearchIcon><IconSearch /></SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Поиск по имени, email или содержанию..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <FilterContainer>
          <FilterButton 
            isActive={statusFilter === 'all'} 
            onClick={() => setStatusFilter('all')}
          >
            Все сообщения
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'new'} 
            onClick={() => setStatusFilter('new')}
          >
            Новые
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'read'} 
            onClick={() => setStatusFilter('read')}
          >
            Прочитанные
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'replied'} 
            onClick={() => setStatusFilter('replied')}
          >
            Отвеченные
          </FilterButton>
          <FilterButton 
            isActive={statusFilter === 'archived'} 
            onClick={() => setStatusFilter('archived')}
          >
            Архив
          </FilterButton>
        </FilterContainer>
        
        <MessagesLayout>
          <MessagesList>
            {paginatedMessages.length > 0 ? (
              paginatedMessages.map(message => (
                <MessageItem 
                  key={message.id} 
                  isActive={selectedMessage?.id === message.id}
                  isUnread={message.status === 'new'}
                  onClick={() => handleMessageSelect(message)}
                >
                  <MessageHeader>
                    <SenderName isUnread={message.status === 'new'}>
                      {message.name}
                    </SenderName>
                    <MessageDate>{formatDate(message.createdAt)}</MessageDate>
                  </MessageHeader>
                  <MessageSubject isUnread={message.status === 'new'}>
                    {message.subject || 'Без темы'}
                  </MessageSubject>
                  <MessagePreview>
                    {message.message}
                  </MessagePreview>
                </MessageItem>
              ))
            ) : (
              <NoMessagesMessage>
                Сообщения не найдены
              </NoMessagesMessage>
            )}
          </MessagesList>
          
          <MessageDetail>
            {selectedMessage ? (
              <>
                <MessageDetailHeader>
                  <MessageDetailSubject>
                    {selectedMessage.subject || 'Без темы'}
                  </MessageDetailSubject>
                  <MessageDetailInfo>
                    <MessageDetailLabel>От:</MessageDetailLabel>
                    <MessageDetailValue>{selectedMessage.name}</MessageDetailValue>
                  </MessageDetailInfo>
                  <MessageDetailInfo>
                    <MessageDetailLabel>Email:</MessageDetailLabel>
                    <MessageDetailValue>{selectedMessage.email}</MessageDetailValue>
                  </MessageDetailInfo>
                  <MessageDetailInfo>
                    <MessageDetailLabel>Дата:</MessageDetailLabel>
                    <MessageDetailValue>{formatDate(selectedMessage.createdAt)}</MessageDetailValue>
                  </MessageDetailInfo>
                  <MessageDetailInfo>
                    <MessageDetailLabel>Статус:</MessageDetailLabel>
                    <MessageDetailValue>{getStatusText(selectedMessage.status)}</MessageDetailValue>
                  </MessageDetailInfo>
                </MessageDetailHeader>
                
                <MessageDetailContent>
                  {selectedMessage.message}
                </MessageDetailContent>
                
                {isReplying && (
                  <ReplyContainer>
                    <ReplyTextarea 
                      placeholder="Введите ваш ответ..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                  </ReplyContainer>
                )}
                
                <MessageActions>
                  {!isReplying ? (
                    <>
                      <ActionButton 
                        variant="primary" 
                        onClick={() => setIsReplying(true)}
                      >
                        Ответить
                      </ActionButton>
                      
                      {selectedMessage.status !== 'archived' && (
                        <ActionButton 
                          variant="default" 
                          onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                        >
                          <IconArchive /> Архивировать
                        </ActionButton>
                      )}
                    </>
                  ) : (
                    <>
                      <ActionButton 
                        variant="primary" 
                        onClick={handleReply}
                      >
                        <IconCheck /> Отправить ответ
                      </ActionButton>
                      
                      <ActionButton 
                        variant="default" 
                        onClick={() => setIsReplying(false)}
                      >
                        Отмена
                      </ActionButton>
                    </>
                  )}
                </MessageActions>
              </>
            ) : (
              <NoMessageSelected>
                <IconMail />
                <div>Выберите сообщение для просмотра</div>
              </NoMessageSelected>
            )}
          </MessageDetail>
        </MessagesLayout>
        
        {totalPages > 1 && (
          <PaginationContainer>
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
          </PaginationContainer>
        )}
      </PageContainer>
    </AdminLayout>
  );
};

export default ContactsPage; 