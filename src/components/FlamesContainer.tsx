// FlamesContainer.jsx
import { useState } from "react";

const AskNames = ({
  boyName,
  setBoyName,
  girlName,
  setGirlName,
  setScreen,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Boy's Name"
        className="p-2 border rounded w-64"
        value={boyName}
        onChange={(e) => setBoyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Girl's Name"
        className="p-2 border rounded w-64"
        value={girlName}
        onChange={(e) => setGirlName(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setScreen(1)}
      >
        Submit
      </button>
    </>
  );
};

const getUniqueLetters = (boyName: string, girlName: string): number => {
  const letterCount: { [key: string]: number } = {}; // Define letterCount with a specific type
  let uniqueCount = 0;

  // Count letters in boyName and adjust counts for girlName
  for (let i = 0; i < boyName.length; i++) {
    const letter = boyName[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  for (let i = 0; i < girlName.length; i++) {
    const letter = girlName[i];
    letterCount[letter] = (letterCount[letter] || 0) - 1;
  }

  // Calculate the sum of absolute differences in letter counts
  for (const count of Object.values(letterCount)) {
    uniqueCount += Math.abs(count);
  }

  return uniqueCount;
};

const getFinalAnswer = (uniqueLettersLength: number) => {
  const finalAnsArr = "flames".split("");
  let remainder = 0;
  for (let i = 0; i < 5; i++) {
    let moduloNum = uniqueLettersLength % finalAnsArr.length;
    moduloNum = moduloNum - remainder;
    if (moduloNum < 0) moduloNum = finalAnsArr.length + moduloNum;
    remainder = finalAnsArr.length - moduloNum;
    if (remainder >= finalAnsArr.length) remainder = 0;
    finalAnsArr.splice(moduloNum - 1, 1);
  }
  return finalAnsArr;
};

const FlamesContainer = () => {
  const [screen, setScreen] = useState(0);
  const [boyName, setBoyName] = useState("");
  const [girlName, setGirlName] = useState("");
  return (
    <div className="flex flex-col items-center justify-center p-36 border border-black shadow-lg rounded-lg space-y-4">
      <h3>FLAMES - Bringing back some millenial fun!</h3>
      {screen === 0 && (
        <AskNames
          boyName={boyName}
          girlName={girlName}
          setBoyName={setBoyName}
          setGirlName={setGirlName}
          setScreen={setScreen}
        />
      )}
      {screen === 1 && (
        <div className="flex flex-wrap flex-col space-y-2">
          <p>Boy's name is {boyName}</p>
          <p>Girl's name is {girlName}</p>
          {/* <p>
            Unique letters are {getUniqueLetters(boyName, girlName).join(", ")}
          </p> */}
          <p>Number of unique letters: {getUniqueLetters(boyName, girlName)}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setScreen(2)}
          >
            Get Result
          </button>
        </div>
      )}
      {screen == 2 && (
        <div className="flex flex-wrap flex-col space-y-2">
          {getFinalAnswer(getUniqueLetters(boyName, girlName))}
        </div>
      )}
    </div>
  );
};

export default FlamesContainer;
