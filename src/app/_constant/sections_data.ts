import {FileText, Users, Zap} from "lucide-react";

export interface HowItWorks {
    step: string
    title: string
    description: string
    icon: string
}

export const howItWorks: HowItWorks[] = [
    {
        step: "01",
        title: "Set up your account",
        description:
            "Create your organization profile, add departments, and customize settings to match your company structure.",
        icon: Users,
    },
    {
        step: "02",
        title: "Add your employees",
        description:
            "Import your employee data or add them manually. Set up roles, permissions, and reporting structures.",
        icon: FileText,
    },
    {
        step: "03",
        title: "Start managing",
        description:
            "Track attendance, process payroll, manage leave requests, and generate reports—all from one dashboard.",
        icon: Zap,
    },
]