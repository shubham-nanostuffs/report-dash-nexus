import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FilterOptions } from "@/types/analytics";

interface FiltersProps {
  filterOptions: FilterOptions;
  onFiltersChange: (filters: {
    states: string[];
    districts: string[];
    amisps: string[];
  }) => void;
}

export function Filters({ filterOptions, onFiltersChange }: FiltersProps) {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedAmisps, setSelectedAmisps] = useState<string[]>([]);

  const handleStateChange = (state: string, checked: boolean) => {
    const newStates = checked
      ? [...selectedStates, state]
      : selectedStates.filter((s) => s !== state);
    
    setSelectedStates(newStates);
    onFiltersChange({
      states: newStates,
      districts: selectedDistricts,
      amisps: selectedAmisps,
    });
  };

  const handleDistrictChange = (district: string, checked: boolean) => {
    const newDistricts = checked
      ? [...selectedDistricts, district]
      : selectedDistricts.filter((d) => d !== district);
    
    setSelectedDistricts(newDistricts);
    onFiltersChange({
      states: selectedStates,
      districts: newDistricts,
      amisps: selectedAmisps,
    });
  };

  const handleAmispChange = (amisp: string, checked: boolean) => {
    const newAmisps = checked
      ? [...selectedAmisps, amisp]
      : selectedAmisps.filter((a) => a !== amisp);
    
    setSelectedAmisps(newAmisps);
    onFiltersChange({
      states: selectedStates,
      districts: selectedDistricts,
      amisps: newAmisps,
    });
  };

  const clearAllFilters = () => {
    setSelectedStates([]);
    setSelectedDistricts([]);
    setSelectedAmisps([]);
    onFiltersChange({
      states: [],
      districts: [],
      amisps: [],
    });
  };

  const totalFilters = selectedStates.length + selectedDistricts.length + selectedAmisps.length;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Filters:</span>
      </div>

      {/* State Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white shadow-card">
            State
            {selectedStates.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {selectedStates.length}
              </Badge>
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white shadow-elevated max-h-64 overflow-y-auto">
          <DropdownMenuLabel>Select States</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterOptions.states.map((state) => (
            <DropdownMenuCheckboxItem
              key={state}
              checked={selectedStates.includes(state)}
              onCheckedChange={(checked) => handleStateChange(state, !!checked)}
            >
              {state}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* District Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white shadow-card">
            District
            {selectedDistricts.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {selectedDistricts.length}
              </Badge>
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white shadow-elevated max-h-64 overflow-y-auto">
          <DropdownMenuLabel>Select Districts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterOptions.districts.map((district) => (
            <DropdownMenuCheckboxItem
              key={district}
              checked={selectedDistricts.includes(district)}
              onCheckedChange={(checked) => handleDistrictChange(district, !!checked)}
            >
              {district}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AMISP Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white shadow-card">
            AMISP
            {selectedAmisps.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {selectedAmisps.length}
              </Badge>
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white shadow-elevated max-h-64 overflow-y-auto">
          <DropdownMenuLabel>Select AMISPs</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterOptions.amisps.map((amisp) => (
            <DropdownMenuCheckboxItem
              key={amisp}
              checked={selectedAmisps.includes(amisp)}
              onCheckedChange={(checked) => handleAmispChange(amisp, !!checked)}
            >
              {amisp}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {totalFilters > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}

      {/* Active Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {selectedStates.map((state) => (
          <Badge
            key={`state-${state}`}
            variant="secondary"
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
            onClick={() => handleStateChange(state, false)}
          >
            {state}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}
        {selectedDistricts.map((district) => (
          <Badge
            key={`district-${district}`}
            variant="secondary"
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
            onClick={() => handleDistrictChange(district, false)}
          >
            {district}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}
        {selectedAmisps.map((amisp) => (
          <Badge
            key={`amisp-${amisp}`}
            variant="secondary"
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
            onClick={() => handleAmispChange(amisp, false)}
          >
            {amisp}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}
      </div>
    </div>
  );
}