"use client"

import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * react-day-picker v9 styled with the app tokens (no library stylesheet): hover = primary/10,
 * selection = primary, range middle = primary/10, today = bold primary text.
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-3",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8"),
        button_next: cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8"),
        month_caption: "flex h-8 items-center justify-center text-sm font-semibold",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-[0.75rem] font-normal text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button:
          "inline-flex size-9 items-center justify-center rounded-md transition-colors outline-none hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        range_start: "rounded-s-md bg-primary/10",
        range_end: "rounded-e-md bg-primary/10",
        range_middle:
          "rounded-none bg-primary/10 [&>button]:bg-transparent [&>button]:text-foreground [&>button]:hover:bg-primary/20 [&>button]:hover:text-foreground",
        today: "[&>button]:font-bold [&:not([aria-selected=true])>button]:text-primary",
        outside: "text-muted-foreground opacity-50",
        disabled: "opacity-40 [&>button]:pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  )
}

export { Calendar }
