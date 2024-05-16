import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongo/dbConnect";
import Seller from "@/models/Seller";
import User from "@/models/User";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 *
 */

// Update a user profile
export const PUT = async req => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user._id;
    const body = await req.json();
    const { name, email, avatar, type, avatarPublicId } = body;

    if (type === "profile") {
      if (!name || !email) {
        return NextResponse.json(
          { success: false, message: "Name and email are required" },
          { status: 400 }
        );
      }
      if (avatar !== undefined) {
        body.imageProfileURL = avatar;
        body.imageProfilePublicId = avatarPublicId;
      } else {
        if (body.imageProfileURL === null || body.imageProfileURL === "") {
          delete body.imageProfileURL;
          delete body.imageProfilePublicId;
        }
      }
      const updateUser = await User.findByIdAndUpdate(userId, body, {
        new: true,
        runValidators: true
      });
      if (!updateUser) {
        return NextResponse.json({ success: false, message: "Profile not found" }, { status: 400 });
      }

      return NextResponse.json(
        {
          success: true,
          message: "Your profile is updated",
          data: updateUser
        },
        { status: 200 }
      );
    } else if (type === "seller") {
      const { location } = body;
      if (!location) {
        return NextResponse.json(
          { success: false, message: "Location is required" },
          { status: 400 }
        );
      }
      const existingSeller = await Seller.findOne({ userId });
      if (existingSeller) {
        return NextResponse.json(
          { success: false, message: "User is already a seller" },
          { status: 400 }
        );
      }
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isSeller: true,
            address: location
          }
        },
        {
          new: true,
          runValidators: true
        }
      );
      await Seller.create({ userId, isRequestedAt: new Date() });
      return NextResponse.json(
        {
          success: true,
          message: "User became a seller",
          isSeller: updateUser.isSeller,
          address: updateUser.address
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ success: false, message: "Invalid update type" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        data: error.data
      },
      { status: error.statusCode || 500 }
    );
  }
};
