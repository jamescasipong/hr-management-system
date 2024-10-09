import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Switch } from "./switch";



const Modal = ({ name }: { name: string }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const profilePicUrl = "https://example.com/profile.jpg"; // Replace with actual URL
  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle profile picture change
  };

  return (
    <div>
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogTrigger asChild>
            <div className="py-2 px-4 bg-gray-800 hover:bg-gray-700 transition-all duration-200 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md cursor-pointer">{name}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              View and update your profile information
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger value="profile">My Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profilePicUrl} alt="Profile" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="picture"
                    className="cursor-pointer dark:bg-blue-500 dark:text-white bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-3 rounded-md"
                  >
                    Upload Picture
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="James Casipong" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="jamesxcasipong@gmail.com" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="w-full dark:bg-blue-500 text-white">
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                    className="w-full dark:bg-blue-500 text-white"
                  >
                    View Complete Profile
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifications">Notifications</Label>
                  <div className="flex items-center space-x-2 ">
                    <Switch id="notifications" className="dark:bg-blue-500" />
                    <Label htmlFor="notifications">
                      Receive email notifications
                    </Label>
                  </div>
                </div>
                <Button className="w-full dark:bg-blue-500 text-white">
                  Save Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
