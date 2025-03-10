"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardX,
  Command,
  FileQuestion,
  Frame,
  GalleryVerticalEnd,
  Grid2x2Check,
  HomeIcon,
  LucideIcon,
  Map,
  NotebookText,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavItems } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { JSX } from "react";

interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  // {
  //   title: "My PDF's",
  //   url: "/my-files",
  //   icon: HomeIcon,
  // },
  // {
  //   title: "My Flashcards",
  //   url: "#",
  //   icon: NotebookText,
  // },
  {
    title: "Games",
    url: "#",
    icon: Grid2x2Check,
    items: [
      {
        title: "Card Match",
        url: "/games/card-match",
      },
      {
        title: "Quiz",
        url: "/games/quiz",
      },
      {
        title: "Fill in the Blanks",
        url: "/games/fill-in-blanks",
      },
      {
        title: "True or False",
        url: "/games/true-or-false",
      },
      {
        title: "Word Scramble",
        url: "/games/word-scramble",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={items} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
