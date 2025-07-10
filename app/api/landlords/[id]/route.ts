import { NextResponse } from 'next/server'
import { getMockLandlordById } from '@/lib/mockData'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const landlord = getMockLandlordById(params.id)

    if (!landlord) {
      return NextResponse.json(
        { error: 'Landlord not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(landlord)
  } catch (error) {
    console.error('Error fetching landlord:', error)
    return NextResponse.json(
      { error: 'Failed to fetch landlord' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const body = await request.json()
    const { name, address, city, state, zipCode, phone, email, website, description } = body

    // For now, just return a mock response
    const updatedLandlord = {
      id: params.id,
      name,
      address,
      city,
      state,
      zipCode,
      phone,
      email,
      website,
      description,
      claimedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: [],
      avgRating: 0,
      reviewCount: 0,
    }

    return NextResponse.json(updatedLandlord)
  } catch (error) {
    console.error('Error updating landlord:', error)
    return NextResponse.json(
      { error: 'Failed to update landlord' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  _context: { params: Promise<{ id: string }> }
) {
  try {
    // For now, just return success
    return NextResponse.json({ message: 'Landlord deleted successfully' })
  } catch (error) {
    console.error('Error deleting landlord:', error)
    return NextResponse.json(
      { error: 'Failed to delete landlord' },
      { status: 500 }
    )
  }
}