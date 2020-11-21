import exampleSentences from "@/example-sentences";
import * as sentenceFlowAPI from "@/api/sentenceFlow";

describe("sentenceFlow", () => {
  it("Correctly computed levelsFlow", () => {
    sentenceFlowAPI.sentenceFlow.value = exampleSentences.readable;
    expect(sentenceFlowAPI.levelsFlow.value).toEqual(exampleSentences.levels);
  });
});
