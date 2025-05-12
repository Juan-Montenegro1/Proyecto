import { useEffect, useState } from 'react';

const useAuthUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return { userData, loading };
};

export default useAuthUser;
