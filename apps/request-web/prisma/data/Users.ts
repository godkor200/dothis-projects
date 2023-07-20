/***********
model User {
  id                  String              @id @default(cuid())
  name                String?
  email               String?             @unique
  emailVerified       DateTime?
  image               String?
  introduction        String?             @database.Text
  accounts            Account[]
  sessions            Session[]
  requestPosts        RequestPost[]
  requestFundings     RequestFunding[]
  requestComments     RequestComment[]
  requestReactions    RequestReaction[]
  requestBookmarks    RequestBookmark[]
  requestReports      RequestReport[]
  requestInquiries    RequestInquiry[]
  requestinquiryMessages     RequestInquiryMessage[]
  alarms              Alarm[]
  points              Point[]
  rankings            Ranking[]
  creatorReviews      CreatorReview[]
  creator             Creator?

  @@map("users")
}
***********/

export const users = [
  {
    id: 'cl817am62000x3b6p36zsmzd4',
    name: '김회준',
    email: 'rjcnd123@dothis.world',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction:
      '깐따삐아, 안녕? 지구인 친구들 나는 화성에서 온 김회준이라고 해!! 만나서 반가워',
  },
  {
    id: 'cl817am62001m3b6p1g9r5gme',
    name: '민상현',
    email: 'cto@dothis.world',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction:
      '안녕? 내 이름은 민이야. 취미는 뽀구미 방송 시청하기지 그녀는 정말 아름다워',
  },
  {
    id: 'cl817am62001w3b6p6arcfquj',
    name: '온경진',
    email: 'cmo@dothis.world',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: '안녕.. 내 이름은 온경진이야. 따뜻한 사나이지',
  },
  {
    id: 'cl817am6200223b6ps3c9c1or',
    name: '박순헌',
    email: 'sunheon@dothis.world',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction:
      '안녕하십니까? 제 이름은 박순헌입니다. 이곳에서 정상인을 맡고 있지요! 깐따삐아!!',
  },
  {
    id: 'cl817am6200263b6p5py724ix',
    name: '뽀구미',
    email: 'bbogumi@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: '예쁘자나!!! 뒤에 여캠 조명있으면 예쁜거자나!! 예쁘다고 해!!',
  },
  {
    id: 'cl817am6200273b6pqbusk0nj',
    name: '김계란',
    email: 'egg@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: '헛!!! 헛!!! 잠시 프로틴 좀 먹고 오겠습니다.',
  },
  {
    id: 'cl817am62002a3b6p7lvam8gp',
    name: '진용진',
    email: 'trueyong@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: '그란데말입니다!! 그란데 사이즈 말입니다!!',
  },
  {
    id: 'cl817am62002h3b6p4h1rgcmv',
    name: '페이커',
    email: 'faker@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: '미드는 나의 것 미드는 곧 나다.',
  },
  {
    id: 'cl817am62002n3b6p1vbbxctw',
    name: '침착맨',
    email: 'innerpeaceman@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: 'yo... chim to the tube chim tube yeah!!',
  },
  {
    id: 'cl817am62002q3b6pkgc71ys3',
    name: '뉴진스',
    email: 'newjeans@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/AOh14Ghv6O6AbM_XhZeauX7aoQOj1RPZgw9-RxF7wMFv=s96-c',
    introduction: 'Attention!!!! 으아아아~~~~ Attention!!!!! yoyoyo!',
  },
] as const;
