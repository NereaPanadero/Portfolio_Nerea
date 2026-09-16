import { assetUrl } from "../../utils/assetUrl";

// Lazy, size-reserved image (prevents layout shift).
export default function Img({ src, alt = "", width, height, eager = false, className = "", ...rest }) {
  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchpriority={eager ? "high" : undefined}
      className={className}
      {...rest}
    />
  );
}
