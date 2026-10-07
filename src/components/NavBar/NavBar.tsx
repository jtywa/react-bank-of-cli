import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import styles from "./NavBar.module.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";

const NavBar = () => {
  const { logout, user } = useAuth();
  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;

  return (
    <div className={styles.NavBar}>
      <div className={styles.logo}>Bank of CLI</div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link to="/" />}
            >
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Transactions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Deposit</NavigationMenuLink>
              <NavigationMenuLink>Withdrawal</NavigationMenuLink>
              <NavigationMenuLink>Transfer</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link to="/history" />}
            >
              Transaction History
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="gap-2">
              <Avatar>
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span>
                {user?.firstName + " " + user?.lastName?.charAt(0) + "."}
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Settings</NavigationMenuLink>
              <AlertDialog>
                <AlertDialogTrigger render={<NavigationMenuLink />}>
                  Sign Out
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to sign out?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={logout}>
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* <Button onClick={logout} variant="outline">Sign Out</Button> */}
    </div>
  );
};

export default NavBar;
