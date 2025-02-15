import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Mypage from '../pages/Mypage';
import AuthenticatedOnly from './AuthenticatedOnly';
import { NotAuthenticatedOnly } from './NotAuthenticatedOnly';
import useAuthUserStore from '../stores/useAuthUserStore';

const Router = () => {
  const { authUser } = useAuthUserStore((state) => state);

  return (
    <BrowserRouter>
      <div className="flex justify-center items-center w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthenticatedOnly user={authUser} />}>
            <Route path="/mypage" element={<Mypage />} />
          </Route>
          <Route element={<NotAuthenticatedOnly user={authUser} />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
