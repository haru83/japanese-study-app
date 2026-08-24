export interface TopicCategory {
  id: string;
  label: string;
  icon: string;
}

export interface TopicInfo {
  id: string;
  nameKo: string;
  nameJa: string;
  categoryId: string;
  categoryLabel: string;
  icon: string;
  description: string;
}

export interface TopicWord {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  category: string;
  categoryLabel: string;
  topicId: string;
  topicLabel: string;
  icon: string;
  exampleJa: string;
  exampleReading?: string;
  exampleKo: string;
}

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    "id": "all",
    "label": "전체",
    "icon": "🌟"
  },
  {
    "id": "travel",
    "label": "여행 & 교통",
    "icon": "✈️"
  },
  {
    "id": "food",
    "label": "음식 & 미식",
    "icon": "🍱"
  },
  {
    "id": "daily",
    "label": "일상 & 라이프",
    "icon": "🏡"
  },
  {
    "id": "shopping",
    "label": "쇼핑 & 편의",
    "icon": "🛍️"
  },
  {
    "id": "health",
    "label": "건강 & 의료",
    "icon": "🏥"
  },
  {
    "id": "business",
    "label": "비즈니스 & 직장",
    "icon": "💼"
  },
  {
    "id": "entertainment",
    "label": "취미 & 엔터",
    "icon": "🎮"
  },
  {
    "id": "relationship",
    "label": "인간관계 & 감정",
    "icon": "💬"
  },
  {
    "id": "study",
    "label": "학습 & 자기계발",
    "icon": "📚"
  },
  {
    "id": "society",
    "label": "사회 & 도시생활",
    "icon": "🏙️"
  }
];

