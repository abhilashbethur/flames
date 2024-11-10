import React, { useState, Dispatch, SetStateAction } from "react";

// Define types for props
interface AskNamesProps {
  boyName: string;
  setBoyName: Dispatch<SetStateAction<string>>;
  girlName: string;
  setGirlName: Dispatch<SetStateAction<string>>;
  setScreen: Dispatch<SetStateAction<number>>;
}

const letterToRelationMap = {
  f: "Friendship",
  l: "Love",
  a: "Affection",
  m: "Marriage",
  e: "Enemies",
  s: "Siblings",
};

const AskNames: React.FC<AskNamesProps> = ({
  boyName,
  setBoyName,
  girlName,
  setGirlName,
  setScreen,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <input
        type="text"
        placeholder="Boy's Name"
        className="p-4 border-2 rounded-xl w-full bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-yellow-500 focus:ring-yellow-500 outline-none text-lg"
        value={boyName}
        onChange={(e) => setBoyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Girl's Name"
        className="p-4 border-2 rounded-xl w-full bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-yellow-500 focus:ring-yellow-500 outline-none text-lg"
        value={girlName}
        onChange={(e) => setGirlName(e.target.value)}
      />
      <button
        className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors w-full text-lg"
        onClick={() => setScreen(1)}
      >
        Submit
      </button>
    </div>
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

const getFinalAnswer = (
  uniqueLettersLength: number
): keyof typeof letterToRelationMap => {
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
  return finalAnsArr[0] as keyof typeof letterToRelationMap; // cast to a key of letterToRelationMap
};

const FlamesContainer: React.FC = () => {
  const [screen, setScreen] = useState<number>(0);
  const [boyName, setBoyName] = useState<string>("");
  const [girlName, setGirlName] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 font-['VT323'] px-6 w-full">
      <div className="p-8 border-2 border-gray-600 shadow-xl rounded-xl text-center bg-gray-800 space-y-8 w-full max-w-2xl">
        <h3 className="text-5xl text-yellow-500">
          FLAMES - Bringing Back Millennial Fun!
        </h3>

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
          <div className="space-y-6">
            <p className="text-lg">Boy's name is {boyName}</p>
            <p className="text-lg">Girl's name is {girlName}</p>
            <p className="text-lg">
              Number of unique letters: {getUniqueLetters(boyName, girlName)}
            </p>
            <button
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors w-full text-lg"
              onClick={() => setScreen(2)}
            >
              Get Result
            </button>
          </div>
        )}

        {screen === 2 && (
          <div className="space-y-6">
            <p className="text-3xl">
              Result:{" "}
              {
                letterToRelationMap[
                  getFinalAnswer(getUniqueLetters(boyName, girlName))
                ]
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlamesContainer;
