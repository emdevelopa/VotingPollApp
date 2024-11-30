export default function Navbar(props) {
  return (
    <nav>
      <div className="px-[3em] py-[em] flex justify-between items-center">
        {/* logo */}
        <div>
          <img className="w-[6em]" src="logo.png" alt="logo" />
        </div>

        <div>
          <p className="text-[grey] text-[14px]">
            {props.page === "register"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <a
              className="text-blue-700 hover:underline"
              href={props.page === "register" ? "/login" : "/register"}
            >
              {props.page === "register" ? "login" : " Create Account"}
            </a>
          </p>
        </div>
      </div>
    </nav>
  );
}
