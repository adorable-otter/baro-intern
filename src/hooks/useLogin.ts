import useAuthUserStore from '../stores/useAuthUserStore';
import { fetchUserProfileById, requestLogin } from '../api/user';
import { UserCredential } from '../types/user';

const useLogin = () => {
  const { setAuthUser } = useAuthUserStore((state) => state);

  const login = async (credential: UserCredential) => {
    const { id, email } = await requestLogin(credential);
    const { username, profile_image_url: profileImageUrl } = await fetchUserProfileById(id);
    setAuthUser({ id, email: email!, username, profileImageUrl });
  };
  return login;
};

export default useLogin;
