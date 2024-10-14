import { Input } from "@chakra-ui/react";
import React from "react";

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <Input
            {...props}
            value={value} 
            onChange={e => setValue(e.target.value)}
        />
    );
}

function DefaultColumnFilter({ column }) {
    const columnFilterValue = column.getFilterValue()

    return (
        <DebouncedInput
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search records...`}
            size="sm"
            variant="outline"
            mb={2}
            value={(columnFilterValue ?? '').toString()} />
    );
}

export default DefaultColumnFilter;
