export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return user;
  }
  return false;
};
