'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, LogOut } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        // Implement logout logic here
        console.log('Logging out...')
    }

    const navigateToKanban = () => {
        router.push('/kanban')
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-gray-800">Task Orbit</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                Task Page
                            </Link>
                            <button
                                onClick={navigateToKanban}
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                Kanban Page
                            </button>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Logout
                        </Button>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <Menu className="h-6 w-6" aria-hidden="true" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link href="/">Task Page</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={navigateToKanban}>
                                    Kanban Page
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={handleLogout}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}