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

export function createPieSegments(nums) {
  let rotationValues = [];
  let start = 90;
  const step = 360 / nums.length;
  let i = nums.length;
  if (i === 1) {
    return [{ minDegree: 0, maxDegree: 360, value: nums[i - 1] }];
  }
  while (i > 0) {
    let minDegree, maxDegree;
    minDegree = start % 360;
    maxDegree = (start + step) % 360;
    if (minDegree > maxDegree) {
      rotationValues.push({
        minDegree: minDegree,
        maxDegree: 360,
        value: nums[i - 1],
      });
      rotationValues.push({
        minDegree: 0,
        maxDegree: maxDegree,
        value: nums[i - 1],
      });
    }
    else {
      if (i === 1) {
        maxDegree = 90;
      }
        rotationValues.push({
        minDegree: minDegree,
        maxDegree: maxDegree,
        value: nums[i - 1],
      });
    }
      start += step
      i--; 
  }
  return rotationValues;
}

export function valueGenerator(angleValue, arr) {
  for (let i of arr) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      return i.value;
    }
  }
  return null;
}  