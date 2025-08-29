import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface FormDateRangePickerProps {
    field: {
        value: DateRange;
        onChange: (date: DateRange | undefined) => void;
    };
    /* Apply the `disabled` modifier to the matching days. */
    disabled?: (date: Date) => boolean;
}

const FormDateRangePicker = ({ field, disabled }: FormDateRangePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                            field.value.to ? (
                                <>
                                    {format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(field.value.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={{ from: field.value.from!, to: field.value.to }}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={disabled}
                />
            </PopoverContent>
        </Popover>
    );
};

export default FormDateRangePicker;
