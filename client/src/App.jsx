import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);
  const [allUrls, setAllUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    const response = await fetch('http://localhost:4000/url/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    const shortId = data.id;
    const shortUrl = `http://localhost:4000/url/${shortId}`;

    const clicksResponse = await fetch(`http://localhost:4000/url/analytics/${shortId}`);
    const clickData = await clicksResponse.json();

    setShortUrls(prev => [
      ...prev,
      {
        originalUrl: url,
        shortUrl,
        clicks: clickData.totalClicks || 0,
      },
    ]);

    setUrl('');
  };

  const handleShowAll = async () => {
    const response = await fetch('http://localhost:4000/url/all');
    const data = await response.json();
    setAllUrls(data);
  };

  return (
  <div className="container">
    <h1>URL Shortener</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>

    {shortUrls.length > 0 && (
      <>
        <h2>Your Shortened URLs</h2>
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {shortUrls.map((item, index) => (
              <tr key={index}>
                <td>{item.originalUrl}</td>
                <td>
                  <a href={item.shortUrl} target="_blank" rel="noreferrer">
                    {item.shortUrl}
                  </a>
                </td>
                <td>{item.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}

    <div className="show-all">
      <button onClick={handleShowAll}>Show All URLs</button>
    </div>

    {allUrls.length > 0 && (
      <>
        <h2>All Stored URLs</h2>
        <table>
          <thead>
            <tr>
              <th>Short ID</th>
              <th>Original URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {allUrls.map((item, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={`http://localhost:4000/url/${item.shortId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.shortId}
                  </a>
                </td>
                <td>{item.redirectUrl}</td>
                <td>{item.visitedHistory?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);
}

export default App;
