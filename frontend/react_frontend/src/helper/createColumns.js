const createColumns = (data) => {
  const keys = Object.keys(data[0]);

  // Decimal olup olmadığını kontrol eden fonksiyon
  const isDecimal = (value) => !isNaN(value) && value.toString().includes('.');

  return keys.map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    cell: ({ getValue }) => {
      const value = getValue();

      // Eğer decimal ise, 2 ondalık basamak olacak şekilde formatla
      if (isDecimal(value)) {
        return parseFloat(value).toFixed(2);
      }

      return value;
    },
  }));
};

export default createColumns;
