import { useState } from "react";

import BugImageURL from "../../assets/bug.svg";
import IdeiaImageURL from "../../assets/ideia.svg";
import ThoughtmageURL from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedBackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: BugImageURL,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: IdeiaImageURL,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: ThoughtmageURL,
      alt: "Imagem de uma nuvem de pensamento",
    },
  },
};

export type Feedbacktype = keyof typeof feedBackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<Feedbacktype | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  function handleRestartFeedBack() {
    setFeedbackSend(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSend ? (
        <FeedbackSuccessStep onFeedBackRestartRequested={handleRestartFeedBack}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedBackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedBackRestartRequested={handleRestartFeedBack}
              onFeedbackSend={() => setFeedbackSend(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <span className="ml-[0.5px]"></span>
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
