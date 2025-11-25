import React from "react";
import { Text as RNText } from "react-native";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// -----------------------------
// CONTEXTO PARA BUTTON
// -----------------------------
export const TextClassContext = React.createContext<string | undefined>(undefined);

// -----------------------------
// VARIANTES DE TEXTO (CVA)
// -----------------------------
const textVariants = cva("text-base text-foreground", {
  variants: {
variant: {
  default: "",
  title1: "text-4xl font-extrabold text-center",
  title2: "text-3xl font-semibold",
  title3: "text-2xl font-semibold",
  title4: "text-xl font-semibold",
  paragraph: "mt-3 leading-7",
  quote: "mt-4 border-l-4 pl-3 italic",
  code: "rounded bg-muted px-1 py-0.5 font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium",
  muted: "text-sm text-muted-foreground",
}
,
  },
  defaultVariants: {
    variant: "default",
  },
});

type TextVariantProps = VariantProps<typeof textVariants>;

// -----------------------------
// COMPONENTE <Text>
// -----------------------------
export function Text({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof RNText> & TextVariantProps) {
  
  const inheritedClass = React.useContext(TextClassContext);

  return (
    <RNText
      {...props}
      className={cn(
        textVariants({ variant }),
        inheritedClass, // ← Clase inyectada por el botón
        className
      )}
    >
      {children}
    </RNText>
  );
}
