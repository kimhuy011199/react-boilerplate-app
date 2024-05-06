import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/stores/hook';
import { loginUser } from '@/stores/users/userSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  console.log('user', user);

  const handleLogin = () => {
    dispatch(loginUser({ email: 'name@domain.com', password: '1234' }));
  };

  return (
    <div className="flex flex-col items-start">
      <h1>Login</h1>
      <p>email: {user?.email}</p>
      <Link to="/">Go to home page</Link>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
