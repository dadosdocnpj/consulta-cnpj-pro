import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6 bg-muted/30 rounded-lg p-3">
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors p-1.5 rounded-md hover:bg-background/80"
        title="Página inicial"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Início</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-primary transition-colors p-1.5 rounded-md hover:bg-background/80 line-clamp-1"
              title={item.label}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium p-1.5 bg-background/50 rounded-md line-clamp-1" title={item.label}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;