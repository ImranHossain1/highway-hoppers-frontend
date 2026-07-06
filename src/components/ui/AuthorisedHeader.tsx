import Navbar from "../view/Navbar";

const AuthorisedHeader = ({
  hasSider = false,
}: {
  hasSider?: boolean;
}) => {
  const items = [
    { key: "1", label: "Home", href: "/home" },
    { key: "2", label: "Book Now", href: "/book-now" },
    // { key: "3", label: "About Us", href: "/about-us" },
  ];
  return (
    <>
      <Navbar items={items} hasSider />
    </>
  );
};

export default AuthorisedHeader;
