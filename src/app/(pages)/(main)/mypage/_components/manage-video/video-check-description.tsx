import { FieldContainer } from '@/components/store-info';

const VideoDescription = [
  {
    label: '제목',
    value: '추천 멘트',
  },
  {
    label: '상세 설명',
    value:
      '📍 신촌에서 찾은 숨은 맛집, 가문의 우동!매일 직접 뽑는 쫄깃한 면발과 깊은 국물 맛이 일품이에요.\n따뜻한 우동 한 그릇으로 오늘 하루를 마무리해보세요🍲\n✅ 위치: 서울 서대문구 ○○로 ○○\n✅ 영업시간: 매일 11:00 ~ 21:00 (브레이크타임 15:00~17:00)\n✅ 전화: 02-000-0000\n#신촌맛집 #가문의우동 #우동맛집 #신촌데이트코스 #신촌점심추천 #신촌저녁추천 #신촌핫플 #서울맛집',
  },
  {
    label: '메뉴',
    value: '아메리카노\n라떼\n티\n커피라떼',
  },
];

export function VideoCheckDescription() {
  return (
    <div className='flex flex-col items-start gap-8'>
      {VideoDescription.map(item => (
        <FieldContainer
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
}
