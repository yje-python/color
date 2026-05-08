interface AchromaticRule {
  minV?: number;
  maxV?: number;
  maxS: number;
  hueRanges?: [number, number][];
}

export const ACHROMATIC_RULES: Record<'black' | 'white' | 'gray', AchromaticRule> = {
  black: {
    maxV: 15, // 약간의 여유를 둠
    maxS: 100, // 검정은 채도 상관없이 명도 중심
  },

  white: {
    minV: 95,  // 더 확실한 밝기
    maxS: 4,   // 색감이 아주 조금이라도 있으면 유채색으로 보냄
  },

  gray: {
    minV: 16,    // Black(15)보다 밝아야 함
    maxV: 88,    // 핵심! 명도를 85 이하로 제한하여 #ffecf0(V:100) 같은 색 배제
    maxS: 6,     // 채도를 더 낮춰서 #acc0b0(S:10) 같은 유채색 배제
    hueRanges: [[20, 50], [190, 250]],
  },
};