import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useSignUp from '../hooks/useSignUp';
import { ProfileInsert, UserCredential } from '../types/user';
import InputWithErrorMessage from '../components/signUp/InputWithErrorMessage';

export type SignUpFormData = UserCredential &
  ProfileInsert & {
    passwordCheck: string;
  };

const SignUp = () => {
  const signUpMutation = useSignUp();
  const password = useRef('password');
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (newAuthUser: SignUpFormData) => {
    signUpMutation.mutate({ newAuthUser, setError });
  };

  password.current = watch('password');

  return (
    <div>
      <p className="text-[#282828] p-2 pb-6 text-center text-3xl font-bold">회원가입</p>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          clearErrors();
          handleSubmit(onSubmit)(e);
        }}
      >
        <InputWithErrorMessage
          inputData={{ type: 'email', placeholder: '이메일' }}
          register={register('email', {
            required: '필수 입력 값입니다.',
            validate: (value) =>
              /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
              '이메일 형식으로 입력해주세요.',
          })}
          error={errors.email}
        />
        <InputWithErrorMessage
          inputData={{ type: 'text', placeholder: '닉네임' }}
          register={register('username', {
            required: '필수 입력 값입니다.',
          })}
          error={errors.username}
        />
        <InputWithErrorMessage
          inputData={{ type: 'password', placeholder: '비밀번호' }}
          register={register('password', {
            required: '필수 입력 값입니다.',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6글자여야 합니다.',
            },
          })}
          error={errors.password}
        />
        <InputWithErrorMessage
          inputData={{ type: 'password', placeholder: '비밀번호 확인' }}
          register={register('passwordCheck', {
            required: '필수 입력 값입니다.',
            validate: (value) => value === password.current || '비밀번호가 일치하지 않습니다.',
          })}
          error={errors.passwordCheck}
        />
        <button className="bg-[#ffad32] text-white border-0 h-8 rounded-lg font-bold">가입</button>
      </form>
    </div>
  );
};

export default SignUp;
