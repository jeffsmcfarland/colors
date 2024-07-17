export function invertColor(hex:string):string {
    let validatedHex = validateHex(hex);
    let r = parseInt(validatedHex.slice(0, 2), 16),
        g = parseInt(validatedHex.slice(2, 4), 16),
        b = parseInt(validatedHex.slice(4, 6), 16);
    // invert color components - use new variables to avoid type confusion
    let r1 = (255 - r).toString(16),
        g1 = (255 - g).toString(16),
        b1 = (255 - b).toString(16);
    // pad each with zeros and return
    let result = '#' + padZero(r1) + padZero(g1) + padZero(b1);
    return result;
}

export function validateHex(hex: string):string {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length >= 8) {
        hex = hex.slice(0, 6);
    }
    if (hex.length !== 6 && hex.length !== 8) {
        throw new Error('Invalid HEX color.');
    }
    return hex;
}

export function padZero(str: string | number, len: number = 2):any {
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

export function filterAlpha(hex: string) {
 let validatedHex = validateHex(hex);
  return (percentage: number): string => {
    const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`.slice(-2).toUpperCase();
    if (decimal === 'FF') {
        return '#' + validatedHex;
    }
    return '#' + validatedHex + decimal;
  };
}

