import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectPreview } from '../types';
import '../styles/Works.css';
import ScrollFloat from '../components/ScrollFloat'


const Works = () => {
  // 模拟作品数据，实际项目中可以从API获取或使用CMS
  const projects: ProjectPreview[] = [
    { id: 1, title: 'Fandom', category: 'UI/UX', images: new URL('../assets/fandom/fandom04.jpg', import.meta.url).href },
    { id: 2, title: 'Easy Talk', category: '品牌设计', images: new URL('../assets/easTalk/easy15.jpg', import.meta.url).href },
    { id: 3, title: '电商网站设计', category: 'Web设计', images: '' },
    { id: 4, title: '数据可视化界面', category: 'UI/UX', images: '' },
    { id: 5, title: '社交媒体营销设计', category: '品牌设计', images: '' },
    { id: 6, title: '响应式网站原型', category: 'Web设计', images: '' },
  ];

  return (
    <section id="works" className="works-section">
      <div className="works-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=10%"
            scrollEnd="bottom bottom-=10%"
            stagger={0.03}
          >
            精选作品
          </ScrollFloat>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          探索我的设计作品集，了解我如何通过设计解决问题
        </motion.p>

        <div className="works-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="work-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/project/${project.id}`} className="work-item-link">
                <div className="work-image">
                  {project.images ? (
                    <img src={project.images} alt={project.title} />
                  ) : (
                    <div className="placeholder-image">
                      <span>项目图片</span>
                    </div>
                  )}
                </div>
                <div className="work-info">
                  <h3 className="work-title">{project.title}</h3>
                  <p className="work-category">{project.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default Works;