import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isPublic', isPublic);
    if (image) {
      formData.append('image', image);
    }

    try {
      await API.post('/stories', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Cerita berhasil dibuat');
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Gagal mengunggah cerita');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tulis Cerita Baru</h2>
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Isi cerita"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        required
      /><br />
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        /> Cerita ini publik
      </label><br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      /><br />
      <button type="submit">Kirim Cerita</button>
    </form>
  );
}
