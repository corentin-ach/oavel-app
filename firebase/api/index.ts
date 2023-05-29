import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { database } from '../config';

export const useGetFirestore = (coll: string) => {
  const [data, setData] = useState<any>([]);
  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(database, coll));
    onSnapshot(q, (querySnapshot) => {
      setData(querySnapshot.docs.map((d) => ({ ...d.data() })));
    });
  }, [coll]);
  return data;
};
