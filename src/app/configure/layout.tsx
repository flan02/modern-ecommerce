import Steps from "@/components/custom/Steps";
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <MaxWidthWrapper className="flex flex-col flex-1 ">
      <Steps /> {/* client component */}
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout