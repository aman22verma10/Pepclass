import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
const [users, setUsers] = useState([]);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [editId, setEditId] = useState(null);
const fetchUsers = async () => {
const res = await axios.get('http://localhost:5000/api/users');
setUsers(res.data);
};
useEffect(() => { fetchUsers(); }, []);
const handleSubmit = async (e) => {
e.preventDefault();
try {
if (editId) {
await axios.put(`http://localhost:5000/api/users/${editId}`
, { name, email });
setEditId(null);
} else {
await axios.post('http://localhost:5000/api/users'
, { name, email });
}
setName('');
setEmail('');
fetchUsers();
} catch (err) {
alert(err.response.data.error);
}
};
const handleEdit = (user) => {
setName(user.name);
setEmail(user.email);
setEditId(user.
_
id);
};
const handleDelete = async (id) => {
await axios.delete(`http://localhost:5000/api/users/${id}`);
fetchUsers();
};
return (
<div className="p-4">
<h1 className="text-2xl font-bold mb-4">User Management</h1>
<form onSubmit={handleSubmit} className="mb-4">
<input value={name} onChange={(e) => setName(e.target.value)}
placeholder="Name" required />
<input value={email} onChange={(e) => setEmail(e.target.value)}
placeholder="Email" required />
<button type="submit">{editId ? 'Update' : 'Add'} User</button>
</form>
<ul>
{users.map((u) => (
<li key={u.
_
id}>
{u.name} ({u.email})
<button onClick={() => handleEdit(u)}>Edit</button>
<button onClick={() => handleDelete(u._id)}>Delete</button> 
</li>
))}
</ul>
</div>
);
}
export default App;