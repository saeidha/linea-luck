import type { SVGProps } from "react";
import Image from "next/image";

export function LineaIcon(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
    return (
        <Image src="/assets/Linea-Token_Round.png" alt="Linea Token" {...props} />
    )
}

export function AtbIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="m14.31 8 5.74 9.94" />
            <path d="m9.69 8-5.74 9.94" />
            <path d="M2 12h20" />
        </svg>
    )
}
