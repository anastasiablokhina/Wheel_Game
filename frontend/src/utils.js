const palette = {
  '#2ecc71': '#ffffff',
  '#e74c3c': '#ffffff',
  '#fff7d1': '#3e3e3e',
};

export const pieColors = (nums) => {
  return nums.map((_, i) => {
    let baseColor;
  
    if (nums.length % 3 === 1 && i === nums.length - 1) {
      baseColor = Object.keys(palette)[1];
    } else {
      baseColor = Object.keys(palette)[i % Object.keys(palette).length]; // Цвет по индексу
    }
  
    const textColor = palette[baseColor];
  
    return { baseColor, textColor };
  });
};