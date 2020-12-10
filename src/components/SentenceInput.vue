<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Input" v-model="sentence" />
    </div>
    <div class="control">
      <button
        class="button is-primary"
        :class="disabled ? 'is-loading' : ''"
        type="submit"
        value="Submit"
        :disabled="disabled"
        @click="setSentenceFlow"
      >
        Auto-Generate Flow
      </button>
    </div>
  </div>
</template>

<script>
import { useState, generateSentenceFlow } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow, sortTokenChildren } = useState();
    return { sentenceFlow, sortTokenChildren, generateSentenceFlow };
  },
  data() {
    return {
      disabled: false,
    };
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
        // TODO: Make this code less cursed

        if (value === "") {
          this.sentenceFlow = [];
          return;
        }

        let tokenized = value.split("|");

        // Attempt to preverve metadata of tokens
        // Only works for single-token changes
        const diff = tokenized.length - this.sentenceFlow.length;

        // If change is more than a single token, reset everything
        if (Math.abs(diff) !== 1 && diff !== 0) {
          this.sentenceFlow = [];
          tokenized.forEach((token, i) => {
            this.sentenceFlow.push([
              {
                id: i,
                label: token,
                children: [],
                parentId: -1,
              },
            ]);
          });
          return;
        }

        if (diff === 1) {
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
                  parentId: -1,
                },
              ]);
              break;
            }

            // Insert new token between old ones
            if (this.sentenceFlow[i][0].label !== tokenized[i]) {
              this.sentenceFlow.splice(i, 0, [
                { id, label: tokenized[i], children: [], parentId: -1 },
              ]);
              this.sentenceFlow[i + 1][0].label = tokenized[i + 1];
              break;
            }
          }
        } else if (diff === -1) {
          // If token was deleted, destroy all links and shift array
          // If tokenizer between tokens was deleted, merge tokens
          // If the token at the end was deleted, sets new last token as root

          for (let i = 0; i < this.sentenceFlow.length - 1; i++) {
            // Token was deleted
            if (
              this.sentenceFlow[i][0].label !== tokenized[i] &&
              this.sentenceFlow[i + 1][0].label === tokenized[i]
            ) {
              const toDelete = this.sentenceFlow[i][0];

              // Sets parentId of orphaned children
              toDelete.children.forEach((childId) => {
                let child = this.sentenceFlow.find(
                  (el) => el[0].id === childId
                )[0];
                if (child) {
                  child.parentId = -1;
                }
              });
              const formerParent = this.sentenceFlow.find(
                (el) => el[0].id === toDelete.parentId
              );

              if (formerParent) {
                formerParent[0].children = formerParent[0].children.filter(
                  (el) => el != toDelete.id
                );
              }

              this.sentenceFlow.splice(i, 1);
              return;
            }

            // Tokenizer was deleted and have to merge two tokens together
            if (
              this.sentenceFlow[i][0].label !== tokenized[i] ||
              i === tokenized.length - 1
            ) {
              const toSave = this.sentenceFlow[i][0];
              const toDelete = this.sentenceFlow[i + 1][0];

              // Detect between removing last token vs merging it
              if (i === tokenized.length - 1) {
                // This is to fix the issue that a|b|c removing |c returns a|bc instead of a|b
                if (this.sentenceFlow[i][0].label === tokenized[i]) {
                  toDelete.label = "";
                }
              }

              // Filter for edge case where toSave was child of toDelete
              toDelete.children = toDelete.children.filter(
                (el) => el !== toSave.id
              );

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
                  this.sortTokenChildren(formerParent[0]);
                }
              }

              // Update parent
              toSave.parentId = toDelete.parentId;

              // Combines children and sorts
              toSave.children = toSave.children.concat(toDelete.children);
              this.sortTokenChildren(toSave);

              // Sets parentId of orphaned children
              toDelete.children.forEach((childId) => {
                let child = this.sentenceFlow.find(
                  (el) => el[0].id === childId
                )[0];
                if (child) {
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
      this.disabled = true;
      this.sentenceFlow = await this.generateSentenceFlow(this.sentence);
      this.disabled = false;
    },
  },
};
</script>

<style></style>
