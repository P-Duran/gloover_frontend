
export interface ReviewsInformation {
  stats: ReviewStat[];
}

export interface Review {
  asin: string;
  author: string;
  country: string;
  date: string;
  domain: string;
  id: string;
  polarity: number;
  text: string;
}

export interface ReviewStat {
  id: string;
  asin: string;
  negative_reviews: number;
  positive_reviews: number;
}