import exampleSentences from "@/example-sentences";
import SentenceInput from "@/components/SentenceInput.vue";
import { useState } from "@/api/sentenceFlow";

describe("SentenceInput.vue", () => {
  describe("Computed sentence", () => {
    describe("Gets sentenceFlow correctly", () => {
      it("Returns nothing if sentenceFLow is empty", () => {
        let localThis = { sentenceFlow: [] };
        expect(SentenceInput.computed.sentence.get.call(localThis)).toBe("");
      });
      it("Returns single token string", () => {
        let localThis = { sentenceFlow: [[{ label: "a" }]] };
        expect(SentenceInput.computed.sentence.get.call(localThis)).toBe("a");
      });
      it("Returns a merged string with '|' between each token", () => {
        let localThis = { sentenceFlow: [[{ label: "a" }], [{ label: "b" }]] };
        expect(SentenceInput.computed.sentence.get.call(localThis)).toBe("a|b");
      });
    });

    describe("Sets sentenceFlow correctly", () => {
      it("Sets token correctly from empty sentenceFlow", () => {
        let localThis = { sentenceFlow: [] };
        SentenceInput.computed.sentence.set.apply(localThis, ["a"]);
        expect(localThis.sentenceFlow).toMatchObject([[{ id: 0, label: "a" }]]);
      });

      it("Adds new token correctly to beginning of sentenceFlow", () => {
        let localThis = { sentenceFlow: [[{ id: 0, label: "a" }]] };
        SentenceInput.computed.sentence.set.apply(localThis, ["b|a"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b" }],
          [{ id: 0, label: "a" }],
        ]);
      });

      it("Adds new token correctly to end of sentenceFlow", () => {
        let localThis = {
          sentenceFlow: [[{ id: 1, label: "b" }], [{ id: 0, label: "a" }]],
        };
        SentenceInput.computed.sentence.set.apply(localThis, ["b|a|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b" }],
          [{ id: 0, label: "a" }],
          [{ id: 2, label: "c" }],
        ]);
      });

      it("Inserts new token correctly to the middle of sentenceFlow", () => {
        let localThis = {
          sentenceFlow: [
            [{ id: 1, label: "b" }],
            [{ id: 0, label: "a" }],
            [{ id: 2, label: "c" }],
          ],
        };
        SentenceInput.computed.sentence.set.apply(localThis, ["b|a|d|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b" }],
          [{ id: 0, label: "a" }],
          [{ id: 3, label: "d" }],
          [{ id: 2, label: "c" }],
        ]);
      });

      it("Combines token correctly when tokenizer is deleted", () => {
        let localThis = {
          sentenceFlow: [
            [{ id: 1, label: "b", children: [], parentId: 0 }],
            [{ id: 4, label: "b", children: [], parentId: 3 }],
            [{ id: 0, label: "a", children: [1], parentId: 2 }],
            [{ id: 3, label: "d", children: [4], parentId: 2 }],
            [{ id: 2, label: "c", children: [0, 3], parentId: -1 }],
          ],
          sortTokenChildren: useState().sortTokenChildren,
        };
        SentenceInput.computed.sentence.set.apply(localThis, ["b|b|ad|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b", children: [], parentId: 0 }],
          [{ id: 4, label: "b", children: [], parentId: 0 }],
          [{ id: 0, label: "ad", children: [4, 1], parentId: 2 }],
          [{ id: 2, label: "c", children: [0], parentId: -1 }],
        ]);
        SentenceInput.computed.sentence.set.apply(localThis, ["b|b|adc"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b", children: [], parentId: 0 }],
          [{ id: 4, label: "b", children: [], parentId: 0 }],
          [{ id: 0, label: "adc", children: [4, 1], parentId: -1 }],
        ]);
      });

      it("Removes token from middle of sentenceFlow", () => {
        let localThis = {
          sentenceFlow: [
            [{ id: 1, label: "b", children: [], parentId: 0 }],
            [{ id: 4, label: "b", children: [], parentId: 3 }],
            [{ id: 0, label: "a", children: [1], parentId: 2 }],
            [{ id: 3, label: "d", children: [4], parentId: 2 }],
            [{ id: 2, label: "c", children: [3, 0], parentId: -1 }],
          ],
        };
        SentenceInput.computed.sentence.set.apply(localThis, ["b|b|d|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b", children: [], parentId: -1 }],
          [{ id: 4, label: "b", children: [], parentId: 3 }],
          [{ id: 3, label: "d", children: [4], parentId: 2 }],
          [{ id: 2, label: "c", children: [3], parentId: -1 }],
        ]);

        SentenceInput.computed.sentence.set.apply(localThis, ["b|b|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b", children: [], parentId: -1 }],
          [{ id: 4, label: "b", children: [], parentId: -1 }],
          [{ id: 2, label: "c", children: [], parentId: -1 }],
        ]);
      });

      it("Deletes token from beginning of sentenceFlow", () => {
        let localThis = {
          sentenceFlow: [
            [{ id: 1, label: "b", children: [], parentId: 0 }],
            [{ id: 0, label: "ad", children: [1], parentId: 2 }],
            [{ id: 2, label: "c", children: [0], parentId: -1 }],
          ],
        };
        SentenceInput.computed.sentence.set.apply(localThis, ["ad|c"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 0, label: "ad", children: [], parentId: 2 }],
          [{ id: 2, label: "c", children: [0], parentId: -1 }],
        ]);
      });

      it("Deletes token from end of sentenceFlow", () => {
        let localThis = {
          sentenceFlow: [
            [{ id: 1, label: "b", children: [], parentId: 2 }],
            [{ id: 0, label: "ad", children: [], parentId: 2 }],
            [{ id: 2, label: "c", children: [1, 0], parentId: -1 }],
          ],
          sortTokenChildren: useState().sortTokenChildren,
        };
        SentenceInput.computed.sentence.set.apply(localThis, ["b|ad"]);
        expect(localThis.sentenceFlow).toMatchObject([
          [{ id: 1, label: "b", children: [], parentId: 0 }],
          [{ id: 0, label: "ad", children: [1], parentId: -1 }],
        ]);
      });
    });
  });
});
