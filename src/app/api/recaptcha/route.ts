import { NextResponse } from "next/server";
import { isError, isString } from "@/predicates/common";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { token, expectedAction, siteKey } = body;

    if (!isString(token) || !isString(expectedAction) || !isString(siteKey)) {
      return NextResponse.json({ success: false, error: "Invalid recaptcha values" }, { status: 400 });
    }

    const res = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/costs-diary-1702121776196/assessments?key=${process.env.GOOGLE_RECAPTCHA_API_KEY}`, {
      method: "POST",
      body: JSON.stringify({
        event: {
          token,
          expectedAction,
          siteKey,
        },
      }),
    });
    const data = await res.json();
    return NextResponse.json({ score: data?.riskAnalysis?.score });
  } catch (error) {
    return NextResponse.json({ score: 0, error: isError(error) ? error.message : "Server error" }, { status: 500 });
  }
}
