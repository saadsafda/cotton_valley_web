import Image from "next/image";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Avatar = ({
  data,
  placeHolder,
  name,
  customClass,
  customImageClass,
  height,
  width,
}) => {
  return (
    <>
      {data ? (
        <div className={`${customClass ? customClass : ""}`}>
          <Image
            className={customImageClass ? customImageClass : ""}
            src={
              data?.original_url
                ? data?.original_url?.startsWith("http")
                  ? data?.original_url
                  : baseUrl + data?.original_url
                : placeHolder
            }
            height={height || 50}
            width={width || 50}
            alt={name?.name || name || ""}
          />
        </div>
      ) : placeHolder ? (
        <div className={`${customClass ? customClass : ""}`}>
          <Image
            className={customImageClass ? customImageClass : ""}
            src={placeHolder}
            height={height || 50}
            width={width || 50}
            alt={name?.name || name || ""}
          />
        </div>
      ) : (
        <h1>
          {name?.name?.charAt(0).toString().toUpperCase() ||
            name?.charAt(0).toString().toUpperCase()}
        </h1>
      )}
    </>
  );
};

export default Avatar;
