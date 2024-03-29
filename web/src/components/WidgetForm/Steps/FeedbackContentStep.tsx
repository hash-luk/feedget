import { CloseButton } from "../../CloseButton";
import { Feedbacktype, feedBackTypes } from "..";
import { ArrowLeft } from "phosphor-react";
import { ScreenShotButton } from "../ScreenshotButton";
import { FormEvent, useState } from "react";
import api from "../../../libs/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps {
  feedbackType: Feedbacktype;
  onFeedBackRestartRequested: () => void;
  onFeedbackSend: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedBackRestartRequested,
  onFeedbackSend,
}: FeedbackContentStepProps) {
  const [screenShot, setScreenShot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const FeedBackTypesInfo = feedBackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot: screenShot,
    })

    setIsSendingFeedback(false);
    onFeedbackSend();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 text-zinc-400 hover:text-zinc-100 absolute"
          onClick={onFeedBackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl relative leading-6 flex items-center gap-2">
          <img
            src={FeedBackTypesInfo.image.source}
            alt={FeedBackTypesInfo.image.alt}
            className="w-6 h-6"
          />
          {FeedBackTypesInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500
            focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenShotButton
            onScreenShotTook={setScreenShot}
            screenShot={screenShot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {
              isSendingFeedback ? <Loading /> : "Enviar feedback"
            }
          </button>
        </footer>
      </form>
    </>
  );
}
