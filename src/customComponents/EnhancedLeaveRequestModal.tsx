"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { Calendar } from "../components/ui/calendar";

export default function EnhancedLeaveRequestModal({
  vacation,
  sick,
}: {
  vacation: number;
  sick: number;
}) {
  const [requestType, setRequestType] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [open, onClose] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", {
      requestType,
      startDate,
      endDate,
      startTime,
      endTime,
      reason,
    });

    onClose(false);
    // You would typically send this data to your backend here
  };

  const onSubmit = (e:any) => {
    e.preventDefault();
    if (requestType === "vacation" || requestType === "sick") {
      if (!startDate || !endDate) {
        alert("Please select a start and end date.");
        return;
      }

      alert("Vacation submitted successfully!");
    } else if (requestType === "ot") {
      if (!startTime || !endTime) {
        alert("Please select a start and end time.");
        return;
      }

      alert("OT submitted successfully!");
    }
    else if (requestType === "coa") {
      if (!startTime || !endTime) {
        alert("Please select a start and end time.");
        return;
      }

      
      console.log({
        requestType,
        startDate: startDate?.toISOString(),
        endDate,
        startTime,
        endTime,
        reason,
      })
    }
    if (!reason) {
      alert("Please enter a reason for your request.");
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="font-medium  sm:text-[14px] text-xs">
          Request
          <span className="sm:flex hidden "> Leave/OT</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]  sm:w-full max-h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-md ">
            Request Leave or OT
          </DialogTitle>
          <DialogDescription className="sm:text-lg text-sm">
            Fill out this form to request leave, overtime, or a certificate of
            attendance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6 ">
          <Card className="">
            <CardContent className="pt-6 gap-0">
              <div className="grid gap-6">
                <div className="sm:grid-cols-4 grid grid-cols-1  items-center gap-4">
                  <Label
                    htmlFor="request-type"
                    className="sm:text-right text-start  sm:text-lg text-sm"
                  >
                    Request Type
                  </Label>
                  <Select onValueChange={setRequestType} required>
                    <SelectTrigger className=" col-span-3 h-12 sm:text-lg text-sm">
                      <SelectValue
                        className="sm:text-lg text-sm "
                        placeholder="Select request type"
                      />
                    </SelectTrigger>
                    <SelectContent className=" sm:text-lg text-sm">
                      <SelectItem
                        className=""
                        value="vacation"
                      >
                        Vacation Leave
                      </SelectItem>
                      <SelectItem
                        className=""
                        value="sick"
                      >
                        Sick Leave
                      </SelectItem>
                      <SelectItem className="" value="ot">
                        Overtime (OT)
                      </SelectItem>
                      <SelectItem
                        className=""
                        value="coa"
                      >
                        Certificate of Attendance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4">
                  <Label
                    htmlFor="start-date"
                    className="sm:text-right text-start sm:text-lg text-sm"
                  >
                    Start Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3  h-12 justify-start text-left sm:text-lg text-sm font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {(requestType === "vacation" || requestType === "sick") && (
                  <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4">
                    <Label
                      htmlFor="end-date"
                      className="sm:text-right text-start sm:text-lg text-sm"
                    >
                      End Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "col-span-3 h-12 justify-start  text-left sm:text-lg text-sm font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}

                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                {requestType === "ot" && (
                  <>
                    <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4">
                      <Label
                        htmlFor="start-time"
                        className="sm:text-right text-start sm:text-lg text-sm"
                      >
                        Start Time
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <Clock className="mr-2 h-5 w-5 " />
                        <Input
                          id="start-time"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="h-12 sm:text-lg text-sm "
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4">
                      <Label
                        htmlFor="end-time"
                        className="sm:text-right text-start sm:text-lg text-sm"
                      >
                        End Time
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        <Input
                          id="end-time"
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="h-12 sm:text-lg text-sm "
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                {requestType === "coa" &&  <><div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4">
                      <Label
                        htmlFor="start-time"
                        className="sm:text-right text-start sm:text-lg text-sm"
                      >
                        Start Time
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <Clock className="mr-2 h-5 w-5 " />
                        <Input
                          id="start-time"
                          type="time"
                          disabled
                          value={startTime}
                          className="h-12 sm:text-lg text-sm "
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-4 grid-cols-1 items-center gap-4">
                      <Label
                        htmlFor="end-time"
                        className="sm:text-right text-start sm:text-lg text-sm"
                      >
                        End Time
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        <Input
                          id="end-time"
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="h-12 sm:text-lg text-sm "
                          required
                        />
                      </div>
                    </div></>}
                <div className="grid sm:grid-cols-4 grid-cols-1  items-start gap-4">
                  <Label
                    htmlFor="reason"
                    className="sm:text-right text-start sm:text-lg text-sm pt-2"
                  >
                    Reason
                  </Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="col-span-3 h-32 sm:text-lg text-sm"
                    placeholder="Enter reason for request"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between items-center">
            <div className="space-x-2 ">
              <Badge
                variant="outline"
                className="py-1 sm:text-[15px] text-[9px]"
              >
                Remaining Vacation Hours: {vacation.toString()}
              </Badge>
              <Badge
                variant="outline"
                className="py-1 sm:text-[15px] text-[9px]"
              >
                Remaining Sick Hours: {sick.toString()}
              </Badge>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className=""
              >
                Submit<span className="sm:block hidden"> Request</span>
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
