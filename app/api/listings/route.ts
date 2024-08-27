// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const body = await request.json();
//   const {
//     title,
//     description,
//     ImageSrc,
//     category,
//     roomCount,
//     bathRoomCount,
//     guestCount,
//     location,
//     price,
//   } = body;

//   // check if the items are missing
//   Object.keys(body).forEach((value: any) => {
//     if (!body[value]) {
//       NextResponse.error();
//     }
//   });

//   // create the listing
//   const listing = await prisma.listing.create({
//     data: {
//       title,
//       description,
//       ImageSrc,
//       category,
//       roomCount,
//       bathRoomCount,
//       guestCount,
//       locationValue: location.value,
//       price: parseInt(price, 10),
//       userId: currentUser.id,
//     },
//   });

//   return NextResponse.json(listing);
// }

// import prisma from "@/app/libs/prismadb"; // Adjust the import path as necessary
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const {
//       title,
//       description,
//       ImageSrc,
//       category,
//       roomCount,
//       bathRoomCount,
//       guestCount,
//       location,
//       price,
//       userId, // Assuming userId is passed in the request body
//     } = body;

//     // Check if any required fields are missing
//     const requiredFields = [
//       "title",
//       "description",
//       "ImageSrc",
//       "category",
//       "roomCount",
//       "bathRoomCount",
//       "guestCount",
//       "location",
//       "price",
//       "userId",
//     ];

//     for (const field of requiredFields) {
//       if (!body[field]) {
//         return NextResponse.json(
//           { error: `${field} is required` },
//           { status: 400 }
//         );
//       }
//     }

//     // Create the listing
//     const listing = await prisma.listing.create({
//       data: {
//         title,
//         description,
//         ImageSrc,
//         category,
//         roomCount,
//         bathRoomCount,
//         guestCount,
//         locationValue: location.value,
//         price: parseInt(price, 10),
//         userId,
//       },
//     });

//     return NextResponse.json(listing);
//   } catch (error) {
//     console.error("Error creating listing:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      ImageSrc,
      category,
      roomCount,
      bathRoomCount,
      guestCount,
      location,
      price,
    } = body;

    // Check if any required fields are missing
    const requiredFields = [
      "title",
      "description",
      "ImageSrc",
      "category",
      "roomCount",
      "bathRoomCount",
      "guestCount",
      "location",
      "price",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create the listing
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        ImageSrc,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
