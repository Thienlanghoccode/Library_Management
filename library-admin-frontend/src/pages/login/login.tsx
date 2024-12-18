import React, { useState } from 'react';
import './Login.css';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [userAccountName, setUserAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(userAccountName, password);
    navigate('/book'); // Điều hướng sau khi đăng nhập thành công
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h1>THƯ VIỆN HAUI</h1>
        <input 
          type="text" 
          placeholder="Tên đăng nhập hoặc Email" 
          value={userAccountName} 
          onChange={(e) => setUserAccountName(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleLogin}>Đăng nhập</button>
        <p className="footer">&copy; 2024 HaUI</p>
      </div>
    </div>
  );
};

export default Login;
