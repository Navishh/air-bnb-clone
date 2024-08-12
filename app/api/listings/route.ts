import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
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

  // check if the items are missing
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // create the listing
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
}
