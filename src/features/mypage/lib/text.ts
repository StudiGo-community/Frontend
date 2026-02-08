export const normalize = (value: unknown) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
