
import { Menu } from "lucide-react";
import { Button } from "./button";
import React from "react";

interface SidebarToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export function SidebarToggle({ isOpen, toggle }: SidebarToggleProps) {
  return (
    <Button 
      onClick={toggle} 
      variant="outline" 
      size="icon" 
      className="absolute top-4 left-4 lg:hidden rounded-full shadow-sm hover:shadow"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
