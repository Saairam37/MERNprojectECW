"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

export default function ShoppingAccount() {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast(); // Use the toast function

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "https://mernprojectecw.onrender.com/api/auth/profile-update",
        {
          userId: user?.id,
          userName: name,
          email: email,
        }
      );
      console.log("Profile updated:", response.data);

      setOpen(false); // Close the dialog

      toast({
        title: "Profile updated!",
        description: "Your profile information was updated successfully.",
        variant: "default", // or leave out for default style
      });
    } catch (error) {
      console.error("Error updating profile:", error);

      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account banner"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto flex justify-end py-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="New Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="New Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
