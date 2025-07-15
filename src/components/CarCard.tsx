import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CarCardProps {
  id?: string;
  image?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  monthlyPayment?: number;
  onViewDetails?: (id: string) => void;
  onSaveToFavorites?: (id: string) => void;
  onShare?: (id: string) => void;
}

const CarCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
  make = "Toyota",
  model = "Corolla",
  year = 2023,
  price = 3500000,
  monthlyPayment = 45000,
  onViewDetails,
  onSaveToFavorites = () => {},
  onShare = () => {},
}: CarCardProps) => {
  const navigate = useNavigate();

  // Format price with Algerian Dinar
  const formatPrice = (amount: number) => {
    return (
      new Intl.NumberFormat("ar-DZ", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(amount) + " د.ج"
    );
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      navigate(`/car/${id}`);
    }
  };

  return (
    <Card className="w-[350px] h-[420px] overflow-hidden transition-all duration-300 hover:shadow-2xl luxury-card animate-fade-in group">
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={image}
          alt={`${make} ${model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full glass-effect hover:bg-white/20"
            onClick={() => onSaveToFavorites(id)}
          >
            <Heart className="h-5 w-5 text-white hover:text-red-400" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge
            variant="secondary"
            className="glass-effect text-white border-white/20"
          >
            {year}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">
              {make} {model}
            </h3>
            <p className="text-2xl font-semibold text-primary mt-1">
              {formatPrice(price)}
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-muted-foreground">الدفع الشهري</p>
            <p className="font-semibold text-lg text-accent">
              {formatPrice(monthlyPayment)}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="default"
          className="flex-1 ml-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          onClick={handleViewDetails}
        >
          <Eye className="ml-2 h-4 w-4" /> عرض التفاصيل
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="luxury-card"
          onClick={() => onShare(id)}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
