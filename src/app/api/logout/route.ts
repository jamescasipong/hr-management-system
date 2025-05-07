export async function POST(request: Request) {
    const body = await request.json();
    console.log("login body", body);

    const url = process.env.NODE_ENV === "development" ? "http://localhost:5075" : process.env.NEXT_PUBLIC_API_URL as string;

    try {
        const loginResponse = await fetch(`${url}/api/auth/sign-out`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: request.headers.get("cookie") || "",
            },
            credentials: 'include',
        });

        if (!loginResponse.ok) {
            const errorText = await loginResponse.text();
            throw new Error(`Login failed: ${loginResponse.status} - ${errorText}`);
        }

        const response =  new Response(JSON.stringify({
            status: 'success',
            message: `Logout successfully`,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        response.headers.append(
            "set-cookie",
            [
                "at_session=; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=0",
                "backend_rt=; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=0"
            ].join(", ")
        );

        return response;
    } catch (error) {
        console.error("Reason for login failed", error);

        return new Response(JSON.stringify({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}  // <-- This was removed from the end of the function