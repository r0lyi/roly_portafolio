const homeButtonBaseClass =
  'inline-flex items-center justify-center gap-2.5 border-[4px] border-[#101010] px-4 py-[0.9rem] font-black uppercase tracking-[0.04em] text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70'

export const homeSectionBaseClass =
  'border-t-[4px] border-[#101010] py-[84px] max-[640px]:py-14'

export const homeSectionContainerClass =
  'mx-auto w-full max-w-[1180px] px-4 sm:px-6'

export const homePanelClass =
  'border-[4px] border-[#101010] bg-[#fffef8] shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]'

export const homeHeadingTextLabelClass =
  'm-0 text-[clamp(2rem,4.8vw,3.5rem)] font-black uppercase leading-none tracking-[-0.06em] text-[#101010] max-[640px]:text-[clamp(1.8rem,10vw,2.8rem)]'

export const homeHeadingDarkBadgeClass =
  'm-0 w-fit border-[4px] border-[#101010] bg-[#101010] px-[0.62rem] py-[0.28rem] text-[clamp(2rem,4.8vw,3.35rem)] font-black uppercase leading-none tracking-[-0.06em] text-white shadow-[8px_8px_0_rgba(16,16,16,0.16)] max-[640px]:text-[clamp(1.8rem,10vw,2.7rem)] max-[640px]:shadow-[6px_6px_0_rgba(16,16,16,0.16)]'

export const homeButtonPrimaryClass = `${homeButtonBaseClass} bg-[#18ff48]`

export const homeButtonNeutralClass = `${homeButtonBaseClass} bg-white`

export const homeButtonInvertedClass = `${homeButtonBaseClass} bg-[#101010] text-[#18ff48]`

export const homeButtonMutedBlockClass =
  'mt-auto inline-flex w-full items-center justify-center border-[3px] border-[#101010] bg-[#ece7d6] px-4 py-[0.88rem] text-[0.88rem] font-black uppercase tracking-[0.04em] text-[#505050]'

export const homeFieldWrapperClass = 'grid gap-2'

export const homeFieldLabelClass =
  'text-[0.82rem] font-black uppercase leading-[1.2] tracking-[-0.03em] text-[#2f2f2f]'

export const homeInputClass =
  'w-full border-[4px] border-[#101010] bg-white px-4 py-[0.95rem] font-bold text-[#101010] outline-none transition duration-200 placeholder:text-[#989898] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_rgba(16,16,16,0.12)]'

export const homeTextareaClass = `${homeInputClass} min-h-[168px] resize-y`

export function homeStatusMessageClass(type = 'success') {
  const baseClass =
    'm-0 border-[3px] border-[#101010] px-4 py-[0.95rem] text-[0.94rem] font-bold leading-[1.55]'

  const variants = {
    error: 'bg-[#ffb0a6] text-[#101010]',
    success: 'bg-[#b9ff9a] text-[#101010]',
    info: 'bg-[#f2f0e8] text-[#101010]',
  }

  return `${baseClass} ${variants[type] ?? variants.info}`
}
