import type { HTMLAttributes, ReactNode } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/**
 * Renderizado nativo y fluido: todo el contenido es 100% visible desde el primer
 * milisegundo, eliminando el efecto de "carga a pedazos" durante el scroll.
 */
export default function Reveal({ children, delay, y, className = "", ...rest }: RevealProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
