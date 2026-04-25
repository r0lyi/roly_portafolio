import {
  cardBodyClass,
  cardFooterClass,
  cardMetaClass,
  cardTitleClass,
  contentCardClass,
  pillTagClass,
  pillTagListClass,
} from '../../styles/tailwindClasses.js'

function ContentCard({ title, subtitle, description, tags = [], footer }) {
  return (
    <article className={contentCardClass}>
      {subtitle ? <p className={cardMetaClass}>{subtitle}</p> : null}
      <h3 className={cardTitleClass}>{title}</h3>
      <p className={cardBodyClass}>{description}</p>

      {tags.length > 0 ? (
        <ul className={pillTagListClass} aria-label={`Etiquetas de ${title}`}>
          {tags.map((tag) => (
            <li key={tag} className={pillTagClass}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {footer ? <p className={cardFooterClass}>{footer}</p> : null}
    </article>
  )
}

export default ContentCard
