
import { Compatibility } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CompatibilityTableProps {
  compatibilities: Compatibility[];
}

export function CompatibilityTable({ compatibilities }: CompatibilityTableProps) {
  return (
    <div className="table-container">
      <table className="product-table">
        <thead className="bg-gray-50 text-xs">
          <tr>
            <th className="min-w-[250px]">Produto</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Motor</th>
            <th>Compatibilidade</th>
          </tr>
        </thead>
        <tbody>
          {compatibilities.map((item) => (
            <tr key={item.id} className="border-b row-hover">
              <td className="font-medium">
                <span className="text-sm">{item.product}</span>
              </td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.year}</td>
              <td>{item.engine}</td>
              <td>
                {item.compatibility === "Compatível" ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
                    <CheckCircle2 className="w-3 h-3" /> {item.compatibility}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex gap-1 items-center">
                    <AlertCircle className="w-3 h-3" /> {item.compatibility}
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
