<template>
  <div class="card">
    <div style="position: static; height: 100%" class="card-content">
      <flow-selector
        style="max-width: 100%; position: absolute; top: 1.5rem; right: 1.5rem;"
        @flow-change="
          (val) => {
            selectedFlow = val;
          }
        "
      />
      <svg
        id="flow-graph"
        ref="svg"
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
              stroke-linecap="round"
              stroke="black"
              stroke-width="8"
              :x1="n.x"
              :y1="n.y"
              :x2="n.x"
              :y2="n.y"
            />
            <line
              stroke-linecap="round"
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
        <div class="control field is-grouped">
          <button
            class="button control is-small"
            @click="panZoom ? panZoom.center() : null"
          >
            Center
          </button>
          <button
            class="button control is-small"
            @click="panZoom ? panZoom.fit() : null"
          >
            Fit
          </button>
        </div>
        <div class="control field is-grouped">
          <button
            class="button control is-small"
            @click="panZoom ? panZoom.zoomIn() : null"
          >
            Zoom In
          </button>
          <button
            class="button control is-small"
            @click="panZoom ? panZoom.zoomOut() : null"
          >
            Zoom Out
          </button>
        </div>
        <div class="is-size-7">*You can scroll to zoom on desktop</div>
      </div>
      <div style="position: absolute; bottom: 1.5rem; right: 1.5rem;">
        <button class="button control is-small" @click="downloadSvg">
          Download PNG
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import * as d3 from "d3";
import { ref } from "vue";
import svgPanZoom from "svg-pan-zoom";
import Hammer from "hammerjs";
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

    const svg = ref(null);

    const downloadSvg = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1080;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const DOMURL = window.URL || window.webkitURL || window;
      const img = new Image();
      const s = new XMLSerializer();
      const imageData = s.serializeToString(svg.value);
      const svgBlob = new Blob([imageData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = DOMURL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        const evt = new MouseEvent("click", {
          view: window,
          bubbles: false,
          cancelable: true,
        });

        const a = document.createElement("a");
        a.setAttribute("download", "dependency_diagram.png");
        a.setAttribute("href", imgURI);
        a.setAttribute("target", "_blank");

        a.dispatchEvent(evt);
      };

      img.src = url;
    };

    return { ...sentenceFlow, svg, downloadSvg };
  },
  data() {
    return {
      color: scaleOrdinal(schemeDark2),
      panZoom: null,
      selectedFlow: 1,
      hammer: null,
      initialScale: 1,
    };
  },
  mounted() {
    this.panZoom = svgPanZoom("#flow-graph");

    this.hammer = Hammer(this.$refs.svg, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS
        ? Hammer.PointerEventInput
        : Hammer.TouchInput,
    });

    // Enable pinch
    this.hammer.get("pinch").set({ enable: true });

    // Handle double tap
    this.hammer.on("doubletap", (ev) => {
      this.panZoom.zoomIn();
    });

    // Handle pinch
    this.hammer.on("pinchstart pinchmove", (ev) => {
      // On pinch start remember initial zoom
      if (ev.type === "pinchstart") {
        this.initialScale = this.panZoom.getZoom();
        this.panZoom.zoomAtPoint(this.initialScale * ev.scale, {
          x: ev.center.x,
          y: ev.center.y,
        });
      }

      this.panZoom.zoomAtPoint(this.initialScale * ev.scale, {
        x: ev.center.x,
        y: ev.center.y,
      });
    });
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
#flow-graph:hover {
  cursor: grab;
}
</style>
