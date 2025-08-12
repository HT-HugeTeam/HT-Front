import { StoreDetail } from '@/types/store/store-detail.types';

export function InfoStoreDetail({
  storeDetail,
}: {
  storeDetail: StoreDetail | undefined;
}) {
  return (
    <div className='pl-6 pt-8 w-full h-auto flex flex-col gap-8'>
      {Object.entries({
        상호명: storeDetail?.storeName,
        주소: storeDetail?.storeAddress,
        소개: storeDetail?.storeDescription,
        메뉴: `${storeDetail?.storeMenu[0]}...`,
      }).map(([label, content]) => (
        <div key={label} className='flex flex-col gap-2'>
          <h4 className='text-headlineMedium text-gray500'>{label}</h4>
          <p className='text-bodySmall text-gray600 !font-normal'>{content}</p>
        </div>
      ))}
    </div>
  );
}
