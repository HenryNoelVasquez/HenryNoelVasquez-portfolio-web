import { useSprings, animated } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { SplitTextProps } from '../types'

// 添加全局样式以支持响应式字体大小
// 使用函数调用方式创建全局样式，避免TypeScript类型错误
const GlobalStyles = createGlobalStyle`
  .split-parent {
    font-size: var(--font-size-base, 4rem);
  }
  
  @media (max-width: 768px) {
    .split-parent {
      font-size: var(--font-size-md, 3rem);
    }
  }
  
  @media (max-width: 576px) {
    .split-parent {
      font-size: var(--font-size-sm, 2.5rem);
    }
  }
`

const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = (t: number) => t,
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  fontSize = '4rem',
  fontWeight = 600,
  responsive = true,
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ').map((word) => word.split(''))
  const letters = words.flat()
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const animatedCount = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next: (props: any) => Promise<void>) => {
            await next(animationTo)
            animatedCount.current += 1
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete()
            }
          }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  )

  // 创建响应式字体大小样式
  const getResponsiveStyles = () => {
    const baseStyles: React.CSSProperties & { [key: string]: string | number } = {
      textAlign,
      overflow: 'hidden',
      display: 'inline',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      fontWeight,
    }
  
    if (!responsive) {
      return {
        ...baseStyles,
        fontSize,
      }
    }
  
    // 计算响应式字体大小的CSS变量
    const fontSizeBase = fontSize
    const fontSizeMd = typeof fontSize === 'string' && fontSize.includes('rem') 
      ? `calc(${parseFloat(fontSize) * 0.75}rem)` 
      : typeof fontSize === 'string' && fontSize.includes('px')
        ? `calc(${parseFloat(fontSize) * 0.75}px)`
        : '2.25rem'
    const fontSizeSm = typeof fontSize === 'string' && fontSize.includes('rem')
      ? `calc(${parseFloat(fontSize) * 0.625}rem)`
      : typeof fontSize === 'string' && fontSize.includes('px')
        ? `calc(${parseFloat(fontSize) * 0.625}px)`
        : '1.875rem'
    
    // 设置CSS变量，但不在内联样式中使用媒体查询
    return {
      ...baseStyles,
      '--font-size-base': fontSizeBase,
      '--font-size-md': fontSizeMd,
      '--font-size-sm': fontSizeSm,
    } as React.CSSProperties
  }

  // 使用重命名后的GlobalStyles组件
  
  return (
    <>
      <GlobalStyles />
      <p
        ref={ref}
        className={`split-parent ${className}`}
        style={getResponsiveStyles()}
      >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              letterIndex

            return (
              <animated.span
                key={index}
                style={{
                  ...springs[index],
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                }}
              >
                {letter}
              </animated.span>
            )
          })}
          <span style={{ display: 'inline-block', width: '0.3em' }}>
            &nbsp;
          </span>
        </span>
      ))}
    </p>
    </>
  )
}

export default SplitText
