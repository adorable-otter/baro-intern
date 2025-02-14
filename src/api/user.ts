import { UseFormSetError } from 'react-hook-form';
import { supabase } from '../supabase';
import { ProfileInsert, ProfileRow, UserCredential } from '../types/user';
import defaultProfileImagePath from '/defaultProfile.png?url';
import { SignUpFormData } from '../pages/SignUp';
import { User } from '@supabase/supabase-js';

type SignUpParams = {
  newAuthUser: SignUpFormData;
  setError: UseFormSetError<SignUpFormData>;
};

export const signUp = async ({ newAuthUser }: SignUpParams) => {
  const doesUserExist = await fetchUserInfoByUsername(newAuthUser.username);
  if (doesUserExist) {
    const error = new Error('nickname_already_exists');
    throw error;
  }
  const user = await addUser(newAuthUser);
  if (!user) throw new Error();
  await addUserProfile({
    id: user.id,
    username: newAuthUser.username,
    profile_image_url: defaultProfileImagePath,
  });
};

const addUser = async (credential: UserCredential): Promise<User> => {
  const { data, error } = await supabase.auth.signUp(credential);
  if (error || !data.user) throw error;
  return data.user;
};

const addUserProfile = async (profile: ProfileInsert): Promise<void> => {
  const { error } = await supabase.from('user_profiles').insert(profile);
  if (error) throw error;
};

export const fetchUserInfoByUsername = async (username: string): Promise<ProfileRow> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select()
    .eq('username', username)
    .maybeSingle();
  if (error) throw error;
  return data;
};
