import type { SVGProps } from "react";

export function LineaIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6 3v18" />
            <path d="M6 9l6-6 6 6" />
            <path d="M6 21l6-6 6 6" />
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
