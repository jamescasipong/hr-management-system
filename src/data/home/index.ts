import { Clock } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Shield } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Users } from "lucide-react";
import { Calendar } from "lucide-react";

const features = [
    {
      icon: Users,
      title: "Employee Management",
      description:
        "Centralize employee data, documents, and performance metrics in one secure location.",
    },
    {
      icon: Calendar,
      title: `Attendance Tracking `,
      description:
        "Monitor attendance, manage time-off requests, and track work hours effortlessly.",
    },
    {
      icon: Clock,
      title: "Time Management",
      description:
        "Track working hours, breaks, and overtime with automated calculations.",
    },
    {
      icon: DollarSign,
      title: "Payroll Integration",
      description:
        "Seamlessly process payroll with attendance data and compensation management.",
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description:
        "Stay compliant with labor laws and regulations with built-in compliance tools.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description:
        "Generate insightful reports on workforce metrics and organizational performance.",
    },
  ];

  type Plan = {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    limitations: string[];
    cta: string;
    popular: boolean;
  };

  export type PricingPlans = {
    monthly: Plan[];
    yearly: Plan[];
  };

  const pricingPlans: PricingPlans = {
    monthly: [
      {
        name: "Basic",
        price: `${1999}`,
        period: "per user/month",
        description: "Perfect for small businesses just getting started",
        features: [
          "Up to 25 employees",
          "Employee management",
          "Attendance tracking",
          "Basic reporting",
          "Email support",
          "Mobile app access",
        ],
        limitations: [
          "No payroll integration",
          "No custom workflows",
          "Limited analytics",
        ],
        cta: "Start Free Trial",
        popular: false,
      },
      {
        name: "Premium",
        price: `${4999}`,
        period: "per user/month",
        description: "Ideal for growing businesses with advanced needs",
        features: [
          "Up to 100 employees",
          "Everything in Basic",
          "Payroll integration",
          "Advanced reporting",
          "Custom workflows",
          "Priority support",
          "Performance management",
        ],
        limitations: ["Limited API access", "No white-labeling"],
        cta: "Start Free Trial",
        popular: true,
      },
      {
        name: "Enterprise",
        price: `${14999}`,
        period: "per user/month",
        description: "Tailored solutions for large organizations",
        features: [
          "Unlimited employees",
          "Everything in Premium",
          "Dedicated account manager",
          "Custom integrations",
          "Advanced security features",
          "White-labeling options",
          "Full API access",
          "24/7 priority support",
        ],
        limitations: [],
        cta: "Contact Sales",
        popular: false,
      },
    ],
    yearly: [
      {
        name: "Basic",
        price: `${1499}`,
        period: "per user/month, billed annually",
        description: "Perfect for small businesses just getting started",
        features: [
          "Up to 25 employees",
          "Employee management",
          "Attendance tracking",
          "Basic reporting",
          "Email support",
          "Mobile app access",
        ],
        limitations: [
          "No payroll integration",
          "No custom workflows",
          "Limited analytics",
        ],
        cta: "Start Free Trial",
        popular: false,
      },
      {
        name: "Premium",
        price: `${3749}`,
        period: "per user/month, billed annually",
        description: "Ideal for growing businesses with advanced needs",
        features: [
          "Up to 100 employees",
          "Everything in Basic",
          "Payroll integration",
          "Advanced reporting",
          "Custom workflows",
          "Priority support",
          "Performance management",
        ],
        limitations: ["Limited API access", "No white-labeling"],
        cta: "Start Free Trial",
        popular: true,
      },
      {
        name: "Enterprise",
        price: `${11249}`,
        period: "per user/month, billed annually",
        description: "Tailored solutions for large organizations",
        features: [
          "Unlimited employees",
          "Everything in Premium",
          "Dedicated account manager",
          "Custom integrations",
          "Advanced security features",
          "White-labeling options",
          "Full API access",
          "24/7 priority support",
        ],
        limitations: [],
        cta: "Contact Sales",
        popular: false,
      },
    ],
  };

  const testimonials = [
    {
      quote:
        "HRConnect has transformed how we manage our workforce. The time saved on administrative tasks alone has been worth the investment.",
      author: "Sarah Johnson",
      position: "HR Director",
      company: "TechNova Inc.",
    },
    {
      quote:
        "The attendance tracking and payroll integration features have eliminated so many errors and saved us countless hours every month.",
      author: "Michael Chen",
      position: "Operations Manager",
      company: "Elevate Solutions",
    },
    {
      quote:
        "As a fast-growing startup, we needed an HR system that could scale with us. HRConnect has been the perfect solution for our evolving needs.",
      author: "Jessica Williams",
      position: "Founder & CEO",
      company: "Momentum Ventures",
    },
  ];

  const faqs = [
    {
      question: "How long is the free trial period?",
      answer:
        "Our free trial lasts for 14 days, giving you ample time to explore all the features and benefits of HRConnect. No credit card is required to start your trial.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "You can upgrade or downgrade your plan at any time. If you upgrade, the new features will be immediately available. If you downgrade, the changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Is my data secure with HRConnect?",
      answer:
        "Yes, we take data security very seriously. HRConnect uses bank-level encryption, regular security audits, and follows industry best practices to ensure your sensitive HR data remains protected.",
    },
    {
      question: "Do you offer custom integrations?",
      answer:
        "Yes, our Premium and Enterprise plans offer various integration options with popular business tools. For custom integrations specific to your organization's needs, our Enterprise plan includes tailored solutions.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All plans include email support. Premium users get priority support with faster response times, while Enterprise customers enjoy 24/7 priority support and a dedicated account manager to assist with any issues or questions.",
    },
  ];


  const MobileMenu = [
    {
      title: "Features",
      href: "#features",
    },
    {
      title: "How It Works",
      href: "#how-it-works",
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
  ]


export { features, pricingPlans, testimonials, faqs, MobileMenu };