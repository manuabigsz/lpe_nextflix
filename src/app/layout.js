import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Menu from '@/components/Menu';
import { NextAuthProvider } from "./providers/NextAuthProvider";

export const metadata = {
  title: "Nextflix",
  description: "Trabalho 2 de LPE",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body style={{
        backgroundColor: '#141414',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}>
        <NextAuthProvider>

          <Menu />
          <main style={{
            flexGrow: 1,
            backgroundImage: 'url("/images/netflix-background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            padding: '20px',
            paddingTop: '80px', // ajuste conforme a altura real do Menu
          }}>

            {children}
          </main></NextAuthProvider>

      </body>
    </html>
  );
}
