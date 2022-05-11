import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedBack = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "Example of test",
        screenshot: "data:image/png;base64,18923761298361",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to send a feedback without type", async () => {
    await expect(
      submitFeedBack.execute({
        type: "",
        comment: "Example of test",
        screenshot: "data:image/png;base64,18923761298361",
      })
    ).rejects.toThrow();
  });

  it("should not be able to send a feedback without comment", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,18923761298361",
      })
    ).rejects.toThrow();
  });

  it("should not be able to send a feedback with a invalid screenshot", async () => {
    await expect(
      submitFeedBack.execute({
        type: "BUG",
        comment: "Example of test",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
