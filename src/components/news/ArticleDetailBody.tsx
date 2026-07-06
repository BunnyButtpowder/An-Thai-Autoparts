import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ArticleBody, ArticleBlock } from '../../data/newsContent'

gsap.registerPlugin(ScrollTrigger)

function renderBlock(block: ArticleBlock, index: number) {
  switch (block.type) {
    case 'lead':
      return (
        <p
          key={index}
          className="article-block article-block-lead text-xl text-foreground/90 leading-relaxed font-medium"
        >
          {block.text}
        </p>
      )
    case 'heading':
      return (
        <h2
          key={index}
          className="article-block article-block-heading text-2xl sm:text-3xl font-bold text-foreground leading-snug pt-2"
        >
          {block.text}
        </h2>
      )
    case 'paragraph':
      return (
        <p
          key={index}
          className="article-block article-block-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed"
        >
          {block.text}
        </p>
      )
    case 'image':
      return (
        <figure key={index} className="article-block article-block-figure my-2">
          <div className="article-block-image-frame relative aspect-video overflow-hidden rounded-xl bg-muted">
            <img
              src={block.src}
              alt={block.caption ?? ''}
              className="article-block-image h-full w-full object-cover"
            />
          </div>
          {block.caption ? (
            <figcaption className="article-block-caption mt-3 text-sm text-muted-foreground italic text-center">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    case 'list':
      return (
        <ul key={index} className="article-block article-block-list flex flex-col gap-3">
          {block.items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className="article-block-list-item flex gap-3 text-base sm:text-lg text-foreground/80 leading-relaxed"
            >
              <span className="article-block-list-marker mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote
          key={index}
          className="article-block article-block-quote border-l-4 border-primary bg-accent rounded-r-xl py-5 px-6"
        >
          <p className="article-block-quote-text text-lg sm:text-xl font-medium text-foreground leading-relaxed">
            “{block.text}”
          </p>
          {block.cite ? (
            <cite className="article-block-quote-cite mt-3 block text-sm font-semibold not-italic text-muted-foreground">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      )
    default:
      return null
  }
}

export default function ArticleDetailBody({ body }: { body: ArticleBody }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.article-block', {
        scrollTrigger: { trigger: '.article-detail-body-section', start: 'top 82%' },
        duration: 0.6,
        y: 28,
        opacity: 0,
        stagger: 0.08,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="article-detail-body-section bg-background py-10 lg:py-14" id="noi-dung">
      <div className="article-detail-body-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-7">
        {body.blocks.map((block, index) => renderBlock(block, index))}

        {body.takeaways && body.takeaways.length > 0 ? (
          <div className="article-takeaways article-block rounded-2xl border border-border bg-card p-6 sm:p-8 mt-4">
            <h2 className="article-takeaways-title text-xl font-bold text-foreground mb-4">
              Điểm chính
            </h2>
            <ul className="article-takeaways-list flex flex-col gap-3">
              {body.takeaways.map((item, index) => (
                <li
                  key={index}
                  className="article-takeaways-item flex gap-3 text-base text-foreground/80 leading-relaxed"
                >
                  <span className="article-takeaways-marker mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
