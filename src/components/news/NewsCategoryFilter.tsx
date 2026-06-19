import { newsCategories, type NewsCategory } from '../../data/news'

interface NewsCategoryFilterProps {
  activeCategory: NewsCategory['slug']
  onCategoryChange: (slug: NewsCategory['slug']) => void
}

export default function NewsCategoryFilter({ activeCategory, onCategoryChange }: NewsCategoryFilterProps) {
  return (
    <nav
      className="news-category-filter-nav border-b border-border"
      aria-label="Lọc danh mục tin tức"
    >
      <div className="news-category-filter-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="news-category-filter-list flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-4">
          {newsCategories.map((category, index) => {
            const isActive = activeCategory === category.slug
            return (
              <li key={category.slug} className="news-category-filter-item flex items-center">
                {index > 0 && (
                  <span className="news-category-filter-divider text-muted-foreground/40 mx-2 sm:mx-3 select-none" aria-hidden="true">
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onCategoryChange(category.slug)}
                  className={`news-category-filter-button text-sm sm:text-base font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {category.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
