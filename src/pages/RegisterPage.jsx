import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        name,
        email,
        password
      });
      localStorage.setItem('token', res.data.token); // simpan token
      navigate('/'); // redirect ke homepage
    } catch (err) {
      alert(err?.response?.data?.message || 'Gagal register');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Daftar Akun</h2>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Register</button>
    </form>
  );
}
