'use client'

import { useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation

export default function excludeRoutesNavbar (path) {
    const pathname  = useRouter();
    return pathname
}