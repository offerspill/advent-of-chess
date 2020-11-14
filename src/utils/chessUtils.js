import strictValidateFEN from "fen-validator";

export const validateFEN = (fen: string): boolean => {
  if (strictValidateFEN(fen)) return true;

  const testFEN = fen.trim() + " w - - 0 1";
  if (strictValidateFEN(testFEN)) return true;

  return false;
};
