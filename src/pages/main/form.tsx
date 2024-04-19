'use client';
import { Meteors } from "@/components/ui/meteors";
import { useEffect, useState } from 'react';
import "./../../app/globals.css";
import { HeroHighlight } from "@/components/ui/hero-highlight";


export default function CollectionForm() {
  //const [descriptions, setDescriptions] = useState<string[]>([]);
  const [sentences, setSentences] = useState<{sentence: string, tag: string, topic: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getData');
      const data = await response.json();
      setSentences(data);
    };

    fetchData();
  }, []);

  const handleButtonClick = (increment: number) => {
    setCurrentIndex((currentIndex + increment + sentences.length) % sentences.length);
  };

  return (

    <HeroHighlight className="flex flex-col justify-center items-center space-y-2">


    <main className="flex min-h-screen flex-col items-center justify-center space-y-7">

            <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full transform scale-[0.80]rounded-full blur-3xl" />
                  <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start ">
                    <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                        Your political leaning is liberal.
                    </h1>
                    <Meteors number={20} />
                  </div>
              </div>
              
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full  transform scale-[0.80] rounded-full blur-3xl" />
                  <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start ">
                    <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                        {sentences.length > 0 ? sentences[currentIndex].sentence.toString() : <span className="animate-loading-dots">Loading...</span>}
                    </h1>
                    <Meteors number={20} />
                  </div>
              </div>

              <div className="flex justify-center space-x-9 w-full lg:w-auto">

                    <button   className="w-full lg:w-auto p-[3px] relative mt-5" onClick={() => handleButtonClick(-1)}>
                        <div className="absolute inset-0 bg-red-500 rounded-lg" />
                        <div className="px-3 py-2 bg-black  relative group transition duration-200 text-white hover:bg-transparent text-2xl">
                            Disagree X
                        </div>
                    </button>

                    <button   className="w-full lg:w-auto p-[3px] relative mt-5" onClick={() => handleButtonClick(-1)}>
                        <div className="absolute inset-0 bg-green-500 rounded-lg" />
                        <div className="px-3 py-2 bg-black  relative group transition duration-200 text-white hover:bg-transparent text-2xl">
                            Agree ✓
                        </div>
                    </button>
                 
                 
                    <button   className="w-full lg:w-auto p-[3px] relative mt-5" onClick={() => handleButtonClick(-1)}>
                            <div className="absolute inset-0 bg-orange-300 rounded-lg" />
                            <div className="px-3 py-2 bg-black  relative group transition duration-200 text-white hover:bg-transparent text-2xl">
                                Rewind ←
                            </div>
                    </button>
                    
              </div>
    </main>
    </HeroHighlight>



  );
}

