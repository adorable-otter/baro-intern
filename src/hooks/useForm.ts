import { useState } from 'react';

type useFormParam = {
  email: string;
  password: string;
  passwordCheck: string;
  userName: string;
};

const useForm = (initialValues: useFormParam) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleInputChange, resetForm };
};

export default useForm;
