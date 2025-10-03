'use client';

import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  // Read items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemList = querySnapshot.docs.map((doc) => doc.data().name);
      setItems(itemList);
    };
    fetchItems();
  }, []);

  // Add item to Firestore
  const handleAddItem = async () => {
    if (newItem.trim()) {
      await addDoc(collection(db, 'items'), { name: newItem });
      setNewItem('');
      // Refresh items
      const querySnapshot = await getDocs(collection(db, 'items'));
      setItems(querySnapshot.docs.map((doc) => doc.data().name));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Firestore Demo app with devops</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Add item"
        />
        <button onClick={handleAddItem} className="bg-blue-500 text-white p-2">
          Add Item
        </button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
