const buttonBaseClass =
  'inline-flex items-center justify-center gap-2.5 border-[3px] border-[#101010] px-[1.05rem] py-[0.92rem] text-[0.8rem] font-black uppercase tracking-[0.05em] text-[#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70'

export const pageSectionClass =
  'px-7 py-[72px] max-[960px]:px-[18px] max-[640px]:py-14'

export const eyebrowClass =
  'm-0 text-[0.82rem] font-extrabold uppercase tracking-[0.14em] text-[#9f4f34]'

export const displayHeadingClass =
  "m-0 max-w-[12ch] font-['Fraunces'] text-[clamp(3rem,6vw,5.5rem)] leading-[1.02] text-[#112029]"

export const sectionHeadingClass =
  "m-0 max-w-none font-['Fraunces'] text-[clamp(1.9rem,3vw,2.4rem)] leading-[1.02] text-[#112029]"

export const heroSummaryClass =
  'm-0 max-w-[60ch] text-[1.05rem] leading-[1.65] text-[#5f7881]'

export const surfaceCardClass =
  'rounded-[32px] border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.76)] backdrop-blur-[14px]'

export const contentCardClass = `${surfaceCardClass} p-6`

export const cardMetaClass =
  'm-0 text-[0.92rem] font-semibold text-[#9f4f34]'

export const cardFooterClass =
  'm-0 mt-[18px] text-[0.92rem] font-semibold text-[#9f4f34]'

export const cardTitleClass =
  'm-0 mt-[10px] text-[1.18rem] font-semibold text-[#112029]'

export const cardBodyClass = 'm-0 mt-3 leading-[1.65] text-[#5f7881]'

export const pillTagListClass = 'm-[18px_0_0] flex flex-wrap gap-2.5 p-0'

export const pillTagClass =
  'list-none rounded-full border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.64)] px-[0.9rem] py-[0.55rem] text-[0.92rem] text-[#28424c]'

export const primaryButtonClass = `${buttonBaseClass} bg-[#101010] text-[#18ff48] shadow-[4px_4px_0_#101010] hover:shadow-[6px_6px_0_#101010]`

export const secondaryButtonClass = `${buttonBaseClass} bg-white shadow-[4px_4px_0_#101010] hover:shadow-[6px_6px_0_#101010]`

export const authLinkClass = `${buttonBaseClass} bg-[#ffde59] shadow-[4px_4px_0_#101010] hover:shadow-[6px_6px_0_#101010]`

export const dangerButtonClass = `${buttonBaseClass} bg-[#ff7a59] shadow-[4px_4px_0_#101010] hover:shadow-[6px_6px_0_#101010]`

export const formFieldClass = 'grid gap-2.5'

export const formLabelClass =
  'inline-flex items-center gap-2 text-[0.78rem] font-black uppercase tracking-[0.08em] text-[#101010]'

export const textInputClass =
  'w-full border-[3px] border-[#101010] bg-white px-4 py-[0.95rem] font-bold text-[#101010] outline-none transition duration-200 placeholder:text-[#8a8a8a] focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[6px_6px_0_rgba(16,16,16,0.14)]'

export const textareaClass = `${textInputClass} resize-y`

export function formMessageClass(type = 'info') {
  const baseClass = 'm-0 border-[3px] border-[#101010] px-4 py-[0.95rem] font-bold text-[#101010]'

  const variants = {
    warning: 'bg-[#ffde59]',
    error: 'bg-[#ffb0a6]',
    success: 'bg-[#b9ff9a]',
    info: 'bg-[#f2f0e8]',
  }

  return `${baseClass} ${variants[type] ?? variants.info}`
}

export const adminEyebrowClass =
  'm-0 w-fit border-[3px] border-[#101010] bg-[#ffde59] px-[0.85rem] py-[0.55rem] text-[0.76rem] font-black uppercase tracking-[0.12em] text-[#101010]'

export const adminDisplayHeadingClass =
  "m-0 max-w-[12ch] font-['Manrope'] text-[clamp(2.9rem,6vw,5.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.08em] text-[#101010]"

export const adminSectionHeadingClass =
  "m-0 max-w-none font-['Manrope'] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.06em] text-[#101010]"

export const adminSummaryClass =
  'm-0 max-w-[62ch] text-[1.02rem] font-bold leading-[1.6] text-[#2f2f2f]'

export const adminModuleClass = 'grid gap-6'

export const adminSectionHeaderClass =
  'grid gap-5 border-[4px] border-[#101010] bg-[#fffef8] p-[clamp(20px,3vw,32px)] shadow-[8px_8px_0_rgba(16,16,16,0.16)]'

export const adminSectionCopyClass = 'grid gap-3'

export const adminSectionDescriptionClass =
  adminSummaryClass

export const adminSectionActionsClass =
  'flex flex-wrap gap-3 max-[960px]:w-full max-[960px]:flex-col max-[960px]:items-stretch'

export const adminPanelClass =
  'border-[4px] border-[#101010] bg-white p-6 shadow-[8px_8px_0_rgba(16,16,16,0.16)]'

