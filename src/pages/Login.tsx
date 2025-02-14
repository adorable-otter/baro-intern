import { Link, useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useLogin from '../hooks/useLogin';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const { values, handleInputChange } = useForm(initialValues);
  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(values);
      alert('로그인에 성공했습니다.');
      navigate('/');
    } catch (error) {
      if ((error as Error).message === 'invalid_credentials') {
        alert('유효하지 않은 로그인 정보입니다.');
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <p className="text-[#282828] p-2 pb-6 text-center text-3xl font-bold">로그인</p>
      <form className="flex flex-col gap-4 mb-2" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="이메일"
          name="email"
          value={values['email']}
          onChange={handleInputChange}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="비밀번호"
          name="password"
          value={values['password']}
          onChange={handleInputChange}
        />
        <button type="submit" className="bg-[#ffad32] text-white border-0 h-8 rounded-lg font-bold">
          입장
        </button>
      </form>
      <div className="text-[#777]">
        아직 회원이 아니신가요?{' '}
        <Link className="text-[#f18a11]" to="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
