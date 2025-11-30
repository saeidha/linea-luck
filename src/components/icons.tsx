import type { SVGProps } from "react";

export function LineaIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" fill="hsl(var(--primary) / 0.3)" stroke="none" />
            <path d="M9 9v6h6" stroke="hsl(var(--primary))" />
            <circle cx="15" cy="9" r="1" fill="hsl(var(--primary))" stroke="none" />
        </svg>
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
