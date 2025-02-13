import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
