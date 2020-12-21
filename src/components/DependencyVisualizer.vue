<template>
  <div class="card">
    <div style="position: static; height: 100%" class="card-content">
      <flow-selector
        style="position: absolute; top: 1.5rem; right: 1.5rem;"
        @flow-change="
          (val) => {
            selectedFlow = val;
          }
        "
      />
      <svg
        id="flow-graph"
        width="100%"
        :height="`max(${treeData.layout.height}px, 600px)`"
      >
        <g class="svg-pan-zoom_viewport">
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
              :y="n.y - 14"
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
            <text :x="n.x + 2" :y="n.y - 14" dy="0.35em">{{ n.label }}</text>
          </template>
        </g>
      </svg>
      <div style="position: absolute; bottom: 1.5rem; left: 1.5rem;">
        <div class="buttons mb-0">
          <div>
            <button
              class="button is-small"
              @click="panZoom ? panZoom.center() : null"
            >
              Center
            </button>
            <button
              class="button is-small"
              @click="panZoom ? panZoom.fit() : null"
            >
              Fit
            </button>
          </div>
          <div>
            <button
              class="button is-small"
              @click="panZoom ? panZoom.zoomIn() : null"
            >
              Zoom In
            </button>
            <button
              class="button is-small"
              @click="panZoom ? panZoom.zoomOut() : null"
            >
              Zoom Out
            </button>
          </div>
        </div>
        <div class="is-size-7">*You can scroll to zoom on desktop</div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as d3 from "d3";
import svgPanZoom from "svg-pan-zoom";
import { scaleOrdinal } from "d3-scale";
import { schemeDark2 } from "d3-scale-chromatic";
import { useState } from "@/api/sentenceFlow";
import FlowSelector from "@/components/FlowSelector";

export default {
  components: {
    FlowSelector,
  },
  setup() {
    const sentenceFlow = useState();
    return { ...sentenceFlow };
  },
  data() {
    return {
      color: scaleOrdinal(schemeDark2),
      panZoom: null,
      selectedFlow: 1,
    };
  },
  mounted() {
    this.panZoom = svgPanZoom("#flow-graph");
  },
  computed: {
    currentFlow() {
      switch (parseInt(this.selectedFlow)) {
        case 1:
          return this.compactedSentenceFlow;
        case 2:
          return this.levelsFlow;
        case 0:
        default:
          return this.sentenceFlow;
      }
    },
    treeData() {
      // Deep clone array so our modifications don't recursively retrigger computation
      let levels = JSON.parse(JSON.stringify(this.currentFlow));

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
      const node_height = 32;
      const node_width = 80;
      const bundle_width = 16;
      const level_y_padding = 25;

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
  watch: {
    sentenceFlowString() {
      // Movable library breaks if nothing is in svg
      if (this.sentenceFlow.length === 0) {
        return;
      }

      // Wait till svg is populated before instantiating
      this.$nextTick(function() {
        this.panZoom = svgPanZoom("#flow-graph");
        this.panZoom.updateBBox();
        this.panZoom.resize();
      });
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
#flow-graph:hover {
  cursor: grab;
}
</style>
