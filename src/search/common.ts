import fetch from "node-fetch";
import { SearchFunc, Word } from "./type";

type CommonItem = string[][];
interface CommonResult {
  query: string[];
  items: CommonItem[][];
}

const convertLang = (lang: string) => {
  switch (lang) {
    case "j":
      return "ja";
    case "d":
      return "de";
    case "f":
      return "fr";
    case "c":
      return "zh";
    case "i":
      return "it";
    case "s":
      return "es";
    case "r":
      return "ru";
    case "v":
      return "vi";
    case "t":
      return "th";
    case "n":
      return "id";
    case "u":
      return "uz";
  }
  return lang;
};
export const dictionarySearch: SearchFunc = async (word: string, lang: string) => {
  const url = `https://ac-dict.naver.com/${convertLang(lang)}ko/ac`;
  const params = new URLSearchParams({
    q: word,
    _callback: "",
    q_enc: "UTF-8",
    st: "11",
    r_lt: "10",
    r_format: "json",
    r_enc: "UTF-8",
  });
  const res = await fetch(`${url}?${params}`);
  const json: CommonResult = (await res.json()) as CommonResult;

  const ret: Word[] = [];
  json.items[0].forEach((item) => {
    ret.push({
      from: item[0][0],
      to: item[3].join(","),
      link: `dict.naver.com/${convertLang(lang)}kodict/#/search?query=${item[0][0]}`,
    });
  });
  return ret;
};
