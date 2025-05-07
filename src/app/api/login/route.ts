export async function POST(request: Request) {
    const body = await request.json();
    console.log("login body", body);

    const url = process.env.NODE_ENV === "development" ? "http://localhost:5075" : process.env.NEXT_PUBLIC_API_URL as string;

    try {
        const loginResponse = await fetch(`${url}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: request.headers.get("cookie") || "",
            },
            body: JSON.stringify(body),
            // Needed to include and forward cookies
            credentials: 'include',
        });

        if (!loginResponse.ok) {
            const errorText = await loginResponse.text();
            throw new Error(`Login failed: ${loginResponse.status} - ${errorText}`);
        }

        // Grab the set-cookie header(s)
        const rawCookies = loginResponse.headers.get('set-cookie');
        console.log("rawCookies", rawCookies);

        return new Response(JSON.stringify({
            status: 'success',
            message: `Login successfully`,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                ...(rawCookies ? { 'set-cookie': rawCookies } : {}),
            },
        });
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