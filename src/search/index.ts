import { dictionarySearch } from "./common";
import { englishSearch } from "./english";
import { koreanSearch } from "./korean";
import { Word } from "./type";

const search = async (word: string, lang: string): Promise<Word[]> => {
  if (lang == "e") {
    return englishSearch(word, lang);
  }
  if (lang == "k") {
    return koreanSearch(word, lang);
  } else {
    return dictionarySearch(word, lang);
  }
};
// search('word', 'ee')
// search('word', 'e')
// search('word', 'k')
// search('수업', 'j')
export { search };
