export interface Product {
  images: string[];
  asin: string;
  name: string;
  numberOfReviews: number;
  price: string;
  rating: number;
  description: string;
  shortDescription: string;
}

export const testData: Product[] = [
  {
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SX679_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SX466_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SX425_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SY355_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SX522_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SX569_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71VB--jaeSL._AC_SY450_.jpg",
    ],
    asin: "B06W55K9N6",
    name:
      "WD 2TB Elements Portable External Hard Drive HDD, USB 3.0, Compatible with PC, Mac, PS4 & Xbox - WDBU6Y0020BBK-WESN",
    numberOfReviews: 147798,
    price: "$59.99",
    rating: 4.7,
    description:
      "Style: Portable | \n\nCapacity: 2TB WD Elements portable hard drives offer reliable, high-capacity storage, fast data transfer rates and universal connectivity with USB 3.0 and USB 2.0 devices to back up your photos, videos and files on the go.",
    shortDescription:
      'About this item This fits your . Make sure this fits by entering your model number. P.when("ReplacementPartsBulletLoader").execute(function(module){ module.initializeDPX(); }) USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system 2 year manufacturer\'s limited warranty',
  },
  {
    asin: "B06W55K1N6",
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/61-PblYntsL._AC_SX679_.jpg",
    ],
    name: "Test Name",
    numberOfReviews: 345,
    price: "$500",
    description: "Test desciption",
    rating: 4.1,
    shortDescription: "Short description",
  },
  {
    asin: "B06W55K1N6",
    images: ["https://m.media-amazon.com/images/I/A1LDFBeKebL._AC_UL320_.jpg"],
    name: "Test Name",
    numberOfReviews: 345,
    price: "$500",
    description: "Test desciption",
    rating: 4.1,
    shortDescription: "Short description",
  },
  {
    asin: "B06W55K1N6",
    images: ["https://m.media-amazon.com/images/I/71KCQZB+fZL._AC_UY218_.jpg"],
    name: "Test Name",
    numberOfReviews: 345,
    price: "$500",
    description: "Test desciption",
    rating: 4.1,
    shortDescription: "Short description",
  },
  {
    asin: "B06W55K1N6",
    images: ["https://m.media-amazon.com/images/I/713EWUU7IsL._AC_UY218_.jpg"],
    name: "Test Name",
    numberOfReviews: 345,
    price: "$500",
    description: "Test desciption",
    rating: 4.1,
    shortDescription: "Short description",
  },
];
