import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './app/services/api.js';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser || !newLastName || !newDate) return;
    try {
      await createUser({ nombre: newUser, apellido: newLastName, fechaIngreso: newDate });
      setNewUser('');
      setNewLastName('');
      setNewDate('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (id) => {
    const updatedName = prompt('Enter new name:');
    if (!updatedName) return;
    try {
      await updateUser(id, { nombre: updatedName });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>Usuarios Hospital</h1>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={newLastName}
        onChange={(e) => setNewLastName(e.target.value)}
        placeholder="Apellido"
      />
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        placeholder="Fecha de Ingreso"
      />
      <button onClick={handleCreateUser}>Agregar Usuario</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} {user.apellido} {user.fechaIngreso}
            <button onClick={() => handleUpdateUser(user.id)}>Modificar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
