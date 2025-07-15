import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CarCard from "./CarCard";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  monthlyPayment: number;
  image: string;
  mileage: number;
  transmission: string;
  fuelType: string;
}

interface CarListingGridProps {
  cars?: Car[];
}

const CarListingGrid = ({ cars = [] }: CarListingGridProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Default cars data if none provided
  const defaultCars: Car[] =
    cars.length > 0
      ? cars
      : [
          {
            id: "1",
            make: "تويوتا",
            model: "كامري",
            year: 2024,
            price: 4200000,
            monthlyPayment: 58000,
            image:
              "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "2",
            make: "هوندا",
            model: "أكورد",
            year: 2024,
            price: 3800000,
            monthlyPayment: 52000,
            image:
              "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "3",
            make: "نيسان",
            model: "التيما",
            year: 2024,
            price: 3500000,
            monthlyPayment: 48000,
            image:
              "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "4",
            make: "هيونداي",
            model: "إلنترا",
            year: 2024,
            price: 3200000,
            monthlyPayment: 44000,
            image:
              "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "5",
            make: "كيا",
            model: "سيراتو",
            year: 2024,
            price: 2900000,
            monthlyPayment: 40000,
            image:
              "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "6",
            make: "مرسيدس",
            model: "C-Class",
            year: 2024,
            price: 8500000,
            monthlyPayment: 118000,
            image:
              "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "7",
            make: "بي إم دبليو",
            model: "320i",
            year: 2024,
            price: 7800000,
            monthlyPayment: 108000,
            image:
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "8",
            make: "أودي",
            model: "A4",
            year: 2024,
            price: 7200000,
            monthlyPayment: 100000,
            image:
              "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "9",
            make: "فولكس واجن",
            model: "جيتا",
            year: 2024,
            price: 3600000,
            monthlyPayment: 50000,
            image:
              "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "10",
            make: "شيفروليه",
            model: "كروز",
            year: 2024,
            price: 3100000,
            monthlyPayment: 43000,
            image:
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "11",
            make: "فورد",
            model: "فوكس",
            year: 2024,
            price: 2800000,
            monthlyPayment: 39000,
            image:
              "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "12",
            make: "رينو",
            model: "ميجان",
            year: 2024,
            price: 2600000,
            monthlyPayment: 36000,
            image:
              "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
            mileage: 0,
            transmission: "يدوي",
            fuelType: "بنزين",
          },
          {
            id: "13",
            make: "بيجو",
            model: "308",
            year: 2024,
            price: 2700000,
            monthlyPayment: 37000,
            image:
              "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "14",
            make: "سيات",
            model: "ليون",
            year: 2024,
            price: 3000000,
            monthlyPayment: 42000,
            image:
              "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "15",
            make: "سكودا",
            model: "أوكتافيا",
            year: 2024,
            price: 3300000,
            monthlyPayment: 46000,
            image:
              "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "16",
            make: "مازda",
            model: "6",
            year: 2024,
            price: 3700000,
            monthlyPayment: 51000,
            image:
              "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "17",
            make: "سوبارو",
            model: "إمبريزا",
            year: 2024,
            price: 3400000,
            monthlyPayment: 47000,
            image:
              "https://images.unsplash.com/photo-1606016159991-8b5d5f8e7e8e?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
          {
            id: "18",
            make: "ميتسوبيشي",
            model: "لانسر",
            year: 2024,
            price: 2900000,
            monthlyPayment: 40000,
            image:
              "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
            mileage: 0,
            transmission: "أوتوماتيك",
            fuelType: "بنزين",
          },
        ];

  // Get unique makes for filter
  const makes = Array.from(new Set(defaultCars.map((car) => car.make)));

  const toggleMake = (make: string) => {
    if (selectedMakes.includes(make)) {
      setSelectedMakes(selectedMakes.filter((m) => m !== make));
    } else {
      setSelectedMakes([...selectedMakes, make]);
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " DA";
  };

  const filteredCars = defaultCars.filter((car) => {
    const matchesPrice =
      car.price >= priceRange[0] && car.price <= priceRange[1];
    const matchesMake =
      selectedMakes.length === 0 || selectedMakes.includes(car.make);
    const matchesSearch =
      searchQuery === "" ||
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPrice && matchesMake && matchesSearch;
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-background w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Input
            placeholder="ابحث عن الماركة أو الموديل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-right"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <Button
          variant="outline"
          className="md:w-auto flex items-center gap-2 luxury-card"
          onClick={toggleFilter}
        >
          <SlidersHorizontal className="h-4 w-4" />
          فلاتر
          {isFilterOpen && <X className="h-4 w-4 mr-2" />}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar */}
        {isFilterOpen && (
          <div className="w-full lg:w-64 luxury-card rounded-lg p-4 h-fit">
            <h3 className="font-medium text-lg mb-4">الفلاتر</h3>

            <div className="space-y-6">
              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-2">نطاق السعر</h4>
                <div className="mb-6">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={10000000}
                    step={100000}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Make Filter */}
              <div>
                <h4 className="font-medium mb-2">الماركة</h4>
                <div className="space-y-2">
                  {makes.map((make) => (
                    <div key={make} className="flex items-center space-x-2">
                      <Checkbox
                        id={`make-${make}`}
                        checked={selectedMakes.includes(make)}
                        onCheckedChange={() => toggleMake(make)}
                      />
                      <Label htmlFor={`make-${make}`}>{make}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Year Filter */}
              <div>
                <h4 className="font-medium mb-2">السنة</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="أي سنة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">أي سنة</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Transmission Filter */}
              <div>
                <h4 className="font-medium mb-2">ناقل الحركة</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox id="transmission-auto" />
                    <Label htmlFor="transmission-auto">أوتوماتيك</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox id="transmission-manual" />
                    <Label htmlFor="transmission-manual">يدوي</Label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        )}

        {/* Car grid */}
        <div className="flex-1">
          {filteredCars.length === 0 ? (
            <div className="text-center py-12 luxury-card rounded-lg">
              <h3 className="text-xl font-medium">لم يتم العثور على سيارات</h3>
              <p className="text-muted-foreground mt-2">جرب تعديل الفلاتر</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  id={car.id}
                  make={car.make}
                  model={car.model}
                  year={car.year}
                  price={car.price}
                  monthlyPayment={car.monthlyPayment}
                  image={car.image}
                  mileage={car.mileage}
                  transmission={car.transmission}
                  fuelType={car.fuelType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListingGrid;
