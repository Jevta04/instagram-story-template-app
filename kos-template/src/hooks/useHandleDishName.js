/**
 * @param {Function} setDishes
 */
export default function useHandleDishName(setDishes) {
  const updateDishName = (i, val) => {
    setDishes(prev => {
      const n = [...prev];
      n[i] = { ...n[i], name: val };
      return n;
    });
  };

  const updateDishSubtitle = (i, val) => {
    setDishes(prev => {
      const n = [...prev];
      n[i] = { ...n[i], subtitle: val };
      return n;
    });
  };

  return { updateDishName, updateDishSubtitle };
}