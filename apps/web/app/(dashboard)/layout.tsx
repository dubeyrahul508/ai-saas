import { AuthGuard } from "@/modules/auth/ui/components/auth-gaurd"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-gaurd"


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthGuard>
            <OrganizationGuard>{children}</OrganizationGuard>
        </AuthGuard>
    )
}
