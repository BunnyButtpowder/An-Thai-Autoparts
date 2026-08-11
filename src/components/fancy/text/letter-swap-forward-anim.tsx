import { useState } from "react"
import { AnimationOptions, motion, stagger, useAnimate } from "motion/react"

interface TextProps {
  label: string
  reverse?: boolean
  transition?: AnimationOptions
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number
  className?: string
  onClick?: () => void
}

const LetterSwapForward = ({
  label,
  reverse = true,
  transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate()
  const [blocked, setBlocked] = useState(false)

  const hoverStart = () => {
    if (blocked) return

    setBlocked(true)

    // Function to merge user transition with stagger and delay
    const mergeTransition = (baseTransition: AnimationOptions) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom,
      }),
    })

    animate(
      ".letter",
      { y: reverse ? "100%" : "-100%" },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter",
        {
          y: 0,
        },
        {
          duration: 0,
        }
      ).then(() => {
        setBlocked(false)
      })
    })

    animate(
      ".letter-secondary",
      {
        top: "0%",
      },
      mergeTransition(transition)
    ).then(() => {
      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        {
          duration: 0,
        }
      )
    })
  }

  const words = label.split(" ")

  return (
    <span
      className={`inline-flex flex-wrap relative ${className} `}
      onMouseEnter={hoverStart}
      onClick={onClick}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {/* Split into words so long titles wrap at word boundaries, then into
          letters for the per-letter swap. Each word is a nowrap unit; wrapping
          only happens between words. */}
      {words.map((word: string, wordIndex: number) => (
        <span
          className="inline-flex whitespace-nowrap"
          key={wordIndex}
          aria-hidden={true}
        >
          {word.split("").map((letter: string, i: number) => (
            <span className="relative flex overflow-hidden" key={i}>
              <motion.span className={`relative letter`} style={{ top: 0 }}>
                {letter}
              </motion.span>
              <motion.span
                className="absolute letter-secondary "
                style={{ top: reverse ? "-100%" : "100%" }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="whitespace-pre"> </span>
          )}
        </span>
      ))}
    </span>
  )
}

export default LetterSwapForward
