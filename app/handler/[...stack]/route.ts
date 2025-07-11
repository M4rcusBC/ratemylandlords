import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/lib/stack'

// This handler manages all Stack Auth routes
export async function GET(
  request: NextRequest,
  { params }: { params: { stack: string[] } }
) {
  const response = await stackServerApp.handleOAuth(request, params.stack)
  return response || NextResponse.redirect(new URL('/', request.url))
}

export async function POST(
  request: NextRequest, 
  { params }: { params: { stack: string[] } }
) {
  const response = await stackServerApp.handleOAuth(request, params.stack)
  return response || NextResponse.redirect(new URL('/', request.url))
}
