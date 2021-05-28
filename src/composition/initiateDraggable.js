import { ref, onMounted } from "vue";
import svgPanZoom from "svg-pan-zoom";
import Hammer from "hammerjs";

export default (svgElementRef) => {
  const panZoom = ref(null);
  const initialScale = ref(1);
  const hammer = ref(null);

  onMounted(() => {
    panZoom.value = svgPanZoom(svgElementRef.value);

    hammer.value = Hammer(svgElementRef.value, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS
        ? Hammer.PointerEventInput
        : Hammer.TouchInput,
    });

    // Enable pinch
    hammer.value.get("pinch").set({ enable: true });

    // Handle double tap
    hammer.value.on("doubletap", (ev) => {
      panZoom.value.zoomIn();
    });

    // Handle pinch
    hammer.value.on("pinchstart pinchmove", (ev) => {
      // On pinch start remember initial zoom
      if (ev.type === "pinchstart") {
        initialScale.value = panZoom.value.getZoom();
        this.panZoom.zoomAtPoint(this.initialScale * ev.scale, {
          x: ev.center.x,
          y: ev.center.y,
        });
      }

      panZoom.value.zoomAtPoint(initialScale.value * ev.scale, {
        x: ev.center.x,
        y: ev.center.y,
      });
    });
  });

  return { panZoom, initialScale, hammer };
};
