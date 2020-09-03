export const getLineHeight = fontSize => {
  const multiplier = fontSize > 20 ? 0.1 : 0.33;
  return parseInt(String(fontSize + fontSize * multiplier), 10);
};

export const base = {
  fontSize: $screen.scaleSize(15),
  lineHeight: getLineHeight(15),
};

export const small = {
  ...base,
  fontSize: base.fontSize * 0.9,
  lineHeight: getLineHeight(base.fontSize),
};

export const h1 = {
  ...base,
  fontSize: base.fontSize * 1.75,
  lineHeight: getLineHeight(base.fontSize),
};

export const h2 = {
  ...base,
  fontSize: base.fontSize * 1.5,
  lineHeight: getLineHeight(base.fontSize),
};

export const h3 = {
  ...base,
  fontSize: base.fontSize * 1.25,
  lineHeight: getLineHeight(base.fontSize),
};

export const h4 = {
  ...base,
  fontSize: base.fontSize * 1.1,
  lineHeight: getLineHeight(base.fontSize),
};

export const h5 = base;

export default {
  base,
  small,
  h1,
  h2,
  h3,
  h4,
  h5,
};
