// Temporary mock data for development without database connection
export const mockLandlords = [
  {
    id: '1',
    name: 'Green Valley Properties',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'CA',
    zipCode: '90210',
    phone: '(555) 123-4567',
    email: 'info@greenvalleyproperties.com',
    website: 'https://greenvalleyproperties.com',
    description: 'Professional property management company serving the Springfield area for over 20 years.',
    claimedBy: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    reviews: [
      {
        id: '1',
        rating: 5,
        title: 'Excellent landlord, highly recommended!',
        content: 'Green Valley Properties has been fantastic to work with. They respond quickly to maintenance requests and the properties are well-maintained.',
        anonymous: true,
        createdAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        rating: 4,
        title: 'Good experience overall',
        content: 'Professional management company with fair pricing. The only downside is that it can sometimes take a day or two to get responses.',
        anonymous: true,
        createdAt: new Date('2024-01-20'),
      },
    ],
  },
  {
    id: '2',
    name: 'Metro Apartments LLC',
    address: '456 Oak Avenue',
    city: 'Springfield',
    state: 'CA',
    zipCode: '90211',
    phone: '(555) 987-6543',
    email: 'contact@metroapartments.com',
    website: null,
    description: 'Modern apartment complexes with amenities in prime locations.',
    claimedBy: null,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    reviews: [
      {
        id: '3',
        rating: 3,
        title: 'Average experience',
        content: 'The apartments are nice but the management can be unresponsive at times.',
        anonymous: true,
        createdAt: new Date('2024-01-25'),
      },
      {
        id: '4',
        rating: 2,
        title: 'Poor communication',
        content: 'Very difficult to reach the management office. When I moved out, it took months to get my security deposit back.',
        anonymous: true,
        createdAt: new Date('2024-02-01'),
      },
    ],
  },
  {
    id: '3',
    name: 'Sunset Rentals',
    address: '789 Pine Road',
    city: 'Springfield',
    state: 'CA',
    zipCode: '90212',
    phone: '(555) 555-0123',
    email: null,
    website: null,
    description: 'Family-owned rental properties with a personal touch.',
    claimedBy: null,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    reviews: [
      {
        id: '5',
        rating: 5,
        title: 'Amazing landlord!',
        content: 'The owners are incredibly kind and responsive. They truly care about their tenants and maintain the properties excellently.',
        anonymous: true,
        createdAt: new Date('2024-02-05'),
      },
    ],
  },
]

export function calculateAverageRating(reviews: Array<{ rating: number }>) {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((total, review) => total + review.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function getMockLandlords() {
  return mockLandlords.map(landlord => ({
    ...landlord,
    avgRating: calculateAverageRating(landlord.reviews),
    reviewCount: landlord.reviews.length,
  }))
}

export function getMockLandlordById(id: string) {
  const landlord = mockLandlords.find(l => l.id === id)
  if (!landlord) return null
  
  return {
    ...landlord,
    avgRating: calculateAverageRating(landlord.reviews),
    reviewCount: landlord.reviews.length,
  }
}