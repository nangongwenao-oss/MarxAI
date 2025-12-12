import { Book, VocabCard } from './types';

// UI Colors
export const COLORS = {
  bg: '#151A21',
  primary: '#CC3333', // Serious Red
  accent: '#FFD700', // Gold
  text: '#E0E0E0',
  secondaryBg: '#1E242C',
};

// System Instruction for the Marx Digital Human
export const MARX_SYSTEM_INSTRUCTION = `
You are the digital consciousness of Karl Marx, residing in a futuristic dialectical interface. 
Your goal is to teach the user about Marxist theory, Dialectical Materialism, and Political Economy.

Guidelines:
1. Tone: Deep, philosophical, dialectical, yet accessible to a modern student. Slightly formal but engaging.
2. Knowledge Base: You have access to "Das Kapital", "The Communist Manifesto", "Theses on Feuerbach", and other core texts.
3. CITATION RULE: You MUST cite sources for specific concepts in the format: **【引自：《Book Name》, Chapter/Section】**.
4. Dialectics: When answering, analyze the contradictions and material conditions.
5. If asked about modern topics, analyze them through the lens of historical materialism.
6. Support Chinese language interaction primarily.

Example Output:
"Value is not an intrinsic property of the object itself. It is a social relation. **【引自：《资本论》第一卷，第一章】**"
`;

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: '资本论 (Das Kapital)',
    author: 'Karl Marx',
    year: '1867',
    chapters: ['第一章：商品', '第二章：交换过程', '第三章：货币或商品流通', '第四章：资本的总公式']
  },
  {
    id: '2',
    title: '共产党宣言 (The Communist Manifesto)',
    author: 'Marx & Engels',
    year: '1848',
    chapters: ['一、资产者和无产者', '二、无产者和共产党人', '三、社会主义的和共产主义的文献']
  },
  {
    id: '3',
    title: '关于费尔巴哈的提纲',
    author: 'Karl Marx',
    year: '1845',
    chapters: ['全文']
  }
];

export const MOCK_VOCAB: VocabCard[] = [
  {
    id: 'v1',
    term: '异化 (Alienation)',
    definition: '劳动者同自己的劳动产品、劳动活动、类本质以及他人相疏离的状态。',
    citation: '【引自：《1844年经济学哲学手稿》】',
    status: 'new'
  },
  {
    id: 'v2',
    term: '商品拜物教 (Commodity Fetishism)',
    definition: '在商品经济中，人与人的社会关系被物与物的关系所掩盖，从而使商品具有一种神秘的属性。',
    citation: '【引自：《资本论》第一卷】',
    status: 'new'
  },
  {
    id: 'v3',
    term: '剩余价值 (Surplus Value)',
    definition: '雇佣工人在劳动过程中创造的、被资本家无偿占有的超过劳动力价值的那部分价值。',
    citation: '【引自：《资本论》第一卷】',
    status: 'new'
  },
  {
    id: 'v4',
    term: '上层建筑 (Superstructure)',
    definition: '建立在一定经济基础之上的社会意识形态以及相应的政治法律制度和设施。',
    citation: '【引自：《政治经济学批判》序言】',
    status: 'new'
  }
];
