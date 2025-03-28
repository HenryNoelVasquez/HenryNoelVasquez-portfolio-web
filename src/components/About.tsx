import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          关于我
        </motion.h2>
        <div className="about-content">
          <div className="about-text">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <h3>设计哲学</h3>
              <p>
                我相信设计不仅仅是关于美学，更是关于解决问题和创造体验。每个项目都是一次探索用户需求和商业目标的旅程，通过设计找到平衡点。
              </p>

              <h3>专业背景</h3>
              <p>
                拥有超过5年的UI/UX设计经验，曾与多家科技公司和创业团队合作，专注于创造直观且引人入胜的数字体验。
              </p>
            </motion.div>
          </div>
        </div>
        <div className="about-image">
          <motion.div
            className="image-container"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* 这里预留放置个人照片的位置 */}
            <div className="placeholder-image">
              <span>个人照片</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
};

export default About;