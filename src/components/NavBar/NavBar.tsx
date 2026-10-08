import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";

const NavBar = () => {
  const { logout, user } = useAuth();
  const [signOutOpen, setSignOutOpen] = useState(false);
  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;

  return (
    <div className={styles.NavBar}>
      <Link to="/">
        <div className="border-t-1 border-b-1 py-[2px] border-black hover:opacity-60">
          <div className={styles.logo}>Bank of CLI</div>
        </div>
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<NavLink to="/" />}>
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<NavLink to="/history" />}>
              Statements
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>New Transaction</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink render={<NavLink to="/transaction/deposit" />}>Deposit</NavigationMenuLink>
              <NavigationMenuLink render={<NavLink to="/transaction/withdrawal" />}>Withdrawal</NavigationMenuLink>
              <NavigationMenuLink render={<NavLink to="/transaction/transfer" />}>Transfer</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="gap-4">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-left text-xs">
                  {user?.firstName + " " + user?.lastName?.charAt(0) + "."}
                </div>
                <div className="text-xs opacity-60">Personal Account</div>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Settings</NavigationMenuLink>
              <NavigationMenuLink render={<button type="button" />} onClick={() => setSignOutOpen(true)}>
                Sign Out
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Dialog lives outside the menu, so closing the menu doesn't unmount it */}
      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={logout}>
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NavBar;
