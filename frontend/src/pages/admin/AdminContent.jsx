import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminContent() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [institutionId, setInstitutionId] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;

    Promise.all([
      api.get('/admin/news'),
      api.get('/admin/events'),
      api.get('/admin/gallery'),
      api.get('/admin/institutions')
    ]).then(([n, e, g, i]) => {
      if (!active) return;
      setNews(n.data.data || []);
      setEvents(e.data.data || []);
      setGallery(g.data.data || []);
      const list = i.data.data || [];
      setInstitutions(list);
      if (list.length) setInstitutionId(String(list[0]._id));
    }).catch(() => {
      if (active) setError('Could not load admin content. Check your access and connection.');
    });

    return () => { active = false; };
  }, []);

  async function submitUpload(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setImageUrl('');

    if (!institutionId || !file) {
      setError('Select an institution and an image first.');
      return;
    }

    const form = new FormData();
    form.append('institutionId', institutionId);
    form.append('image', file);

    setLoading(true);
    try {
      const response = await api.post('/admin/uploads/images', form);
      setImageUrl(response.data.data.imageUrl);
      setMessage('Image uploaded successfully. Copy the URL into the relevant content form.');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Check Cloudinary configuration and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-page">
      <div className="container">
        <h1>Website content</h1>

        <div className="content-columns">
          <div className="admin-card"><h3>News</h3><strong>{news.length}</strong><p>Items</p></div>
          <div className="admin-card"><h3>Events</h3><strong>{events.length}</strong><p>Items</p></div>
          <div className="admin-card"><h3>Gallery</h3><strong>{gallery.length}</strong><p>Items</p></div>
        </div>

        <div className="admin-card" style={{ marginTop: 24 }}>
          <h2>Upload an image</h2>
          <p>JPEG, PNG, or WebP. Maximum size: 5 MB.</p>

          <form onSubmit={submitUpload}>
            <label htmlFor="upload-institution">Institution</label>
            <select
              id="upload-institution"
              value={institutionId}
              onChange={event => setInstitutionId(event.target.value)}
              required
            >
              <option value="">Select institution</option>
              {institutions.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label htmlFor="upload-image">Image file</label>
            <input
              id="upload-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={event => setFile(event.target.files?.[0] || null)}
              required
            />

            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload image'}
            </button>
          </form>

          {error && <p role="alert" className="error">{error}</p>}
          {message && <p role="status">{message}</p>}

          {imageUrl && (
            <div style={{ marginTop: 16 }}>
              <img
                src={imageUrl}
                alt="Uploaded preview"
                style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain' }}
              />
              <p><a href={imageUrl} target="_blank" rel="noreferrer">Open uploaded image</a></p>
              <label htmlFor="uploaded-image-url">Image URL</label>
              <input id="uploaded-image-url" readOnly value={imageUrl} />
              <button
                className="btn"
                type="button"
                onClick={() => navigator.clipboard?.writeText(imageUrl)}
              >
                Copy URL
              </button>
            </div>
          )}
        </div>

        <p className="note">
          The upload API stores the image in Cloudinary and returns its URL. News, event, and gallery create/edit forms are separate work.
        </p>
      </div>
    </section>
  );
}