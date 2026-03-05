import kosLogo from "./assets/koslogo.png";

/**
 * @param {{ size?: number }} props
 */
export default function KosLogo({ size = 100 }) {
  return (
    <img
      src={kosLogo}
      alt="Koš Lounge"
      width={size}
      height={size}
      style={{ objectFit: "contain", display: "block", flexShrink: 0 }}
    />
  );
}
