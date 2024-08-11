import SideNavigation from "../_components/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid  grid-cols-[auto_1fr] gap-1  sm:grid-cols-[16rem_1fr] h-full sm:gap-12 ">
      <SideNavigation />
      {children}
    </div>
  );
}

export default Layout;
