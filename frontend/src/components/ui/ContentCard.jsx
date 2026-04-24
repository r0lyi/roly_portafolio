function ContentCard({ title, subtitle, description, tags = [], footer }) {
  return (
    <article className="content-card">
      {subtitle ? <p className="card-meta">{subtitle}</p> : null}
      <h3>{title}</h3>
      <p>{description}</p>

      {tags.length > 0 ? (
        <ul className="card-tags" aria-label={`Etiquetas de ${title}`}>
          {tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {footer ? <p className="card-footer">{footer}</p> : null}
    </article>
  )
}

export default ContentCard
