export const toggleMouseCursorToCrosshair = () => {
    const currentCursor = document.body.style.cursor;
    document.body.style.cursor = currentCursor === "crosshair" ? "auto" : "crosshair";
};