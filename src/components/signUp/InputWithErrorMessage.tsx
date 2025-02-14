import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import { SignUpFormData } from '../../pages/SignUp';

type InputWithErrorMessageProps = {
  inputData: { type: string; placeholder: string };
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<SignUpFormData>>;
};

const InputWithErrorMessage = ({ inputData, register, error }: InputWithErrorMessageProps) => {
  const { type, placeholder } = inputData;

  return (
    <div className="flex flex-col">
      <input className="border border-solid rounded-md mt-2 p-2 text-xl" type={type} placeholder={placeholder} {...register} />
      <p className="text-xs text-[tomato] mt-1 pl-1 h-2.5">{error?.message}</p>
    </div>
  );
};

export default InputWithErrorMessage;