export const TOPIC_LIST: TopicInfo[] = [
  {
    "id": "travel-airport",
    "nameKo": "공항 & 탑승수속",
    "nameJa": "空港・搭乗",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "✈️",
    "description": "공항 체크인, 수하물, 탑승구 관련 필수 단어"
  },
  {
    "id": "travel-train",
    "nameKo": "기차 & 지하철",
    "nameJa": "電車・新幹線",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🚅",
    "description": "신칸센, 개찰구, 환승, 플랫폼 관련 표현"
  },
  {
    "id": "travel-bus-taxi",
    "nameKo": "버스 & 택시",
    "nameJa": "バス・タクシー",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🚕",
    "description": "버스 정류장, 택시 호출, 목적지 안내 표현"
  },
  {
    "id": "travel-hotel",
    "nameKo": "호텔 & 숙소",
    "nameJa": "ホテル・宿泊",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🏨",
    "description": "체크인/아웃, 조식, 룸서비스, 숙박 관련 단어"
  },
  {
    "id": "travel-car-rental",
    "nameKo": "렌터카 & 드라이브",
    "nameJa": "レンタカー",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🚗",
    "description": "국제면허증, 주유소, 내비게이션, 고속도로 표현"
  },
  {
    "id": "travel-sightseeing",
    "nameKo": "관광지 & 명소",
    "nameJa": "観光名所",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "⛩️",
    "description": "입장권, 안내 팜플렛, 기념촬영, 관람 코스"
  },
  {
    "id": "travel-onsen",
    "nameKo": "온천 & 료칸",
    "nameJa": "温泉・旅館",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "♨️",
    "description": "노천탕, 가이세키 요리, 유카타, 입욕 예절"
  },
  {
    "id": "travel-ticket",
    "nameKo": "티켓 & 예약",
    "nameJa": "チケット予約",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🎫",
    "description": "예매권, 왕복표, 할인권, 매진, 환불 표현"
  },
  {
    "id": "travel-directions",
    "nameKo": "길 묻기 & 위치",
    "nameJa": "道案内・位置",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🗺️",
    "description": "교차로, 신호등, 도보, 맞은편, 길 찾기 표현"
  },
  {
    "id": "travel-customs",
    "nameKo": "출입국 & 세관",
    "nameJa": "出入国・税関",
    "categoryId": "travel",
    "categoryLabel": "여행 & 교통",
    "icon": "🛂",
    "description": "입국 심사, 세관 신고, 면세, 환전 관련 단어"
  },
  {
    "id": "food-ramen",
    "nameKo": "라멘 & 면요리",
    "nameJa": "ラーメン・麺類",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🍜",
    "description": "면 꼬들하게, 사리 추가, 국물 진함, 토핑"
  },
  {
    "id": "food-sushi-izakaya",
    "nameKo": "스시 & 이자카야",
    "nameJa": "寿司・居酒屋",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🍣",
    "description": "초밥 네타, 오토오시, 꼬치구이, 사시미 모둠"
  },
  {
    "id": "food-cafe",
    "nameKo": "카페 & 디저트",
    "nameJa": "カフェ・スイーツ",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "☕",
    "description": "테이크아웃, 덜 달게, 얼음 적게, 케이크, 파르페"
  },
  {
    "id": "food-bakery",
    "nameKo": "베이커리 & 빵",
    "nameJa": "パン屋",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🥐",
    "description": "갓 구운 빵, 식빵, 메론빵, 크루아상, 쟁반과 집게"
  },
  {
    "id": "food-fastfood",
    "nameKo": "패스트푸드 & 규동",
    "nameJa": "ファストフード・牛丼",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🍔",
    "description": "곱빼기, 국물 자작하게(츠유다쿠), 세트 메뉴, 버거"
  },
  {
    "id": "food-convenience",
    "nameKo": "편의점 음식 & 간식",
    "nameJa": "コンビニ飯",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🍙",
    "description": "삼각김밥, 도시락 데우기, 핫스낵 치킨, 푸딩"
  },
  {
    "id": "food-ingredients",
    "nameKo": "식재료 & 조미료",
    "nameJa": "食材・調味料",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🧂",
    "description": "간장, 된장, 미림, 육수(다시), 유통기한, 신선도"
  },
  {
    "id": "food-taste",
    "nameKo": "맛 표현 & 식감",
    "nameJa": "味・食感",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "😋",
    "description": "감칠맛, 바삭바삭, 쫀득쫀득, 폭신폭신, 매콤함"
  },
  {
    "id": "food-order",
    "nameKo": "식당 주문 & 매너",
    "nameJa": "注文・マナー",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🍽️",
    "description": "추천 메뉴, 계산서, 따로 계산, 물 리필, 호출 벨"
  },
  {
    "id": "food-drinks",
    "nameKo": "음료 & 주류",
    "nameJa": "ドリンク・お酒",
    "categoryId": "food",
    "categoryLabel": "음식 & 미식",
    "icon": "🍺",
    "description": "생맥주, 일본주(사케), 하이볼, 무알콜, 녹차, 차"
  },
  {
    "id": "daily-morning",
    "nameKo": "아침 일과 & 기상",
    "nameJa": "朝のルーティン",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "⏰",
    "description": "알람 시계, 늦잠, 세수, 양치질, 아침 준비"
  },
  {
    "id": "daily-housework",
    "nameKo": "집안일 & 청소/빨래",
    "nameJa": "家事・掃除洗濯",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "🧹",
    "description": "빨래 널기, 청소기 돌리기, 설거지, 쓰레기 배출"
  },
  {
    "id": "daily-housing",
    "nameKo": "주거 & 방 구하기",
    "nameJa": "住まい・賃貸",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "🏠",
    "description": "월세(야칭), 보증금(시키킨), 방 구조, 채광, 역세권"
  },
  {
    "id": "daily-weather",
    "nameKo": "날씨 & 기상 현상",
    "nameJa": "天気・気象",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "☀️",
    "description": "쾌청, 소나기, 습도, 장마철, 태풍, 강수확률"
  },
  {
    "id": "daily-seasons",
    "nameKo": "사계절 & 자연",
    "nameJa": "四季・自然",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "🌸",
    "description": "벚꽃놀이, 신록, 단풍, 첫눈, 환절기, 매미 소리"
  },
  {
    "id": "daily-pets",
    "nameKo": "반려동물 & 돌봄",
    "nameJa": "ペット・ケア",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "🐕",
    "description": "산책, 동물병원, 사료 주기, 예방접종, 털 빗질"
  },
  {
    "id": "daily-digital",
    "nameKo": "스마트폰 & IT",
    "nameJa": "スマホ・デジタル",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "📱",
    "description": "충전기, 푸시 알림, 통신 속도, 배터리 잔량, 백업"
  },
  {
    "id": "daily-postal-bank",
    "nameKo": "우체국 & 은행",
    "nameJa": "郵便局・銀行",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "📮",
    "description": "계좌 개설, 비밀번호, 등기 우편, 송금 이체, 통장"
  },
  {
    "id": "daily-salon",
    "nameKo": "미용실 & 뷰티",
    "nameJa": "美容院・ヘアケア",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "💇",
    "description": "앞머리, 머리끝 정리, 디자이너 지명, 염색, 매직"
  },
  {
    "id": "daily-fashion",
    "nameKo": "패션 & 의류",
    "nameJa": "ファッション・服",
    "categoryId": "daily",
    "categoryLabel": "일상 & 라이프",
    "icon": "👗",
    "description": "돌려 입기, 촉감, 레이어드 룩, 기장 수선, 아우터"
  },
  {
    "id": "shopping-mall",
    "nameKo": "쇼핑몰 & 백화점",
    "nameJa": "モール・デパート",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "🏬",
    "description": "안내데스크, 지하 식품관(데파치카), 면세 카운터, 세일"
  },
  {
    "id": "shopping-drugstore",
    "nameKo": "드럭스토어 & 의약",
    "nameJa": "ドラッグストア",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "💊",
    "description": "안약, 파스, 자외선 차단제, 위장약, 반창고, 영양제"
  },
  {
    "id": "shopping-100yen",
    "nameKo": "100엔샵 & 생활잡화",
    "nameJa": "100円ショップ",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "🛒",
    "description": "수납용품, 아이디어 상품, 소모품, 문구류, 가성비"
  },
  {
    "id": "shopping-electronics",
    "nameKo": "전자제품 & 가전",
    "nameJa": "家電量販店",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "📺",
    "description": "변압기, 보증서, 재고, 110V 변환 플러그, 보조배터리"
  },
  {
    "id": "shopping-fitting",
    "nameKo": "사이즈 & 피팅룸",
    "nameJa": "試着・サイズ",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "👗",
    "description": "피팅룸, 기장 수선, 딱 맞음, 넉넉함, 다른 색상"
  },
  {
    "id": "shopping-payment",
    "nameKo": "계산 & 간편결제",
    "nameJa": "お会計・決済",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "💳",
    "description": "일시불, 전자화폐, 영수증, 거스름돈, 터치 결제"
  },
  {
    "id": "shopping-refund",
    "nameKo": "환불 & 상품 교환",
    "nameJa": "返品・交換",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "🔄",
    "description": "반품, 사이즈 교환, 초기 불량, 미개봉 영수증 지참"
  },
  {
    "id": "shopping-supermarket",
    "nameKo": "슈퍼마켓 & 장보기",
    "nameJa": "スーパー・買い物",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "🥦",
    "description": "마감 세일품, 반값 스티커, 유료 봉투, 장바구니"
  },
  {
    "id": "shopping-souvenir",
    "nameKo": "오미야게 & 선물",
    "nameJa": "お土産・贈答品",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "🎁",
    "description": "기념품, 지역 한정 스낵, 소포장 과자, 선물 포장"
  },
  {
    "id": "shopping-online",
    "nameKo": "온라인쇼핑 & 택배",
    "nameJa": "通販・宅配便",
    "categoryId": "shopping",
    "categoryLabel": "쇼핑 & 편의",
    "icon": "📦",
    "description": "부재표, 재배송 신청, 송장 번호, 문 앞 비대면 배송"
  },
  {
    "id": "health-hospital",
    "nameKo": "병원 접수 & 진료",
    "nameJa": "病院・受付",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🏥",
    "description": "초진, 건강보험증, 문진표 작성, 처방전, 진찰권"
  },
  {
    "id": "health-pharmacy",
    "nameKo": "약국 & 복약 지도",
    "nameJa": "薬局・服薬",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "💊",
    "description": "식전/식후 복용, 부작용, 복약 수첩, 제네릭 의약품"
  },
  {
    "id": "health-symptoms",
    "nameKo": "증상 & 통증 표현",
    "nameJa": "症状・痛み",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🤒",
    "description": "두통, 구토감, 오한, 어지럼증, 나른함, 설사, 인후통"
  },
  {
    "id": "health-body",
    "nameKo": "신체 부위 & 통증 부위",
    "nameJa": "身体の部位",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🧍",
    "description": "머리, 얼굴, 눈, 코, 입, 귀, 목, 어깨, 팔, 손, 손가락, 가슴, 배, 등, 허리, 다리, 무릎, 발 등"
  },
  {
    "id": "health-dentist",
    "nameKo": "치과 & 구강 관리",
    "nameJa": "歯科・虫歯",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🦷",
    "description": "충치, 스케일링, 사랑니 발치, 마취, 이 시림, 때운 것"
  },
  {
    "id": "health-eye",
    "nameKo": "안과 & 시력",
    "nameJa": "眼科・視力",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "👓",
    "description": "시력 검사, 콘택트렌즈, 눈 침침함, 눈 피로, 다래끼"
  },
  {
    "id": "health-emergency",
    "nameKo": "응급 & 응급처치",
    "nameJa": "救急・応急手当",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🚑",
    "description": "119 구급차, 응급처치, AED 심장충격기, 지혈, CPR"
  },
  {
    "id": "health-fitness",
    "nameKo": "헬스 & 운동",
    "nameJa": "フィットネス・運動",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🏋️",
    "description": "유산소 운동, 근육통, 웨이트 트레이닝, 단백질 보충제"
  },
  {
    "id": "health-mental",
    "nameKo": "멘탈헬스 & 휴식",
    "nameJa": "メンタル・リフレッシュ",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "🧘",
    "description": "기분 전환, 불면증, 숨돌리기, 활력 회복, 마인드풀니스"
  },
  {
    "id": "health-checkup",
    "nameKo": "건강검진 & 예방",
    "nameJa": "健康診断・検査",
    "categoryId": "health",
    "categoryLabel": "건강 & 의료",
    "icon": "📋",
    "description": "정기 건강검진, 채혈, 혈압 측정, 금식 공복, 내시경"
  },
  {
    "id": "biz-greetings",
    "nameKo": "직장 인사 & 예절",
    "nameJa": "職場挨拶・マナー",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "🙇",
    "description": "수고하십니다, 먼저 퇴근하겠습니다, 명함 교환, 상석/하석"
  },
  {
    "id": "biz-meeting",
    "nameKo": "회의 & 프레젠테이션",
    "nameJa": "会議・プレゼン",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "📊",
    "description": "회의록, 아젠다 안건, 사전 의견 조율(네마와시), 질의응답"
  },
  {
    "id": "biz-email",
    "nameKo": "비즈니스 이메일",
    "nameJa": "ビジネスメール",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "✉️",
    "description": "평소 신세 지고 있습니다, 첨부 파일 확인(고사슈), 참조"
  },
  {
    "id": "biz-phone",
    "nameKo": "전화 응대 & 메모",
    "nameJa": "電話対応",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "📞",
    "description": "회신 전화 드리겠습니다, 외출 중, 잠시만 기다려주세요"
  },
  {
    "id": "biz-report",
    "nameKo": "보고 & 업무 연락",
    "nameJa": "報告・連絡・相談",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "📋",
    "description": "호렌소, 진척 상황, 마감일 데드라인, 일정 앞당김"
  },
  {
    "id": "biz-contract",
    "nameKo": "계약 & 거래처 협상",
    "nameJa": "契約・交渉",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "🤝",
    "description": "견적서, 청구서(인보이스), 납기 기한, 도장 날인"
  },
  {
    "id": "biz-drink",
    "nameKo": "회식 & 친목 도모",
    "nameJa": "飲み会・懇親会",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "🍻",
    "description": "건배, 2차 노래방, 총무(간사), 술 따르기, 더치페이"
  },
  {
    "id": "biz-leave",
    "nameKo": "근태 & 휴가/출장",
    "nameJa": "勤怠・休暇・出張",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "🏖️",
    "description": "유급 연차, 출장, 지각/조퇴, 야근 잔업, 재택근무"
  },
  {
    "id": "biz-recruit",
    "nameKo": "채용 & 이직/면접",
    "nameJa": "採用・転職・面接",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "👔",
    "description": "이력서, 경력기술서, 지원 동기, 합격 내정, 면접관"
  },
  {
    "id": "biz-terms",
    "nameKo": "오피스 업계 은어",
    "nameJa": "ビジネス用語・カタカナ語",
    "categoryId": "business",
    "categoryLabel": "비즈니스 & 직장",
    "icon": "💼",
    "description": "리스케줄, 업무 배정(아사인), 보류(펜딩), 확정(픽스)"
  },
  {
    "id": "ent-anime",
    "nameKo": "애니메이션 & 성우",
    "nameJa": "アニメ・声優",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "🎬",
    "description": "작화 붕괴, 레전드 화(갓화), 복선 회수, 성지순례, 최애"
  },
  {
    "id": "ent-manga",
    "nameKo": "만화 & 웹툰",
    "nameJa": "マンガ・コミック",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "📚",
    "description": "단행본, 주간지 연재, 전자책 이북, 휴재, 컷 연출"
  },
  {
    "id": "ent-game",
    "nameKo": "게임 & e스포츠",
    "nameJa": "ゲーム・eスポーツ",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "🎮",
    "description": "가챠 뽑기, 인게임 과금, 리세마라, 반복 파밍(주회)"
  },
  {
    "id": "ent-karaoke",
    "nameKo": "노래방 & J-POP",
    "nameJa": "カラオケ・J-POP",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "🎤",
    "description": "가수 뮤비 영상, 정밀 채점, 프리타임, 십팔번 애창곡"
  },
  {
    "id": "ent-cinema",
    "nameKo": "영화 & 드라마",
    "nameJa": "映画・ドラマ",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "🍿",
    "description": "자막판, 더빙판, 스포일러 방지, 무제한 스트리밍, 정주행"
  },
  {
    "id": "ent-photo",
    "nameKo": "사진 & 카메라",
    "nameJa": "写真・カメラ",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "📷",
    "description": "DSLR, 인스타 감성(바에루), 아웃포커싱 보케, 삼각대"
  },
  {
    "id": "ent-outdoor",
    "nameKo": "캠핑 & 아웃도어",
    "nameJa": "キャンプ・アウトドア",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "⛺",
    "description": "텐트 설치, 불멍 모닥불, 방한복, 바비큐, 침낭"
  },
  {
    "id": "ent-reading",
    "nameKo": "독서 & 서점",
    "nameJa": "読書・書店",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "📖",
    "description": "문고본 소설, 홍보 띠지, 책 커버, 베스트셀러, 사놓고 안 읽은 책"
  },
  {
    "id": "ent-matsuri",
    "nameKo": "축제 & 마츠리",
    "nameJa": "祭り・花火",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "🏮",
    "description": "야타이 포장마차, 불꽃놀이 대회, 금붕어 건지기, 미코시 가마"
  },
  {
    "id": "ent-sports",
    "nameKo": "스포츠 & 야구/축구",
    "nameJa": "スポーツ観戦",
    "categoryId": "entertainment",
    "categoryLabel": "취미 & 엔터테인먼트",
    "icon": "⚾",
    "description": "스모, 프로야구, 서포터즈 응원, 9회말 역전승, 고시엔"
  },
  {
    "id": "rel-dating",
    "nameKo": "연애 & 데이트",
    "nameJa": "恋愛・デート",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "💌",
    "description": "사랑 고백, 교제 시작, 1주년 기념일, 약속 장소, 롱디"
  },
  {
    "id": "rel-friends",
    "nameKo": "친구 & 우정",
    "nameJa": "友達・友情",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "👫",
    "description": "소꿉친구, 평생 절친, 싸우고 화해, 술친구, 마음이 맞음"
  },
  {
    "id": "rel-family",
    "nameKo": "가족 & 친척",
    "nameJa": "家族・親戚",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "👨‍👩‍👧",
    "description": "조부모님, 부모님, 조카(오이코/메이코), 본가 귀성, 효도"
  },
  {
    "id": "rel-positive",
    "nameKo": "긍정 감정 & 기쁨",
    "nameJa": "ポジティブ感情",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "✨",
    "description": "두근두근 설렘, 안도함, 뿌듯하고 자랑스러움, 감격, 심쿵"
  },
  {
    "id": "rel-negative",
    "nameKo": "부정 감정 & 분노/슬픔",
    "nameJa": "ネガティブ感情",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "🌧️",
    "description": "답답하고 찝찝함(모야모야), 짜증, 질투, 초조함, 분함"
  },
  {
    "id": "rel-personality",
    "nameKo": "성격 & 인물 묘사",
    "nameJa": "性格・人柄",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "😀",
    "description": "낯가림, 꼼꼼함, 털털함, 다정함, 고집스러움, 승부욕"
  },
  {
    "id": "rel-apology",
    "nameKo": "감사 & 사과 표현",
    "nameJa": "感謝・謝罪",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "🙏",
    "description": "신세 많이 졌습니다, 송구합니다, 덕분에, 사죄의 말씀"
  },
  {
    "id": "rel-celebration",
    "nameKo": "축하 & 경조사",
    "nameJa": "お祝い・冠婚葬祭",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "🎉",
    "description": "축의금, 조의금, 결혼 답례품, 병문안, 명복을 빕니다"
  },
  {
    "id": "rel-smalltalk",
    "nameKo": "스몰토크 & 일상 잡담",
    "nameJa": "雑談・世間話",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "💬",
    "description": "요즘 어때?, 여전히, 세상 사는 이야기, 그런데, 맞장구"
  },
  {
    "id": "rel-sns",
    "nameKo": "SNS & 온라인 소통",
    "nameJa": "SNS・ネット交流",
    "categoryId": "relationship",
    "categoryLabel": "인간관계 & 감정",
    "icon": "📱",
    "description": "팔로우, 좋아요, 온라인 논란(엔조), DM 쪽지, 읽씹"
  },
  {
    "id": "study-school",
    "nameKo": "학교 수업 & 캠퍼스",
    "nameJa": "学校・大学生活",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "🏫",
    "description": "휴강, 수강신청, 이수 학점, 세미나 발표, 동아리, 학식"
  },
  {
    "id": "study-jlpt",
    "nameKo": "JLPT & 일본어 시험",
    "nameJa": "JLPT・検定試験",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "💯",
    "description": "합격선 커트라인, 청해, 독해, 언어지식, 과락 기준"
  },
  {
    "id": "study-shadowing",
    "nameKo": "섀도잉 & 발음/회화",
    "nameJa": "シャドーイング・会話",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "🗣️",
    "description": "섀도잉 훈련, 네이티브 발음, 고저 피치 악센트, 음독"
  },
  {
    "id": "study-library",
    "nameKo": "도서관 & 독서실",
    "nameJa": "図書館・自習室",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "📚",
    "description": "도서 대출, 반납 기한, 자습실 열람실, 소장 도서 검색"
  },
  {
    "id": "study-habits",
    "nameKo": "목표 설정 & 습관화",
    "nameJa": "目標設定・習慣化",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "🎯",
    "description": "습관화 루틴, 목표 달성, 동기부여, 작심삼일 극복"
  },
  {
    "id": "study-abroad",
    "nameKo": "유학 & 어학연수",
    "nameJa": "留学・語学研修",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "✈️",
    "description": "교환유학, 재류카드 등록, 홈스테이, 알바 허가증"
  },
  {
    "id": "study-paper",
    "nameKo": "리포트 & 논문 작성",
    "nameJa": "レポート・論文",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "📝",
    "description": "참고문헌 출처, 인용, 마감 엄수, 논문 요약, 첨삭 지도"
  },
  {
    "id": "study-time",
    "nameKo": "시간 관리 & 집중력",
    "nameJa": "時間管理・集中力",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "⏱️",
    "description": "우선순위, 자투리 시간 활용, 집중력, 일 미루기 방지"
  },
  {
    "id": "study-tech",
    "nameKo": "IT 개발 & 테크",
    "nameJa": "プログラミング・IT",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "💻",
    "description": "프로그래밍 코딩, 에러 디버깅, 앱 배포 릴리즈, 인공지능"
  },
  {
    "id": "study-readingclub",
    "nameKo": "독서 모임 & 스터디",
    "nameJa": "読書会・勉強会",
    "categoryId": "study",
    "categoryLabel": "학습 & 자기계발",
    "icon": "📖",
    "description": "북클럽, 이번 달 지정 도서, 의견 교환 토론, 배운 것 아웃풋"
  },
  {
    "id": "soc-office",
    "nameKo": "구청 행정 & 서류",
    "nameJa": "区役所・行政手続き",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "🏢",
    "description": "전입 신고서, 주민표 등본, 마이넘버 카드, 국민건강보험"
  },
  {
    "id": "soc-trash",
    "nameKo": "쓰레기 분리배출",
    "nameJa": "ゴミ分別・リサイクル",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "🗑️",
    "description": "타는 쓰레기, 재활용 쓰레기, 대형 폐기물 스티커, 지정 봉투"
  },
  {
    "id": "soc-disaster",
    "nameKo": "방재 & 지진/대피",
    "nameJa": "防災・地震避難",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "🚨",
    "description": "지정 대피소, 비상 생존 배낭, 긴급 지진 속보, 진도, 비축수"
  },
  {
    "id": "soc-tokyo",
    "nameKo": "도쿄 랜드마크",
    "nameJa": "東京名所・街歩き",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "🗼",
    "description": "시부야 스크램블, 스카이트리, 아사쿠사 시타마치, 아키하바라"
  },
  {
    "id": "soc-kansai",
    "nameKo": "간사이 & 사투리 문화",
    "nameJa": "関西弁・ご当地文化",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "🗣️",
    "description": "난데야넨 츳코미, 오오키니 감사, 혼마니 진짜, 타코야키"
  },
  {
    "id": "soc-shrine",
    "nameKo": "신사 참배 & 전통 문화",
    "nameJa": "神社参拝・伝統",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "⛩️",
    "description": "새해 첫 참배(하츠모우데), 5엔 새전, 오미쿠지 대길, 오마모리"
  },
  {
    "id": "soc-manners",
    "nameKo": "공공 에티켓 & 매너",
    "nameJa": "公共マナー",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "💺",
    "description": "노약자석 양보, 휴대폰 매너 모드, 줄 서기 새치기 금지, 보행 스마트폰 금지"
  },
  {
    "id": "soc-trend",
    "nameKo": "트렌드 & 신조어",
    "nameJa": "最新トレンド・流行語",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "🔥",
    "description": "칠링 휴식, 늪에 빠진 입덕(누마오치), 은혜롭다(토우토이), 시성비(타이파)"
  },
  {
    "id": "soc-economy",
    "nameKo": "경제 & 물가/뉴스",
    "nameJa": "経済・物価・ニュース",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "📈",
    "description": "역대급 엔저, 물가 인상, 인플레이션 대비, 주가 최고치, 고향납세"
  },
  {
    "id": "soc-media",
    "nameKo": "미디어 & 방송/신문",
    "nameJa": "メディア・放送・新聞",
    "categoryId": "society",
    "categoryLabel": "사회 & 도시생활",
    "icon": "📰",
    "description": "신문 호외, 연말 생방송 가요제, 긴급 속보 자막, 와이드쇼 시사 토크"
  }
];
