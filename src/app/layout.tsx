import '../styles/globals.css';
<<<<<<< HEAD
import Popup from '@/components/common/Popup';
=======
>>>>>>> fb7085d5e758d21b7b906019aedd77576f170a22
import Providers from './providers';

export const metadata = {
  title: 'ThoughtFlow',
  description: 'A modern, minimalistic journaling app with privacy in-mind',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Providers>{children}</Providers>
<<<<<<< HEAD
      <Popup />
=======
>>>>>>> fb7085d5e758d21b7b906019aedd77576f170a22
    </body>
  </html>
);

export default RootLayout;
