import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  profileImageUrl: string;
};

export type AuthUserState = {
  authUser: AuthUser | null;
  setAuthUser: (authUser: AuthUser) => void;
  clearAuthUser: () => void;
  updateAuthUser: (updates: Partial<AuthUser>) => void;
};

const useAuthUserStore = create<AuthUserState>()(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (authUser) => set({ authUser }),
      clearAuthUser: () => set({ authUser: null }),
      updateAuthUser: (updates) =>
        set((state) => ({
          authUser: state.authUser ? { ...state.authUser, ...updates } : null,
        })),
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthUserStore;
