import '../styles/styles.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Dick Jewell',
  description: 'Official site of Dick Jewell',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
