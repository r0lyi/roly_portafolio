import { portfolioData } from '../../data/portfolio.js'
import { normalizeImageAssetPath } from '../../utils/resolveImageAssetUrl.js'

function HomeHeroPoster() {
  const { profile } = portfolioData
  const portraitUrl = normalizeImageAssetPath(profile.portraitUrl ?? '/public/perfil.svg')

  return (
    <div className="flex justify-end max-[960px]:justify-center">
      <div className="relative min-h-[clamp(340px,46vh,480px)] w-full max-w-[500px] overflow-visible border-[4px] border-[#101010] bg-[linear-gradient(145deg,#d8d8d8_0%,#bcbcbc_100%)] shadow-[16px_16px_0_rgba(16,16,16,0.16)] max-[960px]:max-w-[620px] max-[640px]:max-w-[360px] max-[640px]:min-h-[280px]">
        <span
          className="pointer-events-none absolute inset-[12%_22%_36%] rounded-[999px] border-[2px] border-[rgba(16,16,16,0.14)]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-60 [background:linear-gradient(90deg,transparent_0,transparent_96%,rgba(16,16,16,0.06)_100%),linear-gradient(180deg,transparent_0,transparent_96%,rgba(16,16,16,0.05)_100%)] [background-size:22px_22px]"
          aria-hidden="true"
        />

        <div className="absolute inset-[18px] overflow-hidden border-[4px] border-[#101010] bg-[#d7d4ca] max-[640px]:inset-[14px]">
          <img
            className="h-full w-full object-cover object-center"
            src={portraitUrl}
            alt={`Foto de perfil de ${profile.name}`}
          />
        </div>

        <span className="absolute bottom-[-20px] left-[-18px] border-[4px] border-[#101010] bg-[#18ff48] px-[1.15rem] py-[0.8rem] text-[0.9rem] font-black uppercase tracking-[0.04em] text-[#101010] shadow-[8px_8px_0_#101010] [-webkit-transform:rotate(-3deg)] [transform:rotate(-3deg)] max-[640px]:bottom-[-22px] max-[640px]:left-2 max-[640px]:text-[0.78rem]">
          {profile.availabilityLabel ?? profile.availability}
        </span>
      </div>
    </div>
  )
}

export default HomeHeroPoster
