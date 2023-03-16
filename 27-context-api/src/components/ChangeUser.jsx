import UserContext from '../context/UserContext';
import { useContext, useState } from 'react';

const ChangeUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(evt) => handleNameChange(evt)}
      />
      <button onClick={() => setUser(name)}>Change user</button>
    </>
  );
};

export default ChangeUser;
