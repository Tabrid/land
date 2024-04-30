const Navbar = () => {
  return (
    <div
      className="navbar sm:w-[600px]"
      style={{ backgroundColor: "#683091", minHeight: "75px" }}
    >
          <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <img src="https://i.ibb.co/dtD56QL/logo-light.png" />
        </a>
      </div>

      <div className="mb-3">
        <img src="https://i.ibb.co/PM2fdVz/nagorik.png" />
      </div>
      </div>
   
  );
};

export default Navbar;
