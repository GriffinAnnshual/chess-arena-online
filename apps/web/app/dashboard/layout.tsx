import { FloatingNav } from "@/components/ui/nav-bar"

const navItems = [
    {
        name: "Home",
        link: "/dashboard"
    }, {
        name: "Settings",
        link: "/settings"
    }, {
        name: "Rooms",
        link: "/rooms-area"
    }
]

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return (
        <div className="w-full h-[100vh]">
            <div>
                <FloatingNav navItems={navItems}/>
            </div>
            {children}
        </div>
    )
}