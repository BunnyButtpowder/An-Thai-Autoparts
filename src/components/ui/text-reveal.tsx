'use client'
import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { useMotionPreference } from '../../context/MotionPreferenceContext'

/**
 * A run of text inside a paragraph. A plain string reveals in the foreground
 * colour; `{ text, highlight: true }` reveals in the brand primary so key
 * phrases land like story beats.
 */
export type RevealSegment = string | { text: string; highlight?: boolean }

interface RevealWord {
  text: string
  highlight: boolean
}

/** Flatten a paragraph's segments into individually-animated words. */
function toWords(segments: RevealSegment[]): RevealWord[] {
  const words: RevealWord[] = []
  for (const segment of segments) {
    const isHighlighted = typeof segment !== 'string'
    const text = isHighlighted ? segment.text : segment
    const highlight = isHighlighted ? Boolean(segment.highlight) : false
    for (const word of text.split(/\s+/).filter(Boolean)) {
      words.push({ text: word, highlight })
    }
  }
  return words
}

interface TextRevealProps {
  /** One inner array per paragraph; each is a list of plain/highlighted runs. */
  paragraphs: RevealSegment[][]
  className?: string
}

/**
 * Scroll-linked storytelling reveal: a tall scroll region pins a centred block
 * while each word fades from a faint outline to full colour as the page scrolls
 * past its slice of the range. Honours the page-wide reduce-motion preference by
 * rendering the full text statically (no tall region, no scrubbing).
 */
export function TextReveal({ paragraphs, className }: TextRevealProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { reduced } = useMotionPreference()
  const { scrollYProgress } = useScroll({ target: targetRef })

  const wordParagraphs = paragraphs.map(toWords)

  if (reduced) {
    return (
      <div className={cn('mx-auto max-w-3xl px-4 sm:px-6 lg:px-8', className)}>
        {wordParagraphs.map((words, paragraphIndex) => (
          <p
            key={paragraphIndex}
            className={cn(
              'text-2xl font-medium leading-relaxed text-foreground sm:text-3xl',
              paragraphIndex > 0 && 'mt-6',
            )}
          >
            {words.map((word, i) => (
              <span key={i} className={word.highlight ? 'text-primary' : undefined}>
                {word.text}{' '}
              </span>
            ))}
          </p>
        ))}
      </div>
    )
  }

  const totalWords = wordParagraphs.reduce((sum, words) => sum + words.length, 0)
  let wordOffset = 0

  return (
    <div
      ref={targetRef}
      className={cn('relative h-[160vh] md:h-[200vh]', className)}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {wordParagraphs.map((words, paragraphIndex) => {
            const paragraph = (
              <p
                key={paragraphIndex}
                className={cn(
                  'flex flex-wrap gap-x-[0.28em] gap-y-1 text-2xl font-medium leading-relaxed sm:text-3xl',
                  paragraphIndex > 0 && 'mt-6',
                )}
              >
                {words.map((word, i) => {
                  const start = (wordOffset + i) / totalWords
                  const end = start + 1 / totalWords
                  return (
                    <RevealWord
                      key={i}
                      progress={scrollYProgress}
                      range={[start, end]}
                      highlight={word.highlight}
                    >
                      {word.text}
                    </RevealWord>
                  )
                })}
              </p>
            )
            wordOffset += words.length
            return paragraph
          })}
        </div>
      </div>
    </div>
  )
}

interface RevealWordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  highlight: boolean
}

function RevealWord({ children, progress, range, highlight }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0, 1])
  const colorClass = highlight ? 'text-primary' : 'text-foreground'
  return (
    <span className="relative">
      {/* Faint resting copy so unrevealed words stay legible as an outline. */}
      <span className={cn('absolute inset-0 opacity-15', colorClass)} aria-hidden>
        {children}
      </span>
      <motion.span style={{ opacity }} className={colorClass}>
        {children}
      </motion.span>
    </span>
  )
}
