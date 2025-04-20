import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/private/", "/private/:path*"] };

export default withAuth({});

export const middleware = withAuth({});