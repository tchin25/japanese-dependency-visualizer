<template>
  <svg class="mt-5" width="100%" :height="treeData.layout.height">
    <template v-for="(l, index) in treeData.links" :key="index">
      <path
        :d="
          `M${l.xt} ${l.yt}
         L${l.xb - 16} ${l.yt}
         A16 16 90 0 1 ${l.xb} ${l.yt + 16}
         L${l.xb} ${l.ys - 16}
         A16 16 90 0 0 ${l.xb + 16} ${l.ys}
         L${l.xs} ${l.ys}`
        "
        fill="none"
        :stroke="`${color(l.bundle.id)}`"
        stroke-width="2"
      />
    </template>
    <template v-for="(n, index) in treeData.nodes" :key="index">
      <text
        :x="n.x + 2"
        :y="n.y - 12"
        dy="0.35em"
        stroke="white"
        stroke-width="4"
      >
        {{ n.label }}
      </text>
      <line
        class="node"
        stroke="black"
        stroke-width="8"
        :x1="n.x"
        :y1="n.y"
        :x2="n.x"
        :y2="n.y"
      />
      <line
        class="node"
        stroke="white"
        stroke-width="4"
        :x1="n.x"
        :y1="n.y"
        :x2="n.x"
        :y2="n.y"
      />
      <text :x="n.x + 2" :y="n.y - 12" dy="0.35em">{{ n.label }}</text>
    </template>
  </svg>
</template>

<script>
// import * as d3 from "d3";
import { scaleOrdinal } from "d3-scale";
import { schemeDark2 } from "d3-scale-chromatic";
import sentences from "../example-sentences";
import { unref } from "vue";
import exampleSentences from '../example-sentences';

export default {
  inject: ["sentenceFlow"],
  data() {
    return {
      color: scaleOrdinal(schemeDark2),
      sentence: [
        [{ id: 0, label: "僕は" }],
        [
          { id: 1, label: "あの" },
          { id: 2, label: "赤い" },
        ],
        [{ id: 3, label: "鞄を", children: [1, 2] }],
        [{ id: 4, label: "持っている", children: [3] }],
        [{ id: 5, label: "人が", children: [4] }],
        [{ id: 6, label: "知っています", children: [5, 0] }],
      ],
    };
  },
  mounted() {
    // console.log(this.treeData);
  },
  computed: {
    treeData() {
      // Deep clone array so our modifications don't retrigger computation
    //   let levels = JSON.parse(JSON.stringify(unref(exampleSentences.readable)));
      let levels = JSON.parse(JSON.stringify(unref(this.sentenceFlow)));
      //   console.log(levels);

      // precompute level depth
      levels.forEach((l, i) => l.forEach((n) => (n.level = i)));

      var nodes = levels.reduce((a, x) => a.concat(x), []);
      var nodes_index = {};
      nodes.forEach((d) => (nodes_index[d.id] = d));

      // objectification
      nodes.forEach((d) => {
        d.children = (d.children === undefined ? [] : d.children).map(
          (p) => nodes_index[p]
        );
      });

      // precompute bundles
      levels.forEach((l, i) => {
        var index = {};
        l.forEach((n) => {
          //   console.log(n);
          if (n.children.length == 0) {
            return;
          }

          var id = n.children
            .map((d) => d.id)
            .sort()
            .join("--");
          if (id in index) {
            index[id].children = index[id].children.concat(n.children);
          } else {
            index[id] = { id: id, children: n.children.slice(), level: i };
          }
          n.bundle = index[id];
        });
        l.bundles = Object.keys(index).map((k) => index[k]);
        l.bundles.forEach((b, i) => (b.i = i));
      });

      var links = [];
      nodes.forEach((d) => {
        d.children.forEach((p) =>
          links.push({ source: d, bundle: d.bundle, target: p })
        );
      });

      var bundles = levels.reduce((a, x) => a.concat(x.bundles), []);

      // layout
      const node_height = 40;
      const node_width = 80;
      const bundle_width = 16;
      const level_y_padding = 18;

      var x_offset = 0;
      var y_offset = 0;
      levels.forEach((l) => {
        x_offset += l.bundles.length * bundle_width;
        y_offset += level_y_padding;
        l.forEach((n, i) => {
          n.x = n.level * node_width + x_offset + node_height / 2;
          n.y = i * node_height + y_offset;
        });
        y_offset += l.length * node_height;
      });

      var i = 0;
      levels.forEach((l) => {
        l.bundles.forEach((b) => {
          b.x =
            b.children[0].x +
            node_width +
            (l.bundles.length - 1 - b.i) * bundle_width;
          b.y = i * node_height;
        });
        i += l.length;
      });

      links.forEach((l) => {
        l.xt = l.target.x;
        l.yt = l.target.y;
        l.xb = l.bundle.x;
        l.yb = l.bundle.y;
        l.xs = l.source.x;
        l.ys = l.source.y;
      });

      var layout = {
        height: nodes.length * node_height + levels.length * level_y_padding,
        node_height,
        node_width,
        bundle_width,
      };

      return { levels, nodes, nodes_index, links, bundles, layout };
    },
  },
};
</script>

<style scoped>
text {
  font-family: sans-serif;
  font-size: 16px;
}
.node {
  stroke-linecap: round;
}
</style>
