
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MarketplaceSelectorProps {
  value: "mercadolivre" | "shopee";
  onChange: (value: "mercadolivre" | "shopee") => void;
}

export function MarketplaceSelector({ value, onChange }: MarketplaceSelectorProps) {
  return (
    <div className="flex items-center">
      <Select
        value={value}
        onValueChange={(val) => onChange(val as "mercadolivre" | "shopee")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o marketplace" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="mercadolivre" className="flex items-center">
              <div className="flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Mercado Livre</span>
              </div>
            </SelectItem>
            <SelectItem value="shopee" className="flex items-center">
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4 text-orange-500" />
                <span>Shopee</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
