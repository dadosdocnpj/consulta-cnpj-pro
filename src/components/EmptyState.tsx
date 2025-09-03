import { Search, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "building" | "map";
  actionLabel?: string;
  actionLink?: string;
}

const EmptyState = ({ 
  title, 
  description, 
  icon = "search", 
  actionLabel, 
  actionLink 
}: EmptyStateProps) => {
  const IconComponent = {
    search: Search,
    building: Building2,
    map: MapPin
  }[icon];

  return (
    <Card className="text-center py-12">
      <CardContent>
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <IconComponent className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        
        {actionLabel && actionLink && (
          <Button asChild variant="outline">
            <Link to={actionLink}>{actionLabel}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;