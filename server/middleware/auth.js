



import { clerkClient, getAuth } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    console.log("UserId from token:", userId);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const user = await clerkClient.users.getUser(userId);
    console.log("Fetched Clerk user:", user);

    const role = user.privateMetadata?.role;
    console.log("privateMetadata.role:", role);

    if (role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden: User is not an admin" });
    }

    req.user = user; // optional
    next();
  } catch (err) {
    console.error("protectAdmin error:", err);
    return res.status(401).json({ success: false, message: "Unauthorized: Token invalid or error" });
  }
};


