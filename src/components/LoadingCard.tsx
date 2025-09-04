import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="animate-pulse bg-gradient-subtle border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Skeleton className="h-8 w-8 rounded-lg bg-primary/20" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 bg-muted/40" />
              <Skeleton className="h-4 w-1/2 bg-muted/30" />
            </div>
          </div>
          <Skeleton className="h-6 w-16 rounded-full bg-muted/40" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-full rounded-md bg-muted/30" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 bg-primary/30 rounded-full" />
            <Skeleton className="h-4 w-24 bg-muted/30" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 bg-primary/30 rounded-full" />
            <Skeleton className="h-4 w-20 bg-muted/30" />
          </div>
        </div>
        
        <Skeleton className="h-12 w-full rounded-md bg-accent/20" />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;