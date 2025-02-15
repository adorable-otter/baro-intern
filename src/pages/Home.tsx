import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="form-title">Home</h1>
      <div className="flex gap-10">
        <Link className="p-2" to={'/mypage'}>
          마이페이지
        </Link>
        <Link className="p-2" to={'/login'}>
          로그인
        </Link>
        <Link className="p-2" to={'/signup'}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Home;
