import { NextResponse } from 'next/server'

export async function POST(_request: Request) {
  try {
    // Mock response for creating reports
    return NextResponse.json({
      message: 'Report created successfully',
      report: { id: 'mock', created: true },
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Mock response for getting reports
    const mockReports = [
      {
        id: '1',
        reason: 'Inappropriate content',
        details: 'This review contains offensive language',
        status: status || 'PENDING',
        createdAt: new Date(),
        review: {
          id: '1',
          title: 'Bad review',
          content: 'Mock review content',
          landlord: {
            id: '1',
            name: 'Mock Landlord',
          },
        },
      },
    ]

    return NextResponse.json({
      reports: mockReports,
      pagination: {
        page,
        limit,
        total: mockReports.length,
        pages: Math.ceil(mockReports.length / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}