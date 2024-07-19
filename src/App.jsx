import React, { useState } from 'react';
import user from './assets/user.svg';

function App() {
  const [lockerName, setLockerName] = useState('');
  const [connectionName, setConnectionName] = useState('');
  const [message, setMessage] = useState('');

  const handleFreezeLocker = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://172.16.192.201/freeze_locker', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locker_name: lockerName }),
      });
      const result = await response.json();
      setMessage(result.message || 'Failed to freeze locker.');
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const handleFreezeConnection = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://172.16.192.201/freeze_connection', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connection_name: connectionName }),
      });
      const result = await response.json();
      setMessage(result.message || 'Failed to freeze connection.');
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className='w-screen overflow-hidden'>
      <nav className='flex flex-row px-4 pt-10 pb-4 justify-evenly w-screen shadow-lg md:shadow-xl'>
        <h1 className='md:w-1/2 text-lg md:text-2xl mx-2 font-bold'>Moderator Page</h1>
        <h1 className='text-lg md:text-2xl mx-2 font-bold '>DPI Directory</h1>
        <h1 className='mx-2 text-lg md:text-2xl font-bold'>Home</h1>
        <div className='flex flex-col justify-center items-center w-28'>
          <div className=''>
            <img src={user} alt='user' />
          </div>
          <h2 className=' font-bold text-sm'>Siddharth Palod</h2>
          <p className='md:text-xs text-[0.6rem]'>Currently iMtech Student at IIITB</p>
        </div>
      </nav>

      <div className='px-4 flex flex-col md:flex-row justify-evenly mt-4 items-start py-4'>
        <form onSubmit={handleFreezeLocker} className='flex flex-col justify-center items-center gap-10'>
          <label className='text-lg md:text-2xl font-bold'>
            Enter Locker Name
            <input
              type="text"
              placeholder='Enter Locker Name'
              value={lockerName}
              className='p-2 border-2 border-blue-500 rounded-md mx-4 w-52 font-normal md:text-xl'
              onChange={(e) => setLockerName(e.target.value)}
            />
          </label>
          <button type="submit" className='bg-blue-500 rounded-2xl text-white px-8 py-4 mb-4'>Freeze Locker</button>
        </form>
        <form onSubmit={handleFreezeConnection} className='flex flex-col justify-center items-center gap-10'>
          <label className='text-lg md:text-2xl font-bold'>
            Enter Connection Name
            <input
              type="text"
              placeholder='Enter Conn Name'
              value={connectionName}
              className='p-2 border-2 border-blue-500 rounded-md mx-4 w-52 font-normal md:text-xl'
              onChange={(e) => setConnectionName(e.target.value)}
            />
          </label>
          <button type="submit" className='bg-blue-500 rounded-2xl text-white px-8 py-4'>Freeze Connection</button>
        </form>
      </div>
      {message && <div className='bg-green-300 text-green-950 p-4 border-2 border-green-950'>{message}</div>}
    </div>
  );
}

export default App;
