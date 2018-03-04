export const isNamecardExist = counts => {
  const privacy = Object.keys(counts);
  for (let x = 0; x < privacy.length; x++) {
    if (counts[privacy[x]] > 0) {
      return true;
    }
  }
  return false;
};
