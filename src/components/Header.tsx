import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>DESIGN PORTFOLIO</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">首页</Link>
          <Link to="/works" className="nav-link">作品</Link>
          <Link to="/about" className="nav-link">关于我</Link>
          <Link to="/contact" className="nav-link">联系</Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;