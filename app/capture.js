import html2canvas from 'html2canvas';
import { toggleMouseCursorToCrosshair } from './mouse';
import styles from './styles.module.css';

const createBackground = () => {
  const background = document.createElement('div');
  background.classList.add(styles.background);
  return background;
};

export const capture = ({ onComplete, onError } = { onComplete: () => {}, onError: () => {} }) => {
  toggleMouseCursorToCrosshair();
  let isCapturing = false;
  const background = createBackground();
  background.style.borderTopWidth = `${window.innerHeight}px`;
  document.body.append(background);

  let startX;
  let startY;

  const mousedown = (e) => {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    isCapturing = true;
    document.body.removeEventListener('mousedown', mousedown);
  };

  const mousemove = (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    if (isCapturing) {
      const borderTop = Math.min(y, startY);
      const borderLeft = Math.min(x, startX);
      const borderRight = window.innerWidth - Math.max(x, startX);
      const borderBottom = window.innerHeight - Math.max(y, startY);
      background.style.borderWidth = `${borderTop}px ${borderRight}px ${borderBottom}px ${borderLeft}px`;
    }
  };

  const mouseup = async (e) => {
    try {
      e.preventDefault();
      document.body.removeEventListener('mousemove', mousemove);
      document.body.removeEventListener('mouseup', mouseup);
      const x = e.clientX;
      const y = e.clientY;
      isCapturing = false;
      background.parentNode.removeChild(background);
      toggleMouseCursorToCrosshair();
      const top = Math.min(y, startY);
      const left = Math.min(x, startX);
      const width = Math.abs(x - startX);
      const height = Math.abs(y - startY);
      const canvas = await html2canvas(document.body, { scale: 1 });
      const image = canvas.getContext('2d').getImageData(left, top, width, height);
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = width;
      croppedCanvas.height = height;
      croppedCanvas.getContext('2d').putImageData(image, 0, 0);
      const dataUrl = croppedCanvas.toDataURL();
      onComplete(dataUrl);
    } catch (err) {
      onError(err);
    }
  };

  document.body.addEventListener('mousedown', mousedown);
  document.body.addEventListener('mousemove', mousemove);
  document.body.addEventListener('mouseup', mouseup);
};
