import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

function SearchBar() {
  const [input, setInput] = useState("");
  const [dictionaryList, setDictionaryList] = useState([]);

  const getDictionaryList = async (list) => {
    if (list) {
      try {
        const result = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${list}`
        );
        setDictionaryList(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching dictionary data:", error);
      }
    }
  };

  useEffect(() => {
    getDictionaryList(input);
  }, [input]); // เรียกใช้ getDictionaryList เมื่อ input เปลี่ยนแปลงเท่านั้น

  return (
    <>
      <div className="search-bar">
        <input
          className=" border border-gray-300 rounded-lg px-4 py-3 w-full max-w-2xl  focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder=""
          type="text"
          value={input}
          onChange={(event) => {
            dictionaryList;
            setInput(event.target.value);
          }}
        />
      </div>
      <div name="container" className="flex py-10 w-auto">
        <div
          name="contents"
          className="flex flex-col items-start align-content space-x-5 space-y-5"
        >
          {dictionaryList.length > 0 ? (
            <>
              <div className="flex justify-between items-center w-full">
                <h1 className="font-serif font-semibold ">
                  {dictionaryList[0].word}
                </h1>
                <PlayCircleIcon
                  className="text-purple-500 flex flex-end"
                  style={{ fontSize: "76px" }}
                />
              </div>
              <h3 className="text-purple-500 text-xl">
                {dictionaryList[0].phonetic}
              </h3>

              {dictionaryList[0].meanings.map((meaning, _meaningIndex) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-black text-lg font-bold">
                      {meaning.partOfSpeech}
                    </span>
                    <hr className="flex-grow border-gray-300 mx-2" />
                  </div>
                  <div className="items-start text-start space-x-5">
                    <h3>Meaning</h3>
                    <ul class="list-disc list-inside py-3">
                      {meaning.definitions.map(
                        (definition, definitionIndex) => (
                          <>
                            <li key={definitionIndex}>
                              {definition.definition}
                            </li>
                            {definition.example ? (
                              <span>"{definition.example}"</span>
                            ) : null}
                          </>
                        )
                      )}
                    </ul>
                    {meaning.synonyms.length > 0 ? (
                      <span>
                        <span className="">Synonyms:</span>{" "}
                        <span className="text-purple-500 font-bold">
                          {meaning.synonyms[0]}
                        </span>
                      </span>
                    ) : null}
                  </div>
                </>
              ))}
              <h3>
                Source:
                <span class="ml-4">
                  <u>{dictionaryList[0].sourceUrls}</u>
                </span>
              </h3>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
