"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowLeft,
  ExternalLink,
  Code,
  Check,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "../../components/header";

// Mock data for integrations
const integrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications and updates to Slack channels",
    category: "communication",
    logo: "/placeholder.svg?height=60&width=60&text=Slack",
    popular: true,
    setupDifficulty: "easy",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync leave and events with Google Calendar",
    category: "productivity",
    logo: "/placeholder.svg?height=60&width=60&text=GCal",
    popular: true,
    setupDifficulty: "easy",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Integrate with Microsoft Teams for communication",
    category: "communication",
    logo: "/placeholder.svg?height=60&width=60&text=Teams",
    popular: false,
    setupDifficulty: "medium",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Sync payroll data with QuickBooks",
    category: "finance",
    logo: "/placeholder.svg?height=60&width=60&text=QB",
    popular: true,
    setupDifficulty: "medium",
  },
  {
    id: "xero",
    name: "Xero",
    description: "Connect your Xero accounting software",
    category: "finance",
    logo: "/placeholder.svg?height=60&width=60&text=Xero",
    popular: false,
    setupDifficulty: "medium",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Schedule and manage Zoom meetings",
    category: "productivity",
    logo: "/placeholder.svg?height=60&width=60&text=Zoom",
    popular: false,
    setupDifficulty: "easy",
  },
  {
    id: "gsuite",
    name: "Google Workspace",
    description: "Integrate with Google Workspace for user management",
    category: "productivity",
    logo: "/placeholder.svg?height=60&width=60&text=GWS",
    popular: true,
    setupDifficulty: "medium",
  },
  {
    id: "azure-ad",
    name: "Azure Active Directory",
    description: "Single sign-on and user provisioning with Azure AD",
    category: "authentication",
    logo: "/placeholder.svg?height=60&width=60&text=Azure",
    popular: false,
    setupDifficulty: "hard",
  },
  {
    id: "okta",
    name: "Okta",
    description: "Identity management and single sign-on with Okta",
    category: "authentication",
    logo: "/placeholder.svg?height=60&width=60&text=Okta",
    popular: false,
    setupDifficulty: "hard",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect HRConnect with 3,000+ apps",
    category: "automation",
    logo: "/placeholder.svg?height=60&width=60&text=Zapier",
    popular: true,
    setupDifficulty: "medium",
  },
  {
    id: "bamboo-hr",
    name: "BambooHR",
    description: "Sync employee data with BambooHR",
    category: "hr",
    logo: "/placeholder.svg?height=60&width=60&text=Bamboo",
    popular: false,
    setupDifficulty: "medium",
  },
  {
    id: "adp",
    name: "ADP",
    description: "Integrate with ADP for payroll processing",
    category: "finance",
    logo: "/placeholder.svg?height=60&width=60&text=ADP",
    popular: true,
    setupDifficulty: "hard",
  },
  {
    id: "workday",
    name: "Workday",
    description: "Integrate with Workday for comprehensive HR management",
    category: "hr",
    logo: "/placeholder.svg?height=60&width=60&text=Workday",
    popular: false,
    setupDifficulty: "hard",
  },
];

export default function IntegrationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Filter integrations based on search query, category, and difficulty
  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || integration.category === activeCategory;

    const matchesDifficulty =
      difficultyFilter === "all" ||
      integration.setupDifficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get popular integrations
  const popularIntegrations = integrations.filter(
    (integration) => integration.popular
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header mobileMenu={false}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              HR
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Connect
            </span>
          </Link>
        </div>
        <div className="sm:flex hidden items-center space-x-4">
          <Link href="/documentation">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
          </Link>
          <Link href="/api-status">
            <Button variant="ghost" size="sm">
              API Status
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button variant="ghost" size="sm">
              Contact Us
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>
      </Header>

      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-blue-100 hover:text-white mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Integrations
              </h1>
              <p className="mt-2 text-xl text-blue-100">
                Connect HRConnect with your favorite tools and services
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/documentation/api">
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  API Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Setup Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="hr">HR</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Popular Integrations */}
        {activeCategory === "all" &&
          difficultyFilter === "all" &&
          searchQuery === "" && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Popular Integrations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularIntegrations.slice(0, 3).map((integration) => (
                  <Card
                    key={integration.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <img
                        src={integration.logo || "/placeholder.svg"}
                        alt={integration.name}
                        className="w-12 h-12 rounded-md"
                      />
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription>
                          {integration.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                        >
                          {integration.category
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            integration.setupDifficulty === "easy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : ""
                          }
                          ${
                            integration.setupDifficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : ""
                          }
                          ${
                            integration.setupDifficulty === "hard"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : ""
                          }
                        `}
                        >
                          {integration.setupDifficulty.charAt(0).toUpperCase() +
                            integration.setupDifficulty.slice(1)}{" "}
                          Setup
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/integration/${integration.id}`}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full">
                          View Integration
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

        {/* All Integrations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {activeCategory === "all"
              ? "All Integrations"
              : activeCategory
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") + " Integrations"}
          </h2>

          {filteredIntegrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <img
                      src={integration.logo || "/placeholder.svg"}
                      alt={integration.name}
                      className="w-12 h-12 rounded-md"
                    />
                    <div>
                      <CardTitle>{integration.name}</CardTitle>
                      <CardDescription>
                        {integration.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                      >
                        {integration.category
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            integration.setupDifficulty === "easy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : ""
                          }
                          ${
                            integration.setupDifficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : ""
                          }
                          ${
                            integration.setupDifficulty === "hard"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : ""
                          }
                        `}
                      >
                        {integration.setupDifficulty.charAt(0).toUpperCase() +
                          integration.setupDifficulty.slice(1)}{" "}
                        Setup
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/integration/${integration.id}`}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        View Integration
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Code className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No integrations found
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>

        {/* API Integration Section */}
        <div className="mt-16">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Custom API Integration
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Need a custom integration? HRConnect provides a comprehensive
                  API that allows you to build your own integrations with any
                  service or tool.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <Link href="/documentation/api">
                    <Button>
                      API Documentation
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact-us">
                    <Button variant="outline">
                      Contact for Custom Integration
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Benefits */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Benefits of Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Streamlined Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect your HR processes with other business tools to create
                  seamless workflows and eliminate manual data entry.
                </p>
                <div className="mt-4">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Reduce duplicate data entry
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Automate routine tasks
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Improve team productivity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Keep your team informed with automated notifications and
                  updates through their preferred communication channels.
                </p>
                <div className="mt-4">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Automated notifications
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Real-time updates
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Centralized communication
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Ensure data consistency across all your systems with automated
                  synchronization and validation.
                </p>
                <div className="mt-4">
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Synchronized data
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Reduced errors
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      Single source of truth
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Integration Support */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help with Integrations?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our team is ready to assist you with setting up integrations or
            building custom solutions for your specific needs.
          </p>
          <div className="mt-6">
            <Link href="/contact-us">
              <Button size="lg">Contact Integration Support</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
