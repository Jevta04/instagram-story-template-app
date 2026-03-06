const readFile = (file, cb) => {
  const reader = new FileReader();
  reader.onload = (e) => cb(e.target.result);
  reader.readAsDataURL(file);
};

/**
 * @param {Function} setDishes
 * @param {Function} setBgImage
 */
export default function useHandleImages(setDishes, setBgImage) {
  const handleDishImage = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    readFile(file, (result) => {
      setDishes(prev => {
        const next = [...prev];
        next[i] = { ...next[i], image: result };
        return next;
      });
    });
  };

  const handleBgImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    readFile(file, setBgImage);
  };

  return { handleDishImage, handleBgImage };
}
