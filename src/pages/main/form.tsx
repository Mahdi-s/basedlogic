'use client';
import { useEffect, useState } from 'react';
import "./../../app/globals.css";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Meteors } from "@/components/ui/meteors";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define an interface for the sentence structure
interface Sentence {
  sentence: string;
  tag: string;
  topic: string;
}

// Create a new variable to hold the totals
const totals = {
  liberal: { agree: 0, disagree: 0 },
  conservative: { agree: 0, disagree: 0 }
};

interface InteractionData {
  liberal: { agree: number, disagree: number },
  conservative: { agree: number, disagree: number }
}

// Helper function to get the initial interaction data from sessionStorage or set default
function getInitialInteractionData() {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('interactionData');
    return data ? JSON.parse(data) : { liberal: { agree: 0, disagree: 0 }, conservative: { agree: 0, disagree: 0 } };
  }
  return { liberal: { agree: 0, disagree: 0 }, conservative: { agree: 0, disagree: 0 } }; // Default if not in a browser environment
}

export default function CollectionForm() {
  // const [sentences, setSentences] = useState<{sentence: string, tag: string, topic: string}[]>([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactionData, setInteractionData] = useState(getInitialInteractionData())//{ liberal: { agree: 0, disagree: 0 }, conservative: { agree: 0, disagree: 0 } });
  const [history, setHistory] = useState<{index: number, data: InteractionData}[]>([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getData');
      const data = await response.json();
      setSentences(data);
    };

    // Simulate user login check (replace with actual auth check logic)
    setIsUserLoggedIn(false); // Set true if user is logged in


    fetchData();

    if (!isUserLoggedIn) {
      setTimeout(() => {
        alert('Please consider creating an account for a better experience!');
      }, 120000); // 2 minutes
    }
  }, [isUserLoggedIn]);



  const handleButtonClick = (increment: number, action: 'agree' | 'disagree' | 'rewind') => {
    
      if (action === 'rewind' && history.length > 0) {
        const previousState = history.pop();
        setHistory(history);
        setInteractionData(previousState?.data || interactionData);
        setCurrentIndex(previousState?.index || 0);
      } else {
        const newHistory = [...history, { index: currentIndex, data: interactionData }];
        setHistory(newHistory);

      const { tag, topic } = sentences[currentIndex];
      const update: { 
        liberal: { [key: string]: { agree: number, disagree: number } }, 
        conservative: { [key: string]: { agree: number, disagree: number } }, 
        [key: string]: any 
      } = { 
        liberal: {}, 
        conservative: {} 
      };
    
      if (tag === 'liberal' || tag === 'conservative') {
        if (!update[tag][topic]) {
          update[tag][topic] = { agree: 0, disagree: 0 };
        }
        update[tag][topic][action] += 1;
      }



      // Calculate the totals for each tag
      for (const tag in update) {
        for (const topic in update[tag]) {
          totals[tag].agree += update[tag][topic].agree;
          totals[tag].disagree += update[tag][topic].disagree;
        }
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('interactionData', JSON.stringify(update));
      }
    
      setInteractionData(totals);
      setCurrentIndex((currentIndex + increment + sentences.length) % sentences.length);
    }
  };

  // Define chart data and options
  const chartData = {
    labels: ['Liberal Agree', 'Liberal Disagree', 'Conservative Agree', 'Conservative Disagree'],
    datasets: [{
      label: 'Votes',
      data: [interactionData.liberal.agree, interactionData.liberal.disagree, interactionData.conservative.agree, interactionData.conservative.disagree],
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: 'white' // X-axis labels to white
        }
      },
      y: {
        ticks: {
          color: 'white' // Y-axis labels to white
        }
      }
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'white' // Legend labels to white
        }
      }
    }
  };
  return (

    <HeroHighlight className="flex flex-col justify-center items-center space-y-2">


        <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-7 space-y-4 lg:space-y-7">

          <div className="w-full max-w-sm lg:max-w-lg xl:max-w-2xl relative">
            <div className="absolute inset-0 h-full w-full transform scale-90 lg:scale-100 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start ">
                
              <Bar data={chartData} options={chartOptions} />

              <div className="h-px bg-gray-400 w-full my-2"></div> {/* Grey line */}

              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                {sentences.length > 0 ? sentences[currentIndex].sentence.toString() : <span className="animate-loading-dots">Loading...</span>}
              </h1>

              <p className="font-bold text-neutral-700 text-white mb-4 relative z-50">
                {sentences.length > 0 ? `Topic: ${sentences[currentIndex].topic}` : 'Loading...'}
              </p>
              <p className="font-bold text-neutral-700 text-white mb-4 relative z-50">
                {sentences.length > 0 ? `Affiliation: ${sentences[currentIndex].tag}` : 'Loading...'}
              </p>
              
              <Meteors number={20} />
            </div>
          </div>

          <div className="flex justify-center space-x-4 lg:space-x-6 w-full">

            <button className="w-full sm:w-1/3 lg:w-auto p-[3px] relative mt-5" onClick={() => handleButtonClick(1 , 'disagree')}>
              <div className="absolute inset-0 bg-red-500 rounded-lg" />
              <div className="px-4 py-3 bg-black relative group transition duration-200 text-white hover:bg-transparent text-xl lg:text-2xl">
                Disagree X
              </div>
            </button>

            <button className="w-full sm:w-1/3 lg:w-auto p-[3px] relative mt-5" onClick={() => handleButtonClick(1, 'agree')}>
              <div className="absolute inset-0 bg-green-500 rounded-lg" />
              <div className="px-4 py-3 bg-black relative group transition duration-200 text-white hover:bg-transparent text-xl lg:text-2xl">
                Agree ✓
              </div>
            </button>

            <button className="w-full sm:w-1/3 lg:w-auto p-[3px] relative mt-5" onClick={() => handleButtonClick(0, 'rewind')}>
              <div className="absolute inset-0 bg-orange-300 rounded-lg" />
              <div className="px-4 py-3 bg-black relative group transition duration-200 text-white hover:bg-transparent text-xl lg:text-2xl">
                Rewind ←
              </div>
            </button>

          </div>
        </main>
    </HeroHighlight>



  );
}

