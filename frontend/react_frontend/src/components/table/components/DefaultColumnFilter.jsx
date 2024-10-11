import { Input } from "@chakra-ui/react";

function DefaultColumnFilter({ setColumnFilters, id }) {
    const handleOnChange = (id, value) =>
        setColumnFilters((prev) => {
            if (!value) {
                return prev.filter((f) => f.id !== id);
            }

            return prev.filter((f) => f.id !== id).concat({ id, value })
        });

    return (
        <Input
            onChange={(e) => handleOnChange(id, e.target.value)}
            placeholder={`Search records...`}
            size="sm"
            variant="outline"
            mb={2}
        />
    );
}

export default DefaultColumnFilter;
