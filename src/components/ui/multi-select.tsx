
import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export type OptionType = {
  value: string;
  label: string;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  className?: string;
  emptyIndicator?: React.ReactNode;
  maxItems?: number;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items",
  className,
  emptyIndicator,
  maxItems = 100,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  // Create a mapping of value to full option for easy access
  const optionsMap = options.reduce((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {} as Record<string, OptionType>);

  const getContrastColor = (hexColor?: string): string => {
    if (!hexColor || !/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
      return '#000000'; // Default to black for invalid or missing colors
    }
    
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white depending on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("min-h-10 h-auto", className)}
        >
          <div className="flex flex-wrap gap-1 py-1">
            {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
            {selected.length > 0 &&
              selected.slice(0, maxItems).map((item) => {
                const option = optionsMap[item];
                return (
                  <Badge 
                    key={item} 
                    variant="secondary"
                    className="flex items-center gap-1"
                    style={option?.color ? { 
                      backgroundColor: option.color,
                      color: getContrastColor(option.color)
                    } : undefined}
                  >
                    {option?.label || item}
                    <span
                      role="button"
                      tabIndex={0}
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(item)}
                    >
                      <X className="h-3 w-3 text-current" />
                    </span>
                  </Badge>
                );
              })}
            {selected.length > maxItems && (
              <Badge variant="secondary">+{selected.length - maxItems} more</Badge>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command className="w-full">
          <CommandInput placeholder="Search..." />
          <CommandEmpty>{emptyIndicator || "No items found."}</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            <ScrollArea className="h-[300px]">
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange(
                        isSelected
                          ? selected.filter((i) => i !== option.value)
                          : [...selected, option.value]
                      );
                    }}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {option.color && (
                        <div
                          className="h-4 w-4 rounded-full shrink-0"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      {option.icon && <option.icon className="h-4 w-4 shrink-0" />}
                      <span>{option.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
