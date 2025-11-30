import type { SVGProps } from "react";
import Image from "next/image";

export function LineaIcon(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
    return (
        <Image src="/assets/Linea-Token_Round.png" alt="Linea Token" {...props} />
    )
}

export function AtbIcon(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
    return (
        <Image src="/assets/Linea-Luck.png" alt="Linea Luck" width={512} height={512} {...props} />
    )
}