export const adminResourceGridClass =
  'grid items-start gap-6 [grid-template-columns:minmax(300px,0.92fr)_minmax(0,1.08fr)] max-[960px]:grid-cols-1'

export const adminPanelHeadingClass =
  'mb-5 flex items-center justify-between gap-3 border-b-[4px] border-[#101010] pb-4 text-[#101010] [&>h3]:m-0 [&>h3]:text-[1.08rem] [&>h3]:font-black [&>h3]:uppercase [&>h3]:tracking-[-0.04em]'

export const adminPanelHeadingMetaClass =
  'border-[3px] border-[#101010] bg-[#f2f0e8] px-3 py-1 text-[0.72rem] font-black uppercase tracking-[0.08em] text-[#101010]'

export const adminEmptyStateClass =
  'border-[3px] border-dashed border-[#101010] bg-[#fff7bf] p-[22px] font-bold leading-[1.6] text-[#2f2f2f]'

export const adminRecordListClass = 'grid gap-4'

export const adminRecordMainClass = 'grid gap-1.5'

export const adminRecordSummaryClass = 'm-0 text-[0.96rem] font-medium leading-[1.55] text-[#373737]'

export const adminRecordMetaClass =
  'mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[0.76rem] font-black uppercase tracking-[0.05em] text-[#4b4b4b]'

export function adminRecordCardClass(isActive = false) {
  return `w-full border-[3px] px-[18px] py-[18px] text-left transition duration-200 ${
    isActive
      ? 'border-[#101010] bg-[#18ff48] text-[#101010] shadow-[6px_6px_0_#101010]'
      : 'border-[#101010] bg-white text-[#101010] shadow-[4px_4px_0_rgba(16,16,16,0.14)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(16,16,16,0.16)]'
  }`
}

export const adminFormClass = 'grid gap-[18px]'

export const adminInputGridClass = 'grid gap-4'

export const adminInputGridTwoClass = 'grid gap-4 md:grid-cols-2'

export const adminFormActionsClass =
  'flex flex-wrap gap-3 max-[960px]:w-full max-[960px]:flex-col max-[960px]:items-stretch'

export const adminFieldsetClass =
  'grid gap-[14px] border-[3px] border-[#101010] bg-[#f2f0e8] p-[18px]'

export const adminFieldsetHeaderClass =
  'flex items-center justify-between gap-3 text-[#101010] [&>h3]:m-0 [&>h3]:text-[1rem] [&>h3]:font-black [&>h3]:uppercase [&>h3]:tracking-[-0.03em] max-[640px]:flex-col max-[640px]:items-start'

export const adminLinkButtonClass =
  'w-fit border-[3px] border-[#101010] bg-[#ffde59] px-3 py-2 text-[0.74rem] font-black uppercase tracking-[0.06em] text-[#101010] shadow-[4px_4px_0_#101010] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#101010] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'

export const adminChipGridClass =
  'flex flex-wrap gap-3 max-[640px]:w-full'

export function adminChipOptionClass(isActive = false) {
  return `relative inline-flex cursor-pointer items-center gap-2.5 border-[3px] px-[0.95rem] py-3 text-[0.82rem] font-black uppercase tracking-[0.04em] transition duration-200 ${
    isActive
      ? 'border-[#101010] bg-[#ffde59] text-[#101010] shadow-[4px_4px_0_#101010]'
      : 'border-[#101010] bg-white text-[#101010] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(16,16,16,0.14)]'
  }`
}

export const adminImageEditorListClass = 'grid gap-3'

export const adminImageEditorRowClass =
  'grid items-center gap-2.5 [grid-template-columns:minmax(0,1fr)_120px_auto] max-[960px]:grid-cols-1'

export const adminInlineDangerButtonClass = `${dangerButtonClass} whitespace-nowrap`

export const adminProjectSwitcherClass =
  'flex flex-wrap gap-3 max-[640px]:w-full'

export function adminProjectSwitchClass(isActive = false) {
  return `border-[3px] px-4 py-[0.78rem] text-[0.8rem] font-black uppercase tracking-[0.05em] transition duration-200 ${
    isActive
      ? 'border-[#101010] bg-[#18ff48] text-[#101010] shadow-[6px_6px_0_#101010]'
      : 'border-[#101010] bg-white text-[#101010] shadow-[4px_4px_0_rgba(16,16,16,0.12)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(16,16,16,0.14)]'
  } max-[640px]:w-full`
}

export const adminImagePreviewClass =
  'mb-[14px] aspect-[16/10] overflow-hidden border-[3px] border-[#101010] bg-[#f2f0e8]'

export const adminCheckboxRowClass =
  'inline-flex items-center gap-2.5 text-[0.78rem] font-black uppercase tracking-[0.08em] text-[#101010]'

export const adminStatusBaseClass =
  'm-0 border-[3px] border-[#101010] px-4 py-[0.95rem] font-bold text-[#101010]'

export function adminStatusClass(type = 'info') {
  const variants = {
    error: 'bg-[#ffb0a6]',
    success: 'bg-[#b9ff9a]',
    info: 'bg-[#f2f0e8]',
  }

  return `${adminStatusBaseClass} ${variants[type] ?? variants.info}`
}
