import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Heart,
  Share2,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  MapPin,
  Lock,
} from "lucide-react";
import InstallmentCalculator from "./InstallmentCalculator";

interface CarDetailViewProps {
  car?: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    monthlyPayment: number;
    images: string[];
    color: string;
    mileage: number;
    fuelType: string;
    transmission: string;
    location: string;
    description: string;
    features: string[];
    specifications: Record<string, string>;
    financingOptions: {
      downPaymentMin: number;
      termLengthOptions: number[];
      interestRate: number;
    };
  };
}

const CarDetailView: React.FC<CarDetailViewProps> = ({
  car = {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    price: 3200000,
    monthlyPayment: 45000,
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc4e4c4c66?w=800&q=80",
      "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc4e4c4c66?w=800&q=80",
    ],
    color: "White",
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Algiers",
    description:
      "The Toyota Corolla is a stylish and reliable sedan with excellent fuel economy and modern features. This brand new model comes with a comprehensive warranty and is available for financing with competitive rates.",
    features: [
      "Bluetooth Connectivity",
      "Backup Camera",
      "Cruise Control",
      "Keyless Entry",
      "Power Windows",
      "Air Conditioning",
      "ABS Brakes",
      "Alloy Wheels",
    ],
    specifications: {
      Engine: "1.8L 4-Cylinder",
      Horsepower: "140 hp",
      "Fuel Economy": "7.1L/100km",
      "Seating Capacity": "5",
      "Cargo Space": "371L",
      "Safety Rating": "5-Star",
      Warranty: "3 Years/100,000 km",
    },
    financingOptions: {
      downPaymentMin: 640000, // 20% of price
      termLengthOptions: [12, 24, 36, 48, 60],
      interestRate: 5.9,
    },
  },
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1,
    );
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " DZD";
  };

  const handleDetailsClick = () => {
    setShowAccountDialog(true);
  };

  const handlePhoneConfirmation = () => {
    setShowAccountDialog(false);
    setShowPaymentDialog(true);
  };

  const handlePaymentMethod = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    setShowPaymentDialog(false);
    // Here you would typically proceed with the selected payment method
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images and Gallery */}
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden h-[400px] mb-4">
            <img
              src={car.images[currentImageIndex]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
                onClick={handlePrevImage}
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white"
                onClick={handleNextImage}
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {car.images.map((image, index) => (
              <div
                key={index}
                className={`h-20 rounded-md overflow-hidden cursor-pointer ${index === currentImageIndex ? "ring-2 ring-primary" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Car Details and Actions */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {car.make} {car.model}
              </h1>
              <p className="text-gray-500">{car.year}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={isFavorite ? "text-red-500" : ""}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={isFavorite ? "fill-red-500" : ""} size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-3xl font-bold">{formatPrice(car.price)}</h2>
            <p className="text-primary font-medium mt-1">
              Monthly payment from {formatPrice(car.monthlyPayment)}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2 text-gray-500" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center">
              <Fuel size={18} className="mr-2 text-gray-500" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center">
              <Gauge size={18} className="mr-2 text-gray-500" />
              <span>{car.mileage} km</span>
            </div>
            <div className="flex items-center">
              <Cog size={18} className="mr-2 text-gray-500" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center col-span-2">
              <MapPin size={18} className="mr-2 text-gray-500" />
              <span>{car.location}</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Button className="w-full" onClick={handleDetailsClick}>
              <Lock className="mr-2 h-4 w-4" />
              عرض التفاصيل الكاملة
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="financing">Financing</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{car.description}</p>

                <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(car.specifications).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b border-gray-100"
                      >
                        <span className="font-medium">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financing" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Financing Options
                </h3>
                <p className="mb-6">
                  Customize your financing plan to fit your budget:
                </p>

                <InstallmentCalculator
                  carPrice={car.price}
                  downPaymentMin={car.financingOptions.downPaymentMin}
                  termLengthOptions={car.financingOptions.termLengthOptions}
                  interestRate={car.financingOptions.interestRate}
                />

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Financing Terms</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Minimum down payment: 20% of vehicle price</li>
                    <li>
                      Interest rate: {car.financingOptions.interestRate}% APR
                    </li>
                    <li>
                      Financing available for up to{" "}
                      {Math.max(...car.financingOptions.termLengthOptions)}{" "}
                      months
                    </li>
                    <li>Credit check and approval required</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {car.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-md overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${car.make} ${car.model} gallery image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Cars Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Similar Cars</h2>
          <Button variant="link">View All</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Placeholder for similar cars - would be replaced with actual CarCard components */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-medium">Similar Car {item}</h3>
                <p className="text-gray-500 text-sm">Sample Model</p>
                <div className="mt-2 flex justify-between">
                  <span className="font-bold">2,800,000 DZD</span>
                  <Badge>Financing</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Creation Dialog */}
      <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">إنشاء حساب</DialogTitle>
            <DialogDescription className="text-right">
              يرجى إدخال بياناتك لإنشاء حساب جديد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right block">
                الاسم الأول
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-right block">
                اللقب
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-right block">
                رقم الهاتف
              </Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-right"
                dir="rtl"
                placeholder="+213"
              />
            </div>
            <Button
              onClick={handlePhoneConfirmation}
              className="w-full"
              disabled={!firstName || !lastName || !phoneNumber}
            >
              تأكيد رقم الهاتف
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Method Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">اختر طريقة الدفع</DialogTitle>
            <DialogDescription className="text-right">
              يرجى اختيار طريقة الدفع المفضلة لديك
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button
              onClick={() => handlePaymentMethod("mobilis")}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              موبيليس
            </Button>
            <Button
              onClick={() => handlePaymentMethod("djezzy")}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              جيزي
            </Button>
            <Button
              onClick={() => handlePaymentMethod("ooredoo")}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              أوريدو
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDetailView;
