export default (svgTemplateRef) => () => {
  const canvas = document.createElement("canvas");
  const svgClone = svgTemplateRef.value.cloneNode(true);

  // Get the bounds of the SVG content
  var bbox = svgTemplateRef.value.firstChild.getBBox();
  const width = bbox.x + bbox.width + bbox.x;
  // The +4 is to account for padding of last node
  const height = bbox.y + bbox.height + bbox.y + 4;

  // Update the width and height using the size of the contents
  svgClone.setAttribute("width", width);
  svgClone.setAttribute("height", height);

  // Place generated svg into view
  svgClone.firstChild.setAttribute("style", "");
  svgClone.firstChild.setAttribute("transform", "");

  // Prepare canvas
  const ctx = canvas.getContext("2d");
  const paddingX = 8;
  const paddingY = 8;
  canvas.width = width + 2 * paddingX;
  canvas.height = height + 2 * paddingY;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Convert SVG to data url
  const DOMURL = window.URL || window.webkitURL || window;
  const img = new Image();
  const s = new XMLSerializer();
  const imageData = s.serializeToString(svgClone);
  const svgBlob = new Blob([imageData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = DOMURL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.drawImage(img, paddingX, paddingY);
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
