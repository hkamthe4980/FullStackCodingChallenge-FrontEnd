import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Form, Table, Button } from 'react-bootstrap';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStores();
    fetchRatings();
  }, []);

  async function fetchStores() {
    const { data } = await API.get('/stores?search='+encodeURIComponent(search));
    setStores(data);
  }

  async function fetchRatings() {
    const { data } = await API.get('/ratings/user');
    setUserRatings(data.reduce((map, r)=>({...map,[r.storeId]:r.rating}),{}));
  }

  async function submitRating(storeId) {
    const value = userRatings[storeId] || 1;
    await API.post(`/ratings/store`, { storeId, rating: value });
    fetchStores(); fetchRatings();
  }

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>

      <Form.Control
        placeholder="Search by name or address"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered hover>
        <thead><tr><th>Name</th><th>Address</th><th>Avg Rating</th><th>Your Rating</th><th>Action</th></tr></thead>
        <tbody>{stores.map(s=>(
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.address}</td>
            <td>{s.avgRating?.toFixed(1) ?? '-'}</td>
            <td>
              <Form.Control type="number" min="1" max="5"
                value={userRatings[s.id] || ''}
                onChange={e => setUserRatings({...userRatings, [s.id]: Number(e.target.value)})}
              />
            </td>
            <td>
              <Button onClick={()=>submitRating(s.id)} size="sm">Submit</Button>
            </td>
          </tr>
        ))}</tbody>
      </Table>
    </div>
  );
}
