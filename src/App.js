import './App.css';
import { useState } from 'react';
import { Button, EditableText, InputGroup, Toaster, Position } from '@blueprintjs/core';

const AppToaster = Toaster.create({
  position: Position.TOP,
});

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', website: 'leanne.com' },
    { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', website: 'ervin.com' },
    { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com', website: 'clementine.com' },
  ]);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newWebsite, setNewWebsite] = useState('');

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        website,
      };
      setUsers([...users, newUser]);
      AppToaster.show({ message: 'User added successfully', intent: 'success', timeout: 3000 });
      setNewName('');
      setNewEmail('');
      setNewWebsite('');
    } else {
      AppToaster.show({ message: 'Please fill all fields', intent: 'warning', timeout: 3000 });
    }
  }

  function onChangeHandler(id, key, value) {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, [key]: value } : user))
    );
  }

  function updateUser(id) {
    AppToaster.show({ message: 'User updated successfully', intent: 'success', timeout: 3000 });
  }

  function deleteUser(id) {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    AppToaster.show({ message: 'User deleted successfully', intent: 'success', timeout: 3000 });
  }

  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, 'name', value)}
                  value={user.name}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, 'email', value)}
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) => onChangeHandler(user.id, 'website', value)}
                  value={user.website}
                />
              </td>
              <td>
                <Button intent="primary" onClick={() => updateUser(user.id)} text="Update" />
                &nbsp;
                <Button intent="danger" onClick={() => deleteUser(user.id)} text="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter Name"
              />
            </td>
            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter Website"
              />
            </td>
            <td>
              <Button intent="success" text="Add User" onClick={addUser} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
