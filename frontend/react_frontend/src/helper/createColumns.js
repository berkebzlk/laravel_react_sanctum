import TextCell from "../components/table/components/TextCell";

const createColumns = (data) => {
    const keys = Object.keys(data[0]);
  
    return keys.map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: TextCell, 
    }));
  };
  
  export default createColumns;

  