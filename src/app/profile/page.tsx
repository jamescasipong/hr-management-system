"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideDark } from "@/contextComponent/SideDark";
import {
  Briefcase,
  Calendar,
  Edit,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function EmployeeProfile() {
  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }
  const { isSidebarOpen, toggleSidebar, theme, toggleDarkMode } = context;
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const [employee] = useState({
    name: "James Casipong",
    position: "Senior Software Engineer",
    department: "Engineering",
    eid: "EMP12345",
    email: "jamesxcasipong@gmail.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "2002-08-15",
    gender: "Male",
    address: "Quezon City, Philippines",
    emergencyContact: "+1 (555) 765-4321",
    education: [
      {
        degree: "Bachelor of Science in Information Technology",
        institution: "STI College Cubao",
        year: "2024",
      },
      {
        degree: "Information Communication & Computation Technology",
        institution: "STI College Cubao",
        year: "2020",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Next",
      "ASP.NET",
      "Tailwind",
      "Node.js",
      "Python",
      "Azure",
      "Docker",
    ],
    projects: ["HRConnect v1.0", "AM Monitoring", "Optinet"],
    achievements: ["Best in Thesis", "5 Years Service Award"],
    profilePicUrl: "https://avatars.githubusercontent.com/u/144509235?v=4",
  });

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}

      <main
        className={`flex-1 overflow-y-auto duration-200 ${
          isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
        }`}
      >
        <div
          className={`mx-auto py-6 sm:px-6  lg:px-8 p-5 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}
        >
          <h1 className="text-3xl font-bold mb-8 ">Employee Profile</h1>

          {/* Profile Overview */}
          <Card className="mb-8 dark:bg-gray-800">
            <CardContent className="flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={employee.profilePicUrl} alt={employee.name} />
                <AvatarFallback>
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <p className="text-muted-foreground">{employee.position}</p>
                <p className="text-muted-foreground">{employee.department}</p>
                <Badge variant="outline">EID: {employee.eid}</Badge>
              </div>
              <Button className="ml-auto">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 grid-cols-1 ">
            {/* Personal Information */}
            <Card className="mb-1 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Date of Birth: {employee.dateOfBirth}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Gender: {employee.gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Address: {employee.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span>Emergency Contact: {employee.emergencyContact}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-1 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Email: {employee.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Phone: {employee.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Employment Details */}
            <Card className="mb-1 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Position: {employee.position}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Department: {employee.department}</span>
                </div>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-2">Current Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {employee.projects.map((project, index) => (
                    <Badge key={index} variant="secondary">
                      {project}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="mb-1 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {employee.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}, {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills and Achievements */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Skills and Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {employee.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="dark:border-gray-700"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-2">Achievements</h4>
                <ul className="list-disc list-inside">
                  {employee.achievements.map((achievement, index) => (
                    <li key={index} className="text-muted-foreground">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
