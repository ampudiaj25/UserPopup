import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import '../css/App.css';
import SearchUser from './searchUser';
import TablePopup from './tablePopup';

function App() {
  const { register, handleSubmit, reset } = useForm();
  const [documents, setDocument] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const onSubmit = async (data) => {
    if (!selectedUser) {
      await createUser(data);
    } else {
      await updateUser(data);
    }
    reset({
      name: '',
      phone: ''
    });
  };

  const onSelectUser = (user) => {
    reset(user);
    setDocument(user.documents)
    setSelectedUser(user.id);
  };

  const createUser = async (data) => {
    const newUser = {
      id: uuidv4(),
      name: data.name,
      phone: data.phone,
      documents: [...documents]
    }
    setUsers([...users, newUser]);
    setDocument([]);
  }

  const updateUser = async (data) => {
    const updatedUsers = users.map(user =>
      user.id === selectedUser ? { ...user, name: data.name, phone: data.phone, documents: [...documents] } : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
    setDocument([]);
  }

  const cleanFields = () => {
    reset({
      name: '',
      phone: ''
    });
    setDocument([]);
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-4">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <SearchUser
                    users={users}
                    onSelectUser={onSelectUser}
                  />
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      {...register('name')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className="form-control"
                      {...register('phone')}
                      required
                    />
                  </div>
                  <button type="submit"
                    className="btn btn-primary btn-block"
                    style={{marginRight: '10px'}}
                  >Send</button>
                  <button className="btn btn-secondary"
                    onClick={() => (cleanFields())}
                  >Limpiar Campos</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TablePopup
        documents={documents}
        setDocument={setDocument}
      />
    </>
  );
}

export default App;
