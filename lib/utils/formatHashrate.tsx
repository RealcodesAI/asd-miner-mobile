export const formatHashrateExponent = (hashrate: number): string => {
    if (hashrate === 0) {
      return '0';
    }
    const exponent = Math.floor(Math.log10(Math.abs(hashrate)));
    const base = (hashrate / Math.pow(10, exponent));
    return `${base.toFixed(2)}(${exponent})`;
  };