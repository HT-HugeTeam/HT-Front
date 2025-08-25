export interface SocialAccount {
  name: string;
  followers: string;
  url: string;
}

export interface FoodSocialAccounts {
  instagram: SocialAccount[];
  youtube: SocialAccount[];
  tiktok: SocialAccount[];
}

export const FOOD_SOCIAL_ACCOUNTS: FoodSocialAccounts = {
  // 인스타그램 먹스타/음식 관련 계정 (10개)
  instagram: [
    {
      name: '먹깨비',
      followers: '156k',
      url: 'https://instagram.com/mukggaebi_official',
    },
    {
      name: '서울맛집탐방',
      followers: '231k',
      url: 'https://instagram.com/seoul_food_guide',
    },
    {
      name: '혼밥여왕',
      followers: '89k',
      url: 'https://instagram.com/honbap_queen',
    },
    {
      name: '푸디그램',
      followers: '342k',
      url: 'https://instagram.com/foodiegram_kr',
    },
    {
      name: '맛있는하루',
      followers: '127k',
      url: 'https://instagram.com/delicious_day_kr',
    },
    {
      name: '근육식당',
      followers: '330k',
      url: 'https://instagram.com/muscle_kitchen_official',
    },
    {
      name: '홈쿡마스터',
      followers: '198k',
      url: 'https://instagram.com/homecook_master',
    },
    {
      name: '디저트헌터',
      followers: '245k',
      url: 'https://instagram.com/dessert_hunter_seoul',
    },
    {
      name: '야식탐험대',
      followers: '167k',
      url: 'https://instagram.com/nightfood_explorer',
    },
    {
      name: '건강한밥상',
      followers: '134k',
      url: 'https://instagram.com/healthy_table_kr',
    },
  ],

  // 유튜브 먹방/요리 채널 (10개)
  youtube: [
    {
      name: '쯔양',
      followers: '1.02M',
      url: 'https://youtube.com/@tzuyang',
    },
    {
      name: '햄지',
      followers: '10.4M',
      url: 'https://youtube.com/@hamzy',
    },
    {
      name: '히밥',
      followers: '6.89M',
      url: 'https://youtube.com/@heebab',
    },
    {
      name: 'Jane ASMR 제인',
      followers: '18.3M',
      url: 'https://youtube.com/@janeASMR',
    },
    {
      name: '설기양 SULGI',
      followers: '4.21M',
      url: 'https://youtube.com/@sulgi',
    },
    {
      name: '매일맛나',
      followers: '4.71M',
      url: 'https://youtube.com/@maeilmatna',
    },
    {
      name: '문복희',
      followers: '3.45M',
      url: 'https://youtube.com/@moonbokhee',
    },
    {
      name: '입짧은햇님',
      followers: '2.87M',
      url: 'https://youtube.com/@shortmouth_sun',
    },
    {
      name: '이공삼',
      followers: '2.34M',
      url: 'https://youtube.com/@gongsam_table',
    },
    {
      name: 'Hongyu ASMR 홍유',
      followers: '5.67M',
      url: 'https://youtube.com/@hongyuASMR',
    },
  ],

  // 틱톡 음식 쇼츠 계정 (10개)
  tiktok: [
    {
      name: '먹스나',
      followers: '8.7M',
      url: 'https://tiktok.com/@meoksna',
    },
    {
      name: '코리아푸드',
      followers: '3.4M',
      url: 'https://tiktok.com/@korea_food_official',
    },
    {
      name: '짧은먹방',
      followers: '2.1M',
      url: 'https://tiktok.com/@short_mukbang',
    },
    {
      name: '요리왕김치',
      followers: '1.8M',
      url: 'https://tiktok.com/@cooking_king_kimchi',
    },
    {
      name: '스트리트푸드',
      followers: '4.2M',
      url: 'https://tiktok.com/@streetfood_korea',
    },
    {
      name: '맛있는순간',
      followers: '1.5M',
      url: 'https://tiktok.com/@tasty_moment_kr',
    },
    {
      name: '한식마스터',
      followers: '2.7M',
      url: 'https://tiktok.com/@korean_food_master',
    },
    {
      name: '디저트쇼츠',
      followers: '1.9M',
      url: 'https://tiktok.com/@dessert_shorts_kr',
    },
    {
      name: '레시피킹',
      followers: '3.1M',
      url: 'https://tiktok.com/@recipe_king_official',
    },
    {
      name: '푸드트렌드',
      followers: '2.3M',
      url: 'https://tiktok.com/@food_trend_korea',
    },
  ],
};

// 타입별로 개별 export도 제공
export const INSTAGRAM_FOOD_ACCOUNTS = FOOD_SOCIAL_ACCOUNTS.instagram;
export const YOUTUBE_FOOD_ACCOUNTS = FOOD_SOCIAL_ACCOUNTS.youtube;
export const TIKTOK_FOOD_ACCOUNTS = FOOD_SOCIAL_ACCOUNTS.tiktok;
