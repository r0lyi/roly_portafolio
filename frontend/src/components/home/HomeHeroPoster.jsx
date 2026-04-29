import { portfolioData } from '../../data/portfolio.js'

function HomeHeroPoster() {
  const { profile } = portfolioData

  return (
    <div className="flex justify-end max-[960px]:justify-center">
      <div
        className="relative min-h-[clamp(340px,46vh,480px)] w-full max-w-[500px] overflow-visible border-[4px] border-[#101010] shadow-[16px_16px_0_rgba(16,16,16,0.16)] [background:radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.8),transparent_22%),linear-gradient(135deg,#d8d8d8_0%,#bcbcbc_100%)] max-[960px]:max-w-[620px] max-[640px]:max-w-[360px] max-[640px]:min-h-[280px]"
        role="img"
        aria-label={`Retrato ilustrado de ${profile.name}`}
      >
        <span
          className="pointer-events-none absolute inset-[12%_22%_36%] rounded-[999px] border-[2px] border-[rgba(16,16,16,0.14)]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-60 [background:linear-gradient(90deg,transparent_0,transparent_96%,rgba(16,16,16,0.06)_100%),linear-gradient(180deg,transparent_0,transparent_96%,rgba(16,16,16,0.05)_100%)] [background-size:22px_22px]"
          aria-hidden="true"
        />

        <div className="absolute inset-x-[10%] bottom-0 h-[88%]" aria-hidden="true">
          <span className="absolute left-[22%] top-[30%] z-[3] h-[12%] w-[8%] rounded-[999px] bg-[linear-gradient(180deg,#ececec_0%,#cacaca_100%)]" />
          <span className="absolute right-[22%] top-[30%] z-[3] h-[12%] w-[8%] rounded-[999px] bg-[linear-gradient(180deg,#ececec_0%,#cacaca_100%)]" />
          <span className="absolute left-1/2 top-[14%] z-[5] aspect-[1/1.1] w-[36%] -translate-x-1/2 rounded-[46%_46%_50%_50%/_38%_38%_52%_52%] bg-[linear-gradient(180deg,#f4f4f4_0%,#d2d2d2_100%)]" />
          <span className="absolute left-1/2 top-[11%] z-[6] h-[24%] w-[41%] -translate-x-1/2 rounded-[48%_48%_28%_28%/_58%_58%_24%_24%] bg-[#1b1b1b]" />
          <span className="absolute left-1/2 top-[42%] z-[4] h-[12%] w-[11%] -translate-x-1/2 rounded-b-[16px] bg-[linear-gradient(180deg,#d8d8d8_0%,#bcbcbc_100%)]" />
          <span className="absolute left-[35%] top-[32.5%] z-[7] h-[1.1%] w-[10%] rounded-[999px] bg-[#1e1e1e]" />
          <span className="absolute right-[35%] top-[32.5%] z-[7] h-[1.1%] w-[10%] rounded-[999px] bg-[#1e1e1e]" />
          <span className="absolute left-[37%] top-[34.8%] z-[7] aspect-square w-[6%] rounded-[999px] bg-[#202020] shadow-[0_0_0_4px_rgba(255,255,255,0.95)]" />
          <span className="absolute right-[37%] top-[34.8%] z-[7] aspect-square w-[6%] rounded-[999px] bg-[#202020] shadow-[0_0_0_4px_rgba(255,255,255,0.95)]" />
          <span className="absolute left-1/2 top-[39%] z-[7] h-[10%] w-[2%] -translate-x-1/2 rounded-[999px] bg-[rgba(110,110,110,0.55)]" />
          <span className="absolute left-1/2 top-[50%] z-[7] h-[2%] w-[14%] -translate-x-1/2 rounded-[999px] bg-[rgba(86,86,86,0.65)]" />
          <span className="absolute bottom-0 left-1/2 z-[1] h-[55%] w-[84%] -translate-x-1/2 rounded-[46%_46%_0_0/_26%_26%_0_0] bg-[#1d1d1d]" />
          <span className="absolute bottom-[16%] left-1/2 z-[2] h-[20%] w-[26%] -translate-x-1/2 bg-[#fbfbfb] [clip-path:polygon(50%_100%,10%_0,90%_0)]" />
          <span className="absolute bottom-[23%] left-[43%] z-[3] h-[10%] w-[12%] bg-[#fbfbfb] [clip-path:polygon(0_0,100%_0,82%_100%)]" />
          <span className="absolute bottom-[23%] right-[43%] z-[3] h-[10%] w-[12%] bg-[#fbfbfb] [clip-path:polygon(0_0,100%_0,18%_100%)]" />
          <span className="absolute bottom-[12%] left-1/2 z-[4] h-[17%] w-[10%] -translate-x-1/2 bg-[#0d0d0d] [clip-path:polygon(50%_0,100%_18%,72%_100%,28%_100%,0_18%)]" />
        </div>

        <span className="absolute bottom-[-20px] left-[-18px] border-[4px] border-[#101010] bg-[#18ff48] px-[1.15rem] py-[0.8rem] text-[0.9rem] font-black uppercase tracking-[0.04em] text-[#101010] shadow-[8px_8px_0_#101010] [-webkit-transform:rotate(-3deg)] [transform:rotate(-3deg)] max-[640px]:bottom-[-22px] max-[640px]:left-2 max-[640px]:text-[0.78rem]">
          {profile.availabilityLabel ?? profile.availability}
        </span>
      </div>
    </div>
  )
}

export default HomeHeroPoster
