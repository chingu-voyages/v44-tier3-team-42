import { Button, Dialog } from '@/components/ui';
import { useState } from 'react';
import { Logout } from 'react-iconly';

const LogoutUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-primary text-white"
        variant="tertiary"
        onClick={() => setIsOpen(true)}
      >
        <Logout />
      </Button>
      <Dialog title="" open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Sure you want to logout?</h2>
        <p>
          After you logout, your journals will be locked forever and can be only
          unlocked again with the correct key - be sure to not lose it at all
          costs!
        </p>
        <Button
         onClick={() => console.log('user logged out')}
         type="submit"
          className="mt-8 place-self-center w-max hover:bg-blue-700 focus:shadow-outline"
          disabled={isSubmitting}
        >
          Ok
        </Button>
      </Dialog>
    </>
  );
};

export default LogoutUser;
