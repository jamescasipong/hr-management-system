"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  X,
  ChevronRight,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Shield,
  BarChart3,
  FileText,
  Zap,
  ArrowRight,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import {
  Header,
  HeaderItem,
  HeaderLink,
  HeaderLinks,
} from "../../components/header";
import {
  features,
  pricingPlans,
  testimonials,
  faqs,
  MobileMenu,
  PricingPlans,
} from "@/data/home/index";
import Hero from "./components/hero";

export default function HomePage() {
  const [enabled, setEnabled] = useState(false);
  const [currency, setCurrency] = useState<any>("default");
  const [loading, setLoading] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(0);
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const instanceAxios = axios.create({
    baseURL:
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    setLoading(true);
    const fetchCurrency = async () => {
      setLoading(true);
      const response = await instanceAxios.get(
        "http://ip-api.com/json/?fields=currency",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCurrency(response.data.currency.toLowerCase());
    };

    fetchCurrency();

    setLoading(false);
  });

  useEffect(() => {
    setLoading(true);

    if (currency !== "default") {
      const fetchCountry = async () => {
        const response = await instanceAxios.get(`php.json`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setCurrencyValue(response.data["php"][currency]);
        console.log("currencyValue", response.data["php"][currency]);
      };
      fetchCountry();
      setLoading(false);
    }
  }, [currency]);

  console.log(currencyValue);

  const mobileMenu = () => {
    return (
      <div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* {MobileMenu.map((item, index) => (
            <HeaderLink key={index} href={item.href}>
              {item.title}
            </HeaderLink>
          )
          )} */}
          {<HeaderLinks data={MobileMenu}></HeaderLinks>}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-5 space-x-3">
            <Link
              href="/signin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-center"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 w-full text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
      {/* Navigation */}
      <Header mobileMenu={enabled} menu={mobileMenu()}>
        <HeaderItem className="flex items-center">
          <HeaderLink href="/" className="flex-shrink-0 flex items-center px-0">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              HR
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Connect
            </span>
          </HeaderLink>
          <div className="hidden md:ml-10 md:flex md:space-x-8">
            {[
              ["Features", "#features"],
              ["How It Works", "#how-it-works"],
              ["Pricing", "#pricing"],
              ["Q&A", "#qna"],
            ].map((item, index) => (
              <HeaderLink title={item[1]} key={index} href={item[1]}>
                {item[0]}
              </HeaderLink>
            ))}
          </div>
        </HeaderItem>
        <HeaderItem className="flex items-center">
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* <ModeToggle /> */}
            <Link href="/signin">
              <Button>Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:blue-600 dark:hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEnabled((prev) => !prev);
              }}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </HeaderItem>
      </Header>

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  Introducing HRConnect
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900 dark:text-white">
                    Simplify Your
                  </span>
                  <span className="block text-blue-600 dark:text-blue-400">
                    HR Management
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Streamline your HR processes, boost employee productivity, and
                make data-driven decisions with our comprehensive HR management
                platform.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <form className="mt-3 sm:flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-md px-5 py-3 w-full sm:max-w-xs border dark:border-gray-700"
                  />
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button className="w-full flex items-center justify-center px-5 py-3">
                      Get Started
                    </Button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                  {/* <img
                    className="w-full"
                    src="/placeholder.svg?height=400&width=600"
                    alt="HRConnect Dashboard Preview"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <Button
                      variant="outline"
                      className="bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 hover:bg-white dark:hover:bg-gray-800"
                    >
                      Watch Demo
                    </Button>
                  </div> */}

                  <Hero/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Trusted by companies worldwide
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-center">
                  <img
                    className="h-8 md:h-12"
                    src={`/placeholder.svg?height=48&width=120&text=LOGO ${i}`}
                    alt={`Company ${i} logo`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage your workforce
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              HRConnect provides a comprehensive suite of tools to streamline
              your HR operations and enhance employee experience.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg p-6 feature-card border-[1px] border-gray-300 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md feature-icon text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-500 dark:text-gray-300 flex-grow">
                    {feature.description}
                  </p>
                  {/* <div className="mt-4">
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 inline-flex items-center"
                    >
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Simple, intuitive, and powerful
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Get up and running in minutes with our easy-to-use platform
              designed for HR professionals.
            </p>
          </div>

          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {[
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
              ].map((item, index) => (
                <div key={index} className="mt-10 lg:mt-0">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white text-center">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="px-8">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Pricing
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Plans for businesses of all sizes
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day
              free trial.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="relative self-center rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 flex">
              <button
                type="button"
                className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none px-8 ${
                  billingPeriod === "monthly"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly billing
              </button>
              <button
                type="button"
                className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none px-8 ${
                  billingPeriod === "yearly"
                    ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setBillingPeriod("yearly")}
              >
                Yearly billing
                <span className="absolute -top-2 -right-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Save 25%
                  </Badge>
                </span>
              </button>
            </div>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
            {pricingPlans[billingPeriod as keyof PricingPlans].map(
              (plan: any, index: number) => (
                <Card
                  key={index}
                  className={`flex flex-col rounded-lg shadow-lg overflow-hidden pricing-card dark:border-gray-700 ${
                    plan.popular ? "pricing-popular" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="px-4 py-1 pricing-popular-badge text-center text-sm font-medium dark:bg-blue-600 bg-blue-600 text-white">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="bg-white dark:bg-gray-800 px-6 py-8 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                      <span className="text-4xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-lg font-medium">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription className="mt-5 text-lg text-gray-500 dark:text-gray-300">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 px-6 pt-6 pb-8 bg-gray-50 dark:bg-gray-700 space-y-6 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      {plan.features.map(
                        (feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-400" />
                            </div>
                            <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                              {feature}
                            </p>
                          </li>
                        )
                      )}
                      {plan.limitations.map(
                        (limitation: string, limitIndex: number) => (
                          <li key={limitIndex} className="flex items-start">
                            <div className="flex-shrink-0">
                              <X className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="ml-3 text-base text-gray-500 dark:text-gray-400">
                              {limitation}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-6 pt-0 pb-8 bg-gray-50 dark:bg-gray-700">
                    <Button
                      onClick={() => (window.location.href = "/free-trial")}
                      className={`w-full ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          : ""
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Trusted by HR professionals worldwide
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              See what our customers have to say about HRConnect.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg testimonial-card">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/placeholder.svg?height=40&width=40"
                        alt={testimonial.author}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="qna" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Q&A
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Question and Answers
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Find answers to common questions about HRConnect.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 border-[1px] dark:border-gray-700">
                {[
                  ["tab1", "General"],
                  ["tab2", "Pricing"],
                  ["tab3", "Pricing"],
                ].map(([tab, name], index) => (
                  <TabsTrigger key={index} value={tab} className="">
                    {name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="tab1" className="mt-6">
                <div className="space-y-8">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tab2" className="mt-6">
                <div className="space-y-8">
                  {faqs.slice(1, 4).map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="tab3" className="mt-6">
                <div className="space-y-8">
                  {faqs.slice(2, 5).map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">
              Ready to streamline your HR processes?
            </span>
            <span className="block text-blue-200">
              Start your free trial today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get started
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button
                variant="outline"
                className="border-0 dark:border-gray-700 "
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
