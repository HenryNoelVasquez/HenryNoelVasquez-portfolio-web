import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import '../styles/ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenView, setFullscreenView] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // 初始化 Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => [...new Set([...prev, index])]);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // 重置可见图片状态
  useEffect(() => {
    setVisibleImages([]);
  }, [project?.id]);

  const nextImage = () => {
    const imagesLength = project?.images?.length || 0;
    if (imagesLength > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === imagesLength - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    const imagesLength = project?.images?.length || 0;
    if (imagesLength > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? imagesLength - 1 : prevIndex - 1
      );
    }
  };

  const openFullscreen = (index: number) => {
    setCurrentImageIndex(index);
    setFullscreenView(true);
    setZoomLevel(1);
  };

  const closeFullscreen = () => {
    setFullscreenView(false);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };
  
  useEffect(() => {
    // 模拟从API获取项目数据
    // 实际项目中可以从API获取或使用CMS
    const fetchProject = () => {
      setLoading(true);
      
      // 模拟项目数据
      const projectsData: Project[] = [
        {
          id: 1,
          title: 'Fandom',
          category: 'UI/UX',
          description: '为健康追踪应用设计直观且美观的用户界面',
          fullDescription:
            '这个项目是为一家健康科技初创公司设计的移动应用界面，旨在帮助用户追踪他们的健康数据并提供个性化的健康建议。',
          challenge:
            '设计一个既美观又功能强大的界面，能够展示复杂的健康数据，同时保持简洁易用。',
          solution:
            '采用了极简主义设计风格，使用柔和的色彩和清晰的数据可视化，确保用户可以轻松理解他们的健康状况。',
          result:
            '应用获得了用户的高度评价，下载量在发布后的第一个月就达到了10万+。',
          images: [
            new URL('../assets/fandom/fandom05.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom06.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom07.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom08.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom09.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom10.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom11.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom12.jpg', import.meta.url).href,
            new URL('../assets/fandom/fandom13.jpg', import.meta.url).href,
          ],
          mainImage: new URL('../assets/fandom/fandom04.jpg', import.meta.url)
            .href,
        },
        {
          id: 2,
          title: 'Easy Talk',
          category: '品牌设计',
          description: '为成立十年的科技公司进行全面的品牌更新',
          fullDescription:
            '这个项目是为一家成立十年的科技公司进行品牌重塑，包括新的标志、色彩系统、排版和品牌指南。',
          challenge:
            '保留品牌的核心价值和识别度，同时使其更现代化以吸引新一代用户。',
          solution:
            '通过深入研究公司历史和价值观，设计了一套既尊重传统又面向未来的品牌视觉系统。',
          result:
            '新品牌形象获得了广泛认可，公司市场份额在重塑后的六个月内增长了15%。',
          images: [
            new URL('../assets/easTalk/easy16.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy17.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy18.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy19.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy20.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy21.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy22.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy23.jpg', import.meta.url).href,
            new URL('../assets/easTalk/easy24.jpg', import.meta.url).href,
          ],
          mainImage: new URL('../assets/easTalk/easy15.jpg', import.meta.url)
            .href,
        },
        {
          id: 3,
          title: 'fandomWeb',
          category: 'Web设计',
          description: '为粉丝社区设计的现代化网站',
          fullDescription:
            '为粉丝社区设计的现代化网站，注重用户体验和社区互动，创造沉浸式的在线交流环境。',
          challenge:
            '在保持网站功能完整的同时，提供流畅的用户体验和清晰的导航结构。',
          solution:
            '采用了大图片布局和动态滚动效果，结合简约的界面设计，突出社区特色。',
          result: '网站用户活跃度提高了40%，社区互动增加了50%。',
          images: [
            new URL('../assets/fandomweb/fandomweb27.jpg', import.meta.url)
              .href,
          ],
          mainImage: new URL('../assets/fandomweb/fandomweb26.jpg', import.meta.url)
            .href,
        },
        {
          id: 4,
          title: '品牌设计',
          category: '品牌设计',
          description: '为新兴科技公司打造独特的品牌视觉系统',
          fullDescription:
            '为一家新兴科技公司设计的完整品牌视觉系统，包括品牌标识、色彩系统、排版规范和视觉元素库。',
          challenge:
            '在竞争激烈的科技市场中创造独特且令人难忘的品牌形象，同时保持专业性和现代感。',
          solution:
            '通过深入研究目标受众和行业趋势，设计了一套既现代又独特的视觉语言，包括动态logo系统和创新的色彩方案。',
          result:
            '新品牌形象获得了行业广泛认可，品牌识别度提升了60%，客户转化率提高了40%。',
          images: [
            new URL('../assets/graphicDesign/graphicDesign30.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign31.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign32.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign33.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign34.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign35.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign36.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign37.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign38.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign39.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign40.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign41.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign42.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign43.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign44.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign45.jpg', import.meta.url).href,
            new URL('../assets/graphicDesign/graphicDesign46.jpg', import.meta.url).href,
          ],
          mainImage: new URL('../assets/graphicDesign/graphicDesign29.jpg', import.meta.url).href,
        },
        {
          id: 5,
          title: '社交媒体营销设计',
          category: '品牌设计',
          description: '为食品品牌设计引人注目的社交媒体营销材料',
          fullDescription:
            '为一家新兴食品品牌设计的社交媒体营销材料，包括Instagram帖子、故事和广告素材。',
          challenge:
            '在竞争激烈的社交媒体环境中创造独特且引人注目的视觉内容，提高品牌知名度。',
          solution:
            '开发了一套鲜明的视觉语言，结合生动的摄影和现代排版，创造出既美观又能传达品牌信息的内容。',
          result: '品牌Instagram关注者在三个月内增长了200%，参与度提高了35%。',
          images: ['/project5-1.jpg', '/project5-2.jpg', '/project5-3.jpg'],
          mainImage: '/project5-main.jpg',
        },
        {
          id: 6,
          title: '响应式网站原型',
          category: 'Web设计',
          description: '为教育平台设计流畅的响应式网站原型',
          fullDescription:
            '为一家在线教育平台设计的响应式网站原型，确保在所有设备上提供一致的学习体验。',
          challenge:
            '创建一个既美观又功能齐全的设计，能够适应从手机到桌面的各种屏幕尺寸。',
          solution:
            '采用了移动优先的设计方法，结合模块化组件和流体布局，确保内容在各种设备上都能完美展示。',
          result: '网站在所有设备上的用户满意度达到95%，课程完成率提高了20%。',
          images: ['/project6-1.jpg', '/project6-2.jpg', '/project6-3.jpg'],
          mainImage: '/project6-main.jpg',
        },
      ]
      
      const foundProject = projectsData.find(p => p.id === parseInt(id || '0'));
      setProject(foundProject || null);
      setLoading(false);
    };
    
    fetchProject();
  }, [id]);
  
  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="project-not-found">
        <h2>项目未找到</h2>
        <p>抱歉，我们无法找到您请求的项目。</p>
        <Link to="/works" className="back-button">返回作品集</Link>
      </div>
    );
  }
  
  return (
    <section className="project-detail-section">
      <div className="project-detail-container">
        <div className="project-header">
          <motion.div 
            className="back-link-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/works" className="back-link">
              <span className="back-arrow">←</span> 返回作品集
            </Link>
          </motion.div>
          
          <motion.h1 
            className="project-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          
          <motion.p 
            className="project-category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.category}
          </motion.p>
        </div>
        
        <motion.div 
          className="project-main-image"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {project.mainImage ? (
            <img src={project.mainImage} alt={project.title} className="main-image" />
          ) : (
            <div className="placeholder-image large">
              <span>项目主图</span>
            </div>
          )}
        </motion.div>
        
        <div className="project-content">
          <div className="project-info">
            <motion.div 
              className="project-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2>项目概述</h2>
              <p>{project.fullDescription}</p>
            </motion.div>
            
            <div className="project-details">
              <motion.div 
                className="detail-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3>挑战</h3>
                <p>{project.challenge}</p>
              </motion.div>
              
              <motion.div 
                className="detail-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3>解决方案</h3>
                <p>{project.solution}</p>
              </motion.div>
              
              <motion.div 
                className="detail-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3>成果</h3>
                <p>{project.result}</p>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="project-gallery"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2>项目图片</h2>
            {project?.images && project.images.length > 0 ? (
              <div className="gallery-grid">
                {project.images.map((image, index) => (
                  <div 
                    className="gallery-item" 
                    key={index}
                    ref={el => {
                      if (el && observerRef.current) {
                        el.setAttribute('data-index', index.toString());
                        observerRef.current.observe(el);
                      }
                    }}
                  >
                    {visibleImages.includes(index) ? (
                      <img 
                        src={image} 
                        alt={`${project.title} - 图片 ${index + 1}`} 
                        onClick={() => openFullscreen(index)}
                        className="gallery-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="gallery-image-placeholder">
                        <div className="loading-spinner small"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="placeholder-gallery">
                <div className="placeholder-image">
                  <span>暂无项目图片</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {fullscreenView && project?.images && (
            <motion.div 
              className="fullscreen-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="fullscreen-content">
                <div className="fullscreen-controls">
                  <button className="fullscreen-close" onClick={closeFullscreen}>
                    <span>×</span>
                  </button>
                </div>
                
                <div className="fullscreen-image-container">
                  <div className="fullscreen-navigation">
                    <button className="fullscreen-nav prev" onClick={prevImage}>
                      <span>❮</span>
                    </button>
                    <button className="fullscreen-nav next" onClick={nextImage}>
                      <span>❯</span>
                    </button>
                  </div>
                  
                  <div className="fullscreen-image-wrapper">
                    <motion.img
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - 图片 ${currentImageIndex + 1}`}
                      className="fullscreen-image"
                      style={{ 
                        transform: `scale(${zoomLevel})`,
                        transition: 'transform 0.3s ease'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <div className="fullscreen-counter">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                  
                  <div className="zoom-controls">
                    <button onClick={zoomOut} disabled={zoomLevel <= 0.5}>
                      <span>－</span>
                    </button>
                    <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
                    <button onClick={zoomIn} disabled={zoomLevel >= 3}>
                      <span>＋</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="next-project"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h3>探索更多作品</h3>
          <div className="next-project-grid">
            {/* 这里可以展示其他相关项目 */}
            <div className="next-project-item">
              <div className="placeholder-image">
                <span>相关项目</span>
              </div>
              <h4>相关项目标题</h4>
            </div>
            <div className="next-project-item">
              <div className="placeholder-image">
                <span>相关项目</span>
              </div>
              <h4>相关项目标题</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;