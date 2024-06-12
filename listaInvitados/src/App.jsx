import { useEffect, useState } from 'react';
import { getGuests, createGuest, updateGuest, deleteGuest } from './app/services/api.js';

function App() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState('');

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await getGuests();
      setGuests(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const handleCreateGuest = async () => {
    if (!newGuest) return;
    try {
      await createGuest({ nombre: newGuest });
      setNewGuest('');
      fetchGuests();
    } catch (error) {
      console.error('Error creating guest:', error);
    }
  };

  const handleUpdateGuest = async (id) => {
    const updatedName = prompt('Enter new name:');
    if (!updatedName) return;
    try {
      await updateGuest(id, { nombre: updatedName });
      fetchGuests();
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  const handleDeleteGuest = async (id) => {
    try {
      await deleteGuest(id);
      fetchGuests();
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Invitados</h1>
      <input
        type="text"
        value={newGuest}
        onChange={(e) => setNewGuest(e.target.value)}
        placeholder="Nuevo Invitado"
      />
      <button onClick={handleCreateGuest}>Pulsame</button>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id}>
            {guest.nombre}
            <button onClick={() => handleUpdateGuest(guest.id)}>Modificar</button>
            <button onClick={() => handleDeleteGuest(guest.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
