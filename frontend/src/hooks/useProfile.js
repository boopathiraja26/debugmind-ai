import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await getProfile();
      setUser(data.data.user);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    reload: loadProfile,
  };
};

export default useProfile;