export const decodeImage = (pic) => {
  if (!pic) return null;

  // CASE 1 → already a complete data URL
  if (typeof pic === "string" && pic.startsWith("data:")) {
    return pic;
  }

  // CASE 2 → raw base64 string
  if (typeof pic === "string") {
    return `data:image/jpeg;base64,${pic}`;
  }

  // CASE 3 → MongoDB Buffer { data: { data: [bytes] }, contentType: "image/jpeg" }
  if (pic?.data?.data) {
    try {
      const binaryString = pic.data.data
        .map((byte) => String.fromCharCode(byte))
        .join("");

      const base64String = btoa(binaryString);

      return `data:${pic.contentType || "image/jpeg"};base64,${base64String}`;
    } catch (err) {
      console.error("Error decoding MongoDB pic buffer:", err);
    }
  }

  // CASE 4 → no image found
  return null;
};
