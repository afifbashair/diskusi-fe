import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function StoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await API.get(`/stories/${id}`);
        setStory(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStory();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Login terlebih dahulu');

    try {
      await API.post(`/comments`, { storyId: id, content: comment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComment('');
      // Refresh komentar
      const res = await API.get(`/stories/${id}`);
      setStory(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal kirim komentar');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Cerita tidak ditemukan</p>;

  return (
    <div>
      <h2>{story.title}</h2>
      <p><strong>Penulis:</strong> {story.user?.name || 'Anonim'}</p>
      {story.imageUrl && <img src={story.imageUrl} alt="gambar cerita" width="300" />}
      <p>{story.content}</p>

      <hr />
      <h3>Komentar</h3>
      {story.comments && story.comments.length > 0 ? (
        story.comments.map((cmt) => (
          <div key={cmt.id} style={{ borderBottom: '1px solid #ddd', marginBottom: '0.5rem' }}>
            <p><strong>{cmt.user?.name || 'Anonim'}:</strong> {cmt.content}</p>
          </div>
        ))
      ) : (
        <p>Belum ada komentar</p>
      )}

      <form onSubmit={handleComment}>
        <textarea
          placeholder="Tulis komentar..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        /><br />
        <button type="submit">Kirim Komentar</button>
      </form>
    </div>
  );
}
