"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import TagList from "./TagList"

interface Option {
  value: string
  label: string
}

interface MultiSelectSearchProps {
  isEditing: boolean
  selectedValues?: string[]
  onSelectionChange?: (values: string[]) => void
  options: Option[]
  placeholder?: string
  icon?: React.ReactNode
  searchPlaceholder?: string
  emptyText?: string
}

export default function MultiSelectSearch({
  isEditing,
  selectedValues = [],
  onSelectionChange,
  options,
  placeholder = "Select options...",
  icon,
  searchPlaceholder = "Search...",
  emptyText = "No options found.",
}: MultiSelectSearchProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(selectedValues)

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]

    setSelected(newSelected)
    onSelectionChange?.(newSelected)
  }

  const handleRemove = (value: string) => {
    const newSelected = selected.filter((item) => item !== value)
    setSelected(newSelected)
    onSelectionChange?.(newSelected)
  }

  return (
    <div className="space-y-3">
      {isEditing && (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-auto min-h-[40px] px-3 py-2 bg-white hover:bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="text-gray-700">
                    {selected.length === 0
                      ? placeholder
                      : `${selected.length} selected`}
                  </span>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder={searchPlaceholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selected.includes(option.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {icon && <span className="mr-2">{icon}</span>}
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <TagList
            items={selected}
            onRemove={handleRemove}
            icon={icon}
          />
        </>
      )}

      {!isEditing && (
        <TagList
          items={selected}
          icon={icon}
        />
      )}
    </div>
  )
}
