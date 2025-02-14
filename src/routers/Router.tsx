import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
