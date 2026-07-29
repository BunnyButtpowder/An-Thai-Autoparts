import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import useMobileMenu from '../hooks/useMobileMenu'
import Header from '../components/header/Header'
import HomeDesktopNav from '../components/header/HomeDesktopNav'
import HomeMobileMenu from '../components/header/HomeMobileMenu'
import HomeFooter from '../components/footer/Footer'
import ArticleDetailHero from '../components/news/ArticleDetailHero'
import ArticleDetailBody from '../components/news/ArticleDetailBody'
import RelatedArticles from '../components/news/RelatedArticles'
import FollowSection from '../components/contact/FollowSection'
import { getArticleBySlug, getRelatedArticles } from '../data/news'
import { getArticleBody } from '../data/newsContent'

export default function ArticleDetailPage() {
  const { isOpen, toggle, close } = useMobileMenu()
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined
  const body = article ? getArticleBody(article.id) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  return (
    <>
      <Header
        desktopNav={<HomeDesktopNav />}
        mobileMenu={<HomeMobileMenu isOpen={isOpen} onClose={close} />}
        isMobileMenuOpen={isOpen}
        onMobileMenuToggle={toggle}
      />
      <main>
        {article ? (
          <>
            <ArticleDetailHero article={article} readingMinutes={body?.readingMinutes} />
            {body ? (
              <ArticleDetailBody body={body} />
            ) : (
              <section className="article-detail-fallback-section bg-background py-10 lg:py-14">
                <div className="article-detail-fallback-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="article-detail-fallback-text text-lg text-foreground/80 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </section>
            )}
            <RelatedArticles articles={getRelatedArticles(article)} />
            <FollowSection />
          </>
        ) : (
          <section className="article-not-found-section min-h-[60vh] flex items-center justify-center pt-32 pb-16">
            <div className="article-not-found-container max-w-md mx-auto px-4 text-center">
              <h1 className="article-not-found-title text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Không tìm thấy bài viết
              </h1>
              <p className="article-not-found-text text-muted-foreground mb-8">
                Bài viết bạn tìm có thể đã được gỡ hoặc đường dẫn không chính xác.
              </p>
              <Link
                to="/tin-tuc"
                className="article-not-found-link inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover cursor-pointer"
              >
                Xem tất cả tin tức
              </Link>
            </div>
          </section>
        )}
      </main>
      <HomeFooter />
    </>
  )
}
