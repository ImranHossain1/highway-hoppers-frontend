import Navbar from "../view/Navbar";

const PublicHeader = async () => {
  const items = [
    { key: "1", label: "Home", href: "/home" },
    { key: "2", label: "Book Now", href: "/book-now" },
    // { key: "3", label: "About Us", href: "/about-us" },
  ];
  return (
    <>
      <Navbar items={items} />
    </>
  );
};

export default PublicHeader;
