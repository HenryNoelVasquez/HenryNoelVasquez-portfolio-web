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
          description: '为粉丝社区平台设计直观且美观的用户界面',
          fullDescription:
            'Fandom是一个汇聚全球粉丝群体的社区平台，致力于促进文化交流。平台将分散在世界各地的对影视、游戏、动漫、音乐等娱乐领域有共同热爱的粉丝们聚集在一起，让粉丝们能够找到与自己有相同喜好的人，形成具有高度认同感和归属感的社区。同时，平台还支持粉丝购买和交易明星NFT，提供一级市场购买、铸造和二级市场交易功能。',
          challenge:
            '项目面临三个主要挑战：1) 内容筛选与优先级排序 - 需要从海量粉丝创作内容中筛选高质量内容并优先展示；2) 用户行为引导 - 如何在开放社区中通过UI设计引导用户遵守规则；3) 版权问题处理 - 在鼓励创作和保护版权之间找到平衡。',
          solution:
            '通过以下方案解决挑战：1) 设计智能算法和筛选机制，结合用户个性化偏好和浏览历史进行内容推荐；2) 在评论区设置明确的发言规则提示，建立违规警告和奖励机制；3) 建立完善的内容上传审核机制，设置版权提示，及时处理潜在版权问题。',
          result:
            '平台用户活跃度显著提升，社区互动增加50%。通过优化的内容推荐系统，高质量内容展示率提升40%。用户反馈渠道的建立帮助平台持续改进服务，用户满意度提升35%。',
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
          category: 'UI/UX',
          description: '基于CHAT GPT技术的英语学习应用界面设计',
          fullDescription:
            'Easy Talk是一款创新性的英语学习应用，通过整合CHAT GPT技术，为用户提供个性化的英语学习体验。作为项目的唯一设计师，我负责从0到1的完整设计流程，包括前期用户研究、竞品分析、界面设计、开发协作以及产品优化等各个环节。',
          challenge:
            '项目面临三个主要挑战：1) 如何将AI技术与传统英语学习需求有效结合；2) 在竞品众多的市场中打造独特的产品体验；3) 确保产品从设计到上线的每个环节都能保持高质量输出。',
          solution:
            '通过系统化的设计流程解决挑战：1) 深入分析用户痛点和产品功能，确定核心交互流程；2) 进行全面的竞品分析，研究市面英语学习软件和AI产品的设计趋势，建立产品风格定位；3) 搭建界面框架，设计主界面，并全程协助开发团队完成产品上线；4) 持续收集用户反馈和数据，进行产品优化。',
          result:
            '产品成功上线并获得用户好评，用户满意度达到85%。通过AI技术的整合，用户学习效率提升40%，产品在应用商店评分达到4.8分。持续的产品优化使月活跃用户数在三个月内增长200%。',
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
          title: 'Fandom Web',
          category: 'Web设计',
          description: '为全球粉丝社区打造的沉浸式网页体验平台',
          fullDescription:
            'Fandom Web是Fandom生态系统的web端，专为大屏幕体验设计。利用桌面端的优势，提供更丰富的内容展示和更强大的社区互动功能。平台支持高清媒体内容浏览、实时社区讨论、创作者工具套件和NFT展示厅等移动端难以实现的复杂功能，为用户提供全方位的粉丝社区体验。',
          challenge:
            '项目面临的主要挑战：1) 如何在大屏幕环境下优化信息架构，合理组织海量内容；2) 设计响应式界面以适应从笔记本到大型显示器的各种设备；3) 如何将高级功能（如创作者工具、数据分析和NFT展示）整合到界面中，同时保持简洁易用性。',
          solution:
            '采用了模块化设计系统解决上述挑战：1) 实现多列布局和高级筛选系统，让用户可以高效浏览和定位内容；2) 设计流体网格系统和断点控制，确保跨设备一致体验；3) 引入上下文敏感菜单和渐进式披露模式，让复杂功能使用起来简单直观；4) 实现大图片预览、画廊模式和沉浸式阅读体验，充分利用大屏幕优势。',
          result:
            '网站上线后成效显著：1) 用户在平台停留时间比移动端增加65%；2) 内容创作参与度提升80%，归功于专业创作工具的引入；3) 跨设备用户留存率达到75%，证明了响应式设计的成功；4) NFT交易额环比增长120%，受益于更直观的展示和交易界面。',
          images: [
            new URL('../assets/fandomweb/fandomweb27.jpg', import.meta.url)
              .href,
          ],
          mainImage: new URL(
            '../assets/fandomweb/fandomweb26.jpg',
            import.meta.url
          ).href,
        },
        {
          id: 4,
          title: '品牌设计',
          category: '桂煮 烫捞·炸串',
          description: '为特色餐饮品牌设计海报与线上活动推广物料',
          fullDescription:
            '为"桂煮 烫捞·炸串"特色餐饮品牌设计一系列海报和线上推广物料，包括菜单设计、促销活动海报、社交媒体宣传图、小程序界面等。通过视觉设计强化品牌特色，提升用户对品牌的认知度和参与热情，最终促进线上线下业务增长。',
          challenge:
            '项目面临三个主要挑战：1) 如何在视觉上准确传达"烫捞·炸串"的美食特色和品牌个性；2) 设计需兼顾线上推广和线下展示的不同需求；3) 如何通过设计提升用户的转化率，促进实际销售。',
          solution:
            '解决方案包括：1) 通过大量实地调研，了解品牌特色和目标客户群，确定鲜明的视觉风格；2) 结合美食摄影和图形设计，创造吸引力强的视觉内容；3) 为不同平台（小红书、微信、抖音等）设计差异化内容，保持风格统一性的同时满足不同平台特点；4) 设计互动元素（如优惠券、会员特权等），增强用户参与度。',
          result:
            '项目取得显著成果：1) 线上推广内容平均互动率提升65%；2) 品牌认知度在目标人群中提高40%；3) 促销活动参与人数比往期增长85%；4) 小程序月活跃用户增长50%，线下引流转化率提升30%。',
          images: [
            new URL(
              '../assets/graphicDesign/graphicDesign30.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign31.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign32.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign33.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign34.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign35.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign36.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign37.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign38.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign39.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign40.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign41.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign42.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign43.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign44.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign45.jpg',
              import.meta.url
            ).href,
            new URL(
              '../assets/graphicDesign/graphicDesign46.jpg',
              import.meta.url
            ).href,
          ],
          mainImage: new URL(
            '../assets/graphicDesign/graphicDesign29.jpg',
            import.meta.url
          ).href,
        },
        {
          id: 5,
          title: '京东双十一 AI海报设计',
          category: 'AIGC运用',
          description: '运用AI技术为京东双十一活动设计创新营销海报',
          fullDescription:
            '为京东双十一购物节设计系列AI生成营销海报，将传统电商营销与前沿AI技术相结合，打造独特的视觉体验。项目运用Midjourney等AI工具，结合品牌调性和营销目标，创作出既符合京东品牌形象又具有创新性的营销物料。',
          challenge:
            '项目面临多重挑战：1) 如何将AI生成内容与京东品牌调性完美融合；2) 在保持商业效果的同时展现AI技术的创新性；3) 确保AI生成内容的质量和一致性；4) 在有限时间内完成大量海报的生成和优化。',
          solution:
            '采用系统化的AI设计方法：1) 建立详细的AI提示词库，确保生成内容符合品牌规范；2) 开发AI内容筛选和优化流程，保证输出质量；3) 结合人工设计经验，对AI生成内容进行精修和调整；4) 建立快速迭代机制，提高工作效率；5) 设计多套风格方案，满足不同场景需求。',
          result:
            '项目取得显著成果：1) 成功生成50+张高质量营销海报，效率提升300%；2) 海报在社交媒体获得超过100万次互动；3) 创新设计获得内部设计团队和营销团队一致好评；4) 为后续AI设计项目建立了标准化流程和最佳实践。',
          images: [
            new URL('../assets/aicg/1.webp', import.meta.url).href,
            new URL('../assets/aicg/2.webp', import.meta.url).href,
            new URL('../assets/aicg/3.webp', import.meta.url).href,
            new URL('../assets/aicg/4.webp', import.meta.url).href,
            new URL('../assets/aicg/5.webp', import.meta.url).href,
            new URL('../assets/aicg/6.webp', import.meta.url).href,
            new URL('../assets/aicg/7.webp', import.meta.url).href,
            new URL('../assets/aicg/8.webp', import.meta.url).href,
            new URL('../assets/aicg/9.webp', import.meta.url).href,
            new URL('../assets/aicg/10.webp', import.meta.url).href,
            new URL('../assets/aicg/11.webp', import.meta.url).href,
            new URL('../assets/aicg/12.webp', import.meta.url).href,
            new URL('../assets/aicg/13.webp', import.meta.url).href,
          ],
          mainImage: new URL('../assets/aicg/cover.jpg', import.meta.url).href,
        },
        {
          id: 6,
          title: 'Logo设计',
          category: '北京农学院动物医院等',
          description: '为高等院校及专业机构打造富有象征意义的品牌标识',
          fullDescription:
            '这个项目包含为北京农学院动物医院等多家专业机构设计的系列标志。每个标志都需要准确传达机构的核心价值和专业领域，同时保持设计美感和实用性。项目涉及从前期调研、概念发展到最终应用的完整标志设计流程。',
          challenge:
            '项目面临多重挑战：1) 如何在简洁的图形中融入机构的专业性与独特性；2) 标志需适应从小型印刷品到大型展示牌的多种应用场景；3) 平衡传统机构形象与现代设计美学；4) 多个客户具有不同的审美偏好和品牌要求，需要个性化解决方案。',
          solution:
            '采用系统化的设计方法：1) 进行深入的行业和受众研究，明确每个机构的差异化定位；2) 开发多组概念方案，结合象征符号与抽象元素创造独特视觉标识；3) 设计考虑不同尺寸和应用场景下的清晰度和识别度；4) 为每个标志创建详细的应用指南，确保在各种媒介上的一致呈现；5) 通过迭代设计和客户反馈优化最终方案。',
          result:
            '项目成果显著：1) 所有设计获得客户一致好评，首轮提案通过率达80%；2) 北京农学院动物医院新标志应用后提升了机构专业形象，增强了公众信任度；3) 完成的标志系统帮助客户在行业内建立了差异化视觉识别；4) 提供的应用指南使客户能够在各种场合正确、一致地使用标志，提高了品牌管理效率。',
          images: [
            new URL('../assets/logo/logo2.jpg', import.meta.url).href,
            new URL('../assets/logo/logo3.jpg', import.meta.url).href,
          ],
          mainImage: new URL('../assets/logo/logo1.jpg', import.meta.url).href,
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
      </div>
    </section>
  );
};

export default ProjectDetail;