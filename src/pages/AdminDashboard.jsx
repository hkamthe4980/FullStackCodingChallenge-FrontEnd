import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Modal, Button, Form, Tabs, Tab, Table, Card } from 'react-bootstrap';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name:'', email:'', address:'', password:'', role:'normal' });

  useEffect(() => {
    fetchStats(); fetchUsers(); fetchStores();
  }, []);

  async function fetchStats(){
    const {data} = await API.get('/dashboard/admin');
    setStats(data);
  }
  async function fetchUsers(){
    const {data} = await API.get('/users');
    setUsers(data);
  }
  async function fetchStores(){
    const {data} = await API.get('/stores');
    setStores(data);
  }
  async function handleAddUser(){
    await API.post('/users', newUser);
    setShowAdd(false);
    fetchUsers();
  }

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="d-flex gap-3 my-4">
        <Card className="flex-fill"><Card.Body><h5>Users</h5><h3>{stats.totalUsers}</h3></Card.Body></Card>
        <Card className="flex-fill"><Card.Body><h5>Stores</h5><h3>{stats.totalStores}</h3></Card.Body></Card>
        <Card className="flex-fill"><Card.Body><h5>Ratings</h5><h3>{stats.totalRatings}</h3></Card.Body></Card>
      </div>

      <Tabs defaultActiveKey="users" className="mb-3">
        <Tab eventKey="users" title="Manage Users">
          <Button onClick={()=>setShowAdd(true)}>Add New User</Button>
          <Table striped bordered hover className="mt-3">
            <thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th></tr></thead>
            <tbody>{users.map(u => (
              <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td></tr>
            ))}</tbody>
          </Table>
        </Tab>
        <Tab eventKey="stores" title="Manage Stores">
          <Table striped bordered hover className="mt-3">
            <thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Rating</th></tr></thead>
            <tbody>{stores.map(s => (
              <tr key={s.id}><td>{s.name}</td><td>{s.email}</td><td>{s.address}</td><td>{s.rating?.toFixed(1) ?? '-'}</td></tr>
            ))}</tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showAdd} onHide={()=>setShowAdd(false)}>
        <Modal.Header closeButton><Modal.Title>Add New User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            {['name','email','address','password'].map(field=>(
              <Form.Group key={field} className="mb-2">
                <Form.Label>{field.charAt(0).toUpperCase()+field.slice(1)}</Form.Label>
                <Form.Control type={field==='password'?'password':'text'}
                  value={newUser[field]}
                  onChange={e=>setNewUser({...newUser,[field]:e.target.value})}/>
              </Form.Group>
            ))}
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Select value={newUser.role}
                onChange={e=>setNewUser({...newUser,role:e.target.value})}>
                <option value="normal">Normal User</option>
                <option value="store">Store Owner</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowAdd(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
