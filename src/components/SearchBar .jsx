import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="search-bar">
      <input
        className=" border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder=""
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <div>
        <div className="container mx-auto pl-10">
          {dictionaryList.length > 0 ? (
            <>
              <h1>{dictionaryList[0].word}</h1>
              <h3>{dictionaryList[0].phonetic}</h3>
              <div className="flex items-center">
                <span>none</span>
                <hr className="flex-grow border-gray-300 mx-2" />
              </div>

              <div>
                <h3>Meaning</h3>
                <ul>
                  {dictionaryList.map((item, index) =>
                    item.meanings.map((meaning, meaningIndex) => (
                      <li key={`${index}-${meaningIndex}`}>{meaning.definitions[0].definition}
                        <br />
                        <em>Example: {meaning.definitions[0].example}</em>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
