'use client';

import { Button } from '../button';

interface FormTabsProps {
    items: {
        label: string;
        value: string;
    }[];
    selectedItem?: string;
    onSelect: (value: string) => void;
}

export const FormTabs = ({ items, selectedItem, onSelect }: Readonly<FormTabsProps>) => {
    return (
        <div className="flex mb-2 gap-2 [&>*]:flex-1">
            {items.map((item) => (
                <Button
                    type="button"
                    key={item.value}
                    onClick={() => onSelect(item.value)}
                    variant={selectedItem === item.value ? 'default' : 'outline'}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
};
