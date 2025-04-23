
import React, { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, Building2, CalendarClock, CheckCircle2, ChevronDown, ChevronRight, Clapperboard, 
  ClipboardList, Coins, Component, FileSearch, Gauge, LayoutDashboard, LineChart, 
  ListChecks, LucideIcon, Mail, MessageSquare, PackageCheck, PercentCircle, 
  PiggyBank, Scale, ScrollText, Settings, ShoppingBag, ShoppingCart, Sliders, 
  SquareKanban, Store, User2, Users, Copy, Wand, Tag, DollarSign, Truck
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({
  isOpen,
  toggleSidebar
}: SidebarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <aside className={`fixed left-0 top-0 z-50 h-full w-72 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="flex h-full flex-col justify-between px-4 py-6">
        <div>
          <div className="mb-6 flex items-center space-x-2.5 px-1">
            <img 
              src="/lovable-uploads/818b35ee-24e9-4855-8059-1d704df40f4c.png" 
              alt="Anye Parts Logo" 
              className="h-[3.4rem] w-auto object-contain"
            />
          </div>

          <Separator className="mb-6 bg-sidebar-border" />

          <nav className="space-y-0.5">
            <SidebarMenuItem label="Dashboard" icon={LayoutDashboard} to="/" />
            <SidebarMenuItem label="Pesquisa de Produtos" icon={FileSearch} to="/produtos">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                Novo
              </span>
            </SidebarMenuItem>
            <SidebarMenuItem label="Meus Anúncios" icon={Tag} to="/meus-anuncios" />
            <SidebarMenuItem label="Central de Promoções" icon={PercentCircle} to="/central-promocoes" />
            <SidebarMenuItem label="Painel de Lucratividade" icon={Coins} to="/painel-lucratividade" />
            <SidebarMenuItem label="Compatibilidades" icon={ListChecks} to="/compatibilidades">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800">
                Em Breve
              </span>
            </SidebarMenuItem>
            <SidebarMenuItem label="Mensagens Automáticas" icon={Mail} to="/mensagens-automaticas" />
            <SidebarMenuItem label="Reposição de Estoque" icon={PackageCheck} to="/reposicao-estoque" />
            <SidebarMenuItem label="Conciliação Financeira" icon={DollarSign} to="/conciliacao-financeira">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center rounded-full bg-[#33C3F0] px-2 py-0.5 text-xs font-semibold text-white">
                Alpha
              </span>
            </SidebarMenuItem>
          </nav>
        </div>

        <div>
          <Separator className="mb-6 bg-sidebar-border" />

          <nav className="space-y-0.5">
            <SidebarMenuItem label="Integrações" icon={SquareKanban} to="/integracoes" />
            <SidebarMenuItem label="Definições" icon={Settings} to="/settings" />
            <SidebarMenuItem label="Suporte" icon={MessageSquare} to="/support" />
          </nav>
        </div>
      </div>
    </aside>;
};

interface SidebarMenuItemProps {
  label: string;
  icon: LucideIcon;
  to: string;
  children?: React.ReactNode;
}

const SidebarMenuItem = ({
  label,
  icon,
  to,
  children
}: SidebarMenuItemProps) => {
  return <NavLink to={to} className={({
    isActive
  }) => cn("sidebar-menu-item relative", isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "")}>
      {React.createElement(icon, {
      className: "sidebar-icon"
    })}
      <span>{label}</span>
      {children}
    </NavLink>;
};

export { Sidebar };
