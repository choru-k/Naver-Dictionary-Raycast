import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction, showToast, ToastStyle } from "@raycast/api";
import { useEffect, useState } from "react";
import { search } from './search'
import { Word } from "./search/type";

let count = 0;

export default function main(lang: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [word, setWord] = useState("");
  const [results, setResults] = useState<Word[]>(
    []
  );

  useEffect(() => {
    if (word === '') {
      return;
    }
    count++;
    const localCount = count;

    setIsLoading(true);
    setResults([]);

    search(word, lang).then((res) => {
      if (localCount === count) {
        setResults(res)
      }
    }).catch((errors) => {
      showToast(ToastStyle.Failure, "Could not find", errors);
    }).then(() => {
      setIsLoading(false);
    })
  }, [word])

  return <List
    searchBarPlaceholder="단어를 입력해주세요"
    onSearchTextChange={setWord}
    isLoading={isLoading}
    throttle
  >
    {results.map((r, index) => (
      <List.Item 
        key={index}
        title={r.from}
        accessoryTitle={r.to}
        actions={
          <ActionPanel>
            <OpenInBrowserAction url={r.link} />
            <CopyToClipboardAction content={r.from} />
          </ActionPanel>
        }
      />
    ))}
  </List>
}
