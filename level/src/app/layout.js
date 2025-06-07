import "./globals.css";
import Nav from './ui/Nav/nav';
import Footer from './ui/Footer/footer';

export const metadata = {
  title: "Work-It",
  description: "Generated with Next JS - App developed by Makkiah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='layout'>
        <Nav/>
        <div className="layout-page">
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
