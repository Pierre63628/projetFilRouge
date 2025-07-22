import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(username, password);

    if (success) {
      navigate('/employee-dashboard');
    } else {
      setError(loading.error || 'Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🏚️ Connexion Employé</h2>
          <p>Accédez à votre espace de gestion</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading.isLoading}
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading.isLoading}
              placeholder="Entrez votre mot de passe"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button
            type="submit"
            className="login-button"
            disabled={loading.isLoading}
          >
            {loading.isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="login-demo-info">
          <h4>Comptes de démonstration :</h4>
          <div className="demo-accounts">
            <div className="demo-account">
              <strong>Admin:</strong> admin / admin123
            </div>
            <div className="demo-account">
              <strong>Employé:</strong> employee / emp123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
