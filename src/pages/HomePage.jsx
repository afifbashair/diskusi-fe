import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await API.get('/stories/public');
        setStories(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStories();
  }, []);

  return (
    <div>
      <h2>Cerita Publik</h2>
      {stories.length === 0 ? (
        <p>Belum ada cerita</p>
      ) : (
        stories.map((story) => (
          <div key={story.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <h3>
              <Link to={`/story/${story.id}`}>{story.title}</Link>
            </h3>
            <p><strong>Penulis:</strong> {story.user?.name || 'Anonim'}</p>
            {story.imageUrl && <img src={story.imageUrl} alt="gambar cerita" width={200} />}
            <p>{story.content.slice(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
}
