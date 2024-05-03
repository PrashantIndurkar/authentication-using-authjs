"use client";

import { Card } from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper = ({ children }: CardWrapperProps) => {
  return <Card className="w-[400px] shadow-md">{children}</Card>;
};

export default CardWrapper;
