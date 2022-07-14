import fetch from "node-fetch";
import { SearchFunc, Word } from "./type";

type EnglishItem = [[string], string[]];
interface EnglishResult {
  query: string[];
  items: EnglishItem[][];
}

export const englishSearch: SearchFunc = async (word: string) => {
  const url = "https://ac.dict.naver.com/enendict/ac";
  const params = new URLSearchParams({
    q_enc: "utf-8",
    st: "11001",
    r_format: "json",
    r_enc: "utf-8",
    r_lt: "10001",
    r_unicode: "0",
    r_escape: "1",
    q: word,
  });
  const res = await fetch(`${url}?${params}`);
  const json: EnglishResult = (await res.json()) as EnglishResult;

  const ret: Word[] = [];
  json.items.forEach((items) => {
    items.forEach((item) => {
      ret.push({
        from: item[0][0],
        to: item[1].join(","),
        link: `https://en.dict.naver.com/#/search?range=all&query=${item[0][0]}`,
      });
    });
  });
  return ret;
};
