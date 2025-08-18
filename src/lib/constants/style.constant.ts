export const INPUT_STYLES = {
  base: 'w-full text-bodySmall text-gray600 border-b-2 border-gray600 focus:outline-none focus:ring-0',
  input: 'pt-5 pb-2',
  textarea: 'pt-5 pb-6 resize-none',
} as const;

export const FORM_FIELDS = [
  {
    key: 'storeName' as const,
    type: 'input',
    label: '상호명',
  },
  {
    key: 'storeAddress' as const,
    type: 'input',
    label: '주소',
  },
  {
    key: 'storeDescription' as const,
    type: 'textarea',
    label: '소개',
  },
  {
    key: 'storeNaverMap' as const,
    type: 'input',
    label: '네이버 지도 연결',
  },
] as const;
