import { useAppSelector } from '@/stores/hook';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAppSelector((state) => state.user);
  console.log('user', user);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <p>email: {user?.email}</p>
      <Link to="/login">Go to login page</Link>
    </div>
  );
};

export default Home;
