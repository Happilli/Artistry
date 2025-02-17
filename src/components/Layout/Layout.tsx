import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  author?: string;
  keywords?: string;
  viewport?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Artistry",
  description = "Discover amazing art, manga, and sketches.",
  author = "Safal Lama",
  keywords = "art, manga, sketches, drawing",
  viewport = "width=device-width, initial-scale=1",
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content={viewport} />
      </Helmet>

      <Header />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
