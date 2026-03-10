/**
 * Kreira Object URL direktno iz fajla — nema konverzije, nema gubitka kvaliteta.
 * URL se revokuje kad se slika ukloni da ne bi curela memorija.
 */

// Čuva URL-ove da ih možemo revoke
const objectUrls = new Map();

const createImageUrl = (key, file) => {
  // Revoke stari URL ako postoji
  if (objectUrls.has(key)) {
    URL.revokeObjectURL(objectUrls.get(key));
  }
  const url = URL.createObjectURL(file);
  objectUrls.set(key, url);
  return url;
};

const revokeImageUrl = (key) => {
  if (objectUrls.has(key)) {
    URL.revokeObjectURL(objectUrls.get(key));
    objectUrls.delete(key);
  }
};

/**
 * @param {Function} setDishes
 * @param {Function} setBgImage
 */
export default function useHandleImages(setDishes, setBgImage) {
  const handleDishImage = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = createImageUrl(`dish-${i}`, file);
    setDishes(prev => {
      const next = [...prev];
      next[i] = { ...next[i], image: url };
      return next;
    });
  };

  const handleBgImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = createImageUrl("bg", file);
    setBgImage(url);
  };

  const removeDishImage = (i) => {
    revokeImageUrl(`dish-${i}`);
    setDishes(prev => {
      const next = [...prev];
      next[i] = { ...next[i], image: "" };
      return next;
    });
  };

  const removeBgImage = () => {
    revokeImageUrl("bg");
    setBgImage("");
  };

  return { handleDishImage, handleBgImage, removeDishImage, removeBgImage };
}