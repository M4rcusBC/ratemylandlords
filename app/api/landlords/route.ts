import { NextResponse } from 'next/server'
import { getMockLandlords } from '@/lib/mockData'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const city = searchParams.get('city')
  const state = searchParams.get('state')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    let landlords = getMockLandlords()

    // Apply filters
    if (search) {
      landlords = landlords.filter(landlord =>
        landlord.name.toLowerCase().includes(search.toLowerCase()) ||
        landlord.address.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (city) {
      landlords = landlords.filter(landlord =>
        landlord.city.toLowerCase().includes(city.toLowerCase())
      )
    }

    if (state) {
      landlords = landlords.filter(landlord =>
        landlord.state.toLowerCase().includes(state.toLowerCase())
      )
    }

    // Apply pagination
    const total = landlords.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedLandlords = landlords.slice(startIndex, endIndex)

    return NextResponse.json({
      landlords: paginatedLandlords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching landlords:', error)
    return NextResponse.json(
      { error: 'Failed to fetch landlords' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, address, city, state, zipCode, phone, email, website, description } = body

    // Basic validation
    if (!name || !address || !city || !state || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required fields: name, address, city, state, zipCode' },
        { status: 400 }
      )
    }

    // For now, just return a mock response
    const newLandlord = {
      id: Date.now().toString(),
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

    return NextResponse.json(newLandlord, { status: 201 })
  } catch (error) {
    console.error('Error creating landlord:', error)
    return NextResponse.json(
      { error: 'Failed to create landlord' },
      { status: 500 }
    )
  }
}