import { FieldContainer } from '@/components/store-info';
import { VideoResponse } from '@/types/api';

export function VideoCheckDescription({ video }: { video: VideoResponse }) {
  const VideoDescription = [
    {
      label: '주소',
      value: video.address,
    },
    {
      label: '상호명',
      value: video.storeName,
    },
    {
      label: '비디오 생성시간',
      value: video.createdAt,
    },
  ];
  return (
    <div className='flex flex-col items-start gap-8'>
      {VideoDescription.map(item => (
        <FieldContainer
          key={item.label}
          label={item.label}
          value={item.value ?? ''}
        />
      ))}
    </div>
  );
}
