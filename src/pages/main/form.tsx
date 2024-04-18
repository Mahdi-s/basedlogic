'use client';
import { Meteors } from "@/components/ui/meteors";
import { useEffect, useState } from 'react';
import "./../../app/globals.css";
import { HeroHighlight } from "@/components/ui/hero-highlight";


export default function CollectionForm() {
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getData');
      const data = await response.json();

      setDescriptions(data);
    };

    fetchData();
  }, []);

  const handleButtonClick = (increment: number) => {
    setCurrentIndex((currentIndex + increment + descriptions.length) % descriptions.length);
  };

  return (

    <HeroHighlight className="flex flex-col justify-center items-center space-y-2">


    <main className="flex min-h-screen flex-col items-center justify-center space-y-7">
              
              <div className=" w-full relative max-w-xs">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-200 to-orange-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                  {descriptions.length > 0 ? descriptions[currentIndex] : <span className="animate-loading-dots">Loading...</span>}
                  </h1>
        
                  <Meteors number={20} />
                  
                </div>
              </div>

              <div className="flex justify-center space-x-9">
                  <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white" onClick={() => handleButtonClick(-1)}>
                    X
                  </button>
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white" onClick={() => handleButtonClick(-1)}>
                    ✓
                  </button>
              </div>
    </main>
    </HeroHighlight>



  );
}

