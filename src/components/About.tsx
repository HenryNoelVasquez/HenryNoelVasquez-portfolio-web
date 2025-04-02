import { motion } from 'framer-motion';
import '../styles/About.css';
import selfImage from '../assets/self.jpg';

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

              <h3>专业背景</h3>
              <p>
                拥有超过4年的设计行业经验，精通各类设计软件和工具，包括但不限于Sketch、Figma、Axure等界面设计工具，以及Photoshop、Illustrator、midjourney、SD、After Effects等设计软件。具备出色的手绘技能和动态图形设计能力。
              </p>
              <p>
                掌握先进的摄影技术和视频编辑技能，例如使用Adobe Premiere Pro进行视频剪辑，以增加设计作品的视觉冲击力。在多个项目中展现了卓越的设计能力，成功创造了符合品牌形象且用户体验流畅的视觉作品。通过定期的用户测试和深入的数据分析，持续优化设计方案，有效提升了用户满意度和参与度。
              </p>
              <p>
                结合硬技能与软技能的综合应用，成功领导并完成了多项从概念到成品的设计项目，其中包括重塑品牌形象、设计用户界面以及制作市场推广材料等，实现了10%的用户互动增长。具备优秀的沟通能力和团队合作精神，能够在跨部门合作中发挥关键作用，确保设计解决方案与公司战略和用户需求紧密对接。
              </p>

              <h3>工作经历</h3>
              <div className="experience-item">
                <div className="experience-header">
                  <span className="company">北京智联未来科技有限公司</span>
                  <span className="period">2022/03 ~ 至今</span>
                </div>
                <div className="position">UI设计师</div>
                <ul className="responsibilities">
                  <li>负责产品界面设计与用户体验优化，制定产品发展策略并协调跨部门协作，通过用户研究、竞品分析及可用性测试持续提升用户满意度。</li>
                  <li>主导品牌视觉体系建设，完成市场推广、品牌宣传及线下活动的创意设计与执行，统筹公司内部宣传物料的视觉呈现与品牌一致性。</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <span className="company">北京市海安停车管理有限责任公司</span>
                  <span className="period">2021/08 ~ 2022/03</span>
                </div>
                <div className="position">视觉设计师</div>
                <ul className="responsibilities">
                  <li>主导项目全周期视觉设计：现场勘测需求对接后，输出信息可视化方案PPT；制定色彩/字体/图标规范，把控UI/UX设计与技术实现一致性；通过交互原型演示动态汇报进度。</li>
                  <li>建立设计优化与资产复用体系：基于用户反馈数据（如热力图）迭代视觉方案；搭建品牌视觉资产库，开发可复用的H5/海报/UI组件系统。</li>
                </ul>
              </div>
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
            <img 
              src={selfImage} 
              alt="个人照片" 
              className="profile-image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
};

export default About;