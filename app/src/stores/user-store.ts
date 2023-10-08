import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../gql/graphql';

interface UserState {
  id?: number;
  fullName: string;
  avatarUrl?: string | null;
  email?: string;
  updateProfileImage: (avatarUrl: string) => void;
  updateUsername: (fullName: string) => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: undefined,
      fullName: '',
      email: '',
      avatarUrl: null,

      updateProfileImage: (avatarUrl: string) => set({ avatarUrl }),
      updateUsername: (fullName: string) => set({ fullName }),
      setUser: (user) =>
        set({
          id: user.id || undefined,
          fullName: user.fullName,
          email: user.email,
          avatarUrl: user.avatarUrl,
        }),
    }),
    {
      name: 'user-store',
    },
  ),
);
