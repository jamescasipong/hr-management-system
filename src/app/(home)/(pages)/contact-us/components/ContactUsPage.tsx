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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";



export default function ContactUsPage() {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 border-b-[1px] dark:border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
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
          <div className="flex items-center space-x-4">
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
            <Link href="/guides">
              <Button variant="ghost" size="sm">
                Guides
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-blue-100">
            We're here to help. Reach out to our team with any questions or
            feedback.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through various channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Email
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        support@hrconnect.com
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Phone
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Monday to Friday, 9AM to 6PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Live Chat
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Available for Premium plans
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        24/7 support for urgent issues
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Office Location</CardTitle>
                  <CardDescription>Visit our headquarters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Address
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        123 Tech Park Avenue
                        <br />
                        Suite 456
                        <br />
                        San Francisco, CA 94107
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                  <CardDescription>Follow us on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-around">
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      <Github className="h-6 w-6" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                      Thank you for contacting us!
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      We've received your message and will get back to you
                      within 24 hours.
                    </p>
                    <div className="mt-6">
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            category: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="general">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="general">General Inquiry</TabsTrigger>
                      <TabsTrigger value="support">
                        Technical Support
                      </TabsTrigger>
                      <TabsTrigger value="sales">Sales</TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john.doe@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="How can we help you?"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              handleSelectChange("category", value)
                            }
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <TabsContent value="general">
                                <SelectItem value="product-info">
                                  Product Information
                                </SelectItem>
                                <SelectItem value="feedback">
                                  Feedback
                                </SelectItem>
                                <SelectItem value="partnership">
                                  Partnership
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </TabsContent>
                              <TabsContent value="support">
                                <SelectItem value="account">
                                  Account Issues
                                </SelectItem>
                                <SelectItem value="bug">Bug Report</SelectItem>
                                <SelectItem value="feature">
                                  Feature Request
                                </SelectItem>
                                <SelectItem value="api">
                                  API Questions
                                </SelectItem>
                              </TabsContent>
                              <TabsContent value="sales">
                                <SelectItem value="pricing">
                                  Pricing Questions
                                </SelectItem>
                                <SelectItem value="demo">
                                  Request Demo
                                </SelectItem>
                                <SelectItem value="enterprise">
                                  Enterprise Plan
                                </SelectItem>
                                <SelectItem value="upgrade">
                                  Upgrade Account
                                </SelectItem>
                              </TabsContent>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Please provide as much detail as possible..."
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Tabs>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      What are your support hours?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our standard support hours are Monday to Friday, 9AM to
                      6PM EST. Premium and Enterprise plans have access to
                      extended support hours.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      How quickly will I receive a response?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We aim to respond to all inquiries within 24 hours.
                      Technical support tickets are prioritized based on
                      severity and plan level.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Do you offer phone support?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Phone support is available for Premium and Enterprise
                      plans. Standard plans have access to email and
                      ticket-based support.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link href="/documentation#faq">
                      <Button variant="outline" className="w-full">
                        View All FAQs
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
