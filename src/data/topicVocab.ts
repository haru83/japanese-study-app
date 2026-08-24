// Re-export topics, categories and all topic words
export { TOPIC_CATEGORIES, TOPIC_LIST, type TopicCategory, type TopicInfo, type TopicWord } from "./topicData/topicsList";
import { TRAVEL_WORDS } from "./topicData/part1_travel";
import { FOOD_WORDS } from "./topicData/part2_food";
import { DAILY_WORDS } from "./topicData/part3_daily";
import { SHOPPING_WORDS } from "./topicData/part4_shopping";
import { HEALTH_WORDS } from "./topicData/part5_health";
import { BUSINESS_WORDS } from "./topicData/part6_business";
import { ENTERTAINMENT_WORDS } from "./topicData/part7_entertainment";
import { RELATIONSHIP_WORDS } from "./topicData/part8_relationship";
import { STUDY_WORDS } from "./topicData/part9_study";
import { SOCIETY_WORDS } from "./topicData/part10_society";
import type { TopicWord } from "./topicData/topicsList";

export const TOPIC_WORDS: TopicWord[] = [
  ...TRAVEL_WORDS,
  ...FOOD_WORDS,
  ...DAILY_WORDS,
  ...SHOPPING_WORDS,
  ...HEALTH_WORDS,
  ...BUSINESS_WORDS,
  ...ENTERTAINMENT_WORDS,
  ...RELATIONSHIP_WORDS,
  ...STUDY_WORDS,
  ...SOCIETY_WORDS,
];
