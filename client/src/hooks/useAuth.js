import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Convenience hook for consuming AuthContext with a clear error if a
 * component tries to use it outside of <AuthProvider>.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
