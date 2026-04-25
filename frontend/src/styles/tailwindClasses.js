const buttonBaseClass =
  'inline-flex items-center justify-center gap-2.5 rounded-full px-[1.1rem] py-[0.82rem] transition duration-200'

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

export const primaryButtonClass = `${buttonBaseClass} border border-transparent bg-[linear-gradient(135deg,#c56b4d,#9f4f34)] text-white shadow-[0_12px_30px_rgba(197,107,77,0.28)] hover:-translate-y-px`

export const secondaryButtonClass = `${buttonBaseClass} border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.72)] text-[#112029] hover:-translate-y-px hover:border-[rgba(17,32,41,0.18)] hover:bg-[rgba(255,255,255,0.94)]`

export const authLinkClass = `${buttonBaseClass} border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.72)] text-[#112029] hover:-translate-y-px hover:border-[rgba(17,32,41,0.18)] hover:bg-[rgba(255,255,255,0.94)]`

export const dangerButtonClass = `${buttonBaseClass} border border-[rgba(159,79,52,0.24)] bg-[rgba(197,107,77,0.12)] text-[#9f4f34] hover:-translate-y-px`

export const formFieldClass = 'grid gap-2.5'

export const formLabelClass =
  'inline-flex items-center gap-2 font-bold text-[#112029]'

export const textInputClass =
  'w-full rounded-[16px] border border-[rgba(17,32,41,0.12)] bg-[rgba(255,255,255,0.9)] px-4 py-[0.95rem] text-[#112029] outline-none transition duration-200 placeholder:text-[#8f9ca2] focus:border-[rgba(159,79,52,0.35)] focus:shadow-[0_0_0_4px_rgba(197,107,77,0.12)]'

export const textareaClass = `${textInputClass} resize-y`

export function formMessageClass(type = 'info') {
  const baseClass = 'm-0 rounded-[18px] border px-4 py-[0.95rem]'

  const variants = {
    warning:
      'border-[rgba(180,129,61,0.18)] bg-[rgba(221,180,87,0.16)] text-[#7c5b1c]',
    error:
      'border-[rgba(176,74,74,0.18)] bg-[rgba(214,94,94,0.12)] text-[#9a3a3a]',
    success:
      'border-[rgba(39,105,95,0.16)] bg-[rgba(39,105,95,0.12)] text-[#255f54]',
    info: 'border-[rgba(17,32,41,0.12)] bg-[rgba(17,32,41,0.06)] text-[#112029]',
  }

  return `${baseClass} ${variants[type] ?? variants.info}`
}

export const adminModuleClass = 'grid gap-5'

export const adminSectionHeaderClass =
  'flex items-end justify-between gap-5 max-[960px]:flex-col max-[960px]:items-stretch'

export const adminSectionCopyClass = 'grid gap-3'

export const adminSectionDescriptionClass =
  'm-0 max-w-[62ch] leading-[1.65] text-[#5f7881]'

export const adminSectionActionsClass =
  'flex flex-wrap gap-3 max-[960px]:w-full max-[960px]:flex-col max-[960px]:items-stretch'

export const adminPanelClass = `${surfaceCardClass} p-6`

export const adminResourceGridClass =
  'grid items-start gap-[18px] [grid-template-columns:minmax(290px,0.92fr)_minmax(0,1.08fr)] max-[960px]:grid-cols-1'

export const adminPanelHeadingClass =
  'mb-[18px] flex items-center justify-between gap-3 border-b border-[rgba(21,39,48,0.12)] pb-4'

export const adminPanelHeadingMetaClass = 'text-[0.92rem] text-[#5f7881]'

export const adminEmptyStateClass =
  'rounded-[22px] border border-dashed border-[rgba(17,32,41,0.18)] bg-[rgba(255,255,255,0.42)] p-[22px] text-[#5f7881]'

export const adminRecordListClass = 'grid gap-3'

export const adminRecordMainClass = 'grid gap-1.5'

export const adminRecordSummaryClass = 'm-0 text-[#5f7881]'

export const adminRecordMetaClass =
  'mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[0.9rem] text-[#5f7881]'

export function adminRecordCardClass(isActive = false) {
  return `w-full rounded-[24px] border px-[18px] py-[18px] text-left transition duration-200 ${
    isActive
      ? 'border-[rgba(159,79,52,0.3)] bg-[rgba(255,255,255,0.92)] shadow-[0_0_0_4px_rgba(197,107,77,0.12)]'
      : 'border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.84)] hover:-translate-y-px hover:border-[rgba(17,32,41,0.16)] hover:shadow-[0_18px_30px_rgba(17,32,41,0.08)]'
  }`
}

export const adminFormClass = 'grid gap-[18px]'

export const adminInputGridClass = 'grid gap-4'

export const adminInputGridTwoClass = 'grid gap-4 md:grid-cols-2'

export const adminFormActionsClass =
  'flex flex-wrap gap-3 max-[960px]:w-full max-[960px]:flex-col max-[960px]:items-stretch'

export const adminFieldsetClass =
  'grid gap-[14px] rounded-[24px] border border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.46)] p-[18px]'

export const adminFieldsetHeaderClass =
  'flex items-center justify-between gap-3 max-[640px]:flex-col max-[640px]:items-start'

export const adminLinkButtonClass =
  'w-fit border-0 bg-transparent p-0 font-extrabold text-[#9f4f34]'

export const adminChipGridClass =
  'flex flex-wrap gap-2.5 max-[640px]:w-full'

export function adminChipOptionClass(isActive = false) {
  return `relative inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-[0.95rem] py-3 ${
    isActive
      ? 'border-[rgba(159,79,52,0.35)] bg-[rgba(197,107,77,0.12)] text-[#9f4f34]'
      : 'border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.82)] text-[#112029]'
  }`
}

export const adminImageEditorListClass = 'grid gap-3'

export const adminImageEditorRowClass =
  'grid items-center gap-2.5 [grid-template-columns:minmax(0,1fr)_120px_auto] max-[960px]:grid-cols-1'

export const adminInlineDangerButtonClass = `${dangerButtonClass} whitespace-nowrap`

export const adminProjectSwitcherClass =
  'flex flex-wrap gap-2.5 max-[640px]:w-full'

export function adminProjectSwitchClass(isActive = false) {
  return `rounded-full border px-4 py-[0.78rem] transition duration-200 ${
    isActive
      ? 'border-transparent bg-[linear-gradient(135deg,#163a45,#214e59)] text-white'
      : 'border-[rgba(21,39,48,0.12)] bg-[rgba(255,255,255,0.72)] text-[#112029] hover:-translate-y-px'
  } max-[640px]:w-full`
}

export const adminImagePreviewClass =
  'mb-[14px] aspect-[16/10] overflow-hidden rounded-[18px] border border-[rgba(21,39,48,0.12)] bg-[#f0ebe0]'

export const adminCheckboxRowClass =
  'inline-flex items-center gap-2.5 font-bold text-[#112029]'

export const adminStatusBaseClass =
  'm-0 rounded-[18px] border px-4 py-[0.95rem]'

export function adminStatusClass(type = 'info') {
  const variants = {
    error:
      'border-[rgba(176,74,74,0.18)] bg-[rgba(214,94,94,0.12)] text-[#9a3a3a]',
    success:
      'border-[rgba(39,105,95,0.16)] bg-[rgba(39,105,95,0.12)] text-[#255f54]',
    info: 'border-[rgba(17,32,41,0.12)] bg-[rgba(17,32,41,0.06)] text-[#112029]',
  }

  return `${adminStatusBaseClass} ${variants[type] ?? variants.info}`
}
