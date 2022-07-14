export interface Word {
  from: string;
  to: string;
  link: string;
}

export type SearchFunc = (word: string, lang: string) => Promise<Word[]>;
