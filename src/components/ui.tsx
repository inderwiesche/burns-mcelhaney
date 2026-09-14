import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-11",
  {
    variants: {
      variant: {
        solid: "bg-forest text-paper hover:bg-pine",
        invert: "bg-paper text-pine hover:bg-sage",
        outline: "border border-line-strong bg-transparent text-ink hover:bg-paper",
        ghost: "text-ink hover:bg-paper",
        invertOutline: "border border-paper/30 bg-transparent text-paper hover:bg-paper/10",
      },
      size: {
        md: "rounded-md px-5 text-sm",
        lg: "rounded-lg px-6 text-base",
        sm: "rounded-sm px-3.5 text-sm min-h-10",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3.5 text-base text-ink shadow-[var(--shadow-border)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-forest focus:ring-2 focus:ring-forest/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-base text-ink shadow-[var(--shadow-border)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus:border-forest focus:ring-2 focus:ring-forest/20",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("mb-1.5 block text-sm font-medium text-ink-soft", className)} {...props} />
  );
}

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
