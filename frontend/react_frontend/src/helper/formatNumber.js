function formatNumber(value) {
    if (Number.isInteger(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value;
    }
    
    return value.toFixed(2);
  }

export default formatNumber