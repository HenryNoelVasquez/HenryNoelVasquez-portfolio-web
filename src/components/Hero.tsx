import { motion } from 'framer-motion';
import '../styles/Hero.css';
import backgroundVideo from '../assets/85581_1742133687.mp4';

const Hero = () => {
  return (
    <section className="hero">
      <div className="video-background">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            {/* 创意设计，无限可能 */}
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            {/* 专注于用户体验与界面设计，打造令人惊艳的数字产品 */}
          </motion.p>
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          >
            {/* <a href="#works" className="cta-button">查看作品</a>
            <a href="#contact" className="cta-link">联系我</a> */}
          </motion.div>
        </div>
        <div className="hero-image">
          <motion.div 
            className="image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          >
            {/* 这里预留放置主图的位置 */}
            {/* <div className="placeholder-image">
              <span>设计作品展示</span>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;