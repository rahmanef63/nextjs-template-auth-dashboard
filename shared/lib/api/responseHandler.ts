import { NextResponse } from 'next/server';

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ data, success: true }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    { error: message, success: false },
    { status }
  );
}

export function createdResponse<T>(data: T) {
  return successResponse(data, 201);
}

export function noContentResponse() {
  return new NextResponse(null, { status: 204 });
}