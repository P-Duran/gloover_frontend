export enum FeatureType {
  COMPLEX = "complex",
  SIMPLE = "simple",
}

export interface ProductFeature {
  id: string;
  type: FeatureType;
  word: string;
  asin: string;
  appearances: number;
  confidence: number;
}

export interface ProductFeatureSentence {
  id: string;
  asin: string;
  feature_id: string;
  review_id: string;
  word: string;
  start: number;
  end: number;
  polarity: number;
  sentence: string;
}

export interface ProductFeatureSentencesStat {
  id: string;
  feature_id: string;
  positive: number;
  negative: number;
  score: number;
}
