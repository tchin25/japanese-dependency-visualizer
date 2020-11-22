import exampleSentences from "@/example-sentences";
import * as sentenceFlowAPI from "@/api/sentenceFlow";

describe("sentenceFlow", () => {
  it("Correctly computed levelsFlow", () => {
    sentenceFlowAPI.sentenceFlow.value = exampleSentences.readable;
    expect(sentenceFlowAPI.levelsFlow.value).toEqual(exampleSentences.levels);
    sentenceFlowAPI.sentenceFlow.value = exampleSentences.readable2;
    expect(sentenceFlowAPI.levelsFlow.value).toEqual(exampleSentences.levels2);
  });
  it("Correctly computed compactedSentenceFlow", () => {
    sentenceFlowAPI.sentenceFlow.value = exampleSentences.readable;
    expect(sentenceFlowAPI.compactedSentenceFlow.value).toEqual(
      exampleSentences.readable_c
    );
    sentenceFlowAPI.sentenceFlow.value = exampleSentences.readable2;
    expect(sentenceFlowAPI.compactedSentenceFlow.value).toEqual(
      exampleSentences.readable2_c
    );
  });
});
