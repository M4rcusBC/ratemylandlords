import { NextResponse } from 'next/server'

export async function POST(_request: Request) {
  try {
    // Mock response for creating reviews
    return NextResponse.json({
      message: 'Review created successfully',
      review: { id: 'mock', created: true },
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const landlordId = searchParams.get('landlordId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    // Mock response for getting reviews
    const mockReviews = [
      {
        id: '1',
        rating: 5,
        title: 'Great landlord',
        content: 'Very responsive and professional',
        createdAt: new Date(),
        anonymous: true,
        landlord: {
          id: landlordId || '1',
          name: 'Mock Landlord',
        },
      },
    ]

    return NextResponse.json({
      reviews: mockReviews,
      pagination: {
        page,
        limit,
        total: mockReviews.length,
        pages: Math.ceil(mockReviews.length / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}