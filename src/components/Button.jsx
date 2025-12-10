import { Link } from "react-router-dom";

function Button({
  text = "Click Me",
  color = "#ff7a00",
  textColor = "#ffffff",
  to = "#",
  width = "auto",
  height = "auto",
  fontSize = "18px",
  className = "",
  rounded = "full",
  uppercase = true,
}) {
  return (
    <Link
      to={to}
      style={{
        backgroundColor: color,
        color: textColor,
        width,
        height,
        fontSize,
        textTransform: uppercase ? "uppercase" : "none",
      }}
      className={`inline-flex items-center justify-center leading-normal shadow-md transition duration-150 ease-in-out hover:opacity-80 focus:opacity-90 active:opacity-100 bebas-regular rounded-${rounded} ${className}`}
    >
      {text}
    </Link>
  );
}

export default Button;
