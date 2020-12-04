import exampleSentences from "@/example-sentences";
import SentenceInput from "@/components/SentenceInput.vue";

describe("SentenceInput.vue", () => {
  describe("Computed sentence", () => {
    describe("Gets sentenceFlow correctly", () => {
      it("Returns nothing if sentenceFLow is empty", () => {
        let localThis = { sentenceFlow: [] };
        expect(SentenceInput.computed.sentence.get.call(localThis)).toBe("");
      });
      it("Returns a string separated ", () => {
        let localThis = { sentenceFlow: [[{ label: "a" }], [{ label: "b" }]] };
        expect(SentenceInput.computed.sentence.get.call(localThis)).toBe("a|b");
      });
    });

    describe("Sets sentenceFlow correctly", () => {
      let localThis = { sentenceFlow: [] };
      it("Sets token correctly from empty sentenceFlow", () => {
        SentenceInput.computed.sentence.set.apply(localThis, ["a"]);
        expect(localThis.sentenceFlow).toMatchObject([[{ id: 0, label: "a" }]]);
      });
      it("Adds new token correctly to beginning of sentenceFlow", () => {
        SentenceInput.computed.sentence.set.apply(localThis, ["b|a"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b" }],
          [{ id: 0, label: "a" }],
        ]);
      });
      it("Adds new token correctly to end of sentenceFlow", () => {
        SentenceInput.computed.sentence.set.apply(localThis, ["b|a|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b" }],
          [{ id: 0, label: "a" }],
          [{ id: 2, label: "c" }],
        ]);
      });
    });
  });
});
