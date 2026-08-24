import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Trophy, CheckCircle2, XCircle, Sparkles, RotateCw } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Heritage Quiz — Virasat" },
      { name: "description", content: "Test your knowledge of India's heritage and earn badges." },
    ],
  }),
  component: QuizPage,
});

const questions = [
  {
    q: "Who built the Taj Mahal and for whom?",
    a: ["Akbar for Jodha", "Shah Jahan for Mumtaz Mahal", "Babur for Hamida", "Aurangzeb for Rabia"],
    correct: 1,
  },
  {
    q: "Hampi was the capital of which empire?",
    a: ["Chola", "Maurya", "Vijayanagara", "Mughal"],
    correct: 2,
  },
  {
    q: "The Khajuraho temples are known for?",
    a: ["Underground tunnels", "Intricate sandstone carvings", "Floating stones", "Mirror work"],
    correct: 1,
  },
  {
    q: "Mysore Palace is lit by how many bulbs during Dasara?",
    a: ["10,000", "50,000", "97,000", "1 million"],
    correct: 2,
  },
  {
    q: "The Sheesh Mahal is located in which fort?",
    a: ["Red Fort", "Amber Fort", "Mehrangarh", "Gwalior Fort"],
    correct: 1,
  },
];

function QuizPage() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === questions[i].correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (i + 1 >= questions.length) setDone(true);
      else { setI(i + 1); setPicked(null); }
    }, 1200);
  };

  const reset = () => { setI(0); setScore(0); setPicked(null); setDone(false); };

  const badge = score >= 4 ? "Virasat Scholar" : score >= 2 ? "Virasat Explorer" : "Virasat Seeker";

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-12">
        {!done ? (
          <>
            <div className="text-center mb-8">
              <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Knowledge Quiz</div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-gradient-hero">Question {i + 1} of {questions.length}</h1>
            </div>

            <div className="h-2 bg-muted rounded-full overflow-hidden mb-8">
              <div className="h-full gradient-hero transition-all duration-500" style={{ width: `${((i + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
            </div>

            <div className="glass rounded-3xl p-8 shadow-card mb-6">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 leading-tight">{questions[i].q}</h2>
              <div className="space-y-3">
                {questions[i].a.map((opt, idx) => {
                  const isCorrect = idx === questions[i].correct;
                  const isPicked = idx === picked;
                  const showResult = picked !== null;
                  return (
                    <button
                      key={idx}
                      onClick={() => pick(idx)}
                      disabled={picked !== null}
                      className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition-all flex items-center justify-between ${
                        showResult && isCorrect ? "bg-green-500/20 border-2 border-green-500" :
                        showResult && isPicked ? "bg-destructive/20 border-2 border-destructive" :
                        "glass hover:bg-primary/10 border-2 border-transparent"
                      }`}
                    >
                      <span>{opt}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {showResult && isPicked && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">Score: <span className="font-bold text-primary">{score}</span></div>
          </>
        ) : (
          <div className="text-center animate-[slide-up_0.6s_ease-out]">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 gradient-saffron blur-3xl opacity-50 animate-[float_3s_ease-in-out_infinite]" />
              <div className="relative w-32 h-32 rounded-full gradient-hero flex items-center justify-center shadow-glow mx-auto">
                <Trophy className="w-16 h-16 text-ivory" />
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Badge unlocked
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-gradient-hero mb-3">{badge}</h1>
            <p className="text-xl text-foreground/80 mb-2">You scored <span className="font-bold text-primary">{score}/{questions.length}</span></p>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {score === questions.length ? "A perfect score! You truly know India's soul." :
               score >= 3 ? "Well done, explorer. Keep discovering!" :
               "Every journey begins with a step. Try again!"}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 gradient-hero text-ivory font-bold px-8 py-4 rounded-2xl shadow-glow hover:scale-105 transition-transform"
            >
              <RotateCw className="w-4 h-4" /> Try again
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
