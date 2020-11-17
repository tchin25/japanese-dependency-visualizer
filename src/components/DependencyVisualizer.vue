<template>
  <svg width="800" :height="treeData.layout.height">
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

      <!-- <text :x="n.x" :y="n.y" dy="0.35em" stroke="white" stroke-width="6">
        {{ n.id }}
      </text> -->
      <text :x="n.x + 2" :y="n.y - 8" dy="0.35em">{{ n.label }}</text>
    </template>
  </svg>
</template>

<script>
import * as d3 from "d3";
import { toRaw } from "vue";

export default {
  data() {
    return {
      color: d3.scaleOrdinal(d3.schemeDark2),
      sentence: [
        [{ id: 0, label: "僕は" }],
        [
          { id: 1, label: "あの" },
          { id: 2, label: "赤い" },
        ],
        [{ id: 3, label: "鞄を", parents: [1, 2] }],
        [{ id: 4, label: "持っている", parents: [3] }],
        [{ id: 5, label: "人が", parents: [4] }],
        [{ id: 6, label: "知っています", parents: [5, 0] }],
      ],
    };
  },
  mounted() {
    // console.log(this.treeData);
  },
  computed: {
    treeData() {
      let levels = JSON.parse(JSON.stringify(toRaw(this.sentence)));
      console.log(levels);
      // precompute level depth
      levels.forEach((l, i) => l.forEach((n) => (n.level = i)));

      var nodes = levels.reduce((a, x) => a.concat(x), []);
      var nodes_index = {};
      nodes.forEach((d) => (nodes_index[d.id] = d));

      // objectification
      nodes.forEach((d) => {
        d.parents = (d.parents === undefined ? [] : d.parents).map(
          (p) => nodes_index[p]
        );
      });

      // precompute bundles
      levels.forEach((l, i) => {
        var index = {};
        l.forEach((n) => {
          console.log(n);
          if (n.parents.length == 0) {
            return;
          }

          var id = n.parents
            .map((d) => d.id)
            .sort()
            .join("--");
          if (id in index) {
            index[id].parents = index[id].parents.concat(n.parents);
          } else {
            index[id] = { id: id, parents: n.parents.slice(), level: i };
          }
          n.bundle = index[id];
        });
        l.bundles = Object.keys(index).map((k) => index[k]);
        l.bundles.forEach((b, i) => (b.i = i));
      });

      var links = [];
      nodes.forEach((d) => {
        d.parents.forEach((p) =>
          links.push({ source: d, bundle: d.bundle, target: p })
        );
      });

      var bundles = levels.reduce((a, x) => a.concat(x.bundles), []);

      // layout
      const node_height = 16;
      const node_width = 80;
      const bundle_width = 16;
      const level_y_padding = 16;

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
            b.parents[0].x +
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
  font-size: 12px;
}
.node {
  stroke-linecap: round;
}
</style>
