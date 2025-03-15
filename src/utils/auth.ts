export const setAuth = (token: string) => {
  try {
    // Set localStorage
    localStorage.setItem('adminAuth', token);
    
    // Set cookie with proper attributes
    document.cookie = `adminAuth=${token}; path=/; max-age=86400; SameSite=Strict`;
    
    // Set a flag to indicate fresh login
    sessionStorage.setItem('justLoggedIn', 'true');
  } catch (error) {
    console.error('Error setting auth:', error);
  }
};

export const clearAuth = () => {
  try {
    localStorage.removeItem('adminAuth');
    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    sessionStorage.removeItem('justLoggedIn');
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

export const getAuth = () => {
  try {
    return localStorage.getItem('adminAuth');
  } catch (error) {
    console.error('Error getting auth:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    const auth = getAuth();
    return auth === process.env.NEXT_PUBLIC_ADMIN_AUTH;
  } catch (error) {
    console.error('Error checking auth:', error);
    return false;
  }
}; 