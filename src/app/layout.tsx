import '../styles/globals.css';


export const metadata = {
  title: 'ThoughtFlow',
  description: 'A modern, minimalistic journaling app with privacy in-mind',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
