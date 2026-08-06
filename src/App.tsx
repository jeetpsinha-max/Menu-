import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Flame, 
  Sparkles, 
  Heart, 
  Filter, 
  Check, 
  BookOpen, 
  Award, 
  RotateCcw, 
  Utensils, 
  ChefHat, 
  Smile, 
  CheckSquare,
  Square,
  Bookmark,
  Share2,
  Info,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { COURSES, DIETARY_METADATA } from './menuData';
import { CourseId, DietTag, Course } from './types';

export const DAD_WISDOM = [
  {
    type: "Dad Joke 🤫",
    content: "Why did the tomato blush? Because it saw the salad dressing! Classic."
  },
  {
    type: "Grill Rule 🍖",
    content: "You MUST click the tongs twice before starting the grill. This ensures proper alignment and respects the meat deities."
  },
  {
    type: "Tasting Tip 🍷",
    content: "Never press down on a burger patty on the grill. You squeeze out the succulent juices, and that's a culinary misdemeanor!"
  },
  {
    type: "Dadvice 💡",
    content: "If you don't keep one hand on a cold beverage while grilling, you risk interrupting the thermal equilibrium of the chef."
  },
  {
    type: "Dad Joke 🤫",
    content: "What do you call a fake noodle? An impasta!"
  },
  {
    type: "Grill Rule 🍖",
    content: "The optimal temperature for checking the grill warmth is holding your hand 3 inches above the grate and saying 'Yep, that's hot.'"
  },
  {
    type: "Dad Joke 🤫",
    content: "Why do we put candles on top of a birthday cake? Because it's too hard to put them on the bottom."
  },
  {
    type: "Dadvice 💡",
    content: "The proper response to anyone saying 'I'm hungry' at the dinner table is 'Hi Hungry, I'm Dad. Nice to meet you.'"
  },
  {
    type: "Tasting Tip 🍷",
    content: "A smoky chipotle taco is best paired with a high-fidelity carbonated local amber ale. It cuts through the rich spices beautifully."
  },
  {
    type: "Dad Joke 🤫",
    content: "What did the grape do when he got stepped on? He let out a little wine."
  }
];

