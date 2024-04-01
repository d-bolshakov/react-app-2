export const getElementDirection = (
  elementData: { x: number; width: number },
  clientData: { width: number }
) => (elementData.width + elementData.x > clientData.width ? "left" : "right");
