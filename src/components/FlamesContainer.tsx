import React, { useState, Dispatch, SetStateAction } from "react";

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
    <div className="flex flex-col space-y-6 animate-fadeIn">
      <input
        type="text"
        placeholder="Boy's Name"
        className="p-4 border-2 rounded-xl w-full bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-yellow-500 focus:ring-yellow-500 outline-none text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        value={boyName}
        onChange={(e) => setBoyName(e.target.value.toLocaleUpperCase())}
      />
      <input
        type="text"
        placeholder="Girl's Name"
        className="p-4 border-2 rounded-xl w-full bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-yellow-500 focus:ring-yellow-500 outline-none text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        value={girlName}
        onChange={(e) => setGirlName(e.target.value.toLocaleUpperCase())}
      />
      <button
        className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 duration-300 ease-in-out w-full text-lg"
        onClick={() => setScreen(1)}
      >
        Submit
      </button>
    </div>
  );
};

const getUniqueLetters = (boyName: string, girlName: string): number => {
  const letterCount: { [key: string]: number } = {};
  let uniqueCount = 0;

  for (let i = 0; i < boyName.length; i++) {
    const letter = boyName[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  for (let i = 0; i < girlName.length; i++) {
    const letter = girlName[i];
    letterCount[letter] = (letterCount[letter] || 0) - 1;
  }

  for (const count of Object.values(letterCount)) {
    uniqueCount += Math.abs(count);
  }

  return uniqueCount;
};

const FlamesContainer: React.FC = () => {
  const [screen, setScreen] = useState<number>(0);
  const [boyName, setBoyName] = useState<string>("");
  const [girlName, setGirlName] = useState<string>("");
  const [flamesArr, setFlamesArr] = useState(["F", "L", "A", "M", "E", "S"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const uniqueLettersLength = getUniqueLetters(boyName, girlName);

  const onNext = () => {
    if (flamesArr.length > 1) {
      setFlamesArr((oldArr) => {
        const indexToRemove =
          (currentIndex + uniqueLettersLength - 1) % oldArr.length;
        const newArr = oldArr.filter((_, i) => i !== indexToRemove);
        setCurrentIndex(indexToRemove % newArr.length);
        return newArr;
      });
    }
  };

  const resetGame = () => {
    setScreen(0);
    setBoyName("");
    setGirlName("");
    setFlamesArr(["F", "L", "A", "M", "E", "S"]);
    setCurrentIndex(0);
  };

  const getClassName = (letter: string) => {
    return flamesArr.includes(letter) ? "underline" : "font-thin opacity-50";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 font-['VT323'] px-12 w-full">
      <div className="p-8 border-2 border-gray-600 shadow-xl rounded-xl text-center bg-gray-800 space-y-8 w-full max-w-2xl animate-slideIn">
        <h3 className="text-5xl text-yellow-500 animate-pulse">
          FLAMES - Bringing Back Millennial Fun!
        </h3>

        {screen === 0 && (
          <AskNames
            boyName={boyName}
            setBoyName={setBoyName}
            girlName={girlName}
            setGirlName={setGirlName}
            setScreen={setScreen}
          />
        )}

        {screen === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-lg">Boy's name is {boyName}</p>
            <p className="text-lg">Girl's name is {girlName}</p>
            <p className="text-lg">
              Number of unique letters: {uniqueLettersLength}
            </p>
            <button
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 duration-300 ease-in-out w-full text-lg"
              onClick={() => setScreen(2)}
            >
              Get Result
            </button>
            <button
              className="px-6 py-3 bg-gray-700 text-yellow-500 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 duration-300 ease-in-out w-full text-lg mt-4"
              onClick={resetGame}
            >
              Refresh
            </button>
          </div>
        )}

        {screen === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-3xl">
              Result:{" "}
              {flamesArr.length === 1
                ? letterToRelationMap[
                    flamesArr[0].toLowerCase() as keyof typeof letterToRelationMap
                  ]
                : "Calculating..."}
            </p>
            <div className="flex gap-4 text-5xl justify-center animate-bounce">
              {["F", "L", "A", "M", "E", "S"].map((letter) => (
                <p key={letter} className={getClassName(letter)}>
                  {letter}
                </p>
              ))}
            </div>
            <button
              className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 duration-300 ease-in-out w-full text-lg"
              onClick={onNext}
              disabled={flamesArr.length === 1}
            >
              Next
            </button>
            <button
              className="px-6 py-3 bg-gray-700 text-yellow-500 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 duration-300 ease-in-out w-full text-lg mt-4"
              onClick={resetGame}
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlamesContainer;
