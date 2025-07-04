import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim()) {
      localStorage.setItem('employeeEmail', email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Connexion Employé</h2>
      <input
        type="email"
        className="form-control my-3"
        placeholder="Entrez votre email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Se connecter
      </button>
    </div>
  );
}

export default Login;
