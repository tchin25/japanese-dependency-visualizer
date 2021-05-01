import exampleSentences from "@/example-sentences";
import { useState, generateSentenceFlow } from "@/api/sentenceFlow";

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
        await generateSentenceFlow(
          `店内に散らばっている無数の音たちから情報を拾いながら、私の身体は納品されたばかりのおにぎりを並べている`
        )
      ).toMatchObject(exampleSentences.readable);
      expect(fetch).toHaveBeenCalledWith(
        "https://cabocha-nke3uh5gza-uc.a.run.app/店内に散らばっている無数の音たちから情報を拾いながら、私の身体は納品されたばかりのおにぎりを並べている"
      );
      fetch.mockClear();
    });
    it("Returns flow with one token on api failure", async () => {
      fetch.mockImplementationOnce(() => Promise.reject("API is down"));
      expect(
        await generateSentenceFlow(
          `店内に散らばっている無数の音たちから情報を拾いながら、私の身体は納品されたばかりのおにぎりを並べている`
        )
      ).toEqual([
        [
          {
            id: 0,
            label:
              "店内に散らばっている無数の音たちから情報を拾いながら、私の身体は納品されたばかりのおにぎりを並べている",
            children: [],
            parentId: -1,
          },
        ],
      ]);
    });
  });

  describe("Computed flows from useState()", () => {
    let { sentenceFlow, levelsFlow, compactedSentenceFlow } = useState();
    it("Correctly computed levelsFlow", () => {
      sentenceFlow.value = exampleSentences.readable;
      expect(levelsFlow.value).toEqual(exampleSentences.levels);
      sentenceFlow.value = exampleSentences.readable2;
      expect(levelsFlow.value).toEqual(exampleSentences.levels2);
    });
    it("Correctly computed compactedSentenceFlow", () => {
      sentenceFlow.value = exampleSentences.readable;
      expect(compactedSentenceFlow.value).toEqual(exampleSentences.readable_c);
      sentenceFlow.value = exampleSentences.readable2;
      expect(compactedSentenceFlow.value).toEqual(exampleSentences.readable2_c);
    });
  });
});
