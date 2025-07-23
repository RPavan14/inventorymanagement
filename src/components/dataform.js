import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function DataForm() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "users"), { name });
      alert("Data saved to Firestore!");
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}

export default DataForm;
