import Image from "next/image";

//walk through all images into public folder 
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    console.log({ item: r(item) });
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

//get images array 
let cacheImages = importAll(
  require.context(
    process.env.NEXT_PUBLIC_IMAGE_PATH,
    false,
    /\.(png|jpe?g|svg)$/
  )
);

export default function Img({ s, a, w, h }) {
  //not chached? let's get it 
  if (!!cacheImages[s]) {
    let images = importAll(
      require.context(
        process.env.NEXT_PUBLIC_IMAGE_PATH,
        false,
        /\.(png|jpe?g|svg)$/
      )
    );

    cacheImages = { ...cacheImages, images };
  }
  console.log(cacheImages);

  return (
    <>
      {!!cacheImages[s] && (
        <Image
          src={cacheImages[s].default}
          width={w ?? "100%"}
          height={h ?? "100%"}
          alt={a ?? ""}
        />
      )}
      {!cacheImages[s] && <small>Image not found: {s}</small>}
    </>
  );
}
