// 集中管理项目中的类型定义

// SplashCursor组件相关类型
export interface ColorRGB {
  r: number
  g: number
  b: number
}

export interface SplashCursorProps {
  SIM_RESOLUTION?: number
  DYE_RESOLUTION?: number
  CAPTURE_RESOLUTION?: number
  DENSITY_DISSIPATION?: number
  VELOCITY_DISSIPATION?: number
  PRESSURE?: number
  PRESSURE_ITERATIONS?: number
  CURL?: number
  SPLAT_RADIUS?: number
  SPLAT_FORCE?: number
  SHADING?: boolean
  COLOR_UPDATE_SPEED?: number
  BACK_COLOR?: ColorRGB
  TRANSPARENT?: boolean
}

export interface Pointer {
  id: number
  texcoordX: number
  texcoordY: number
  prevTexcoordX: number
  prevTexcoordY: number
  deltaX: number
  deltaY: number
  down: boolean
  moved: boolean
  color: ColorRGB
}

// FBO相关类型
export interface FBO {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => void
}

export interface DoubleFBO {
  read: FBO
  write: FBO
  swap: () => void
}

// ProjectDetail组件相关类型
export interface Project {
  id: number
  title: string
  category: string
  description?: string
  fullDescription?: string
  challenge?: string
  solution?: string
  result?: string
  images?: string[]
  mainImage?: string
}

// ScrollFloat组件相关类型
export interface ScrollFloatProps {
  children: React.ReactNode
  scrollContainerRef?: React.RefObject<HTMLElement>
  containerClassName?: string
  textClassName?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
}

// SplitText组件相关类型
export interface SplitTextProps {
  text?: string
  className?: string
  delay?: number
  animationFrom?: { opacity: number; transform: string }
  animationTo?: { opacity: number; transform: string }
  easing?: (t: number) => number
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'
  fontSize?: string
  fontWeight?: string | number
  responsive?: boolean
  onLetterAnimationComplete?: () => void
}

// ShinyText组件相关类型
export interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

// Works组件相关类型
export interface ProjectPreview {
  id: number
  title: string
  category: string
  images:string
}

// Contact组件相关类型
export interface ContactInfo {
  icon: React.ReactNode
  title: string
  content: string
  link?: string
}

export interface SocialLink {
  icon: React.ReactNode
  url: string
}

// Header组件相关类型
export interface HeaderProps {
  className?: string
}