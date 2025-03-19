import { motion } from 'framer-motion';
import { Skill } from '../types';
import '../styles/About.css';

const About = () => {
  const skills: Skill[] = [
    { id: 1, name: 'UI设计', level: 95 },
    { id: 2, name: 'UX设计', level: 90 },
    { id: 3, name: '品牌设计', level: 85 },
    { id: 4, name: '原型设计', level: 92 },
    { id: 5, name: '3D建模', level: 75 },
    { id: 6, name: '动效设计', level: 88 },
  ];

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
          <div className="about-skills">
            <motion.h3
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              技能专长
            </motion.h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className="skill-item"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
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