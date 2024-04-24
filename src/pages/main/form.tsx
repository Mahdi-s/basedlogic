'use client';
import { useEffect, useState } from 'react';
import "./../../app/globals.css";
import { useRouter } from 'next/router';
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

function Modal({ isOpen, onClose, onSignUp }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
        <h2>Please consider creating an account for a better experience!</h2>
        <button onClick={onSignUp} style={{ margin: '10px', padding: '5px 20px' }}>Sign Up</button>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close Window</button>
      </div>
    </div>
  );
}

function ensureDataIntegrity(data) {
  return {
    liberal: { agree: 0, disagree: 0, ...data.liberal },
    conservative: { agree: 0, disagree: 0, ...data.conservative }
  };
}

// Use this function when getting initial data
function getInitialInteractionData() {
  if (typeof window !== 'undefined') {
    const storedData = sessionStorage.getItem('interactionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return ensureDataIntegrity(parsedData);
    }
  }
  return ensureDataIntegrity({});
}


export default function CollectionForm() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactionData, setInteractionData] = useState(getInitialInteractionData())//{ liberal: { agree: 0, disagree: 0 }, conservative: { agree: 0, disagree: 0 } });
  const [history, setHistory] = useState<{index: number, data: InteractionData}[]>([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); // Use Next.js useRouter hook for navigation



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getData');
      const data = await response.json();
      setSentences(data);
      setIsUserLoggedIn(false);
    };

     // TODO: Simulate user login check (replace with actual auth check logic)
     // Set true if user is logged in
     fetchData();

    // if (!isUserLoggedIn) {
    //   setTimeout(() => {
    //     //alert('Please consider creating an account for a better experience!');
    //     setShowModal(true);
    //   }, 120); // 2 minutes
    // }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 12); // 2 minutes
      return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or the dependency changes
    }
  }, [isUserLoggedIn]);


  const handleButtonClick = (increment: number, action: 'agree' | 'disagree' | 'rewind') => {
    if (action === 'rewind' && history.length > 0) {
      const previousState = history.pop() || { index: currentIndex, data: interactionData };
      setInteractionData(previousState.data);
      setCurrentIndex(previousState.index);
    } else {
      const newHistory = [...history, { index: currentIndex, data: JSON.parse(JSON.stringify(interactionData)) }];
      setHistory(newHistory);
      const newData = {...interactionData};
      if (!newData[sentences[currentIndex].tag]) {
        newData[sentences[currentIndex].tag] = { agree: 0, disagree: 0 };
      }
      newData[sentences[currentIndex].tag][action] += increment;
      setInteractionData(newData);
      setCurrentIndex((currentIndex + increment) % sentences.length);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('interactionData', JSON.stringify(newData));
      }
    }
  };

  const handleSignUp = () => {
    router.push('/register');  // Navigate to signup page
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
          color: 'white', // Y-axis labels to white
          stepSize: 1, // Show only whole integers
          precision: 0 // No decimal places
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

    <>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSignUp={handleSignUp} />

    <HeroHighlight className="flex flex-col justify-center items-center space-y-2">

        <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-7 space-y-4 lg:space-y-7">
          <div className="w-full max-w-sm lg:max-w-lg xl:max-w-2xl relative">
            <div className="absolute inset-0 h-full w-full transform scale-90 lg:scale-100 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start ">
                
              <Bar data={chartData} options={chartOptions} />

              <div className="h-px bg-gray-400 w-full my-4"></div> 

              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                {sentences.length > 0 ? sentences[currentIndex].sentence.toString() : <span className="animate-loading-dots">Loading...</span>}
              </h1>

              <p className="font-bold text-neutral-700 text-white mb-4 relative z-50">
                {sentences.length > 0 && `Topic: ${sentences[currentIndex].topic}`}
              </p>
              <p className="font-bold text-neutral-700 text-white mb-4 relative z-50">
                {sentences.length > 0 && `Affiliation: ${sentences[currentIndex].tag}`}
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

    </>

  );
}

