import { resolveImageAssetUrl } from '../../utils/resolveImageAssetUrl.js'

function TechnologyLogo({ item }) {
  const imageUrl = item.imgUrl ?? ''

  if (imageUrl) {
    return (
      <img
        className="h-[76px] w-[76px] object-contain md:h-[92px] md:w-[92px]"
        src={resolveImageAssetUrl(imageUrl)}
        alt={item.name}
        loading="lazy"
        title={item.name}
      />
    )
  }

  return (
    <div
      className="grid h-[76px] w-[76px] place-items-center rounded-[24px] bg-[linear-gradient(135deg,#101820_0%,#244b57_100%)] text-[1.12rem] font-black uppercase tracking-[0.04em] text-[#f8fff9] md:h-[92px] md:w-[92px]"
      title={item.name}
      aria-hidden="true"
    >
      {item.monogram}
    </div>
  )
}

function createMarqueeItems(items, minimumItems = 12) {
  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const repeatCount = Math.max(1, Math.ceil(minimumItems / items.length))

  return Array.from({ length: repeatCount }, (_, repeatIndex) =>
    items.map((item) => ({
      ...item,
      marqueeKey: `${item.id}-${repeatIndex}`,
    })),
  ).flat()
}

function HomeTechnologyGroup({
  items,
  direction = 'right-to-left',
  duration = '34s',
  offset = '0%',
}) {
  const marqueeItems = createMarqueeItems(items)
  const directionClass =
    direction === 'left-to-right'
      ? 'home-tech-marquee__track--ltr'
      : 'home-tech-marquee__track--rtl'

  return (
    <div className="home-tech-marquee relative overflow-hidden py-2">
      <div
        className={`home-tech-marquee__track ${directionClass}`}
        style={{
          '--marquee-duration': duration,
          '--marquee-gap': '24px',
          '--marquee-offset': offset,
        }}
      >
        {[0, 1].map((segmentIndex) => (
          <div
            key={`${direction}-segment-${segmentIndex}`}
            className="home-tech-marquee__segment"
            aria-hidden={segmentIndex === 1}
          >
            {marqueeItems.map((item) => (
              <article
                key={`${segmentIndex}-${item.marqueeKey}`}
                className="grid h-[176px] w-[176px] shrink-0 place-items-center rounded-[34px] bg-[rgba(255,255,255,0.82)] p-7 shadow-[0_18px_40px_rgba(16,16,16,0.08)] ring-1 ring-[rgba(16,16,16,0.05)] backdrop-blur-[8px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(16,16,16,0.12)] max-[640px]:h-[148px] max-[640px]:w-[148px] max-[640px]:rounded-[28px] max-[640px]:p-5"
                title={item.name}
                aria-label={item.name}
              >
                <TechnologyLogo item={item} />
                <span className="sr-only">{item.name}</span>
              </article>
            ))}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#e7e7e9] via-[#e7e7e9]/70 to-transparent max-[640px]:w-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#e7e7e9] via-[#e7e7e9]/70 to-transparent max-[640px]:w-10" />
    </div>
  )
}

export default HomeTechnologyGroup
