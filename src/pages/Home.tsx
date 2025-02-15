import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="form-title">Home</h1>
      <div className="flex gap-10">
        <Link to={'/mypage'}>마이페이지</Link>
        <Link to={'/login'}>로그인</Link>
        <Link to={'/signup'}>회원가입</Link>
      </div>
    </div>
  );
};

export default Home;
