'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface SignatureLogoProps {
  className?: string
  size?: number
  animate?: boolean
  onHover?: boolean
}

const SignatureLogo: React.FC<SignatureLogoProps> = ({ 
  className = '', 
  size = 77,
  animate = true,
  onHover = false
}) => {
  const height = (size * 100) / 77 // Maintain aspect ratio
  const strokeControls = useAnimation()
  const fillControls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  
  const pathData = "M31.7199 1.01294C31.2931 1.70218 28.7425 3.66313 26.0519 5.36843C19.6816 9.40833 12.9489 16.8729 7.14172 26.3349C0.399696 37.3196 -0.897529 41.1348 0.507098 45.8377C2.14241 51.3094 7.28648 56.4852 14.4497 59.8649C17.8716 61.4794 20.8434 62.9637 21.0535 63.165C21.2646 63.3654 19.972 64.9556 18.1817 66.6992C13.061 71.685 9.73524 79.6009 9.2113 88.0506C8.78637 94.8868 8.88723 95.3569 11.2856 97.7617C13.4962 99.9774 14.3582 100.235 18.305 99.8547C29.3328 98.7928 43.5518 86.5972 43.5518 78.2018C43.5518 73.7742 40.68 70.5631 33.4168 66.8678L27.2081 63.7091L29.9734 62.6369C35.7442 60.3997 40.3625 63.3608 48.6978 74.6442C58.6273 88.0852 57.2161 86.8501 59.5556 84.1437C64.8043 78.0726 73.2526 55.2828 75.805 40.3125C77.9157 27.9325 77.0696 26.5737 74.5255 38.257C71.7378 51.0584 68.4914 60.9512 63.6331 71.4462C57.9567 83.7101 57.9605 83.7092 51.5304 74.7556C41.9856 61.4625 36.0608 58.0107 27.9608 61.0205C23.9954 62.4945 23.8198 62.473 17.7689 59.7507C9.36353 55.9693 6.4889 53.7442 4.20265 49.2501C0.311907 41.603 4.01119 31.6905 16.1476 17.2484C21.8847 10.4206 32.0711 2.67142 35.308 2.67142C38.2639 2.67142 37.0358 5.88629 27.436 23.2736C16.3232 43.4019 13.5858 49.1321 14.2526 50.874C15.0782 53.0306 16.4679 52.5896 16.4679 50.1707C16.4679 47.7658 19.6339 41.3801 27.945 27.0194C36.4278 12.361 39.0447 6.88175 39.2044 3.43744C39.3407 0.504443 39.1568 0.314341 35.9226 0.0437028C33.7988 -0.133289 32.2009 0.234741 31.7199 1.01294ZM32.7295 68.029C36.2803 69.9666 40.0225 72.6767 41.047 74.0523C42.8523 76.4778 42.8598 76.6829 41.288 80.8099C37.472 90.8281 19.1165 101.37 13.2048 96.9367C11.6573 95.7764 11.3472 94.4607 11.3677 89.1397C11.407 78.7487 16.8256 68.0515 23.4005 65.3835C26.1079 64.285 25.6083 64.1436 32.7295 68.029Z"
  
  const handleHover = () => {
    if (onHover && !isHovered) {
      setIsHovered(true)
      // Reset and replay animation on hover
      strokeControls.set({ pathLength: 0, opacity: 1 })
      fillControls.set({ opacity: 0 })
      
      strokeControls.start({
        pathLength: 1,
        transition: {
          duration: 2.5,
          ease: "easeInOut",
          delay: 0.2
        }
      })
      
      fillControls.start({
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 2.7
        }
      })
    }
  }
  
  const handleHoverEnd = () => {
    // Reset after animation completes to allow re-hovering
    if (isHovered) {
      setTimeout(() => {
        setIsHovered(false)
      }, 3000) // Wait for animation to complete
    }
  }
  
  // Reset hover state when animation completes
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isHovered])
  
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 77 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      {/* Animated stroke path for tracing effect */}
      <motion.path
        fillRule="evenodd" 
        clipRule="evenodd"
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        animate={isHovered ? strokeControls : animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={isHovered ? undefined : {
          pathLength: { 
            duration: 2.5, 
            ease: "easeInOut",
            delay: 0.2
          },
          opacity: { duration: 0.1 }
        }}
      />
      {/* Filled path that appears after stroke is drawn */}
      <motion.path
        fillRule="evenodd" 
        clipRule="evenodd"
        d={pathData}
        fill="currentColor"
        initial={animate ? { opacity: 0 } : { opacity: 1 }}
        animate={isHovered ? fillControls : animate ? { opacity: 1 } : { opacity: 1 }}
        transition={isHovered ? undefined : {
          opacity: { 
            duration: 0.3, 
            delay: animate ? 2.7 : 0 
          }
        }}
      />
    </svg>
  )
}

export default SignatureLogo


