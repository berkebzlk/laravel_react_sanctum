import { Button } from "@chakra-ui/react";
import { BiDetail } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

const createColumns = (data, detailPage) => {
  const keys = Object.keys(data[0]);

  let columns = [];
  let firstColumn = {};

  if (detailPage) {
    firstColumn = {
      accessorKey: 'detay',
      header: 'Detay',
      cell: ({ row }) => (
        <Link as={NavLink} to={`/Product/${row.original.id}`} onClick={() => handleDetailClick(row.original)}>
          <Button><BiDetail /></Button>
        </Link>
      ),
    };
  }

  columns = keys.map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    cell: ({ getValue }) => {
      const value = getValue();

      if (isDecimal(value)) {
        return parseFloat(value).toFixed(2);
      }

      return value;
    },
  }));

  if (detailPage) return [firstColumn, ...columns];
  else return columns;
};

// Detay butonuna tıklanma olayını yönetme fonksiyonu
const handleDetailClick = (rowData) => {
  console.log("Detay butonuna tıklanan satır:", rowData);
};

// Decimal olup olmadığını kontrol eden fonksiyon
const isDecimal = (value) => {
  if (value === null) {
    return '';
  }

  return !isNaN(value) && value.toString().includes('.');
};

export default createColumns;
