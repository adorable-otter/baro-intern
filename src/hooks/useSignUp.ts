import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/user';

const useSignUp = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    },
    onError: async (error, { setError }) => {
      if (error.message === 'user_already_exists') {
        setError('email', {
          type: 'existUser',
          message: '이미 가입된 email 입니다.',
        });
      } else if (error.message === 'nickname_already_exists') {
        setError('username', {
          type: 'existNickname',
          message: '이미 존재하는 닉네임입니다.',
        });
      } else {
        console.log(error);
        alert('회원가입에 실패했습니다.');
      }
    },
  });

  return signUpMutation;
};

export default useSignUp;
