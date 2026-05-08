interface StyleRule {
  minH?: number;
  maxH?: number;
  minS?: number;
  maxS?: number;
  minV?: number;
  maxV?: number;
  hueRanges?: [number, number][];
  preferWarm?: boolean;
  allowGrays?: boolean;
  // s, v 매개변수에 number 타입을 명시합니다.
  customFilter?: (h: number, s: number, v: number) => boolean;
  // metallic 처럼 중첩된 구조를 위한 인덱스 시그니처
  [key: string]: any; 
}

export const STYLE_RULES: Record<string, StyleRule> = {

  vivid: {
    minS: 60,
    minV: 45,
  },

  muted: {
    minS: 15,
    maxS: 50,
  },

  pastel: {
    minV: 80,
    maxS: 40,
  },

  neon: {
    minV: 85,
    minS: 80,
  },

  vintage: {
    maxS: 35,
    minV: 30,
    maxV: 75,
  },

  earth: {
    minH: 20,
    maxH: 70,
    minS: 20,
    maxS: 60,
    minV: 20,
    maxV: 65,
  },

  warm: {
    hueRanges: [
      [0, 70],
      [300, 360],
    ],
  },

  cool: {
    hueRanges: [
      [70, 300],
    ],
  },

  spring: {
    // 0~70(레드, 오렌지, 옐로우), 70~130(연두, 초록), 330~360(핑크)
    hueRanges: [[0, 130], [330, 360]], 
    minV: 80,   // 봄은 무조건 밝아야 함 (80% 미만은 봄에서 퇴출)
    minS: 30,   // 너무 흐리멍덩하지 않은 생동감
    // 특정 구간(올리브/카키)에 대한 추가 필터
    customFilter: (h: number, s: number, v: number): boolean => {
      // Hue 60~85 사이(노란기 도는 초록)인데 명도가 75 미만이면 봄이 아님 (가을로 가야함)
      if (h >= 60 && h <= 85 && v < 75) return false;
      return true;
    }
  },
  summer: {
    hueRanges: [[160, 280], [320, 345]],
    minV: 60, // 밝고 가벼운 느낌 유지
    maxS: 40, // 쨍함 방지
    allowGrays: true // 라이트 그레이 허용
  },
  fall: {
    hueRanges: [[10, 80], [140, 170]],
    minV: 20, // 깊이 있는 어두운 색 허용
    maxV: 65, // 너무 뜬 밝은 색 배제
    minS: 30
  },
  winter: {
    // 350~10(푸른 기 도는 레드), 170~310(청록, 블루, 딥퍼플, 마젠타)
    // 주황색에 가까운 레드(10~20도)와 보라색에 가까운 핑크(310~340도)를 더 조절
    hueRanges: [[350, 360], [0, 10], [170, 310]], 
    customFilter: (h: number, s: number, v: number): boolean => {
      // 1. 형광기 제어: 채도가 너무 높으면서 명도까지 너무 높으면(형광 핑크/다홍) 겨울에서 배제
      // 겨울 비비드는 선명하지만 '시원'해야지 '형광'느낌이 나면 안 됩니다.
      if (s > 70 && v > 85) return false;

      // 2. 웜 레드(다홍) 완전 차단: Hue 10~80도 구간 철저히 배제
      if (h > 10 && h < 80) return false;

      // 3. 겨울의 3대 정체성 (Icy, Vivid, Deep)
      const isIcy = v > 92 && s < 12;      // 얼음처럼 시린 연한 색
      const isVivid = s > 75 && v <= 85;   // 선명하지만 명도가 너무 뜨지 않는 쿨 원색
      const isDeep = v < 30 && s > 20;     // 네이비, 버건디, 딥그린 등 묵직한 색

      return isIcy || isVivid || isDeep;
    }
  },

  metallic: {
    gold: {
      // 45~52도: 초록기(60도 방향)를 완전히 배제한 순수 황금색 영역
      minH: 45,
      maxH: 52,
      // 채도가 너무 낮으면 올리브색이 됨. 최소 50 이상 유지
      minS: 50,
      maxS: 90,
      // 명도가 60 미만으로 내려가면 똥색(?)이나 칙칙한 갈색이 됨
      minV: 60,
      maxV: 95,
    },

    silver: {
      // 채도가 4%만 되어도 사람 눈에는 '연한 유채색'으로 보이기 시작합니다.
      // 3% 이하로 제한하여 파스텔 느낌을 원천 차단합니다.
      maxS: 3, 

      // 명도가 너무 높으면 White와 겹치고, 너무 낮으면 그냥 Gray가 됩니다.
      // 실버 특유의 밝은 금속 느낌을 위해 범위를 75~92로 제한합니다.
      minV: 75,
      maxV: 92, 

      // 만약 아주 미세한 색감이 들어간다면 '차가운 회색' 계열만 허용합니다.
      // 블루/퍼플 계열의 아주 연한 힌트만 실버의 시원한 느낌을 살려줍니다.
      hueRanges: [[190, 250]], 
    },

    bronze: {
      // 15~35도: 적갈색에서 오렌지 사이의 구리 느낌
      minH: 20,
      maxH: 35,
      // 브론즈도 '금속'이려면 채도가 어느 정도 있어야 함
      minS: 45,
      maxS: 75,
      // 너무 어두우면 그냥 고동색이 되므로 명도 하한선 상향
      minV: 40,
      maxV: 70,
    },
  }
}