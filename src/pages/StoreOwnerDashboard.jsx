import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Table, Card } from 'react-bootstrap';

export default function StoreOwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    async function fetchRatings(){
      const { data } = await API.get('/ratings/store');
      setRatings(data.ratings);
      setAvg(data.averageRating);
    }
    fetchRatings();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Store Owner Dashboard</h2>

      <Card className="my-3"><Card.Body>
        <h5>Average Rating</h5>
        <h3>{avg?.toFixed(1) ?? 'N/A'}</h3>
      </Card.Body></Card>

      <Table striped bordered hover>
        <thead><tr><th>User Name</th><th>Email</th><th>Rating</th></tr></thead>
        <tbody>{ratings.map(r=>(
          <tr key={r.userId}><td>{r.userName}</td><td>{r.userEmail}</td><td>{r.rating}</td></tr>
        ))}</tbody>
      </Table>
    </div>
  );
}
