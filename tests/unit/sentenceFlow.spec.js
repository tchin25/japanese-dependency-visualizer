import exampleSentences from "@/example-sentences";
import * as sentenceFlowAPI from "@/api/sentenceFlow";

describe("sentenceFlow", () => {
  describe("generateSentenceFlow()", () => {
    it("Correctly generates sentenceFlow from XML", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          text: () => Promise.resolve(exampleSentences.xml),
        })
      );

      // Use toMatchObject because we don't care about extra properties
      expect(
        await sentenceFlowAPI.generateSentenceFlow(
          `店内に散らばっている無数の音たちから情報を拾いながら、私の身体は納品されたばかりのおにぎりを並べている`
        )
      ).toMatchObject(exampleSentences.readable);
    });
    // it("Returns empty array on failure", () => {});
  });

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
