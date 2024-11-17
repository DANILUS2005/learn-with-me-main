import { Button } from "@/components/ui/button"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Sidebar from "./sidebar"

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost"> <Menu color="white"/></Button>
      </SheetTrigger>
      <SheetContent className="p-0" side={"left"}>
        
         <Sidebar/>
       
  
       
       
      </SheetContent>
    </Sheet>
  )
}
