import React, { useState } from 'react';

export default function MainComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalUsers: 0,
    onlineUsers: 0,
    lastMessage: '',
  });

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { message: newMessage, username: username }]);
      setNewMessage('');
      setStats({
        ...stats,
        totalMessages: stats.totalMessages + 1,
        lastMessage: newMessage,
      });
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleDeleteMessage = (index) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
    setStats({
      ...stats,
      totalMessages: stats.totalMessages - 1,
    });
  };

  const handleEditMessage = (index, newMessage) => {
    const newMessages = [...messages];
    newMessages[index].message = newMessage;
    setMessages(newMessages);
  };

  return (
    <div style={{ background: '#080c14', height: '100vh', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#0d1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
        <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600' }}>Chat App</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginRight: '12px' }}>Total Messages: {stats.totalMessages}</p>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginRight: '12px' }}>Total Users: {stats.totalUsers}</p>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginRight: '12px' }}>Online Users: {stats.onlineUsers}</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Last Message: {stats.lastMessage}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
          style={{
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#f1f5f9',
            fontSize: '14px',
            outline: 'none',
            width: '100%',
            marginBottom: '12px',
          }}
        />
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Enter your message"
          style={{
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#f1f5f9',
            fontSize: '14px',
            outline: 'none',
            width: '100%',
            marginBottom: '12px',
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Send Message
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
        {messages.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>No messages yet!</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              style={{
                background: '#0d1220',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '12px',
              }}
            >
              <p style={{ color: '#f1f5f9', fontSize: '14px' }}>{message.username}:</p>
              <p style={{ color: '#f1f5f9', fontSize: '14px' }}>{message.message}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleEditMessage(index, prompt('Enter new message'))}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMessage(index)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#94a3b8',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}