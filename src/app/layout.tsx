import '../styles/globals.css';
import Providers from './providers';


export const metadata = {
  title: 'ThoughtFlow',
  description: 'A modern, minimalistic journaling app with privacy in-mind',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <Providers> {children} </Providers>
     
      </body>
  </html>
);

export default RootLayout;
