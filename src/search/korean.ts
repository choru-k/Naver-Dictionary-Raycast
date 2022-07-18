import fetch from "node-fetch";
import { SearchFunc, Word } from "./type";

type KoreanItem = string[][];
interface KoreanResult {
  query: string[];
  items: KoreanItem[][];
}

export const koreanSearch: SearchFunc = async (word: string) => {
  const url = "https://ac-dict.naver.com/koko/ac";
  const params = new URLSearchParams({
    frm: "stdkrdic",
    oe: "utf8",
    m: "0",
    r: "1",
    st: "111",
    r_lt: "111",
    q: word,
  });
  const res = await fetch(`${url}?${params}`);
  const json: KoreanResult = (await res.json()) as KoreanResult;

  const ret: Word[] = [];
  json.items[0].forEach((item) => {
    ret.push({
      from: item[0][0],
      to: "",
      link: `https://ko.dict.naver.com/#/search?query=${item[0][0]}`,
    });
  });
  return ret;
};
