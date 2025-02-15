import { useEffect, useState } from 'react';
import useAuthUserStore from '../stores/useAuthUserStore';
import { uploadFile } from '../utils/uploadFile';
import { updateUserProfile } from '../api/user';
import ProfilePreview from '../components/mypage/ProfilePreview';

type ProfileForm = {
  profile: File | null;
  username: string;
};

const Mypage = () => {
  const { authUser, updateAuthUser } = useAuthUserStore((state) => state);
  const [values, setValues] = useState<ProfileForm>({ profile: null, username: '' });
  const [imageUrl, setImageUrl] = useState<string>('/defaultProfile.png');

  useEffect(() => {
    if (authUser) {
      setValues({
        profile: null,
        username: authUser.username || '',
      });
      setImageUrl(authUser.profileImageUrl);
    }
  }, [authUser]);

  if (!authUser) return <div>loading..</div>;

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setValues((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async () => {
    let imageUrl: string = authUser?.profileImageUrl;
    try {
      if (values['profile']) {
        imageUrl = await uploadFile('avatar', 'user', values['profile']);
      }
      await updateUserProfile({
        id: authUser.id,
        username: values.username,
        profile_image_url: imageUrl,
      });
      updateAuthUser({ username: values.username, profileImageUrl: imageUrl });
      alert('수정되었습니다!');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h4 className="form-title">프로필 변경</h4>
      <div className="flex justify-center w-full">
        <ProfilePreview
          width={84}
          height={84}
          name="profile"
          setValue={handleFileChange}
          className="w-[84px] h-[84px]"
          imageUrl={imageUrl}
        />
      </div>
      <div className="w-64 px-2">
        <div className="mt-5">
          <label htmlFor="groupName" className="text-sm text-gray-700">
            닉네임
          </label>
          <div className={`flex flex-col gap-2`}>
            <input
              className="border-b border-solid border-gray-400 py-2 text-base focus:outline-none"
              name={'username'}
              type="text"
              onChange={handleTextChange}
              value={values.username}
              maxLength={20}
            />
          </div>
        </div>
        <div className="w-full mt-6 flex gap-2 justify-center">
          <button
            className="bg-[#ffad32] text-white border-0 h-8 rounded-lg font-bold cursor-pointer w-full"
            disabled={!values.username}
            onClick={handleSubmit}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
