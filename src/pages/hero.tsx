import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Link from 'next/link';
import "./../app/globals.css";
import { useRouter } from 'next/navigation';


export default function Hero() {
    const router = useRouter();

    const navigateToSignup = () => {
      router.push('/register/registerpage');
    };
  
    return (

    
      <HeroHighlight className="flex flex-col justify-center items-center space-y-2">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 1.0,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4  md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
           Formulate questions based on articles, collect opinions and {" "}

            <Highlight className="text-black dark:text-white">
                Enhance your understanding.
            </Highlight>

        </motion.h1>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 1.0,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="flex flex-col justify-center items-center space-y-2"
        >
          <button  onClick={navigateToSignup} className="p-[3px] relative mt-5">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-3 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent text-2xl">
              Sign Up!
              </div>
          </button>
          
          <p className="text-center text-neutral-700 dark:text-white">Already a user? <Link href="/login/loginpage">Log in</Link></p>
        </motion.h1>      
        </HeroHighlight>
      
      
    );
  }
