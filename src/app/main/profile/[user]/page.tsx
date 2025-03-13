"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideDark } from "@/contextComponent/SideDark";
import { Input } from "@/components/ui/input";
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
import { useCallback, useContext, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import instanceApi from "@/api/auth";
import { set } from "date-fns";

type ApiResponse<Data extends object> = {
  sucess: boolean;
  message: string;
  data: Data;
};

type EducationBackgroundType = {
  id: number;
  userId: number;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: number;
};

type AboutEmployeeType = {
  employeeId: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  address: string;
  age: number;
  birthDate: string;
  educationBackground: EducationBackgroundType[];
};

type DepartmentType = {
  departmentId: number;
  managerId: number;
  deptName: string;
};

type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  isAdmin: boolean;
  status: "Online" | "Offline";
  createdAt: string;
  updatedAt: string;
  supervisorId?: string;
  departmentId?: string;
  aboutEmployee: AboutEmployeeType;
  department: DepartmentType;
};

type EmployeeResponse = ApiResponse<EmployeeType>;

type Params = {
  params: {
    user: string;
  }
}

export default function EmployeeProfile({
  params,
}: Params) {
  const context = useContext(SideDark);
  if (!context) {
    throw new Error("SideDark context is undefined");
  }
  const { isSidebarOpen, toggleSidebar } = context;
  const [employee, setEmployee] = useState<EmployeeType | null>(null);
  const [education, setEducation] = useState<EducationBackgroundType[]>();
  const [aboutMe, setAboutMe] = useState<AboutEmployeeType | null>(null);
  const [department, setDepartment] = useState<DepartmentType | null>(null);
  const [edit, setEdit] = useState(false);
  const [countApiRequest, setCountApiRequest] = useState(0);
  const router = useRouter();
  const [loading, startTransitioning] = useTransition();

  useEffect(() => {
    // Fetch employee data from API
    const fetchEmployee = async () => {

      startTransitioning(async () => {
        if (!params.user) return;

      if (params.user === "me") {
        try {
          const response = await instanceApi.get("employee/me");
          setCountApiRequest((countApiRequest) => countApiRequest + 1);

          if (response.status === 200) {
            const responseData = (await response.data) as EmployeeResponse;
            const employee = responseData.data as EmployeeType;
            const aboutMe = employee.aboutEmployee;
            const department = employee.department;
            setAboutMe(aboutMe);
            setDepartment(department);
            setEmployee(employee);
            setEducation(aboutMe.educationBackground);
          }

        } catch (error: any) {
          console.error(error.response.data);
        }
      } else {
        try {
          const response = await instanceApi.get(`employee/${params.user}`);

          if (response.status === 200) {
            const { data } = response as EmployeeResponse;
            // Handle the data as needed
          }

          if (response.status === 404) {
            router.push("/404");
            console.error("Employee not found");
          }
        } catch (error: any) {
          console.error(error);
        }
      }
      })
      
    };

    fetchEmployee();
  }, [params.user, router]);


  const handleEdit = useCallback(() => {
    setEdit((prev) => !prev);
    if (edit){
      setEmployee((prev) => {
        if (prev) {
          return {
            ...prev,
            firstName: "New Name",
          };
        }
        return prev;
      });
    }
  }, []);

  return loading ? (
    <main
      className={`flex-1 overflow-y-auto duration-200 ${
        isSidebarOpen ? "sm:ml-64 ml-0 " : "ml-0"
      }`}
    >
      <div
        className={`mx-auto py-6 sm:px-6  lg:px-8 p-2 ${
          isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          <div className="loader">Loading...</div>
        </div>
      </div>
    </main>
  ) : (
    <div className="flex min-h-screen bg-background w-full justify-center">
      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto duration-200`}
      >
        <div
          className={`mx-auto py-6 sm:px-6  lg:px-8 p-2`}
        >
          <h1 className="text-3xl font-bold sm:mb-8 mb-4 sm:text-start text-center">
            Employee Profile
          </h1>

          {/* Profile Overview */}
          {employee && (
            <Card className="sm:mb-8 mb-6">
              <CardContent className="flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-32 h-32 rounded-full">
                  <AvatarImage
                    src="https://www.gravatar.com/avatar"
                    alt={employee.firstName}
                  />
                  <AvatarFallback>{employee["lastName"][0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center md:text-left">
                  {edit ? (
                    <Input
                      type="text"
                      className="text-secondary"
                      placeholder="First Name"
                      onChange={(e) => setEmployee((prev) => {
                        if (prev) {
                          return {
                            ...prev,
                            firstName: e.target.value,
                          };
                        }
                        return prev;
                      })}
                      defaultValue={employee.firstName}
                    />
                  ) : (
                    <h2 className="text-xl font-semibold">
                      {employee.firstName}
                    </h2>
                  )}
                  <p className="text-muted-foreground">{employee.position}</p>
                  <p className="text-muted-foreground">
                    {employee.departmentId}
                  </p>
                  <Badge variant="outline">EID: {employee.id}</Badge>
                </div>
                {edit ? (
                  <Button
                    onClick={handleEdit}
                    className="ml-auto"
                  >
                    <Edit className="mr-2 h-4 w-4 " /> Save Changes
                  </Button>
                ) : (
                  <Button onClick={handleEdit} className="ml-auto">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 sm:gap-6 gap-2 grid-cols-1 ">
            {/* Personal Information */}
            {employee && (
              <Card className="mb-1 ">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Date of Birth: {aboutMe?.birthDate ?? "XD"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Gender: Male</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Address: {aboutMe?.address ?? "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>Emergency Contact: N/A</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            {employee && (
              <Card className="mb-1">
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
                    <span>Phone: N/A</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Employment Details */}
            {employee && (
              <Card className="mb-1">
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
                    <span>
                      Department:{" "}
                      {department ? department.deptName : "No department"}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <h4 className="font-semibold mb-2">Current Projects</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* {employee.projects.map((project, index) => (
                        <Badge key={index} variant="secondary">
                          {project}
                        </Badge>
                      ))} */}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {employee && (
              <Card className="mb-1">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education?.map((edu: any, index: number) => (
                    <div key={edu.id} className="flex items-start space-x-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.institutionName}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Skills and Achievements */}
            {employee && (
              <Card className="">
                <CardHeader>
                  <CardTitle>Skills and Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* {employee.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="dark:border-gray-700"
                        >
                          {skill}
                        </Badge>
                      ))} */}
                  </div>
                  <Separator className="my-4" />
                  <h4 className="font-semibold mb-2">Achievements</h4>
                  <ul className="list-disc list-inside">
                    {/* {employee.achievements.map((achievement, index) => (
                        <li key={index} className="text-muted-foreground">
                          {achievement}
                        </li>
                      ))} */}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
