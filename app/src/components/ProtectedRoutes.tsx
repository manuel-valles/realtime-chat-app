import React, { useEffect } from 'react';
import { useUserStore } from '../stores/user-store';
import { useGeneralStore } from '../stores/general-store';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStore((state) => state.id);
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);

  useEffect(() => {
    if (!userId) {
      toggleLoginModal();
    }
  }, [toggleLoginModal, userId]);

  if (userId) {
    return children;
  }

  return <>Protected</>;
};

export default ProtectedRoutes;