export default function App() {
  // Navigation & View States
  const [activeCourseId, setActiveCourseId] = useState<CourseId>(1);
  const [activeTab, setActiveTab] = useState<'dish' | 'recipe'>('dish');
  
  // Father's Day States & Local Storage Persistence
  const [dadWisdomIndex, setDadWisdomIndex] = useState<number>(() => {
    return Math.floor(Math.random() * DAD_WISDOM.length);
  });

  const [dadChecks, setDadChecks] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem('dad_checks');
    return saved ? JSON.parse(saved) : {
      tongs: false,
      apron: false,
      drink: false,
      joke: false
    };
  });
  
  // Interactive Dietary Constraints State
  const [selectedDietFilters, setSelectedDietFilters] = useState<DietTag[]>([]);
  
  // User Session Persistence via LocalStorage
  const [likedCourses, setLikedCourses] = useState<CourseId[]>(() => {
    const saved = localStorage.getItem('tasting_likes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tastingNotes, setTastingNotes] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('tasting_notes');
    return saved ? JSON.parse(saved) : {
      1: "Tasting trial: The herb-garlic dip matches crisp cucumber beautifully. Zucchini fries are remarkably airy in texture!",
      2: "Marinating thighs in adobo provides standard heat, but lime ranch is crucial to balance the spice intensity.",
      3: "Streusel crumble had the perfect oatmeal crunch! Warm crisp pie paired with ice cream is absolute comfort."
    };
  });

  const [ratings, setRatings] = useState<{ [key: number]: number }>(() => {
    const saved = localStorage.getItem('tasting_ratings');
    return saved ? JSON.parse(saved) : { 1: 5, 2: 5, 3: 5 };
  });

  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem('tasting_steps');
    return saved ? JSON.parse(saved) : {};
  });

  // Cooking Timer States
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 min default
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerInitial, setTimerInitial] = useState<number>(300);

  // Success Notification
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('tasting_likes', JSON.stringify(likedCourses));
  }, [likedCourses]);

  useEffect(() => {
    localStorage.setItem('tasting_notes', JSON.stringify(tastingNotes));
  }, [tastingNotes]);

  useEffect(() => {
    localStorage.setItem('tasting_ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('tasting_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem('dad_checks', JSON.stringify(dadChecks));
  }, [dadChecks]);

  // Timer Countdown Logic
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            playChimeSound();
            triggerAppNotification("⏰ Timer Finished! Check on your culinary masterpiece!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, timerSeconds]);

  // Audio Feedbacks using Browser Synthesized Sounds
  const playChimeSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Sweet double-tone chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      osc1.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.15); // C6 note
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(440, ctx.currentTime); // A4 note
      osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.15); // C5 note

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.8);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log("Audio play blocked until interaction.");
    }
  };

  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Ignored
    }
  };

  const playTongClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playSingleClink = (delay: number) => {
        const osc = ctx.createOscillator();
        const biquadFilter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        
        osc.connect(biquadFilter);
        biquadFilter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, ctx.currentTime + delay);
        
        biquadFilter.type = 'highpass';
        biquadFilter.frequency.setValueAtTime(1200, ctx.currentTime + delay);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.06);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.07);
      };

      // Click! Click!
      playSingleClink(0);
      playSingleClink(0.12);
    } catch (e) {
      // Ignored
    }
  };

  const cycleDadWisdom = () => {
    playTongClickSound();
    setDadWisdomIndex((prev) => (prev + 1) % DAD_WISDOM.length);
  };

  const toggleDadCheck = (key: string) => {
    playTongClickSound();
    setDadChecks((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      const allDone = Object.values(updated).every(Boolean);
      if (allDone && !Object.values(prev).every(Boolean)) {
        setTimeout(() => {
          playChimeSound();
          triggerAppNotification("🏆 Certified Master Grill Father Credentials unlocked!");
        }, 300);
      }
      return updated;
    });
  };

  const triggerAppNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 4500);
  };

  // Helper Methods
  const toggleLike = (courseId: CourseId) => {
    playClickSound();
    if (likedCourses.includes(courseId)) {
      setLikedCourses(prev => prev.filter(id => id !== courseId));
      triggerAppNotification("Removed course from your favorites list.");
    } else {
      setLikedCourses(prev => [...prev, courseId]);
      triggerAppNotification("❤️ Saved to your culinary favorites!");
    }
  };

  const toggleDietFilter = (tag: DietTag) => {
    playClickSound();
    if (selectedDietFilters.includes(tag)) {
      setSelectedDietFilters(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedDietFilters(prev => [...prev, tag]);
    }
  };

  const resetDietFilters = () => {
    playClickSound();
    setSelectedDietFilters([]);
  };

  const updateNotes = (courseId: CourseId, text: string) => {
    setTastingNotes(prev => ({ ...prev, [courseId]: text }));
  };

  const selectRating = (courseId: CourseId, score: number) => {
    playClickSound();
    setRatings(prev => ({ ...prev, [courseId]: score }));
    triggerAppNotification(`Rated Course ${courseId} as ${score} Stars!`);
  };

  const toggleStepCompleted = (courseId: CourseId, stepIndex: number) => {
    playClickSound();
    const key = `${courseId}-${stepIndex}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getCompletedCoursePercentage = (course: Course) => {
    const total = course.recipeSteps.length;
    let done = 0;
    course.recipeSteps.forEach((_, idx) => {
      if (completedSteps[`${course.id}-${idx}`]) done++;
    });
    return Math.round((done / total) * 100);
  };

  const activeCourse = COURSES.find(c => c.id === activeCourseId) || COURSES[0];

  // Check if course matches the selected diet filters
  const matchesDietFilters = (course: Course) => {
    if (selectedDietFilters.length === 0) return true;
    // For our metadata, let's see if all selected filters are satisfied by the course tags
    return selectedDietFilters.every(tag => course.dietaryTags.includes(tag));
  };

  // Quick preset cooking timers
  const adjustTimer = (secondsToAdd: number) => {
    playClickSound();
    setTimerSeconds(prev => {
      const newVal = Math.max(0, prev + secondsToAdd);
      setTimerInitial(newVal);
      return newVal;
    });
  };

  const startPauseTimer = () => {
    playClickSound();
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    playClickSound();
    setTimerActive(false);
    setTimerSeconds(timerInitial);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pre-calculated stats for total progress
  const completedStepsOverall = Object.values(completedSteps).filter(Boolean).length;
  const totalRecipeSteps = COURSES.reduce((sum, c) => sum + c.recipeSteps.length, 0);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#E0E0E0] flex flex-col relative antialiased selection:bg-brand-gold selection:text-black">
      
      {/* Dynamic Pop notification toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#161616] text-[#E0E0E0] px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3 border border-[#2A2A2A] backdrop-blur-md max-w-md w-[90%]"
          >
            <span className="text-brand-gold font-bold">★</span>
            <p className="text-sm font-medium leading-none flex-1 font-sans">{showNotification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exquisite Top Header */}
      <header className="border-b border-[#2A2A2A] bg-[#0F0F0F]/80 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[#C2A07A] flex items-center justify-center">
              <ChefHat className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display font-medium text-xl sm:text-2xl tracking-tight text-[#C2A07A]">
                EL SOL • DAD'S RESERVE
              </h1>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#888888] uppercase font-semibold">
                Father's Day Special Tasting
              </p>
            </div>
          </div>

          {/* Sparkly Overall Session Progress Panel */}
          <div className="hidden sm:flex items-center space-x-4 bg-[#161616] px-4 py-2 rounded-xl border border-[#2A2A2A]">
            <div className="text-right">
              <div className="text-[10px] font-mono text-[#888888] font-semibold uppercase">Tasting Completion</div>
              <div className="text-xs font-bold font-mono text-brand-gold flex items-center justify-end space-x-1">
                <span>{completedStepsOverall}</span>
                <span className="text-[#555555]">/</span>
                <span>{totalRecipeSteps} Cooking Steps</span>
              </div>
            </div>
            <div className="w-16 h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C2A07A] transition-all duration-500 rounded-full" 
                style={{ width: `${Math.round((completedStepsOverall / totalRecipeSteps) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column (5/12): Event Welcome, Dietary Filters & Session Notes */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* Welcome Card & Chef's Note */}
          <div className="bg-[#161616] rounded-3xl p-6 border border-[#2A2A2A] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-brand-gold/10 text-[#C2A07A] text-[10px] font-mono rounded-bl-2xl uppercase tracking-wider font-semibold">
              👑 Papa's Edition
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-1 text-[10px] uppercase font-mono font-bold text-[#C2A07A] tracking-widest bg-brand-gold/10 rounded-full border border-brand-gold/25">
                  Tonight's Table / June 21
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 tracking-tight text-white animate-fade-in">
                  Welcome, Dad & Family
                </h2>
              </div>
            </div>
            
            <p className="mt-3 text-sm text-[#888888] leading-relaxed font-light">
              We welcome you to a grand Father's Day digital tasting event. Below is your ultimate culinary companion-guide. Check out the hand-picked courses (with professional beer pairings), customize dietary adjustments, and write down your tasting notes.
            </p>

            {/* Chef signature element */}
            <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1 rounded-full bg-brand-gold/10 text-brand-gold">
                  <Smile className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium text-[#CCCCCC]">
                  Curated with passion by Chefs Jeet and Jeena
                </p>
              </div>
              <span className="font-display italic text-sm text-[#777777] pr-2">Cheers to Dad!</span>
            </div>
          </div>

          {/* Interactive Dietary Filters */}
          <div className="bg-[#161616] rounded-3xl p-6 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-brand-gold" />
                <h3 className="font-display text-lg font-bold text-white">Dietary Preferences</h3>
              </div>
              {selectedDietFilters.length > 0 && (
                <button 
                  onClick={resetDietFilters}
                  className="text-[11px] font-mono font-bold text-brand-gold hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <p className="text-xs text-[#888] mb-4 leading-relaxed font-light">
              Toggle tags to highlight which courses align with your dietary requirements. Courses that match completely will display custom culinary status badges.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {Object.keys(DIETARY_METADATA).map((key) => {
                const info = DIETARY_METADATA[key];
                const active = selectedDietFilters.includes(key as DietTag);
                return (
                  <button
                    key={key}
                    onClick={() => toggleDietFilter(key as DietTag)}
                    className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl border transition-all text-left group ${
                      active 
                        ? 'bg-[#C2A07A] border-[#C2A07A] text-black font-semibold shadow-md' 
                        : 'border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#222222] hover:border-[#333333] text-[#E0E0E0]'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${info.bgColorClass} group-hover:scale-110 transition-transform`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate leading-none">{info.label}</div>
                      <div className="text-[9px] font-mono text-[#666666] mt-1 uppercase font-semibold">{info.tag} Index</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDietFilters.length > 0 && (
              <div className="mt-4 p-3 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] text-[11px] text-[#888] flex items-start space-x-2">
                <Info className="h-3.5 w-3.5 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Filtering for: <b>{selectedDietFilters.map(t => DIETARY_METADATA[t].label).join(', ')}</b>. Suitable dishes are highlighted with specialized icons.
                </span>
              </div>
            )}
          </div>

          {/* Father's Day Companion: Dad's Wisdom Lounge & Click-Tong generator */}
          <div className="bg-[#161616] rounded-3xl p-6 border border-[#2A2A2A] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full -mr-6 -mt-6" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🧔</span>
                <h3 className="font-display text-lg font-bold text-white">Dad's Lounge & BBQ Wisdom</h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-brand-gold/10 text-[#C2A07A] border border-[#C2A07A]/20 px-2 py-0.5 rounded-full font-bold">
                June Special
              </span>
            </div>

            <p className="text-xs text-[#888888] mb-4 font-light leading-relaxed">
              Dads are the ultimate authorities on cooking times and bad puns. Click the tongs below to draw classic dad wisdom or a high-quality groanworthy joke.
            </p>

            {/* Wisdom display box with keys to trigger re-animation */}
            <div className="h-28 flex flex-col justify-between bg-[#1A1A1A] p-4 rounded-2xl border border-[#2A2A2A] relative overflow-hidden transition-all">
              <div className="absolute top-1 right-2 text-[9px] font-mono font-bold uppercase text-[#C2A07A]/20 tracking-widest">
                {DAD_WISDOM[dadWisdomIndex].type}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={dadWisdomIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-serif italic text-stone-200 pr-4 leading-relaxed"
                >
                  "{DAD_WISDOM[dadWisdomIndex].content}"
                </motion.div>
              </AnimatePresence>
              <div className="text-[10px] text-stone-500 font-mono text-right font-light">
                Wisdom #{dadWisdomIndex + 1} of {DAD_WISDOM.length}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={cycleDadWisdom}
                className="flex-1 bg-brand-gold text-black hover:bg-[#d0b490] font-mono text-[11px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>🛠️ Click Tongs (Clink Twice!)</span>
              </button>
            </div>
          </div>


          {/* Tasting Notepad - Key Value Store Persistence */}
          <div className="bg-[#161616] rounded-3xl p-6 border border-[#2A2A2A] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full -mr-6 -mt-6" />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-brand-gold" />
                <h3 className="font-display text-lg font-bold text-white">Guest Review Notes</h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-[#1A1A1A] text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded-full font-bold">
                Auto-saved
              </span>
            </div>

            <p className="text-xs text-[#888888] mb-4 font-light">
              Write down your sensory notes, review scores, adjustments for ingredients, or beverage pairings. Saved securely in your browser cache!
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-[#666666] uppercase font-bold tracking-wider mb-1">
                  Active Course {activeCourseId} Notes
                </label>
                <textarea
                  value={tastingNotes[activeCourseId] || ''}
                  onChange={(e) => updateNotes(activeCourseId, e.target.value)}
                  placeholder={`Write your impressions of "${COURSES[activeCourseId-1].title}" here (e.g., aroma, crunch coefficient, spicy level)...`}
                  className="w-full h-24 px-3 py-2 text-xs bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] text-[#E0E0E0] placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all max-h-32 font-sans"
                />
              </div>

              {/* Course Rating */}
              <div className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-2xl border border-[#2A2A2A]">
                <span className="text-xs font-bold text-[#E0E0E0]">Course {activeCourseId} Rating</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => selectRating(activeCourseId, star)}
                      className="text-lg focus:outline-none hover:scale-120 transition-transform"
                    >
                      <span className={star <= (ratings[activeCourseId] || 0) ? "text-brand-gold" : "text-stone-800"}>★</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Right column (7/12): Interactive Course Component (Dish Plating & Recipe step-by-step) */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* Active Course Status Pill & Banner */}
          <div className="bg-[#161616] rounded-3xl border border-[#2A2A2A] overflow-hidden">
            
            {/* Top Navigation Row: Gorgeous Course Selectors */}
            <div className="bg-[#1A1A1A] border-b border-[#2A2A2A] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono uppercase font-bold text-[#888888] tracking-wider">
                Select Course Segment
              </span>
              <div className="flex items-center space-x-2">
                {COURSES.map((course) => {
                  const active = activeCourseId === course.id;
                  const isMatch = matchesDietFilters(course);
                  const isLiked = likedCourses.includes(course.id);
                  const isCompleted = getCompletedCoursePercentage(course) === 100;

                  return (
                    <button
                      key={course.id}
                      onClick={() => {
                        playClickSound();
                        setActiveCourseId(course.id);
                      }}
                      className={`relative flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-2xl border transition-all ${
                        active 
                          ? 'bg-[#C2A07A] border-[#C2A07A] text-black font-semibold shadow-md' 
                          : 'bg-[#1A1A1A] border-[#2A2A2A] text-stone-300 hover:bg-[#222222] hover:border-[#333333]'
                      } ${!isMatch ? 'opacity-40' : ''}`}
                    >
                      <span className={`font-mono text-[10px] ${active ? 'text-stone-900' : 'text-stone-500'}`}>
                        0{course.id}
                      </span>
                      <span className="text-xs font-display truncate max-w-[80px] sm:max-w-none">
                        {course.id === 1 ? "Starter" : course.id === 2 ? "Main" : "Dessert"}
                      </span>
                      {isLiked && <span className="text-[10px]">❤️</span>}
                      {isCompleted && (
                        <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Course Photo & Quick Metatags */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#161616]">
              <img 
                src={activeCourse.image} 
                alt={activeCourse.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                
                {/* Course Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono uppercase bg-[#C2A07A] text-black rounded-full font-bold tracking-widest leading-none">
                    Course {activeCourse.courseNumber}
                  </span>
                  
                  {/* Dietary Status Pill */}
                  <div className="flex items-center space-x-1.5">
                    {activeCourse.dietaryTags.map((tag) => {
                      const meta = DIETARY_METADATA[tag];
                      return (
                        <span 
                          key={tag} 
                          title={meta ? meta.label : ""} 
                          className="px-1.5 py-0.5 text-[9px] font-mono bg-white/10 text-white rounded font-bold border border-white/10"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
                  {activeCourse.title}
                </h3>
                
                <p className="text-stone-300 text-xs sm:text-sm italic mt-1 font-sans line-clamp-1">
                  {activeCourse.subtitle}
                </p>
                
              </div>

              {/* Floating Favorite Button */}
              <button
                onClick={() => toggleLike(activeCourse.id)}
                className="absolute top-4 right-4 bg-black/85 backdrop-blur-md p-2.5 rounded-full border border-stone-800 shadow-md text-brand-gold hover:scale-110 active:scale-95 transition-all focus:outline-none"
              >
                <Heart className={`h-4.5 w-4.5 ${likedCourses.includes(activeCourse.id) ? 'fill-brand-gold text-[#C2A07A]' : 'text-white'}`} />
              </button>
            </div>

            {/* Tab Swapping Mode selector: The Presentation vs Cooking Class */}
            <div className="flex border-b border-[#2A2A2A]">
              <button
                onClick={() => { playClickSound(); setActiveTab('dish'); }}
                className={`flex-1 py-4 text-center text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition-all ${
                  activeTab === 'dish' 
                    ? 'border-[#C2A07A] text-[#C2A07A] bg-[#161616]' 
                    : 'border-transparent text-[#888888] hover:text-[#E0E0E0]'
                }`}
              >
                <Utensils className="h-3.5 w-3.5" />
                <span>The Dish (Plating)</span>
              </button>
              <button
                onClick={() => { playClickSound(); setActiveTab('recipe'); }}
                className={`flex-1 py-4 text-center text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition-all relative ${
                  activeTab === 'recipe' 
                    ? 'border-[#C2A07A] text-[#C2A07A] bg-[#161616]' 
                    : 'border-transparent text-[#888888] hover:text-[#E0E0E0]'
                }`}
              >
                <ChefHat className="h-3.5 w-3.5" />
                <span>Cooking Class (Starter Guide)</span>
                {getCompletedCoursePercentage(activeCourse) > 0 && (
                  <span className="absolute top-2.5 right-4 font-mono text-[9px] bg-[#C2A07A] text-black font-semibold px-2 py-0.5 rounded-full">
                    {getCompletedCoursePercentage(activeCourse)}%
                  </span>
                )}
              </button>
            </div>

            {/* TAB CONTENT WITH ANIMATION */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'dish' ? (
                  <motion.div
                    key="dish-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    
                    {/* General Description */}
                    <div>
                      <h4 className="text-xs font-mono text-[#666666] uppercase tracking-widest font-bold mb-1.5">
                        Culinary Concept
                      </h4>
                      <p className="text-sm text-[#CCCCCC] leading-relaxed font-sans font-light">
                        {activeCourse.description}
                      </p>
                    </div>

                    {/* Sub-Dishes breakdown */}
                    <div className="pt-4 border-t border-[#2A2A2A]">
                      <h4 className="text-xs font-mono text-[#666666] uppercase tracking-widest font-bold mb-3">
                        Sub-Dishes & Ingredients
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeCourse.subDishes.map((sub, i) => (
                           <div key={i} className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A]">
                            <div className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                              <h5 className="text-xs font-bold text-white font-sans">{sub.name}</h5>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-1.5 leading-relaxed font-light">
                              {sub.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {sub.ingredients.map((ing, k) => (
                                <span 
                                  key={k} 
                                  className="text-[9px] font-mono bg-black/40 text-stone-300 px-2 py-0.5 rounded-md border border-stone-800"
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flavor profile Sensory meters */}
                    <div className="pt-4 border-t border-[#2A2A2A]">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-mono text-[#666666] uppercase tracking-widest font-bold">
                          Sensory Flavor balance
                        </h4>
                        <span className="text-[10px] font-mono text-brand-gold uppercase font-bold">
                          Tasting Profile
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {activeCourse.flavorProfile.map((profile, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#CCCCCC] font-light">{profile.label}</span>
                              <span className="font-mono text-[#888888] font-bold">{profile.value}%</span>
                            </div>
                            <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${profile.value}%` }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className={`h-full ${profile.color} rounded-full`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="recipe-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    
                    {/* Cooking Metadata banner */}
                    <div className="grid grid-cols-3 gap-3 bg-[#1A1A1A] p-4 rounded-2xl border border-[#2A2A2A]">
                      <div className="text-center border-r border-[#2A2A2A] last:border-0">
                        <div className="text-[9px] font-mono uppercase text-[#666666] font-bold tracking-wider">Prep Time</div>
                        <div className="flex items-center justify-center space-x-1 mt-1">
                          <Clock className="h-3.5 w-3.5 text-stone-400" />
                          <span className="text-xs font-bold font-mono">{activeCourse.prepTime}</span>
                        </div>
                      </div>
                      <div className="text-center border-r border-[#2A2A2A] last:border-0">
                        <div className="text-[9px] font-mono uppercase text-[#666666] font-bold tracking-wider">Cook Time</div>
                        <div className="flex items-center justify-center space-x-1 mt-1">
                          <Utensils className="h-3.5 w-3.5 text-stone-400" />
                          <span className="text-xs font-bold font-mono">{activeCourse.cookTime}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[9px] font-mono uppercase text-[#666666] font-bold tracking-wider">Difficulty</div>
                        <div className="flex items-center justify-center space-x-1 mt-1">
                          <Flame className="h-3.5 w-3.5 text-stone-400" />
                          <span className="text-xs font-bold font-mono">{activeCourse.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients needed block */}
                    <div>
                      <h4 className="text-xs font-mono text-[#666666] uppercase tracking-widest font-bold mb-3">
                        Ingredients Checklist
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#1A1A1A] p-4 rounded-2xl border border-[#2A2A2A]">
                        {activeCourse.recipeIngredients.map((item, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-stone-300">
                            <span className="text-brand-gold mt-0.5 select-none font-bold">▪</span>
                            <span className="font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Checklist Steps Block with Interactive Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-mono text-[#666666] uppercase tracking-widest font-bold">
                          Step-by-Step Interactive Guide
                        </h4>
                        <span className="text-[10px] font-mono font-bold text-brand-gold uppercase">
                          Click to complete
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {activeCourse.recipeSteps.map((step, idx) => {
                          const isDone = completedSteps[`${activeCourse.id}-${idx}`] || false;
                          return (
                            <div 
                              key={idx}
                              onClick={() => toggleStepCompleted(activeCourse.id, idx)}
                              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 text-left ${
                                isDone 
                                  ? 'bg-[#1A1A1A]/50 border-[#2A2A2A]/50 opacity-50' 
                                  : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#3F3F3F]'
                              }`}
                            >
                              <button 
                                className="mt-0.5 shrink-0 text-stone-600 focus:outline-none"
                              >
                                {isDone ? (
                                  <CheckSquare className="h-4 w-4 text-brand-gold fill-brand-gold/10" />
                                ) : (
                                  <Square className="h-4 w-4 text-stone-800" />
                                )}
                              </button>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono text-[9px] uppercase font-bold text-stone-500">Step {idx + 1}</span>
                                  {isDone && <span className="text-[10px] text-brand-gold font-bold uppercase font-mono">Done</span>}
                                </div>
                                <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'line-through text-stone-600 font-light' : 'text-[#E0E0E0]'}`}>
                                  {step}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Master Secret Chef Tip */}
                    <div className="bg-[#C2A07A]/5 border border-[#C2A07A]/20 p-4 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-1 text-md rotate-12">🔑</div>
                      <div className="flex items-center space-x-2 mb-1.5 text-brand-gold">
                        <Sparkles className="h-4 w-4 shrink-0" />
                        <h5 className="text-xs font-bold uppercase font-mono">Chef Secret Hack</h5>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed font-sans font-light font-light">
                        {activeCourse.chefTip}
                      </p>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>



        </section>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-[#2A2A2A] bg-[#121212] text-stone-400 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs font-display">
            EL SOL CULINARY Companion — Handcrafted for Culinary Excellence.
          </p>
          <p className="text-[10px] font-mono text-[#555555]">
            Powered by React, Tailwind v4 and local client persistence. No cookies or cloud trackers required.
          </p>
        </div>
      </footer>

    </div>
  );
}
