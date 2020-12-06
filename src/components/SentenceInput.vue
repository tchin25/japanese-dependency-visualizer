<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Input" v-model="sentence" />
    </div>
    <div class="control">
      <button
        class="button is-primary"
        type="submit"
        value="Submit"
        @click="setSentenceFlow"
      >
        Generate Flow
      </button>
    </div>
  </div>
</template>

<script>
import { useState, generateSentenceFlow } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow } = useState();
    return { sentenceFlow, generateSentenceFlow };
  },
  computed: {
    sentence: {
      get() {
        return this.sentenceFlow.reduce((acc, curr, i, arr) => {
          if (arr.length === 0) {
            return;
          }
          if (i === 0) {
            return curr[0].label;
          }
          return (acc += "|" + curr[0].label);
        }, "");
      },
      set(value) {
        // TODO: Support paste with tokenizer

        let tokenized = value.split("|");
        if (tokenized.length > this.sentenceFlow.length) {
          if (tokenized.length === 1) {
            this.sentenceFlow.push([
              {
                id: 0,
                label: tokenized[0],
                children: [],
                parentId: -1,
              },
            ]);
            return;
          }

          // Get id for new token
          const id =
            this.sentenceFlow.reduce(
              (max, el) => (el[0].id > max ? el[0].id : max),
              -1
            ) + 1;

          for (let i = 0; i < tokenized.length; i++) {
            // If the new token is at the end
            if (i === this.sentenceFlow.length) {
              this.sentenceFlow.push([
                {
                  id,
                  label: tokenized[i],
                  children: [],
                  parentIndex: -1,
                },
              ]);
              console.log("pushed new token");
              console.log(this.sentenceFlow);
              break;
            }

            // Insert new token between old ones
            if (this.sentenceFlow[i][0].label !== tokenized[i]) {
              console.log("Inserting new token");

              this.sentenceFlow.splice(i, 0, [
                { id, label: tokenized[i], children: [], parentId: -1 },
              ]);
              this.sentenceFlow[i + 1][0].label = tokenized[i + 1];
              break;
            }
          }
        } else if (tokenized.length < this.sentenceFlow.length) {
          // TODO: Support bulk delete

          for (let i = 0; i < this.sentenceFlow.length - 1; i++) {
            // If the token at the end was deleted
            if (i === tokenized.length - 1) {
              console.log("deleting last token");
            }
            // Merge two tokens together
            if (
              this.sentenceFlow[i][0].label !== tokenized[i] ||
              i === tokenized.length - 1
            ) {
              const toSave = this.sentenceFlow[i][0];
              const toDelete = this.sentenceFlow[i + 1][0];
              if (i === tokenized.length - 1) {
                toDelete.label = "";
              }

              // Merges Label
              toSave.label += toDelete.label;

              // Delete child from former parent
              const formerParentId = toDelete.parentId;
              const childId = toDelete.id;
              const formerParent = this.sentenceFlow.find(
                (el) => el[0].id === formerParentId
              );

              if (formerParent) {
                formerParent[0].children = formerParent[0].children.filter(
                  (el) => el != childId
                );

                // Add newly merged token as child of former token
                let child = formerParent[0].children.findIndex(
                  (el) => el === toSave.id
                );
                if (child < 0) {
                  formerParent[0].children.push(toSave.id);
                  formerParent[0].children.sort((a, b) => b - a);
                }
              }

              // Update parent
              toSave.parentId = toDelete.parentId;
              console.log(toSave);

              // Combines children and sorts
              toSave.children = toSave.children.concat(toDelete.children);
              toSave.children.sort((a, b) => b - a);
              // Filter for edge case where toSave was child of toDelete
              toSave.children = toSave.children.filter(
                (el) => el !== toSave.id
              );
              console.log(toSave);

              // Sets parentId of orphaned children
              toDelete.children.forEach((childId) => {
                let child = this.sentenceFlow.find(
                  (el) => el[0].id === childId
                )[0];
                if (child && child.id !== toSave.id) {
                  child.parentId = toSave.id;
                }
              });

              // Delete merged token
              if (i === tokenized.length) {
                this.sentenceFlow.splice(i, 1);
                break;
              }
              this.sentenceFlow.splice(i + 1, 1);
              break;
            }
          }
        } else {
          for (let i = 0; i < tokenized.length; i++) {
            this.sentenceFlow[i][0].label = tokenized[i];
          }
        }
      },
    },
  },
  methods: {
    async setSentenceFlow() {
      this.sentenceFlow = await this.generateSentenceFlow(this.sentence);
    },
  },
};
</script>

<style></style>
